const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to game data directory
const DATA_PATH = 'C:\\Users\\Administrador\\Desktop\\TANAWANT-THONGPING-STUDIO\\bin\\Data';
const OBJECTS_DEPOT_PATH = path.join(DATA_PATH, 'ObjectsDepot');
const ANIMATIONS_PATH = path.join(DATA_PATH, 'Animations5');
const MODELS_PATH = path.join(DATA_PATH, 'Models');

// WebSocket clients for real-time updates
const wsClients = new Set();

// Watch directories for changes
const watcher = chokidar.watch([OBJECTS_DEPOT_PATH, ANIMATIONS_PATH, MODELS_PATH], {
  ignored: /(^|[\/\\])\.|\.tmp$/,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

watcher.on('change', () => {
  broadcastUpdate({ type: 'file_changed', timestamp: new Date().toISOString() });
});

function broadcastUpdate(data) {
  wsClients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// API Routes

// Get directory tree structure recursively
async function getDirTree(dirPath, maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return null;
  
  try {
    const items = await fs.readdir(dirPath);
    const tree = [];

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = await fs.stat(itemPath);
      
      const node = {
        name: item,
        path: itemPath,
        type: stats.isDirectory() ? 'folder' : 'file',
        size: stats.size,
        modified: stats.mtime
      };

      if (stats.isDirectory() && currentDepth < maxDepth - 1) {
        node.children = await getDirTree(itemPath, maxDepth, currentDepth + 1);
      }

      tree.push(node);
    }

    return tree.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Get flat file list with search
async function getFileList(dirPath, extensions = null) {
  const files = [];

  async function walk(dir) {
    try {
      const items = await fs.readdir(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);

        if (stats.isDirectory()) {
          await walk(itemPath);
        } else {
          if (!extensions || extensions.some(ext => item.toLowerCase().endsWith(ext))) {
            files.push({
              name: item,
              path: itemPath,
              relativePath: path.relative(dirPath, itemPath),
              size: stats.size,
              modified: stats.mtime,
              extension: path.extname(item)
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error walking directory ${dir}:`, error);
    }
  }

  await walk(dirPath);
  return files;
}

// API Endpoints

// Get ObjectsDepot tree structure
app.get('/api/objects-depot', async (req, res) => {
  try {
    const tree = await getDirTree(OBJECTS_DEPOT_PATH, 4);
    res.json({
      success: true,
      data: tree,
      path: OBJECTS_DEPOT_PATH
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Animations list
app.get('/api/animations', async (req, res) => {
  try {
    const files = await getFileList(ANIMATIONS_PATH, ['.anm']);
    res.json({
      success: true,
      data: files,
      count: files.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search assets
app.get('/api/search', async (req, res) => {
  try {
    const query = (req.query.q || '').toLowerCase();
    const type = req.query.type || 'all'; // 'objects', 'animations', 'all'

    let results = [];

    if (type === 'objects' || type === 'all') {
      const objects = await getFileList(OBJECTS_DEPOT_PATH);
      results = results.concat(
        objects
          .filter(f => f.name.toLowerCase().includes(query) || f.relativePath.toLowerCase().includes(query))
          .map(f => ({ ...f, category: 'Object' }))
      );
    }

    if (type === 'animations' || type === 'all') {
      const animations = await getFileList(ANIMATIONS_PATH);
      results = results.concat(
        animations
          .filter(f => f.name.toLowerCase().includes(query) || f.relativePath.toLowerCase().includes(query))
          .map(f => ({ ...f, category: 'Animation' }))
      );
    }

    res.json({
      success: true,
      query,
      results: results.slice(0, 100),
      totalCount: results.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get file info
app.get('/api/file-info', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) {
      return res.status(400).json({ success: false, error: 'Path parameter required' });
    }

    // Security: ensure path is within DATA_PATH
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(DATA_PATH)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const stats = await fs.stat(resolvedPath);
    let preview = null;

    if (stats.isFile() && resolvedPath.endsWith('.xml')) {
      preview = await fs.readFile(resolvedPath, 'utf8');
      preview = preview.substring(0, 500);
    }

    res.json({
      success: true,
      info: {
        name: path.basename(resolvedPath),
        path: resolvedPath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        isDirectory: stats.isDirectory(),
        preview
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get directory contents (for tree expansion)
app.get('/api/dir-contents', async (req, res) => {
  try {
    const dirPath = req.query.path;
    if (!dirPath) {
      return res.status(400).json({ success: false, error: 'Path parameter required' });
    }

    const resolvedPath = path.resolve(dirPath);
    if (!resolvedPath.startsWith(DATA_PATH)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const tree = await getDirTree(resolvedPath, 3);
    res.json({
      success: true,
      path: resolvedPath,
      contents: tree
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const objectsFiles = await getFileList(OBJECTS_DEPOT_PATH);
    const animationFiles = await getFileList(ANIMATIONS_PATH);
    const modelFiles = await getFileList(MODELS_PATH);

    res.json({
      success: true,
      stats: {
        objectsDepot: {
          fileCount: objectsFiles.length,
          totalSize: objectsFiles.reduce((sum, f) => sum + f.size, 0)
        },
        animations: {
          fileCount: animationFiles.length,
          totalSize: animationFiles.reduce((sum, f) => sum + f.size, 0)
        },
        models: {
          fileCount: modelFiles.length,
          totalSize: modelFiles.reduce((sum, f) => sum + f.size, 0)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create directory
app.post('/api/create-folder', async (req, res) => {
  try {
    const { folderPath, name } = req.body;
    const newPath = path.join(folderPath, name);
    
    if (!newPath.startsWith(DATA_PATH)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await fs.ensureDir(newPath);
    res.json({ success: true, message: 'Folder created', path: newPath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete file/folder
app.delete('/api/file', async (req, res) => {
  try {
    const filePath = req.query.path;
    
    if (!filePath.startsWith(DATA_PATH)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await fs.remove(filePath);
    res.json({ success: true, message: 'File/folder deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// WebSocket endpoint for real-time updates (using polling for simplicity)
app.get('/api/watch', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendUpdate = () => {
    res.write(`data: ${JSON.stringify({ status: 'watching' })}\n\n`);
  };

  const interval = setInterval(sendUpdate, 5000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

// Serve file data for 3D viewer (FBX, OBJ, GLTF, etc)
app.get('/api/file-data', (req, res) => {
  try {
    const filePath = req.query.path;
    
    if (!filePath || typeof filePath !== 'string') {
      return res.status(400).json({ error: 'Invalid path parameter' });
    }

    // Security check
    const normalizedPath = path.normalize(filePath);
    const allowedPaths = [OBJECTS_DEPOT_PATH, ANIMATIONS_PATH, MODELS_PATH];
    const isAllowed = allowedPaths.some(allowed => normalizedPath.startsWith(path.normalize(allowed)));

    if (!isAllowed) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check file exists
    if (!fs.existsSync(normalizedPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Serve the file
    res.download(normalizedPath, path.basename(normalizedPath));
  } catch (error) {
    console.error('File data error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎮 Asset Browser Server running at http://localhost:${PORT}`);
  console.log(`📁 Data path: ${DATA_PATH}`);
  console.log(`\n✅ Watching directories for changes...`);
});

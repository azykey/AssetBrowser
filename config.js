/**
 * Asset Browser Configuration
 * Customize paths, ports, and behavior here
 */

module.exports = {
  // Server settings
  server: {
    port: 5000,
    host: 'localhost',
    cors: '*',
    bodyLimit: '50mb'
  },

  // File watching settings
  watcher: {
    enabled: true,
    debounceMs: 2000,
    ignored: /(^|[\/\\])\.|\.tmp$/
  },

  // Data paths
  dataPaths: {
    root: 'C:\\Users\\Administrador\\Desktop\\TANAWANT-THONGPING-STUDIO\\bin\\Data',
    objectsDepot: 'ObjectsDepot',
    animations: 'Animations5',
    models: 'Models'
  },

  // File extensions to show
  fileExtensions: {
    animations: ['.anm'],
    models: ['.model', '.mesh', '.fbx'],
    textures: ['.dds', '.png', '.jpg', '.bmp'],
    audio: ['.wav', '.mp3', '.ogg'],
    data: ['.xml', '.json', '.dat']
  },

  // Tree view settings
  treeView: {
    maxDepth: 4,
    maxItems: 1000,
    sortFolderFirst: true
  },

  // Security
  security: {
    // Only allow operations within data root
    restrictToRoot: true,
    // Maximum file size for preview (bytes)
    maxPreviewSize: 1000000
  },

  // UI Settings
  ui: {
    theme: 'dark',
    updateInterval: 5000, // ms
    itemsPerPage: 50
  },

  // Logging
  logging: {
    enabled: true,
    level: 'info', // 'error', 'warn', 'info', 'debug'
    logFile: './logs/app.log'
  }
};

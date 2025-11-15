/**
 * Asset Browser API Usage Examples
 * Exemplos de como usar a API do Asset Browser
 */

// ============================================
// 1. BUSCAR TODOS OS OBJETOS
// ============================================

async function getAllObjects() {
  const response = await fetch('http://localhost:5000/api/objects-depot');
  const data = await response.json();
  console.log('ObjectsDepot:', data.data);
  return data.data;
}

// ============================================
// 2. BUSCAR TODAS AS ANIMAÇÕES
// ============================================

async function getAllAnimations() {
  const response = await fetch('http://localhost:5000/api/animations');
  const data = await response.json();
  console.log(`Encontradas ${data.count} animações`);
  return data.data;
}

// ============================================
// 3. BUSCAR ASSETS POR NOME
// ============================================

async function searchAssets(query) {
  const params = new URLSearchParams({ q: query, type: 'all' });
  const response = await fetch(`http://localhost:5000/api/search?${params}`);
  const data = await response.json();
  
  console.log(`Buscando: "${query}"`);
  console.log(`Encontrados: ${data.results.length} resultados`);
  
  data.results.forEach(result => {
    console.log(`  - ${result.name} (${result.category})`);
  });
  
  return data.results;
}

// Exemplos:
// searchAssets('weapon')        → Busca todos os arquivos com "weapon"
// searchAssets('character_')    → Busca personagens
// searchAssets('.anm')          → Busca arquivos de animação

// ============================================
// 4. OBTER INFORMAÇÕES DE UM ARQUIVO
// ============================================

async function getFileInfo(filePath) {
  const params = new URLSearchParams({ path: filePath });
  const response = await fetch(`http://localhost:5000/api/file-info?${params}`);
  const data = await response.json();
  
  if (data.success) {
    const info = data.info;
    console.log(`Nome: ${info.name}`);
    console.log(`Tamanho: ${formatBytes(info.size)}`);
    console.log(`Modificado: ${new Date(info.modified).toLocaleString()}`);
  }
  
  return data.info;
}

// ============================================
// 5. OBTER CONTEÚDO DE UMA PASTA
// ============================================

async function getDirContents(dirPath) {
  const params = new URLSearchParams({ path: dirPath });
  const response = await fetch(`http://localhost:5000/api/dir-contents?${params}`);
  const data = await response.json();
  
  console.log(`Pasta: ${data.path}`);
  console.log(`Conteúdo:`);
  
  data.contents.forEach(item => {
    const icon = item.type === 'folder' ? '📁' : '📄';
    console.log(`  ${icon} ${item.name} (${formatBytes(item.size)})`);
  });
  
  return data.contents;
}

// ============================================
// 6. OBTER ESTATÍSTICAS
// ============================================

async function getStats() {
  const response = await fetch('http://localhost:5000/api/stats');
  const data = await response.json();
  
  const stats = data.stats;
  
  console.log('📊 Estatísticas:');
  console.log(`
    ObjectsDepot:
      - Arquivos: ${stats.objectsDepot.fileCount}
      - Tamanho: ${formatBytes(stats.objectsDepot.totalSize)}
    
    Animações:
      - Arquivos: ${stats.animations.fileCount}
      - Tamanho: ${formatBytes(stats.animations.totalSize)}
    
    Modelos:
      - Arquivos: ${stats.models.fileCount}
      - Tamanho: ${formatBytes(stats.models.totalSize)}
  `);
  
  return data.stats;
}

// ============================================
// 7. CRIAR NOVA PASTA
// ============================================

async function createFolder(parentPath, folderName) {
  const response = await fetch('http://localhost:5000/api/create-folder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      folderPath: parentPath,
      name: folderName
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log(`✓ Pasta criada: ${data.path}`);
  } else {
    console.error(`✗ Erro: ${data.error}`);
  }
  
  return data;
}

// ============================================
// 8. DELETAR ARQUIVO OU PASTA
// ============================================

async function deleteFile(filePath) {
  if (!confirm(`Tem certeza que quer deletar?\n${filePath}`)) {
    return false;
  }
  
  const response = await fetch(
    `http://localhost:5000/api/file?path=${encodeURIComponent(filePath)}`,
    { method: 'DELETE' }
  );
  
  const data = await response.json();
  
  if (data.success) {
    console.log(`✓ Deletado: ${filePath}`);
  } else {
    console.error(`✗ Erro: ${data.error}`);
  }
  
  return data.success;
}

// ============================================
// 9. UTILITY: Formatar Bytes
// ============================================

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// ============================================
// 10. EXEMPLO COMPLETO: Sistema de Organização
// ============================================

async function organizarAssets() {
  console.log('🎮 Sistema de Organização de Assets');
  console.log('=====================================\n');
  
  try {
    // 1. Buscar todas as animações
    console.log('1️⃣ Carregando todas as animações...');
    const animations = await getAllAnimations();
    console.log(`   Encontradas: ${animations.length}\n`);
    
    // 2. Buscar objetos
    console.log('2️⃣ Carregando ObjectsDepot...');
    const objects = await getAllObjects();
    console.log(`   Estrutura carregada\n`);
    
    // 3. Buscar por padrão
    console.log('3️⃣ Buscando assets específicos...');
    const weapons = await searchAssets('weapon');
    console.log(`   Encontrados: ${weapons.length} assets\n`);
    
    // 4. Obter estatísticas
    console.log('4️⃣ Verificando estatísticas...');
    const stats = await getStats();
    
    // 5. Criar nova pasta para organização
    console.log('\n5️⃣ Criando pasta de trabalho...');
    const objDepot = 'C:\\Users\\Administrador\\Desktop\\TANAWANT-THONGPING-STUDIO\\bin\\Data\\ObjectsDepot';
    await createFolder(objDepot, 'MyCustomAssets');
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

// ============================================
// 11. MONITORAMENTO EM TEMPO REAL
// ============================================

async function watchForChanges() {
  console.log('👁️ Monitorando mudanças nos assets...');
  
  let lastStats = null;
  
  setInterval(async () => {
    try {
      const stats = await getStats();
      
      if (lastStats) {
        const objDiff = stats.objectsDepot.fileCount - lastStats.objectsDepot.fileCount;
        const animDiff = stats.animations.fileCount - lastStats.animations.fileCount;
        
        if (objDiff !== 0) {
          console.log(`📁 ObjectsDepot: ${objDiff > 0 ? '+' : ''}${objDiff} arquivo(s)`);
        }
        
        if (animDiff !== 0) {
          console.log(`🎬 Animações: ${animDiff > 0 ? '+' : ''}${animDiff} arquivo(s)`);
        }
      }
      
      lastStats = stats;
    } catch (error) {
      console.error('Erro ao verificar mudanças:', error);
    }
  }, 5000); // Verificar a cada 5 segundos
}

// ============================================
// 12. EXECUTAR EXEMPLOS
// ============================================

// Descomente para testar:

/*
getAllObjects().then(console.log);
getAllAnimations().then(console.log);
searchAssets('weapon').then(console.log);
getStats().then(console.log);
watchForChanges();
organizarAssets();
*/

// ============================================
// 13. AXIOS + React EXAMPLE
// ============================================

/*
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000
});

export const assetAPI = {
  getObjects: () => API.get('/objects-depot'),
  getAnimations: () => API.get('/animations'),
  search: (query, type = 'all') => API.get('/search', { 
    params: { q: query, type } 
  }),
  getStats: () => API.get('/stats'),
  createFolder: (parentPath, name) => API.post('/create-folder', {
    folderPath: parentPath,
    name
  }),
  deleteFile: (path) => API.delete('/file', { 
    params: { path } 
  })
};

// Uso em React:
const [assets, setAssets] = useState([]);

useEffect(() => {
  assetAPI.getObjects()
    .then(res => setAssets(res.data.data))
    .catch(err => console.error(err));
}, []);
*/

export {
  getAllObjects,
  getAllAnimations,
  searchAssets,
  getFileInfo,
  getDirContents,
  getStats,
  createFolder,
  deleteFile,
  formatBytes,
  organizarAssets,
  watchForChanges
};

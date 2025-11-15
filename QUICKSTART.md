# Quick Start - Asset Browser

## ⚡ Forma Mais Rápida

### Windows (Batch)
```bash
cd AssetBrowser
start.bat
```

### Windows (PowerShell)
```bash
cd AssetBrowser
.\start.ps1
```

### macOS/Linux
```bash
cd AssetBrowser
npm install
cd client && npm install && cd ..
npm run dev
```

---

## 🎮 Depois de Iniciar

1. **Servidor abrirá em**: http://localhost:5000
2. **Cliente abrirá em**: http://localhost:3000
3. **Aguarde carregamento** (~10-15 segundos na primeira vez)

---

## 📁 Você Verá

- **ObjectsDepot**: Árvore completa com milhares de arquivos
- **Animations**: Lista de ~2000+ arquivos .anm
- **Buscar**: Encontre qualquer asset rapidamente
- **Estatísticas**: Métricas de uso

---

## ⚙️ Parar os Servidores

- Feche ambas as janelas do PowerShell
- Ou pressione `CTRL+C` em cada janela

---

## 🔧 Se Houver Problemas

**Porta 5000 em uso?**
```bash
# Edite server.js, linha 4:
const PORT = 5001; // Mude para porta livre
```

**Erro de permissão?**
- Execute PowerShell como **Administrador**

**Não carrega os assets?**
- Aguarde 10 segundos
- Refreshe a página (F5)
- Verifique se os caminhos em `server.js` estão corretos

---

## 📊 Caracteres

✨ Interface moderna com tema escuro  
🔍 Busca rápida entre todos os arquivos  
📁 Árvore hierárquica de pastas  
🎬 Gerenciar animações e objetos  
⚡ Atualização em tempo real  
📈 Estatísticas visuais  

---

**Enjoy! 🎮**

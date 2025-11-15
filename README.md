# 🎮 Asset Browser - TANAWANT-THONGPING

Um visualizador web em tempo real para gerenciar e organizar seus assets de jogo (ObjectsDepot, Animações, Modelos, etc).

## 🎯 Características

✅ **Visualização em Tempo Real** - Veja mudanças conforme elas acontecem  
✅ **Tree View** - Hierarquia completa do ObjectsDepot  
✅ **Busca Avançada** - Encontre assets rapidamente  
✅ **Gerenciamento de Arquivos** - Crie pastas, delete arquivos  
✅ **Estatísticas** - Veja métricas de seus assets  
✅ **Dark Theme** - Interface moderna e confortável para os olhos  

## 📋 Estrutura de Pastas

```
AssetBrowser/
├── server.js           # Backend Node.js/Express
├── package.json        # Dependências do servidor
├── client/
│   ├── public/
│   │   └── index.html  # HTML principal
│   ├── src/
│   │   ├── App.js      # Componente principal React
│   │   ├── App.css     # Estilos
│   │   ├── index.js    # Entry point
│   │   └── index.css   # Estilos globais
│   └── package.json    # Dependências do cliente
└── README.md           # Este arquivo
```

## 🚀 Instalação e Execução

### 1. Instalar Dependências

```bash
# Terminal 1 - Instalar dependências do servidor
cd AssetBrowser
npm install

# Terminal 2 - Instalar dependências do cliente
cd client
npm install
```

### 2. Iniciar o Servidor

```bash
# No diretório AssetBrowser
npm start
```

Servidor rodará em: `http://localhost:5000`

### 3. Iniciar o Cliente (em outro terminal)

```bash
# No diretório AssetBrowser/client
npm start
```

Cliente rodará em: `http://localhost:3000`

### 4. Usar em Desenvolvimento

```bash
# No diretório AssetBrowser (executa servidor + cliente simultaneamente)
npm run dev
```

## 📁 Dados Monitorados

O servidor monitora automaticamente:

- `C:\Users\Administrador\Desktop\TANAWANT-THONGPING-STUDIO\bin\Data\ObjectsDepot\`
- `C:\Users\Administrador\Desktop\TANAWANT-THONGPING-STUDIO\bin\Data\Animations5\`
- `C:\Users\Administrador\Desktop\TANAWANT-THONGPING-STUDIO\bin\Data\Models\`

Mudanças são detectadas automaticamente e refletidas na interface em tempo real!

## 🎨 Abas Principais

### ObjectsDepot
- Visualização em árvore de todas as pastas e objetos
- Expandir/colapsar pastas
- Ver tamanho de cada arquivo
- Deletar arquivos/pastas
- Criar novas pastas

### Animações
- Lista de todos os arquivos .anm
- Busca rápida
- Metadados (tamanho, data modificação)
- Gerenciamento de arquivos

### Buscar
- Busca global entre ObjectsDepot e Animações
- Resultados em tempo real
- Filtragem por tipo

### Estatísticas
- Total de arquivos por categoria
- Tamanho total ocupado
- Comparação visual

## 🔌 API Endpoints

```
GET  /api/objects-depot        # Retorna árvore de ObjectsDepot
GET  /api/animations           # Lista de animações
GET  /api/search?q=...         # Busca assets
GET  /api/file-info?path=...   # Info de um arquivo
GET  /api/dir-contents?path=.. # Conteúdo de um diretório
GET  /api/stats                # Estatísticas
POST /api/create-folder        # Criar nova pasta
DEL  /api/file?path=...        # Deletar arquivo/pasta
```

## 🔄 Monitoramento em Tempo Real

O servidor usa `chokidar` para monitorar mudanças nos diretórios. Quando arquivos são:
- **Adicionados** - Aparecem automaticamente
- **Modificados** - Metadados são atualizados
- **Deletados** - Desaparecem da lista
- **Movidos** - Reposicionados corretamente

## 🛠️ Stack Tecnológico

**Backend:**
- Node.js + Express
- Chokidar (file watching)
- fs-extra (operações de arquivo)

**Frontend:**
- React 18
- Axios (HTTP client)
- Lucide Icons (ícones)

## 📝 Notas

- A interface atualiza a cada 5 segundos ou quando detecta mudanças
- Operações de arquivo são síncronas para segurança
- Todas as operações são registradas no console
- Confirmação antes de deletar arquivos

## 🚨 Troubleshooting

**Porta 5000 já em uso:**
```bash
# Mude a porta em server.js
const PORT = 5001; // ou outra porta livre
```

**Arquivo não aparece:**
- Aguarde 2-5 segundos para sincronização
- Refreshe a página (F5)
- Reinicie o servidor

**Erro de permissão:**
- Execute como administrador
- Verifique permissões das pastas

## 📞 Suporte

Para problemas ou sugestões, verifique os logs do servidor/cliente!

---

**Feito com ❤️ para TANAWANT-THONGPING Studio**

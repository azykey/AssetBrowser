# 🎬 Visualizador 3D - Asset Browser

## ✨ O que é novo?

O Asset Browser agora possui um **Visualizador 3D integrado** com suporte completo para modelos 3D em tempo real, com:

- 🔄 **Rotação interativa** - Arraste o mouse para rotacionar
- 🔍 **Zoom suave** - Scroll para aproximar/afastar
- 🎨 **Renderização de texturas** - Visualize materiais e texturas
- 🎞️ **Animações** - Reproduza animações esqueletais (FBX)
- ⚡ **Auto-rotação** - Visualização automática dos modelos
- 📊 **Informações em tempo real** - Detalhes do modelo, tamanho e animações

## 🎮 Formatos Suportados

- **FBX** (.fbx) - Modelos com animações esqueletais
- **OBJ** (.obj) - Modelos estáticos com geometria
- **GLTF/GLB** (.gltf, .glb) - Modelos com materiais avançados

## 🚀 Como Usar

### 1. Iniciar o Servidor Backend

```bash
cd AssetBrowser
node server.js
```

O servidor vai rodar em `http://localhost:5000`

### 2. Iniciar o Frontend React

Em outro terminal:

```bash
cd AssetBrowser/client
npm start
```

O aplicativo vai abrir em `http://localhost:3000`

### 3. Visualizar Modelos 3D

1. Navegue até a aba **ObjectsDepot** ou **Animations**
2. Selecione um arquivo de modelo (.fbx, .obj, .gltf, .glb)
3. Clique no botão **👁️ Ver em 3D** (ícone de olho)
4. Uma janela com o visualizador 3D abrirá

## 🎛️ Controles do Visualizador

### Mouse e Teclado

| Ação | Resultado |
|------|-----------|
| **Arrastar com mouse esquerdo** | Rotacionar modelo |
| **Scroll / Roda do mouse** | Zoom in/out |
| **Clique direito + arrastar** | Panorâmica (se habilitado) |

### Botões de Controle

| Botão | Função |
|-------|--------|
| 🔄 **Rotação Automática** | Ativa/desativa rotação contínua |
| ▶️ **Play/Pause** | Reproduz/pausa animações (FBX) |
| 📏 **Escala** | Controla o tamanho do modelo (0.1x a 5x) |
| 🖥️ **Tela Cheia** | Expande para modo fullscreen |
| ✕ **Fechar** | Fecha o visualizador 3D |

## 📋 Interface Principal

### Painel Principal

```
┌─────────────────────────────────────┐
│ 🎮 Asset Browser - TANAWANT-THONGPING │
│ Visualize e gerencie seus assets     │
└─────────────────────────────────────┘
        │
    ┌───┴───┬───┬────┬─────┐
    │ Box   │ Music│Search│Stats │
    └───┬───┴───┴────┴─────┘
        │
    ┌───────────────────────┐
    │ 📦 ObjectsDepot       │
    │ ├─ Pasta1/           │  ◄─ Selecione aqui
    │ ├─ Pasta2/           │
    │ └─ modelo.fbx ────► 👁️ ◄─ Clique no olho
    │                      │
    │ 📋 Detalhes do Arquivo
    │ Nome: modelo.fbx
    │ Tipo: file
    │ Tamanho: 2.5 MB
    │ 
    │ [Ver em 3D] ◄─ Ou clique aqui
    └───────────────────────┘
```

## 💡 Dicas e Truques

### Performance

- Modelos muito grandes podem precisar de tempo para carregar
- A escala é útil para visualizar detalhes de modelos pequenos
- Desative auto-rotação para melhor performance em modelos complexos

### Exploração Visual

1. Use auto-rotação para ter visão 360° do modelo
2. Combine zoom + escala para ver detalhes finos
3. Pause animações para inspecionar poses específicas

### Troubleshooting

| Problema | Solução |
|----------|---------|
| Modelo não carrega | Verifique se o arquivo está em ObjectsDepot |
| Renderização lenta | Reduza a escala, desative auto-rotação |
| Cor errada | Modelos OBJ necessitam arquivo .mtl na mesma pasta |
| Sem animações | Confirme que o FBX possui animações incorporadas |

## 📊 Estrutura de Dados

```
bin/Data/
├── ObjectsDepot/           ◄─ Modelos 3D estáticos
│   ├── Characters/
│   ├── Props/
│   └── Structures/
├── Animations5/            ◄─ Arquivos de animação
│   ├── Character1/
│   └── Character2/
└── Models/                 ◄─ Modelos com rigging
    ├── player.fbx
    └── enemy.fbx
```

## 🔧 Configuração Avançada

### Mudar diretórios monitorados

Edite `AssetBrowser/server.js`:

```javascript
const OBJECTS_DEPOT_PATH = path.join(DATA_PATH, 'ObjectsDepot');
const ANIMATIONS_PATH = path.join(DATA_PATH, 'Animations5');
const MODELS_PATH = path.join(DATA_PATH, 'Models');
```

### Ajustar velocidade de rotação

Em `client/src/Viewer3D.js`:

```javascript
controls.autoRotateSpeed = 4;  // Aumentar para girar mais rápido
```

### Modificar qualidade de renderização

```javascript
renderer.shadowMap.type = THREE.PCFShadowMap;  // Trocar tipo de sombra
```

## 🐛 Debug e Logs

O console do navegador (F12) mostrará:
- Erros de carregamento de modelos
- Avisos sobre texturas ausentes
- Detalhes de performance

O servidor backend mostrará:
- Solicitações de API
- Mudanças detectadas em arquivos
- Erros de acesso ao filesystem

## 📦 Dependências

### Backend
- Node.js 18+
- Express.js
- Chokidar (file watching)
- fs-extra

### Frontend
- React 18
- Three.js r170+
- React Three Fiber
- React Three Drei
- Lucide Icons
- Axios

## 🎯 Roadmap Futuro

- [ ] Exportar visualizações como PNG/JPEG
- [ ] Suporte a múltiplos formatos de animação
- [ ] Editor de ligação de texturas
- [ ] Preview de LOD (Level of Detail)
- [ ] Comparação lado-a-lado de modelos
- [ ] Histórico de visualizações recentes
- [ ] Ferramentas de medição 3D

## ❓ FAQ

**P: Posso arrastar e soltar arquivos?**
A: Não por enquanto, mas é uma feature planejada para versões futuras.

**P: Como exportar screenshot do modelo?**
A: O botão de screenshot será adicionado em breve.

**P: Qual é o tamanho máximo de arquivo?**
A: Sem limite técnico, mas recomendamos < 100MB para performance

**P: Os modelos são salvos?**
A: Não, o visualizador é apenas para preview em tempo real.

## 📞 Suporte

Para issues ou sugestões, verifique:
1. Console do navegador (F12) para erros
2. Logs do servidor backend
3. Confirmação de que os arquivos estão no diretório correto

---

**Versão:** 1.0.0  
**Última atualização:** Novembro 2025  
**Status:** ✅ Totalmente funcional

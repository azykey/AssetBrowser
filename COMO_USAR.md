📖 PASSO A PASSO - Como Usar o Asset Browser
═════════════════════════════════════════════════════════════════════════════

👉 VERSÃO RÁPIDA (3 minutos):

1️⃣ Abra o PowerShell
   └─ Clique direito em AssetBrowser
   └─ "Open PowerShell window here"

2️⃣ Digite o comando:
   └─ .\start.ps1

3️⃣ Aguarde:
   └─ Será feita instalação de dependências (primeira vez)
   └─ Servidores serão iniciados
   └─ Browser abrirá em http://localhost:3000

4️⃣ Pronto! Use normalmente 🎉


═════════════════════════════════════════════════════════════════════════════

👉 VERSÃO DETALHADA (passo a passo):

PARTE 1: PREPARAÇÃO
───────────────────────────────────────────────────────────────────────────

1. Abra o PowerShell:
   ✓ Pesquise "PowerShell" no Windows
   ✓ Clique direito na pasta AssetBrowser
   ✓ "Open PowerShell window here"

   OU

   ✓ Abra PowerShell normal
   ✓ Digite: cd "C:\Users\Administrador\Desktop\TANAWANT-THONGPING-STUDIO\AssetBrowser"

2. Verifique Node.js:
   └─ Digite: node --version
   └─ Resultado esperado: v18.x.x ou superior
   
   Se não aparecer nada:
   └─ Instale Node.js: https://nodejs.org/ (LTS recomendado)
   └─ Reinicie o PowerShell


PARTE 2: INSTALAÇÃO (primeira vez apenas)
───────────────────────────────────────────────────────────────────────────

3. Instale dependências do servidor:
   └─ Digite: npm install
   └─ Aguarde... (vai baixar ~200MB)

4. Instale dependências do cliente:
   └─ Digite: cd client
   └─ Digite: npm install
   └─ Aguarde... (vai baixar ~300MB)

5. Volte para a pasta AssetBrowser:
   └─ Digite: cd ..


PARTE 3: INICIAR OS SERVIDORES
───────────────────────────────────────────────────────────────────────────

6. Inicie o servidor backend (Express):
   └─ Digite: npm start
   └─ Você verá:
      ✓ 🎮 Asset Browser Server running at http://localhost:5000
      ✓ 📁 Data path: C:\...
      ✓ ✅ Watching directories for changes...

   👉 DEIXE ESTE TERMINAL ABERTO!

7. Abra OUTRO PowerShell na pasta AssetBrowser:
   └─ Clique direito novamente em AssetBrowser
   └─ "Open PowerShell window here" (nova janela)

8. Inicie o cliente React:
   └─ Digite: cd client
   └─ Digite: npm start
   └─ Você verá:
      ✓ Compiled successfully!
      ✓ Local: http://localhost:3000
      ✓ On Your Network: ...
   
   Browser abrirá automaticamente em http://localhost:3000

9. Você verá a interface do Asset Browser! 🎉


PARTE 4: USANDO O ASSET BROWSER
───────────────────────────────────────────────────────────────────────────

🔵 ABA "OBJECTSDEPOT":
   • Vê a árvore de todas as pastas e objetos
   • Clique na seta ▶️ para expandir pastas
   • Clique na seta ▼ para colapsar
   • Hover em qualquer item para ver mais info
   • Clique no lixo 🗑️ para deletar
   • "Nova Pasta" cria uma nova pasta

🎬 ABA "ANIMATIONS":
   • Lista completa de ~2000 animações
   • Cada linha mostra: nome, tamanho, data
   • Clique em qualquer uma para ver detalhes
   • Use busca rápida no topo

🔍 ABA "BUSCAR":
   • Digite o nome do que quer procurar
   • Pressione ENTER ou clique BUSCAR
   • Resultados aparecem em tempo real
   • Até 100 resultados simultâneos

📊 ABA "ESTATÍSTICAS":
   • Mostra total de arquivos
   • Tamanho total ocupado
   • Comparação visual entre categorias


PARTE 5: DETALHES DE ARQUIVO
───────────────────────────────────────────────────────────────────────────

Quando você clica em um arquivo:
   ✓ Um painel aparece no canto inferior direito
   ✓ Mostra: Nome, Tipo, Tamanho, Data modificação
   ✓ Para fechar: clique "Fechar"


PARTE 6: PARAR OS SERVIDORES
───────────────────────────────────────────────────────────────────────────

Quando terminar:
   1️⃣ Na janela do navegador: Feche a aba
   2️⃣ No terminal do cliente (React): Pressione CTRL+C
      └─ Confirme: S (sim)
   3️⃣ No terminal do servidor (Express): Pressione CTRL+C
      └─ Confirme: S (sim)


═════════════════════════════════════════════════════════════════════════════

📋 ATALHOS E DICAS:

Navegador:
  F5                  → Recarregar página
  CTRL+F              → Buscar na página
  CTRL+SHIFT+I        → Abrir Developer Tools

PowerShell:
  CTRL+C              → Parar o servidor
  CTRL+L              → Limpar tela
  npm start           → Iniciar
  npm install         → Instalar dependências


═════════════════════════════════════════════════════════════════════════════

⚠️ PROBLEMAS COMUNS:

❌ "node: comando não encontrado"
   └─ Node.js não está instalado ou PATH não está atualizado
   └─ Instale Node.js: https://nodejs.org/
   └─ Reinicie o PowerShell

❌ "EACCES: permission denied"
   └─ Problema de permissões
   └─ Execute PowerShell como Administrador

❌ "Port 5000 is already in use"
   └─ Outra aplicação usa a porta 5000
   └─ Solução 1: Feche outras aplicações
   └─ Solução 2: Edite server.js, mude PORT para 5001

❌ "npm: comando não encontrado"
   └─ Node.js não está no PATH
   └─ Reinstale Node.js

❌ "React não carrega / página em branco"
   └─ Aguarde 30 segundos (primeira carga é lenta)
   └─ Pressione F5 para recarregar
   └─ Verifique console do browser (F12)

❌ "Assets não aparecem"
   └─ Aguarde 15 segundos
   └─ Pressione F5
   └─ Verifique se os caminhos em server.js estão corretos


═════════════════════════════════════════════════════════════════════════════

🎯 MODO DESENVOLVIMENTO (Recarregamento Automático):

Se quiser trabalhar no código e testar mudanças:

1️⃣ No terminal do servidor:
   └─ Pressione CTRL+C
   └─ Digite: npm run server
   └─ Agora recarrega automaticamente ao salvar

2️⃣ No terminal do cliente:
   └─ Pressione CTRL+C
   └─ Digite: npm start
   └─ Agora recarrega automaticamente ao salvar

3️⃣ Faça alterações nos arquivos
   └─ server.js (backend)
   └─ App.js ou App.css (frontend)
   └─ Salve com CTRL+S
   └─ Browser recarrega automaticamente


═════════════════════════════════════════════════════════════════════════════

🚀 MODO SIMPLES (sem recarregamento):

Se quer apenas usar (não desenvolver):

1️⃣ Duplo-clique em start.bat
   └─ Ou execute: .\start.ps1
   └─ Dois PowerShells abrem automaticamente
   └─ Browser abre em ~15 segundos

2️⃣ Use normalmente

3️⃣ Feche as janelas quando terminar


═════════════════════════════════════════════════════════════════════════════

📚 MAIS INFORMAÇÕES:

Leia os documentos:
├─ README.md          → Documentação técnica completa
├─ QUICKSTART.md      → Resumo rápido
├─ API_EXAMPLES.js    → Exemplos de código
├─ STRUCTURE.txt      → Estrutura do projeto
└─ WELCOME.txt        → Introdução visual


═════════════════════════════════════════════════════════════════════════════

😊 Aproveite seu Asset Browser!

Se tiver dúvidas, consulte os documentos acima.

Divirta-se gerenciando seus assets! 🎮

═════════════════════════════════════════════════════════════════════════════

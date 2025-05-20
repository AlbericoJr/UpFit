# UpFit - Seu Aplicativo de Fitness

![UpFit Logo](./mobile/assets/icon.png)

## 📱 Sobre o Projeto

UpFit é um aplicativo móvel desenvolvido para ajudar usuários a alcançarem seus objetivos fitness de forma mais eficiente e organizada. O aplicativo oferece uma interface moderna e intuitiva, permitindo que os usuários gerenciem seus treinos, acompanhem seu progresso e mantenham-se motivados em sua jornada fitness.

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- MongoDB
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/UpFit.git
cd UpFit
```

2. Instale as dependências do servidor:

```bash
cd server
npm install
```

3. Instale as dependências do aplicativo móvel:

```bash
cd ../mobile
npm install
```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `server` baseado no `.env.example`
   - Configure as variáveis necessárias

## 🚀 Executando o Projeto

### Servidor

```bash
cd server
npm run dev
```

### Aplicativo Móvel

```bash
cd mobile
npx expo start
```

Para executar em um dispositivo específico:

- Android: `npx expo start --android`
- iOS: `npx expo start --ios`
- Web: `npx expo start --web`

## 📱 Funcionalidades

- [ ] Autenticação de usuários
- [ ] Perfil personalizado
- [ ] Criação e gerenciamento de treinos
- [ ] Acompanhamento de progresso
- [ ] Estatísticas e métricas
- [ ] Compartilhamento de treinos
- [ ] Notificações e lembretes

## 🎨 Interface do Usuário

### Tema Escuro

O aplicativo utiliza um tema escuro moderno com as seguintes cores principais:

- Fundo: `#09090B`
- Acentos: `#ff830a`

### Ícones e Assets

- Ícone do App: `./assets/icon.png`
- Ícone Adaptativo: `./assets/adaptive-icon.png`
- Splash Screen: `./assets/splash.png`
- Favicon: `./assets/favicon.png`

## 📸 Screenshots e Demos

### Tela Inicial

![Tela Inicial](./docs/screenshots/home.png)
_Tela inicial do aplicativo mostrando o dashboard principal_

### Perfil do Usuário

![Perfil](https://i.postimg.cc/t4bSJRZP/Hand-and-i-Phone-16-Pro.png)
_Tela de perfil do usuário com estatísticas e configurações_

### Criação de Treino

![Criação de Treino](./docs/screenshots/create-workout.png)
_Interface para criação e personalização de treinos_

### Acompanhamento de Progresso

![Progresso](./docs/screenshots/progress.png)
_Gráficos e métricas de acompanhamento de progresso_

### Demonstração em Vídeo

[![Demo Video](https://img.youtube.com/vi/SEU_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID)
_Clique na imagem para ver a demonstração em vídeo do aplicativo_

### Gifs de Funcionalidades

![Login Flow](./docs/gifs/login-flow.gif)
_Fluxo de login e autenticação_

![Workout Creation](./docs/gifs/workout-creation.gif)
_Processo de criação de treino_

## 📦 Estrutura do Projeto

```
UpFit/
├── mobile/           # Aplicativo React Native
│   ├── assets/      # Imagens e recursos
│   ├── src/         # Código fonte
│   └── app.json     # Configuração do Expo
├── server/          # Backend Node.js
│   ├── src/         # Código fonte
│   └── .env         # Variáveis de ambiente
└── README.md        # Este arquivo
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/UpFit](https://github.com/seu-usuario/UpFit)

## 🙏 Agradecimentos

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

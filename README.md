# Reciclo - Página de Boas-Vindas

## 📱 Sobre o Projeto

Página de boas-vindas mobile-first para o aplicativo Reciclo, desenvolvida em React com design responsivo e animações suaves.

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm start
```

O aplicativo será aberto em [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📸 Adicionar Imagens

### Logo Personalizada
1. Substitua o arquivo `/src/assets/logo.png` com sua imagem de logo

### Imagem de Ondas do Footer
1. Substitua o arquivo `/src/assets/Camada_1.png` com a imagem das ondas decorativas do footer

### Imagem de Nuvens (Página Login)
1. Substitua o arquivo `/src/assets/Nuvem.png` com a imagem das nuvens para a tela de login

## 🎨 Características

- **Design Mobile-First**: Totalmente otimizado para dispositivos móveis
- **Fonte Syne**: Utiliza a fonte Syne do Google Fonts
- **Imagem Decorativa**: Ondas personalizadas no footer da página
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Cores Vibrantes**: Paleta de cores em tons de laranja
- **Animações Sofisticadas**: Transições suaves e modernas entre elementos
- **Navegação Fluida**: Transições elegantes entre telas

## 📱 Páginas do Aplicativo

### 1. Página de Boas-Vindas (Welcome)
- Logo e título "Reciclo"
- Botão "Bem Vindo" → navega para Login
- Link "CADASTRO" → navega para Cadastro

### 2. Página de Login
- Formulário com e-mail e senha
- Link "Esqueci a senha"
- Botões de autenticação social (Facebook, Google, Apple)
- Link "Clique aqui!" → navega para Cadastro
- Nuvens animadas no footer

### 3. Página de Cadastro (Register)
- Formulário completo (nome, e-mail, senha, confirmar senha)
- Botão "Criar"
- Botões de autenticação social
- Botão voltar → retorna para Welcome

## ✨ Animações e Transições

### Página de Boas-Vindas
- **Logo**: Entrada com escala, rotação e efeito "breathing" contínuo
- **Título**: Fade-in suave de baixo para cima
- **Botão**: Entrada com bounce e efeitos de hover elevados
- **Seções**: Deslizamento lateral escalonado

### Página de Login
- **Título**: Entrada com bounce
- **Campos**: Animação escalonada da direita
- **Botão**: Bounce com elastic easing
- **Social**: Entrada rotacional individual
- **Nuvens**: Fade-in de baixo para cima

### Página de Cadastro
- **Botão Voltar**: Entrada rotacional sofisticada
- **Título**: Entrada com escala e bounce
- **Campos**: Animação escalonada da direita + efeito shimmer
- **Botão Criar**: Bounce com easing avançado
- **Botões Sociais**: Entrada rotacional individual escalonada
- **Inputs em Foco**: Efeito de pulse sutil

### Transições Entre Telas
- **Slide Horizontal**: Transição suave de 0.6s com easing
- **Fade + Transform**: Combinação de opacidade e movimento
- **Bloqueio de Clique**: Previne transições múltiplas

## 🛠️ Tecnologias Utilizadas

- React com Hooks (useState)
- CSS3 com Keyframes Avançadas
- Google Fonts (Syne)
- Imagens otimizadas
- Cubic-bezier para easings sofisticados

## 📱 Breakpoints de Responsividade

- Mobile: até 480px
- Tablet: 481px - 768px
- Desktop: acima de 768px

## 🎯 Scripts Disponíveis

- `npm start` - Executa o app em modo de desenvolvimento
- `npm build` - Cria a versão de produção
- `npm test` - Executa os testes
- `npm eject` - Ejeta as configurações do Create React App

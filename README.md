# Bolt | Desafio - Next.Js

O projeto **Bolt** é uma aplicação web com o propósito de executar depósitos e transferências.

---

<h2 align="center">Bolt | Desafio</h2>
<h3 align="center">
  <a href="#information_source-visão-geral">Visão Geral</a>&nbsp;|&nbsp;
  <a href="#interrobang-objetivo">Objetivo</a>&nbsp;|&nbsp;
  <a href="#book-documentação">Documentação</a>&nbsp;|&nbsp;
  <a href="#hammer-testes">Testes</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
  <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;|&nbsp;
</h3>

---

</div>

- [**Link do vídeo completo sobre o projeto**]([https://i.imgur.com/5tshQRw.mp4](https://imgur.com/a/PEcB1oe))

---

## :information_source: Visão Geral

O projeto proposto pela **Bolt** foi para a participação do processo seletivo para a vaga de Desenvolvedor(a) Front-end Next.js Pleno. 

Nele, foi desenvolvido uma aplicação web utilizando a lógica de programação com Typescript, a criação das funcionalidades e estrutura para
requisições à API da aplicação, que para isso foi utilizado o Server Actions para buscar todos as operações feitas pelo usuário.


Além disso, para a construção dessa aplicação foi utilizado os seguintes tecnologias:

- HTML;
- React;
- Next.js;
- TailwildCss;
- Javascript;
- Typescript;
- Componentes reutilizáveis;
- React Hooks;
- Server Actions;
- NPM;
- Jest;
- Storybook;
- HeroIcons;
- Docker;
- MySql.

---

- **Página de Login**:

<div align="center" >
   <img src="https://imgur.com/cWvqILN.png" width="420">
   <img src="https://imgur.com/vpVrnQM.png" width=420>
   
</div>


---

- **Página da Dashboard Financeira**:

<div align="center" >
 <img src="https://imgur.com/5244Cdz.png" width=560>
</div>

---

## :interrobang: Objetivo

Esse teste tem como objetivo, desenvolver as funcionalidades de depósito e transferência de saldo,
além de aplicar testes unitários, disponibilizar componentes organizados, HTML semântico e recursos do próprio Next.js para roteamento.


Assim, nesse projeto é possível:
1. Registrar uma conta utilizando nome de usuário, senha e email.
2. Fazer login através do usuário e senha cadastrados.
3. Fazer o depósito para própria conta.
4. Visualizar o saldo sendo atualizado a cada operação.
5. Fazer uma transferência para uma usuário existente através do ID.
6. Validar se há saldo suficiente para fazer a transferência.
7. Reverter operações de depósito e transferência.
8. Se usuário que recebeu a transferência, visualizar o saldo atualizado.
9. Se usuário que enviou a transferência, visualizar o saldo atualizado ou reversão de operação.


---

## :book: Documentação

Para este teste foi utilizado a documentação pelo Storybook para facilitar a visualização dos componentes totalmente separados dos outros e do próprio código, porém mantendo estilos. Além disso é possivel observar todas as propriedades que deverão ser passadas ou não, para aquele componente funcionar.
 
 <div align="center" >
  <img src="https://imgur.com/DFSTMJL.png" width="560">
</div>


---

## :hammer: Testes

Para a confiabilidade das funcionalidades, foram desenvolvidos testes unitários em cada componente. Para isso, foi utilizado o Jest como principal ferramenta de teste. A aplicação foi importante para verificar e prevenir futuros bugs no sistema.

 <div align="center" >
  <img src="https://i.imgur.com/KgkZjhN.png" width="560">
</div>


---

## :seedling: Requisitos Mínimos

- VsCode
- Node.js
- React
- TypeScript
- NPM
- Docker
- MySql


---

## :rocket: Principais Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias


- [React](https://pt-br.reactjs.org/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Next.Js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NPM](https://www.npmjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [HeroIcons](https://heroicons.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [Storybook](https://storybook.js.org/)
- [MySql](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

---

## :package: Como baixar e executar o projeto

- Clonar o projeto:

 ```bash
   git clone https://github.com/guirvilela/test-bolt-front-end
  ```
  
- É necessário a instalação do NPM de acordo com seu sistema operacional, para isso veja como no site do [NPM](https://www.npmjs.com/)
- Instalação das dependências:
  - Execute o comando abaixo dentro da pasta do projeto
  
  ```bash
    npm i
  ```
  
- Execução - Abra a pasta do projeto com alguma IDE(Vscode) ou simplesmente abra o terminal na pasta do projeto e execute o comando abaixo:

  ```bash
     npm run dev
  ```
  
- Documentação:
  - Para acessar a documentação do storybook, execute o seguinte comando dentro do projeto:

  ```bash
  npm run storybook
  ```
  

- Testes: 
  - Para rodar todos os testes da aplicação, execute o seguindo comando dentro do projeto:
  ```bash
      npm run test
  ```

- Configuração Do MySql:
  Para configurar o banco de dados MySQL, execute os seguintes comandos para criar as tabelas necessárias:

 ```bash
  CREATE TABLE operations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  type VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  senderId INT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  balanceAfter DECIMAL(10,2),
  recipientId INT,
  revertId INT,
  recipientName VARCHAR(255)
  );

  CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  balance DECIMAL(10,2) DEFAULT 0.00
  );
  ```

- Docker:
Iniciar o container do Docker: Use o docker-compose up para iniciar o front-end e o back-end no Docker. Certifique-se de ter um docker-compose.yml configurado adequadamente com a integração entre os serviços.
Verificar os containers: Após a execução, você pode verificar os containers com docker ps para garantir que tudo está funcionando corretamente.
---


Quanto as instruções de como rodar o projeto, cheque o tópico exclusivo na sessão <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>. 


---

Desenvolvido por :star2: Guilherme Ribeiro Vilela.

# Bolt | Desafio - React

O projeto **Bolt** é uma aplicação web com o propósito de executar depósitos e transferências.

---

<h2 align="center">Bolt | Desafio</h2>
<h3 align="center">
  <a href="#information_source-visão-geral">Visão Geral</a>&nbsp;|&nbsp;
  <a href="#interrobang-objetivo">Objetivo</a>&nbsp;|&nbsp;
  <a href="#book-documentação">Documentação</a>&nbsp;|&nbsp;
  <a href="#hammer-testes">Testes</a>&nbsp;|&nbsp;
  <a href="#clock1-scrum">Scrum</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
  <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;|&nbsp;
</h3>

---

</div>

- [**Link do vídeo completo sobre o projeto**]([https://i.imgur.com/5tshQRw.mp4](https://imgur.com/a/PEcB1oe))

---

## :information_source: Visão Geral

O projeto proposto pela **Hubert** foi para a participação do processo seletivo para a vaga de Desenvolvedor(a) Front-end Pleno Angular | React. 

Nele, foi desenvolvido uma aplicação web utilizando a lógica de programação com Typescript, a criação das funcionalidades e estrutura para
requisições à API da aplicação, que para isso foi utilizado o Axios para buscar todos os produtos disponíveis do e-comerce.



Além disso,para a construção dessa aplicação foi utilizado os seguintes conceitos:

- HTML;
- React
- Next.js
- TawildCss;
- Javascript
- Typescript;
- Componentes reutilizáveis;
- React Hooks;
- Server Actions;
- NPM;
- Jest;
- Storybook;
- HeroIcons

---

- **Página Inicial e Dashboard**:

<div align="center" >
   <img src="https://imgur.com/PEcB1oe.png" width="220">______
  <img src="https://imgur.com/vpVrnQM.gif" width=220>______
  <img src="https://imgur.com/vL6uCzU.png" width=250>
</div>

---

- **Página de Detalhes do Produto**:

<div align="center" >
  <img src="https://i.imgur.com/V84TDke.png" width="560">
</div>

---

## :interrobang: Objetivo

Esse teste tem como objetivo, desenvolver as funcionalidades de uma tabela de produtos de um e-comerce, além disso, aplicar animações CSS, responsividade
das telas, testes unitários, componentes organizados, HTML semântico e recursos do próprio React.

Assim, nesse projeto é possível:

1. Verificar todos os produtos disponíveis através de uma tabela;
2. Navegar entre os produtos através da paginação;
3. Visualizar animações CSS, como spinner de Loading;
4. Filtrar a tabela pelo nome do produto;
5. Limpar filtro para trazer todos os dados novamente;
6. Navegar entre as as telas com uma animação suave de navegação;
7. Ver detalhadamente as especificações do produto;

---

## :book: Documentação

Para este teste foi utilizado a documentação pelo Storybook para facilitar a visualização dos componentes totalmente separados dos outros e do próprio código, porém mantendo estilos e animações CSS. Além disso é possivel observar todas as propriedades que deverão ser passadas ou não, para aquele componente funcionar.
 
 <div align="center" >
  <img src="https://i.imgur.com/viatlP1.png" width="560">
</div>

---
Segue abaixo o vídeo completo da documentação feita para o teste **Hubert**

[**Link do vídeo completo sobre a documentação do projeto**](https://i.imgur.com/IKMFdFR.mp4)

---

## :hammer: Testes

Para a confiabilidade das funcionalidades, foi desenvolvido testes unitarios em cada componente e página da aplicação, para isso foi utilizado o Jest como principal ferramenta de teste. A aplicação foi importante para verificar e prevenir futuros bugs no sistema.

 <div align="center" >
  <img src="https://i.imgur.com/EelNCxO.png" width="560">
</div>


Segue o link abaixo para verificar os testes feitos com mais detalhes:

[**Link dos testes unitários do projeto**](https://guilherme-vilela.notion.site/Hubert-Testes-Unit-rios-4762a39a583940608f337a5b54a5ec29)

---

## :clock1: Scrum

Para organizar as tarefas mais importantes a serem feitas e determinação do tempo de cada atividade, foi utilizado o Scrum.

<div align="center" >
  <img src="https://i.imgur.com/9tZDjFk.png" width="560">
</div>

---

## :seedling: Requisitos Mínimos

- VsCode
- Node.js
- React
- TypeScript
- Yarn(ou NPM)


---

## :rocket: Principais Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Vite](https://vitejs.dev/)
- [React](https://pt-br.reactjs.org/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://classic.yarnpkg.com/blog/2017/05/12/introducing-yarn/)
- [NodeJS](https://nodejs.org/en/)
- [Styled Components](https://www.styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React-Icons](https://react-icons.github.io/react-icons/)
- [Jest](https://jestjs.io/pt-BR/)
- [Storybook](https://storybook.js.org/)



---

## :package: Como baixar e executar o projeto

- Clonar o projeto:

 ```bash
   git clone https://github.com/guirvilela/Hubert-Test
  ```
  
- É necessário a instalação do yarn de acordo com seu sistema operacional, para isso veja como no site do [Yarn](https://yarnpkg.com/getting-started)
- Instalação das dependências:
  - Execute o comando abaixo dentro da pasta do projeto
  
  ```bash
    yarn
  ```
  
- Execução - Abra a pasta do projeto com alguma IDE(Vscode) ou simplesmente abra o terminal na pasta do projeto e execute o comando abaixo:

  ```bash
     yarn dev
  ```
  
- Documentação:
  - Para acessar a documentação do storybook, execute o seguinte comando dentro do projeto:

  ```bash
      yarn storybook
  ```
  - Caso a documentação não abra corretamente, tente o seguinte comando:
  
  -Windows (PowerShell)
  
  ```bash
      $env:NODE_OPTIONS="--openssl-legacy-provider"
  ```
  -Linux
   ```bash
      export NODE_OPTIONS=--openssl-legacy-provider
  ```
  

- Testes: 
  - Para rodar todos os testes da aplicação, execute o seguindo comando dentro do projeto:
  ```bash
      yarn test
  ```
  
---




Quanto as instruções de como rodar o projeto, fiz um tópico exclusivo na sessão <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>. 


---

Desenvolvido por :star2: Guilherme Ribeiro Vilela.

<h1>Beonk - Caça Livros 📚</h1>

<p> Aplicação feita como desafio técnico para a empresa <a href="https://www.beon.com.br/">Beon</a>.
<p>Aplicação consiste de um mecanismo de buscas de livros, alimentando por uma API usando <a href="https://www.npmjs.com/package/json-server">JSON Server</a>.</p>

<h2>Aplicação feita com:</h2>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>

<img src="https://user-images.githubusercontent.com/85770164/174953932-150211d1-ed60-4671-b454-4dd1b4e15bd4.png"/>

<h2>A aplicação permite:</h2>

<li>Fazer a busca por de livros pelo título, autor ou idioma.</li>
<li>Filtrar livros pelo período (ano).</li>
<li>Listar livros (título, autor, idioma, ano).</li>
<li>Apresentar quantidades de registros encontrados.</li>
<li>Paginar o resultado da busca de 10 em 10 ítens.</li>
<li>Visualizar detalhes do livro, com link para uma página do <a href="https://www.wikipedia.com">Wikipédia</a>.</li>

<h2>Executando a aplicação</h2>

<h3>Pré-requisito</h3>

<p>Instalador de pacotes NPM</p>

<p>A aplicação usa um banco de dados com uma Biblioteca de Fake API, chamada <a href="https://www.npmjs.com/package/json-server">JSON Server</a>. 
Instale-a com o pacote npm com o seguinte comando:</p>

```
npm install -g json-server
```

<sup>Isso instala globalmente em sua máquina se após o uso quiser remover use:

```
npm uninstall -g json-server
```
</sup>

<h3>Rodando o projeto</h3>

<p>Após a instalação acima, clone o repósitorio com:</p>

```
git clone git@github.com:vitovls/beonk.git
```

<p>Instale as dependencias do projeto com:</p>

```
npm install
```

Navegue até a pasta do projeto em seu computador e inicie o Banco de Dados com:

```
npm run start:db
```

<strong>Deixe o terminal rolando, e abra outro para dar continuidade</strong>

<p>Em um novo terminal rode o próximo comando para dar start na aplicação React</p>

```
npm start
```

<p>Com isso o banco de dados estará executando em <a href="http://localhost:4000/books">localhost:4000/books</a> e a aplicação frontend em <a href="http://localhost:3000/">localhost:4000/books</a>

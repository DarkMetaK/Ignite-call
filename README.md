<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Ignite Call</h3>

  <p align="center">
    Aplicação de agendamentos de eventos, integrado ao Google Calendar.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre">Sobre</a>
      <ul>
        <li><a href="#tecnologias">Tecnologias</a></li>
      </ul>
    </li>
    <li>
      <a href="#como-rodar-o-projeto">Como rodar o projeto</a>
    </li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre

<a href="https://darkmetak-ignite-call.vercel.app/">
    <img src="/public/template.jpg" alt="Product Name Screen Shot" width=100%>
</a>

O projeto foi desenvolvido com o framework Next.js, para que fosse possível desenvolver um back-end integrado ao front-end, e dessa forma trabalhar com um sistema de autenticação OAuth, para ter acesso ao Google Calendar do usuário. A estilização foi feita com Stitches, que possui suporte ao SSR, e o banco de dados é manipulado com o ORM Prisma. A aplicação permite a criação de uma conta, e após a configuração da mesma, é disponibilizado um calendário com as informações fornecidas, que pode ser compartilhado para que outras pessoas realizem agendamentos. 

### Tecnologias

[![React][React.js]][React-url]<br>
[![TypeScript][TypeScript.js]][TypeScript-url]<br>
[![Node][Node.js]][Node-url]<br>
[![Prisma][Prisma]][Prisma-url]<br>

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- GETTING STARTED -->
## Como rodar o projeto

É possível acessar a plataforma acessando o link: https://darkmetak-ignite-call.vercel.app/

1 - Crie um aplicativo e adquira as key na [api do Google](https://console.cloud.google.com)

2 - Clone o repositório
```sh
git clone https://github.com/DarkMetaK/Ignite-call.git
```

3 - Instale as dependências
```sh
npm install
```

4 - Crie um arquivo .env na raiz do projeto e defina suas váriaveis de ambiente
```
DATABASE_URL="mysql://user:password@localhost:port/ignitecall"
GOOGLE_CLIENT_ID='YOUR_GOOGLE_CLIENT_ID'
GOOGLE_CLIENT_SECRET='YOUR_GOOGLE_CLIENT_SECRET'
NEXTAUTH_SECRET="SOME_SUPER_SECRET"
```

5 - Crie as tabelas no banco de dados
```sh
npx prisma migrate dev
```

6 - Rode o projeto
```sh
npm run dev
```

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- CONTACT -->
## Contato

Matheus Porto - [LinkedIn](https://www.linkedin.com/in/matheusport0/) - matporto03@gmail.com

Link Repositório: [https://github.com/DarkMetaK/Ignite-call](https://github.com/DarkMetaK/Ignite-call)

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Agradecimentos

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)
* [Stitches](https://github.com/css-modules/css-modules)
* [Day.js](https://day.js.org/)

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.js]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/

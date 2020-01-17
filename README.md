# Sistema de Cadastro de Vagas

Este projeto foi elaborado para servir a uma aplicação onde seja cadastrar e administrar vagas em uma empresa.

### Tecnologias Utilizadas
* Node.js
* Express
* Sequelize
* Bcrypt
* Passport

### Introdução

Para testar a aplicação é necessário primeiramente realizar a instalação das dependências como o comando "yarn install". O projeto foi construido utilizando Yarn.

Após a instação das dependências é necessário preencher o atributo "AuthSecret" do arquivo env_file e depois disto renomeá-lo para ".env", sem as aspas.

O banco de dados utilizado é o PostgreSQL e caso deseje alterar alguma configuração, o arquivo se encontra no seguinte diretório "/src/config/database.js"

Para rodar a aplicação utiliza-se o comando "yarn start". O serviço roda na porta 3333.

As rotas podem ser encontradas no seguinte diretório "/src/routes.js". Todas estão devidamente comentadas com suas funções.


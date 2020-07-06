# Sistema de Cadastro de Vagas - Nave Backend Challenge

Este projeto foi elaborado para servir a uma aplicação onde seja possível cadastrar e administrar vagas de emprego em uma empresa.

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

### Funcionalidades

#### Funções sem necessidade de Login
##### 1. `/signin/candidate`
*  **POST** - Utilizado para realizar o login como Candidato. Retorna um JWT (JSON Web Token).

##### 2. `/signin/admin`
*  **POST** - Utilizado para realizar o login como Administrador. Retorna um JWT (JSON Web Token).

Formato JSON para login:

{
	"email": "admin2@gmail.com",
	"password": "123"
}

##### 3. `/candidates`
*  **POST** - Utilizado para criar um novo Candidato.

##### 4. `/admins`
*  **POST** - Utilizado para criar um novo Aministrador.

Formato JSON para criar usuário:

{
	"name": "Candidato",
	"email": "candidato@gmail.com",
	"phone": "123456",
	"cpf": "001",
	"password": "123"
}

##### 4. `/vacancies`
*  **GET** - Lista todas vagas cadastradas.

#### Funções com necessidade de Login
Para testar funções com login basta adicionar um header com nome "Authorization" e colocar em seu conteúdo a palavra "bearer" seguido de um espaço e o Token gerado pelo Login.
 
##### 1. `/candidates`
*  **PUT** - Um candidato pode editar seu cadastro. O JSON enviado é o mesmo de criação.
*  **DELETE** - Um candidato pode excluir o seu cadastro.

##### 2. `/admins`
*  **PUT** - Um administrador pode editar seu cadastro. O JSON enviado é o mesmo de criação.
*  **DELETE** - Um administrador pode excluir o seu cadastro.
##### `/admins/candidates`
*  **GET** - Lista todos candidatos cadastrados.

##### 3. `/admins/vacancies`
*  **POST** - Um administrador pode criar uma vaga.
*  **GET** - Administrador vê todas as vagas que criou.
##### `/admins/vacancies/:vacancy_id`
*  **PUT** - Um administrador pode editar uma vaga de id vacancy_id.
*  **DELETE** - Um administrador pode excluir uma vaga de id vacancy_id.

Formato JSON para criar uma vaga:

{
	"name": "JavaScript"
}

##### 4. `/candidates/vacancies/:vacancy_id`
*  **POST** - Candidato cadastra sua candidatura na vaga de id vacancy_id.
*  **DELETE** - Candidato exclui sua candidatura na vaga de id vacancy_id.
##### `/candidacies`
*  **GET** - Lista de candidaturas do candidato logado.

##### 5. `/admins/comment/:candidacy_id`
*  **POST** - Admin cadastra um comentário na candidatura de id candidacy_id.
##### `/admins/comment/:comment_id`
*  **PUT** - Admin edita um comentário de id candidacy_id. O JSON enviado é o mesmo de criação.
*  **DELETE** - Admin exclui um comentário de id candidacy_id.
##### `/admins/comments`
* **GET** - Admin lista seus comentários em candidaturas

Formato JSON para criar um comentário:

{
	"comment": "Candidato muito pró-ativo"
}

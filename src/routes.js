const express = require('express');

const CandidateController = require('./controllers/CandidateController')
const AdminController = require('./controllers/AdminController')
const VacancyController = require('./controllers/VacancyController')
const CandidacyController = require('./controllers/CandidacyController')
const CommentController = require('./controllers/CommentController')

const Auth = require('./auth');
const Passport = require('./config/passport')

const routes = express.Router();

//Rotas para ações de Signin
routes.post('/signin/candidate', Auth.signinCandidate); //Realiza login como candidato
routes.post('/signin/admin', Auth.signinAdmin); //Realiza login como administrador
routes.post('/validateToken', Auth.validateToken) //Valida Token

//Rotas para ações de Candidato
routes.post('/candidates', CandidateController.store); //Cadastra candidato
routes.put('/candidates', Passport.authenticateCandidate(), CandidateController.update); //Edita seu cadastro
routes.delete('/candidates', Passport.authenticateCandidate(), CandidateController.delete); //Apaga seu cadastro

//Rotas para ações de Administrador
routes.post('/admins', AdminController.store); //Cadastra Administrador
routes.put('/admins', Passport.authenticateAdmin(), AdminController.update); //Edita cadastro
routes.delete('/admins', Passport.authenticateAdmin(), AdminController.delete); //Apaga cadastro
routes.get('/admins/candidates', Passport.authenticateAdmin(), AdminController.indexCandidates); //Lista Candidatos

//Rotas para ações de Vagas
routes.post('/admins/vacancies', Passport.authenticateAdmin(), VacancyController.store) //Admin cadastra vaga
routes.put('/admins/vacancies/:vacancy_id', Passport.authenticateAdmin(), VacancyController.update) //Admin edita vaga
routes.delete('/admins/vacancies/:vacancy_id', Passport.authenticateAdmin(), VacancyController.delete) //Admin deleta vaga
routes.get('/admins/vacancies', Passport.authenticateAdmin(), VacancyController.indexAdmin) //Admin vê as vagas criadas por si
routes.get('/vacancies', VacancyController.index) //Vagas disponíveis

//Rotas para candidatura
routes.post('/candidates/vacancies/:vacancy_id', Passport.authenticateCandidate(), CandidacyController.store); //Candidato cadastra candidatura
routes.delete('/candidates/vacancies/:vacancy_id', Passport.authenticateCandidate(), CandidacyController.delete); //Candidato deleta candidatura
routes.get('/candidacies', Passport.authenticateCandidate(), CandidacyController.index); //Lista as candidaturas do candidato logado

//Rotas para comentários
routes.post('/admins/comment/:candidacy_id', Passport.authenticateAdmin(), CommentController.store) //Admin cadastra comentário
routes.put('/admins/comment/:comment_id', Passport.authenticateAdmin(), CommentController.update) //Admin edita comentário
routes.delete('/admins/comment/:comment_id', Passport.authenticateAdmin(), CommentController.delete) //Admin apaga comentário
routes.get('/admins/comments', Passport.authenticateCandidate(), CommentController.index); //Admin lista seus comentários

module.exports = routes;

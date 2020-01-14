const express = require('express');

const CandidateController = require('./controllers/CandidateController')
const AdminController = require('./controllers/AdminController')
const VacancyController = require('./controllers/VacancyController')
const Auth = require('./auth');
const Passport = require('./config/passport')

const routes = express.Router();

//Rotas para ações de Signin
//routes.post('/signup/candidate', CandidateController.store);
//routes.post('/signup/admin', AdminController.store);
routes.post('/signin/candidate', Auth.signinCandidate);
routes.post('/signin/admin', Auth.signinAdmin);
routes.post('/validateToken', Auth.validateToken)

//Rotas para ações de Vagas

//Rotas para ações de Candidato

routes.post('/candidates', CandidateController.store);
routes.put('/candidates', Passport.authenticateCandidate(), CandidateController.update);
routes.delete('/candidates', Passport.authenticateCandidate(), CandidateController.delete);

//Rotas para ações de Administrador
routes.post('/admins', AdminController.store);
routes.put('/admins', Passport.authenticateAdmin(), AdminController.update);
routes.delete('/admins', Passport.authenticateAdmin(), AdminController.delete);
routes.get('/admins/candidates', Passport.authenticateAdmin(), AdminController.indexCandidates);

//Rotas para ações de Vagas
routes.post('/admins/vacancies', Passport.authenticateAdmin(), VacancyController.store)
routes.delete('/admins/vacancies/:vacancy_id', Passport.authenticateAdmin(), VacancyController.delete)
routes.put('/admins/vacancies/:vacancy_id', Passport.authenticateAdmin(), VacancyController.update)
routes.get('/admins/vacancies', Passport.authenticateAdmin(), VacancyController.index)

module.exports = routes;

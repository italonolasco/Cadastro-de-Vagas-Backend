const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');
const Vacancy = require('../models/Vacancy');
const Candidacy = require('../models/Candidacy');
const Comment = require('../models/Comment');

const connection = new Sequelize(dbConfig);

Candidate.init(connection)
Admin.init(connection)
Vacancy.init(connection)
Candidacy.init(connection)
Comment.init(connection)

Candidate.associate(connection.models)
Admin.associate(connection.models)
Vacancy.associate(connection.models)
Candidacy.associate(connection.models)
Comment.associate(connection.models)

module.exports = connection;
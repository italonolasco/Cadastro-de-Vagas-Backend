const bcrypt = require('bcrypt-nodejs');
const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');

module.exports = {  
    async indexCandidates(req, res) {
        const { cpf } = req.user;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });    
        }
        
        const candidates = await Candidate.findAll();
        
        return res.json(candidates)
    },
    
    async store(req, res) {
        const { name, email, phone, cpf } = req.body;
        let { password } = req.body;

        const salt = bcrypt.genSaltSync(10);

        password = bcrypt.hashSync(password, salt);

        let admin = await Admin.findOne({ where: {cpf} });

        if(admin) {
            return res.json(admin)
        }

        admin = await Admin.create({ name, email, phone, cpf, password });

        return res.json(admin);
    },

    async delete(req, res) {
        const { cpf } = req.user;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        await admin.destroy();

        return res.json()
    },

    async update(req, res) {
        const cpf_login = req.user.cpf;
        const { name, email, phone, cpf } = req.body;
        let { password } = req.body;

        const admin = await Admin.findOne({ where: {cpf: cpf_login} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const salt = bcrypt.genSaltSync(10);

        password = bcrypt.hashSync(password, salt);

        await admin.update({name: name, email: email, phone: phone, cpf: cpf, password: password});

        return res.json(admin)
    }
} 
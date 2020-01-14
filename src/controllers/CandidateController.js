const bcrypt = require('bcrypt-nodejs');
const Candidate = require('../models/Candidate');

module.exports = {
    async store(req, res) {
        const { name, email, phone, cpf} = req.body;
        let { password } = req.body;

        const salt = bcrypt.genSaltSync(10);

        password = bcrypt.hashSync(password, salt);

        let candidate = await Candidate.findOne({ where: {cpf} });

        if(candidate) {
            return res.json(candidate)
        }

        candidate = await Candidate.create({ name, email, phone, cpf, password });

        return res.json(candidate);
    },

    async delete(req, res) {
        const { cpf } = req.user;

        const candidate = await Candidate.findOne({ where: {cpf} });

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        await candidate.destroy();

        return res.json()
    },

    async update(req, res) {
        const cpf_login = req.user.cpf;
        const { name, email, phone, cpf } = req.body;

        const candidate = await Candidate.findOne({ where: {cpf: cpf_login} });;

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        await candidate.update({name: name, email: email, phone: phone, cpf: cpf});

        return res.json(candidate)
    }
} 
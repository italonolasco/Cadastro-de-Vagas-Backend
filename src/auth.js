const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const Candidate = require('./models/Candidate');
const Admin = require('./models/Admin');

module.exports = {
     async signinCandidate(req, res) {
        const { email, password} = req.body;

        const candidate = await Candidate.findOne({
            where: { email: email }
        })

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        const isMatch = bcrypt.compareSync(password, candidate.password);

        if(!isMatch) {
            return res.json(401).send({ error: 'Invalid Password' });
        }

        const dateNow = Math.floor(Date.now / 1000)

        const payload = {
            id: candidate.id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            cpf: candidate.cpf,
            issuedAt: dateNow,
            expired: dateNow + (60 * 60 * 24 * 3) //Data de validade = 3 dias. 
        }
        
        res.json({
            payload,
            token: jwt.encode(payload, authSecret)
        })
     },

     async signinAdmin(req, res) {
        const { email, password} = req.body;

        const admin = await Admin.findOne({
            where: { email: email }
        })

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const isMatch = bcrypt.compareSync(password, admin.password);

        if(!isMatch) {
            return res.json(401).send({ error: 'Invalid Password' });
        }

        const dateNow = Math.floor(Date.now() / 1000)

        const payload = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            cpf: admin.cpf,
            issuedAt: dateNow,
            expired: dateNow + (60 * 60 * 24 * 3) //Data de validade = 3 dias. 
        }
        
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
     },

     async validateToken(req, res) {
        const userData = req.body;

        if(userData) {
            const token = jwt.decode(userData.token, authSecret);
            
            if(new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }

        res.send(false)
     }
}
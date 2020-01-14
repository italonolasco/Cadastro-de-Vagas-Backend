const Vacancy = require('../models/Vacancy');
const Admin = require('../models/Admin');

module.exports = {
    async index(req, res) {
        const vacancies = await Vacancy.findAll()

        return res.json(vacancies)
    },
    
    async indexAdmin(req, res) {
        const { id } = req.user;

        const admin = await Admin.findByPk(id, {
            include: { association: 'vacancies' }
        })

        return res.json(admin.vacancies)
    },
    
    async store(req, res) {
        const { id, cpf } = req.user;
        const { name } = req.body;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const [ vacancy ] = await Vacancy.findOrCreate({
            where: { name },
            defaults: { admin_id: id }
        });

        return res.json(vacancy)
    },

    async delete(req, res) {
        const { id, cpf } = req.user;
        const { vacancy_id } = req.params;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const vacancy = await Vacancy.findOne({
            where: { id: vacancy_id, admin_id: id }
        });

        if(vacancy) {
            await vacancy.destroy();
        }

        return res.json()
    },

    async update(req, res) {
        const { id, cpf } = req.user;
        const { vacancy_id } = req.params;
        const { name } = req.body;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const vacancy = await Vacancy.findOne({
            where: { id: vacancy_id, admin_id: id }
        });

        if(vacancy) {
            await vacancy.update({ name: name });
        }

        return res.json(vacancy)
    }
}
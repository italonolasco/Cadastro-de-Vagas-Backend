const Candidate = require('../models/Candidate');
const Vacancy = require('../models/Vacancy');

module.exports = {
    async index(req, res) {
        const { cpf } = req.user;
        
        const candidate = await Candidate.findOne({ where: {cpf} });

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

         return res.json(await candidate.getVacancies())
    },

    async store(req, res) {
        const { cpf } = req.user;
        const { vacancy_id } = req.params;

        const candidate = await Candidate.findOne({ where: {cpf} });

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        const vacancy = await Vacancy.findOne({
            where: { id: vacancy_id }
        });

        if(!vacancy) {
            return res.status(400).json({ error: 'Vacancy not found' }); 
        }
        
        await candidate.addVacancy(vacancy)

        return res.json(vacancy)
    },

    async delete(req, res) {
        const { cpf } = req.user;
        const { vacancy_id } = req.params;

        const candidate = await Candidate.findOne({ where: {cpf} });

        if(!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        const vacancy = await Vacancy.findOne({
            where: { id: vacancy_id }
        });

        if(!vacancy) {
            return res.status(400).json({ error: 'Vacancy not found' }); 
        }

        await candidate.removeVacancy(vacancy);

        return res.json()
    }
}
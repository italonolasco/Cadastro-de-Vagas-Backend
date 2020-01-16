const Admin = require('../models/Admin');
const Candidacy = require('../models/Candidacy');
const Comment = require('../models/Comment');

module.exports = {
    async store(req, res) {
        const { cpf } = req.user;
        const { candidacy_id } = req.params;
        const { comment } = req.body;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Candidate not found' });
        }

        const candidacy = await Candidacy.findOne({
            where: { id: candidacy_id }
        });

        if(!candidacy) {
            return res.status(400).json({ error: 'Vacancy not found' }); 
        }
        
        const commentAdd = await Comment.create({ admin_id: admin.id, candidacy_id, comment})

        return res.json(commentAdd)
    },
}
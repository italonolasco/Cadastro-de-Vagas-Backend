const Admin = require('../models/Admin');
const Candidacy = require('../models/Candidacy');
const Comment = require('../models/Comment');

module.exports = {
    async index(req, res) {
        const { cpf } = req.user;
        
        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

         return res.json(await admin.getCandidacies())
    },
    
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

    async delete(req, res) {
        const { id, cpf } = req.user;
        const { comment_id } = req.params;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const comment = await Comment.findOne({
            where: { id: comment_id, admin_id: id }
        });

        if(!comment) {
            return res.status(400).json({ error: 'Comment not found' }); 
        }
        
        await admin.removeCandidacy(comment.candidacy_id);

        return res.json()
    },

    async update(req, res) {
        const { id, cpf } = req.user;
        const { comment_id } = req.params;
        const { new_comment } = req.body;

        const admin = await Admin.findOne({ where: {cpf} });

        if(!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const comment = await Comment.findOne({
            where: { id: comment_id, admin_id: id }
        });

        if(!comment) {
            return res.status(400).json({ error: 'Comment not found' }); 
        }

        await comment.update({ comment: new_comment });

        return res.json(comment)
    }
}
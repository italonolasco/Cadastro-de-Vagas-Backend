const { Model, DataTypes } = require('sequelize');

class Candidacy extends Model {
    static init(sequelize) {
        super.init({
            candidate_id: DataTypes.INTEGER,
            vacancy_id: DataTypes.INTEGER,
        },
        {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Candidate, { foreignKey: 'candidate_id', as: 'candidate' });
        this.belongsTo(models.Vacancy, { foreignKey: 'vacancy_id', as: 'vacancy' });
        this.belongsToMany(models.Admin, { foreignKey: 'candidacy_id', through: 'comments', as: 'admins' })
    }
}

module.exports = Candidacy;
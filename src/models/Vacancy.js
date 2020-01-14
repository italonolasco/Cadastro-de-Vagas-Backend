const { Model, DataTypes } = require('sequelize');

class Vacancy extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        },
        {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'creator' });
        this.belongsToMany(models.Candidate, { foreignKey: 'vacancy_id', through: 'candidacies', as: 'candidates' })
    }
}

module.exports = Vacancy;
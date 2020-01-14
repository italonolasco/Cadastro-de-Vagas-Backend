const { Model, DataTypes } = require('sequelize');

class Candidate extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            cpf: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Vacancy, { foreignKey: 'candidate_id', through: 'candidacies', as: 'vacancies' })
    }
}

module.exports = Candidate;
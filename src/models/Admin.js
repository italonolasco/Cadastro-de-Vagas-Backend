const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
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
        this.hasMany(models.Vacancy, { foreignKey: 'admin_id', as : 'vacancies'});
        this.belongsToMany(models.Candidacy, { foreignKey: 'admin_id', through: 'comments', as: 'candidacies' })
    }
}

module.exports = Admin;
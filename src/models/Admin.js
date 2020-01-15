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
    }
}

module.exports = Admin;
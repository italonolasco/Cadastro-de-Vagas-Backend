const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
    static init(sequelize) {
        super.init({
            candidacy_id: DataTypes.INTEGER,
            admin_id: DataTypes.INTEGER,
            comment: DataTypes.STRING,
        },
        {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'creator' });
        this.belongsTo(models.Candidacy, { foreignKey: 'candidacy_id', as: 'candidacy' });
    }
}

module.exports = Comment;
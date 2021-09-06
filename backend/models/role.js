module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: {
                args: false
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        }     
    }, {});
    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
        });
    };
    return Role;
};
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: {
                args: false
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: {
                args: false
            },
            references: {
                model: 'Role',
                key: 'id',
                as: 'role_id',
            }
        },
        contact_id: {
            type: Sequelize.INTEGER,
            allowNull: {
                args: false
            },
            references: {
                model: 'Contact',
                key: 'id',
                as: 'contact_id',
            }
        }        
    },{
        timestamps: false
    });
    User.associate = (models) => {
        User.hasMany(models.SeenMovie, {
            foreignKey: 'user_id',
        });
        User.belongsTo(models.Role, {
            foreignKey: 'role_id'
        });
        User.belongsTo(models.Contact, {
            foreignKey: 'contact_id'
        });
    };
    return User;
};
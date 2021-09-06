module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define('contact', {
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
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        birthdate: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        address_id: {
            type: Sequelize.INTEGER,
            allowNull: {
                args: false
            },
            references: {
                model: 'Address',
                key: 'id',
                as: 'address_id',
            }
        }     
    }, {});
    Contact.associate = (models) => {
        Contact.hasOne(models.User, {
            foreignKey: 'contact_id',
        });
        Contact.belongsTo(models.Address, {
            foreignKey: 'address_id'
        });
    };
    return Contact;
};
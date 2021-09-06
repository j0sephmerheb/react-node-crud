module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('address', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: {
                args: false
            }
        },
        country: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        area: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        city: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        street: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: {
                args: false
            }
        }     
    }, {});
    Address.associate = (models) => {
        Address.hasOne(models.Contact, {
            foreignKey: 'address_id',
        });
    };
    return Address;
};
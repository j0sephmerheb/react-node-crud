module.exports = (sequelize, Sequelize) => {
    const SeenMovie = sequelize.define('seenMovie', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: {
                args: false
            },
            references: {
                model: 'User',
                key: 'id',
                as: 'user_id',
            }
        },
        movie_id: {
            type: Sequelize.INTEGER,
            allowNull: {
                args: false
            },
            references: {
                model: 'Movie',
                key: 'id',
                as: 'movie_id',
            }
        },
        date: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        }
    }, {});
    SeenMovie.associate = (models) => {
        SeenMovie.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE'
        });
        SeenMovie.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };
    return SeenMovie;
};
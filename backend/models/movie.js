module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('movie', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: {
                args: false
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        date_added: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        release_date: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        category: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        movie_director: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        poster: {
            type: Sequelize.STRING,
            allowNull: {
                args: false
            }
        },
        rating_avg: {
            type: Sequelize.NUMERIC,
            allowNull: {
                args: false
            }
        }
    },{
        timestamps: false
    });
    Movie.associate = (models) => {
        Movie.hasMany(models.SeenMovie, {
            foreignKey: 'movie_id',
        });
    };
    return Movie;
};
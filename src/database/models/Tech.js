const Sequelize = require("sequelize")

module.exports = Tech = (db, locale) => {
    var tech = db.define(
        "techs", 
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },
    
            name: {
                type: Sequelize.STRING,
            },

            image: {
                type: Sequelize.STRING,
            },

            createdAt: {
                type: Sequelize.DataTypes.DATE,
            },

            updatedAt: {
                type: Sequelize.DataTypes.DATE,
            }
        }, 
        {
            timestamps: false
        }
    )
    /*
    tech.associate = function(models) {
        tech.belongsToMany(models.Service, {through: models.TechUsed, foreignKey: 'techId', as: 'servicez'})
    }*/
    return tech
}
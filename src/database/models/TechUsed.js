const Sequelize = require("sequelize")

module.exports = TechUsed = (db, locale) => {
    var techused = db.define(
        "techused", 
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },
    
            priority: {
                type: Sequelize.INTEGER,
            },

            techId: {
                type: Sequelize.INTEGER,
                field: "tech_id",
                references: {// Tech hasMany Services n:n
                  model: 'Tech',
                  key: 'id'
                }
            },

            serviceId: {
                type: Sequelize.INTEGER,
                field: "service_id",
                references: {// Tech hasMany Services n:n
                  model: 'Service',
                  key: 'id'
                }
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
    techused.associate = function(models) {
        techused.belongsTo(models.Service, {foreignKey: 'serviceId'})
        techused.belongsTo(models.Tech, {foreignKey: 'techId'})
    }*/
    return techused
}
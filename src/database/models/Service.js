const Sequelize = require("sequelize")
const { getLocaleColName } = require("..")

module.exports = Service = (db, locale) => {
    var service = db.define(
        "services", 
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

            active: {
                type: Sequelize.BOOLEAN
            },

            image: {
                type: Sequelize.STRING,
            },
    
            title: {
                type: Sequelize.STRING,
                field: getLocaleColName("title", locale)
            },
    
            subtitle: {
                type: Sequelize.STRING,
                field: getLocaleColName("subtitle", locale)
            },
    
            desc: {
                type: Sequelize.STRING,
                field: getLocaleColName("desc", locale)
            },
    
            buttonText: {
                type: Sequelize.STRING,
                field: getLocaleColName("button_text", locale)
            },

            buttonId: {
                type: Sequelize.STRING,
                field: "button_id"
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
    service.associate = models => {
        service.belongsToMany(models.Tech, {through: models.TechUsed, foreignKey: 'serviceId', as: 'techz'})
    }*/
    return service
}
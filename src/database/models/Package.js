const Sequelize = require("sequelize")
const { getLocaleColName } = require("..")

//https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554
module.exports = Project = (db, locale) => {
    var package = db.define(
        "packages", 
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
    
            price: {
                type: Sequelize.INTEGER
            },

            image: {
                type: Sequelize.STRING,
            },
    
            name: {
                type: Sequelize.STRING,
                field: getLocaleColName("name", locale)
            },
    
            desc: {
                type: Sequelize.STRING,
                field: getLocaleColName("desc", locale)
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
    package.associate = models => {
        package.belongsToMany(models.Feature, {through: models.PackageFeature, foreignKey: 'packageId', as: 'features'})
    }
    package.associate = models => {
        package.belongsToMany(models.Project, {through: models.PackageProject, foreignKey: 'packageId', as: 'projects'})
    }*/
    return package
}
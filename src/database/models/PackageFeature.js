const Sequelize = require("sequelize")

module.exports = PackageFeature = (db, locale) => {
    var packagesFeatures = db.define(
        "packages_features", 
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
    
            enabled: {
                type: Sequelize.BOOLEAN,
            },

            packageId: {
                type: Sequelize.INTEGER,
                field: "package_id",
                references: {// Package hasMany Feature n:n
                  model: 'Package',
                  key: 'id'
                }
            },

            featureId: {
                type: Sequelize.INTEGER,
                field: "feature_id",
                references: {// Feature hasMany Package n:n
                  model: 'Feature',
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
    packagesFeatures.associate = function(models) {
        packagesFeatures.belongsTo(models.Package, {foreignKey: 'packageId'})
        packagesFeatures.belongsTo(models.Feature, {foreignKey: 'featureId'})
    }*/
    return packagesFeatures
}
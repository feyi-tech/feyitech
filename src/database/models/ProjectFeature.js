const Sequelize = require("sequelize")

module.exports = ProjectFeature = (db, locale) => {
    var projectsFeatures = db.define(
        "projects_features", 
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

            projectId: {
                type: Sequelize.INTEGER,
                field: "project_id",
                references: {// Project hasMany Feature n:n
                  model: 'Project',
                  key: 'id'
                }
            },

            featureId: {
                type: Sequelize.INTEGER,
                field: "feature_id",
                references: {// Feature hasMany Project n:n
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
    projectsFeatures.associate = function(models) {
        projectsFeatures.belongsTo(models.Project, {foreignKey: 'projectId'})
        projectsFeatures.belongsTo(models.Feature, {foreignKey: 'featureId'})
    }*/
    return projectsFeatures
}
const Sequelize = require("sequelize")

module.exports = PackageProject = (db, locale) => {
    var packagesProjects = db.define(
        "packages_projects", 
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

            packageId: {
                type: Sequelize.INTEGER,
                field: "package_id",
                references: {// Package hasMany Project n:n
                  model: 'Package',
                  key: 'id'
                }
            },

            projectId: {
                type: Sequelize.INTEGER,
                field: "project_id",
                references: {// Project hasMany Package n:n
                  model: 'Project',
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
    packagesProjects.associate = function(models) {
        packagesProjects.belongsTo(models.Package, {foreignKey: 'packageId'})
        packagesProjects.belongsTo(models.Project, {foreignKey: 'projectId'})
    }*/
    return packagesProjects
}
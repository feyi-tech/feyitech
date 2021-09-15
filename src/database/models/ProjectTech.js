const Sequelize = require("sequelize")

module.exports = ProjectTech = (db, locale) => {
    var projectsTechs = db.define(
        "projects_techs", 
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
                references: {// Project hasMany Tech n:n
                  model: 'Project',
                  key: 'id'
                }
            },

            techId: {
                type: Sequelize.INTEGER,
                field: "tech_id",
                references: {// Tech hasMany Project n:n
                  model: 'Tech',
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
    projectsTechs.associate = function(models) {
        projectsTechs.belongsTo(models.Project, {foreignKey: 'projectId'})
        projectsTechs.belongsTo(models.Tech, {foreignKey: 'techId'})
    }*/
    return projectsTechs
}
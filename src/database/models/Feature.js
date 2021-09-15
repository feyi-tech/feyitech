const Sequelize = require("sequelize")
const { getLocaleColName } = require("..")

module.exports = Tech = (db, locale) => {
    var feature = db.define(
        "features", 
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: "id"
            },

            image: {
                type: Sequelize.STRING,
            },
    
            title: {
                type: Sequelize.STRING,
                field: getLocaleColName("title", locale)
            },
    
            desc: {
                type: Sequelize.STRING,
                field: getLocaleColName("desc", locale)
            },
            youtubeVideoId: {
                type: Sequelize.STRING,
                field: "youtube_video_id"
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
    feature.associate = function(models) {
        feature.belongsToMany(models.Project, {through: models.ProjectFeature, foreignKey: 'featureId', as: 'projects'})
    }
    feature.associate = function(models) {
        feature.belongsToMany(models.Package, {through: models.PackageFeature, foreignKey: 'featureId', as: 'features'})
    }*/
    return feature
}
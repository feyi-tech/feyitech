const Sequelize = require("sequelize")
const { getLocaleColName } = require("..")

//https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554
module.exports = Project = (db, locale) => {
    var project = db.define(
        "projects", 
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

            countryId: {
                type: Sequelize.INTEGER,
                field: "country_id"
            },

            stateId: {
                type: Sequelize.INTEGER,
                field: "state_id"
            },

            cityId: {
                type: Sequelize.INTEGER,
                field: "city_id"
            },

            lightBgLogo: {
                type: Sequelize.STRING,
                field: "light-bg-logo"
            },

            darkBgLogo: {
                type: Sequelize.STRING,
                field: "dark-bg-logo"
            },

            screenshot: {
                type: Sequelize.STRING,
            },

            screenshotFull: {
                type: Sequelize.STRING,
                field: "screenshot-full"
            },

            screenshotMobile: {
                type: Sequelize.STRING,
                field: "screenshot-mobile"
            },
    
            link: {
                type: Sequelize.STRING
            },
    
            name: {
                type: Sequelize.STRING
            },
    
            latestVersion: {
                type: Sequelize.STRING,
                field: "latest-version"
            },
    
            costPrice: {
                type: Sequelize.INTEGER,
                field: "cost_price"
            },
    
            sellingPrice: {
                type: Sequelize.INTEGER,
                field: "selling_price"
            },
    
            title: {
                type: Sequelize.STRING,
                field: getLocaleColName("title", locale)
            },
    
            desc: {
                type: Sequelize.STRING,
                field: getLocaleColName("desc", locale)
            },
    
            feedback: {
                type: Sequelize.STRING,
                field: getLocaleColName("feedback", locale)
            },
    
            feedbackAuthor: {
                type: Sequelize.STRING,
                field: "feedback_author"
            },
    
            feedbackAuthorPhoto: {
                type: Sequelize.STRING,
                field: "feedback_author_photo"
            },

            forSale: {
                type: Sequelize.BOOLEAN,
                field: "for_sale"
            },

            listedAt: {
                type: Sequelize.DataTypes.DATE,
                field: 'listed_at'
            },

            completedAt: {
                type: Sequelize.DataTypes.DATE,
                field: 'completed_at'
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
    project.associate = models => {
        project.belongsToMany(models.Feature, {through: models.ProjectFeature, foreignKey: 'projectId', as: 'features'})
    }*/
    return project
}
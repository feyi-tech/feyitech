const Sequelize = require("sequelize")
const { getLocaleColName } = require("..")

module.exports = WorkProcess = (db, locale) => {
    var work_process = db.define(
        "work_processes", 
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
    
    return work_process
}
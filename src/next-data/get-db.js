const Sequelize = require("sequelize");

module.exports = getDb = (credentials, options) => {
    options = options || {}
    return new Sequelize(credentials.name, credentials.user, credentials.pass, {
        host: credentials.host,
        dialect: options.dialect || "mysql",
        operatorsAliases: options.operatorsAliases || false,
    
        define: options.define || {
            //prevent sequelize from pluralizing table names
            freezeTableName: true
        },
        /**
         * If you're connecting to the database from a single process, you should create only one Sequelize instance
         * 
         * If you're connecting to the database from multiple processes, you'll have to create one instance per process, 
         * but each instance should have a maximum connection pool size of such that the total maximum size is respected. 
         * For example, if you want a max connection pool size of 90 and you have three processes, 
         * the Sequelize instance of each process should have a max connection pool size of 30.
         */
        pool: options.pool || {
            //Maximum number of connection in pool
            max: 2,
            //Minimum number of connection in pool
            min: 0,
            //The maximum time, in milliseconds, that pool will try to get connection before throwing error
            acquire: 30000,
            //The maximum time, in milliseconds, that a connection can be idle before being released.
            idle: 10000,
            //The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
            evict: 1000,
        }
    })
}
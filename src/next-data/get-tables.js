const getDb = require("./get-db");

module.exports = getTables = (dbInfo, tableKeys, locale) => {
    const db = getDb(dbInfo.credentials, dbInfo.options)
    const tablesMap = dbInfo.tablesMap
    const tables = {}

    tableKeys.forEach(tableKey => {
        tables[tableKey] = tablesMap[tableKey]? tablesMap[tableKey](db, locale) : null
    });

    return tables

}
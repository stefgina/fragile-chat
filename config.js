require('dotenv').config()

module.exports = {
    DATABASE: {
        HOST: process.env.DOCK_MYSQL_HOST,
        PSWD: process.env.DOCK_MYSQL_PASS,
        USER: process.env.DOCK_MYSQL_USER,
        NAME: process.env.DOCK_MYSQL_DB,
        PORT: process.env.DOCK_MYSQL_PORT
    }  
}
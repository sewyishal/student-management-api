const mysql = require('mysql2')

const connection= mysql.createConnection({
    host:"localhost",
    user:"abebe",
    password:"abe123",
    database:"mini"
})

module.exports=connection
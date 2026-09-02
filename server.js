require('dotenv').config()
const app = require('./app')
const connection =require('./config/db')
const createTables =require('./database/init')
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connection.query('SELECT 1', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
        createTables();
    }
});
app.listen(3000,()=>{
    console.log("App is running at http://localhost:3000/ ")
})

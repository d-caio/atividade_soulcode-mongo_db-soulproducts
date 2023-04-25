require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const multer = require("multer")

mongoose.connect(process.env.MONGODB_URL);

const app = express()
app.use(express.json())
const produtosRoutes = require("./routes/produtos")
app.use(produtosRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})
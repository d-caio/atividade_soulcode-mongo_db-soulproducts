const Joi = require("joi")
const { model, Schema } = require("mongoose")

const produtoJoi = Joi.object({
    nome: Joi.string().trim().required(),

    descricao: Joi.string().trim().max(150).truncate().required(),

    quantidade: Joi.number().integer().min(0).required(),

    preco: Joi.number().positive().precision(2).required(),

    desconto: Joi.number().positive().precision(2),

    dataDesconto: Joi.date(),

    categoria: Joi.string().max(50).trim().truncate().required(),

    imgProduto: Joi.string().trim()
}).with("desconto", "dataDesconto")

const Produto = model("produto", new Schema({
    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true,
        maxlength: 150
    },

    quantidade: {
        type: Number,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    desconto: {
        type: Number
    },

    dataDesconto: {
        type: Date
    },

    categoria: {
        type: String,
        required: true
    },

    imgProduto: {
        type: String
    }
}))

module.exports = {
    Produto,
    produtoJoi
}
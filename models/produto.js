const Joi = require("joi")
const {model, Schema} = require("mongoose")

const produtoSchema = Joi.object({
    nome: Joi.string().alphanum().trim().required(),

    descricao: Joi.string().trim().required(),

    quantidade: Joi.number().integer().min(0),

    preco: Joi.number().positive().precision(2).
})

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
        type: String,
        required: false
    }
}))

module.exports = Produto
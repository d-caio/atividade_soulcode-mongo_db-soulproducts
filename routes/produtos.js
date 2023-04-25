const { Router } = require("express")
const { Produto, produtoJoi } = require("../models/produto")
const router = Router()
const multer = require('multer');

const upload = multer({dest: 'uploads/'})

router.post("/produtos", async (req, res) => {
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto } = req.body
    try {
        const { error } = produtoJoi.validate(req.body)
        if (error) {
            res.status(400).json(error)
        } else {
            const novoProduto = new Produto({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto })
            await novoProduto.save()
            res.status(201).json(novoProduto)
        }
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ message: "Aconteceu um erro." })
    }
})

router.get("/produtos", async (req, res) => {
    try {
        const produtos = await Produto.find()
        res.json(produtos)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.get("/produtos/:id", async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findById(id)
        produto ? res.json(produto) : res.status(404).json({ message: "Prouto não encontrado." })
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.get("/produtos/nome/:nome", async (req, res) => {
    const { nome } = req.params
    try {
        const produto = await Produto.findOne({ nome })
        produto ? res.json(produto) : res.status(404).json({ message: "Produto não encontrado." })
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.put("/produtos/:id", async (req, res) => {
    const { id } = req.params
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto } = req.body

    try {
        const { error } = produtoJoi.validate(req.body)
        if (error) {
            res.status(400).json(error)
        } else {
            const produto = await Produto.findByIdAndUpdate(id, { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto })
            produto ? res.json({ message: `Produto atualizado com sucesso: ${produto}` }) : res.status(404).json({ message: "Produto não encontrado." })
        }
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.put("/produtos/atualizar/:categoriaProduto", async (req, res) => {
    const { categoriaProduto } = req.params
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto } = req.body

    try {
        const produtosAtualizados = await Produto.updateMany({ categoria: categoriaProduto }, { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imgProduto })
        res.json({ message: "Produtos atualizados com sucesso." })
} catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params
    try {
        const produto = await Produto.findByIdAndRemove(id)
        produto ? res.json({ message: "Produto excluído com sucesso." }) : res.status(404).json({ message: "Produto não encontrado." })
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.delete("/produtos/excluir/desconto/:desconto", async (req, res) => {
    const { desconto } = req.params
    try {
        await Produto.deleteMany({ desconto: { $gte: desconto } })
        res.json(`Produtos excluídos com sucesso.`)
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.delete("/produtos/excluir/:nome", async (req, res) => {
    const { nome } = req.params
    try {
        const produtoExcluido = await Produto.findOneAndRemove({ nome })
        produtoExcluido ? res.json({ message: "produto excluído com sucesso." }) : res.status(404).json({ message: "Produto não encontrado." })
    } catch (erro) {
        res.status(500).json({ message: "Um erro aconteceu." })
    }
})

router.post('/upload', upload.single('file'), (request, response) => {
    console.log(request.file)
})

module.exports = router
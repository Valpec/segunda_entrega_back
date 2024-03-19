import express from 'express';
// import ProductService from '../dao/fileSystem/ProductManager.js';
import ProductService from '../dao/db/products.service.js';
import CartService from '../dao/db/carts.service.js';


const router = express.Router();

const productManager = new ProductService();
const cartService = new CartService();


router.get('/', async (req, res) => {
    try {
        let prods = await productManager.getProducts()
        res.render('home', prods)
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando los productos" })
    }

})

router.get('/realtimeproducts', async(req, res)=>{
    res.render('realTimeProducts')
})

router.get('/products', async(req, res)=>{
    try{
        let limit  = parseInt(req.query.limit);
        let page  = parseInt(req.query.page);
        let sort  = req.query.sort;
        let query  = req.query.query;
        let prods = await productManager.getProducts(limit, page, sort,query)
        
        res.render('products', prods)
    }catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
})

router.get('/products/:pid', async(req, res)=>{
    try{
        let pid = req.params.pid
        let prod = await productManager.getProductsById(pid)
        res.render('productsDetail', prod)
    }catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
})

router.get('/carts/:cid', async(req,res)=>{
    try{
        let cid = req.params.cid
        let cart = await cartService.listCartProds(cid)
        res.render('cart', cart)
    }catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
})

export default router;
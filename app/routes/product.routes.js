const express = require('express');
const Product = require('../models/product.model.js');

module.exports = function(app) {
    var router = express.Router();
    router.get('/', async function(req, res) {
        const product = await Product.getProduct();
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({
                message: "No products found."
            });
        }
    });
    router.get('/:id', async function(req, res) {
        const productId = req.params.id;
        const product = await Product.getProductById(productId);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({
                message: "No product found."
            });
        }
    });

    router.post('/',async function (req,res){
        const productbody = req.body;
        const product = await Product.addProduct(productbody);  
        if(product){
            res.status(200).send(product);
        }else{
            res.status(404).send({
                message: "Error saving product."
            });
        }
    });


    router.put('/updateProduct/:id', async function(req, res) {
        const productId = req.params.id;
        const productData = req.body
        if (!productData.total_buy_quantity ||!productData.total_issue_quantity) {
            return res.status(400).json({ errors: "Missing total_buy_quantity or total_issue_quantity in request body" });
        }
        const result = await Product.updateProductStock(productId, productData);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ errors: "Error updating issue ID" });
        }
    })

    router.put('/update/:id', async function(req, res) {
        const product = req.body;
        const productId = req.params.id;
        const onlyStockUpdate = Object.keys(product).length === 2 &&
                                'total_buy_quantity' in product &&
                                'total_issue_quantity' in product; 
      //  console.log('stockupdated=>',onlyStockUpdate);
        if (onlyStockUpdate) {
             const result = await Product.updateProductStock(productId, product);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ errors: "Error updating product stock" });
            }
        } else {
            const result = await Product.updateProduct(productId, product);
            if (result) {
                res.status(200).json({success: true, result});
            } else {
                res.status(400).json({ errors: "Error updating product" });
            }
        }
    }); 
    

    router.delete('delete/:id', async function(req, res) {
        const productId = req.params.id;
        const result = await Product.deleteProduct(productId);
        if(result){
            res.status(200).json({message: "Product deleted successfully"});
        } else {
            res.status(400).json({message: "Error deleting product"});
        }
    });
    app.use('/product', router);
}

const express = require('express');
const prdCategory = require("../models/prd_category.model.js");

module.exports = function(app)  {
    var router = express.Router();
    router.get('/', async function(req, res) {
        const product = await prdCategory.getProductCategory();
		if(product){
            res.status(200).json(product);
        }else{
            res.status(400).json({errors : "No data"});
        }
	});
    

    router.get('/:id', async function(req, res) {
        const product_category_id = req.params.id;
        const product  =  await prdCategory.getProductCategoryById(product_category_id);
        console.log(product);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(400).json({errors : "No product category found"});
        }
    });


    router.post('/', async function(req, res) {
        const product = req.body;
        console.warn(product);
        const result = await prdCategory.addProductCategory(product);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({errors : "Error saving product category"});
        }
    });


    router.put('/update/:id', async function(req, res) {
        const product = req.body;
        const product_category_id = req.params.id;
        const result = await prdCategory.updateProductCategory(product_category_id, product);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({errors : "Error updating product category"});
        }
    });

    router.delete('/delete/:id', async function(req, res) {
        const product_category_id = req.params.id;
        const result = await prdCategory.deleteProductCategory(product_category_id)
        if(result){
            res.status(200).json({message: "Product Category deleted successfully"});
        }else{
            res.status(400).json({errors : "Error deleting product category"});
        }
    });
    
    app.use("/productCategory", router);
}


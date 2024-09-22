const express = require('express');
const Return = require('../models/return.model.js');

module.exports = function(app) {
    let router = express.Router();

    router.get('/all/', async function(req, res) {
        const all = await Return.getReturn();
        if(all){
            res.status(200).json(all);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });
    router.get('/', async function(req, res) {
        const return_item = await Return.getReturnAll();
        if(return_item){
            res.status(200).json(return_item);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.post('/', async function(req, res) {
        const return_item = await Return.addReturn(req.body);
        console.log('return response ',return_item)
        if(return_item){
            res.status(200).json(return_item);
        } else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.get('/:id', async function(req, res) {
        const return_id = req.params.id;
        console.log('return_id =>',return_id);
        const return_item = await Return.getReturnByIssueId(return_id);
        console.log('return_item =>',return_item);
        if(return_item){
            res.status(200).json(return_item);
        } else{
            res.status(400).json({errors : "No return item found"});
        }
    });

    router.get('/orderId/:id', async function(req, res) {
        const return_id = req.params.id;
        console.log('return_id =>',return_id);
        const return_item = await Return.getReturnByOrderId(return_id);
        console.log('return_item =>',return_item);
        if(return_item){
            res.status(200).json(return_item);
        } else{
            res.status(400).json({errors : "No return item found"});
        }
    });


    router.put('/:id', async function(req, res) {
        const return_id = req.params.id;
        const return_item = await Return.updateReturn(return_id, req.body);
        if(return_item){
            res.status(200).json(return_item);
        } else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.delete('/:id', async function(req, res) {
        const return_id = req.params.id;
        const return_item = await Return.deleteReturn(return_id);
        if(return_item){
            res.status(200).json(return_item);
        } else{
            res.status(400).json({errors : "No return item found"});
        }
    })

    app.use('/return', router);
}
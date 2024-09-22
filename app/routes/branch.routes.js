const express = require('express');
const Branch = require("../models/branch.model.js");
module.exports = function(app){

    var router = require("express").Router();
    console.log('branch routes',router)
	router.get('/', async function(req, res) {
        const user = await Branch.getBranch();
        
        console.log(user);
		if(user){
            res.status(200).json(user);
        }else{
            res.status(400).json({errors : "No data"});
        }
	});

    router.get('/:id', async function(req, res) {
        const branchId = req.params.id;
        const branch =  await Branch.getBranchById(branchId);
        console.log(branch);
        if(branch){
            res.status(200).json(branch[0]);
        }else{
            res.status(400).json({errors : "No branch found"});
        }
    });

    router.post('/', async function(req, res) {
        const branch = req.body;
        console.warn(branch);
        const result = await Branch.addBranch(branch);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({errors : "Error saving branch"});
        }
    }); 

    router.put('/update/:id', async function(req, res) {
        const branch = req.body;
        const branchId = req.params.id;
        const result = await Branch.updateBranch(branchId, branch);
        console.log(result);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({errors : "Error updating branch"});
        }
    });

    router.delete('/delete/:id', async function(req, res){
        const branchId = req.params.id;
        console.log('Deleting branch with id:', branchId);
        const result = await Branch.deleteBranch(branchId)
        if(result){
            res.status(200).json({message: "Branch deleted successfully"});
        }else{
            res.status(400).json({errors: "Error deleting branch"});
        }
    });
    app.use("/branch", router);
};


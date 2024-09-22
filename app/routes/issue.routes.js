const express = require('express')
const Issue = require('../models/issue.model.js');

module.exports = function(app) {
    let router = express.Router();
    
    router.get('/', async function(req, res) {
        const issue = await Issue.getIssue();
        if(issue){
            res.status(200).json(issue);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.get('/:id', async function(req, res) {
        const issueId = req.params.id;
        const issue =  await Issue.getIssueById(issueId);
        if(issue){
            res.status(200).json(issue[0]);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.post('/', async function(req, res) {
        const issue = await Issue.addIssue(req.body);
        console.log('issue data ',issue);
        if(issue){
            res.status(200).json(issue);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });

    router.put('/updateQuantity/:id', async function(req, res) {
        const issueId = req.params.id;
        console.log('issueId', issueId, req.body);
        const issue = await Issue.updateIssueQuantity(issueId, req.body);
        if(issue){
            res.status(200).json(issue);
        }else{
            res.status(400).json({errors : "No data"});
        }
    })

    router.put('/update/:id', async function(req, res) {
        const issueId = req.params.id;
        console.log('issueId', issueId, req.body);
        const issue = await Issue.updateIssue(issueId, req.body);
        if(issue){
            res.status(200).json(issue);
        }else{
            res.status(400).json({errors : "No data"});
        }
    });
    app.use('/issue', router);
};
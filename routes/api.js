// Dependencies
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let notes = require('../db/db.json');
const express = require('express');
const router = express.Router();


// Middleware
router.use(express.json());

router.get('/', (req, res) => {

});

router
.get('/notes', (req, res) => {
    res.json(notes);
})
.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), error => {
        if (error) {
            console.error(error);
            res.json('Error in posting note');
         } 
        else {
            res.json({status: 'success', body: req.body});
        }
    });
})
.delete('/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), error => {
        if (error) {
            console.error(error);
            res.json('Error in deleting note');
        } 
        else {
            res.json({status: 'success', body: `note id: ${req.params.id} should be deleted.`});
        }
    });
});


module.exports = router;
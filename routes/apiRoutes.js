
const path = require('path');
const notesData = require('../db/db.json');
const fs = require('fs');
const uuid = require("uuid");
const { Router } = require('express');
const router = require('express').Router()



    router.get('/notes', (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            console.log(data)
            return res.json(JSON.parse(data))
        })
    });
    router.post('/notes', (req, res) => {
        let newNote = req.body
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            console.log(newNote)
            let notes = JSON.parse(data)
            newNote.id = uuid.v4()
            notes.push(newNote)
            fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                return res.json(newNote)
            })
        })
    });
    
    router.delete('/notes/:id', (req,res) => {
        
        let id = req.params.id
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data)
            let newDbNotes = notes.filter((note) => note.id !== id)
            fs.writeFile("./db/db.json", JSON.stringify(newDbNotes), "utf8", (err, data) => {
                return res.json(newDbNotes)
            })
        })
    })

module.exports = router
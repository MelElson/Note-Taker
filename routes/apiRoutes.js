
const path = require('path');
const notesData = require('../db/db.json');
const fs = require('fs');
const uuid = require("uuid");



module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            console.log(data)
            return res.json(JSON.parse(data))
        })
    });
    app.post('/api/notes', (req, res) => {
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
  

};
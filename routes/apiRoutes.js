
//const {fstat} = require('node:fs');
const path = require('path');
const notesData = require('../db/db.json');
const fs = require('fs');
const uuid = require("uuid");



// module.exports = (app) => {
//     fs.readFile("/db/db.json", "utf8", (err,data) => {
//       if (err) throw err;
//       var notes = JSON.parse(data);
//     });
//     app.get('/api/notes', (req, res) => res.json(notesData));
    
//     // app.post('/api/index', (req,res) => {
//     //     if (notesData.length < 5) {
//     //         notesData.push(req.body)
//     //         res.json(true)
//     //     } else {
//     //         waitList.push(req.body)
//     //         res.json(false)
//     //     }
//     // });
//     app.post("/api/index", (req,res) => {

//     });
//     app.post('/api/clear', (req,res) => {
//         notesData.length = 0;
       
//         res.json({ok: true});
//     });
// };

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
      fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          console.log(data)
          return res.json(JSON.parse(data)) //turns it into a JS object aka array
      })
  });
  app.post('/api/notes', (req, res) => {
      let newNote = req.body
      fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          console.log(newNote)
          let notes = JSON.parse(data) //now array
          newNote.id = uuid.v4() //object, how to add properties to objects newNote["id"]
          notes.push(newNote) //Array -> object
          fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
              return res.json(newNote)
          })
      })
  });
//   app.delete('/api/notes: id', (req, res,) => {
//       notesData.length = 0;
//       res.json({
//           ok: true
//       });
//   });


app.post('/api/notes', (req, res) => {
    // Empty out the arrays of data
    notesData.length = 0;

    res.json({ ok: true });
  });
};
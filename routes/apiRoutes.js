let notes = require("../db/db.json");
const fs = require("fs");

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        res.json(notes);
    });

    app.post("/api/notes", (req, res) => {
        const note = req.body;

        let maxIdNum = 0;
        for (let key in notes) {
            let id = notes[key].id;
            if (id > maxIdNum) {
                maxIdNum = id;
            }
        }

        //Increase Id by 1 for each new note
        note.id = maxIdNum + 1;
        notes.push(note);

        //write to db.json
        fs.writeFile("db/db.json", JSON.stringify(notes), err => {
            if (err) {
                return console.log(err);
            } else
            console.log("Successfully written to db.json file");
            res.json(note);
        });
    });

    app.get("/api/notes/:id", (req, res) => {
        //get selected id
        let selectedNoteId = parseInt(req.params.id);

        for (let key in notes) {
            let {id, title, text} = notes[key];

            //return object that matched the id
            if (id === selectedNoteId) {
                res.json({
                    "id": id,
                    "title": title,
                    "text": text
                });
            }
        }
    });

    app.delete("/api/notes/:id", (req, res) => {
        //get selected id
        var selectedNoteId = parseInt(req.params.id);
    
        //Filter to get selected id
        let result = notes.filter(({id}) => id !== selectedNoteId);
        notes = result;
    
        //rewrite db.json to reflect the changes
        fs.writeFile("db/db.json", JSON.stringify(notes), err => {
    
          if (err) {
            return console.log(err);
          }
        
          console.log("Successfully deleted note from db.json file.");
          res.json(notes);
        
        }); 
    });
};

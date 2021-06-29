const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        const db = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
        res.json(db);
    })

    app.post('/api/notes', (req, res) => {
        const db = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
        console.log(req.body) ;
        let note = req.body;
        note.id = uuidv4();
        db.push(note);
        fs.writeFileSync("db/db.json", JSON.stringify(db));
        res.json(note);
    });
}
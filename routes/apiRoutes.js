const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
};


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        const db = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
        res.json(db);
    })

    app.post('/api/notes', (req, res) => {
        const db = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
        console.log(req.body) ;
        const note = req.body;
        note.id = uuidv4();
        db.push(note);
        fs.writeFileSync("db/db.json", JSON.stringify(db));
        res.json(note);
    });

    app.delete('/api/notes/:id', (req, res ) => {
        const db = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
        const delNote = req.params.id ;
        const newDB = remove(db, "id", delNote);
        fs.writeFileSync("db/db.json", JSON.stringify(newDB));
        res.json(newDB);
    });
}
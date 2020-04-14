var noteData = require("../db/db");

module.exports = function(app) {

  app.get("/api/notes", (req, res) => {
    res.json(noteData);
  });

  app.post("/api/notes", (req, res) => {
    noteData.push(req.body);
    console.log(req.body);
  });

  app.delete("/api/notes:id", (req, res) => {
    const idParam = req.params.id;
    for (var i = 0; i < noteData.length; i++) {
      if (idParam === noteData[i].id) {
        var removeIndex = database.map(function(item) { return item.id; }).indexOf(idParam);
        console.log(removeIndex)
        database.splice(removeIndex, 1)
        }
      }
  });
};
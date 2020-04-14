var path = require("path");

module.exports = function(app) {

  app.get("/notes", function(req, res) {
    console.log("In Notes Route");
    res.sendFile(path.join(__dirname, "../public/html/notes.html"));
  });

  app.get("*", function(req, res) {
    console.log("In * Route");
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
};
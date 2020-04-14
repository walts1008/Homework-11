var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./paths/apiRoutes")(app);
require("./paths/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
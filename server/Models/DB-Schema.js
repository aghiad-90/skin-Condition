const monsoose = require("mongoose");

const skinScema = monsoose.Schema({
  skinOption: String,
});

const option = monsoose.model("SkinDB", skinScema);

module.exports = option;

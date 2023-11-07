const mongoose = require("mongoose");


const citBlacklist = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  
  pagerplayer: String,
  pagerid: String,
});

module.exports = mongoose.model("cBlacklists", citBlacklist);

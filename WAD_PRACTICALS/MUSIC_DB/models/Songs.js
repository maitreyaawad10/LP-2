const mongoose = require("mongoose")


// DEFINING THE SONGS SCHEMA
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
})

// CREATING THE MODEL OR COLLECTION BASED ON THE ABOVE SCHEMA
const SongDetails = mongoose.model("SongDetails", songSchema);

// EXPORTING THE MODEL
module.exports = SongDetails;
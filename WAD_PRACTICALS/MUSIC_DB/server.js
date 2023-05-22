const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const ejs = require("ejs")
const Songs = require("./models/Songs")

const app = express()
dotenv.config()
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))


MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MONGODB database!");
    })
    .catch(error => console.log(error))


// ROUTES
app.get("/", (req, res) => {
    res.send("API is running!")
})


// QUERY : A, B, C
app.get("/insert-documents", async (req, res) => {
    try {
        const documents = [
            {
                Songname: "Tum hi ho",
                Film: "Aashiqui 2",
                Music_director: "A.R. Rahman",
                Singer: "Arijit Singh"
            },
            {
                Songname: "Nadaan Parindey",
                Film: "Rockstar",
                Music_director: "Mohit Suri",
                Singer: "k.K"
            },
            {
                Songname: "Ae Watan",
                Film: "Raazi",
                Music_director: "Arijit Singh",
                Singer: "Sunidhi Chauhan"
            },
            {
                Songname: "Ilahi",
                Film: "Ye jawani hai deewani",
                Music_director: "Ilahiraja",
                Singer: "Pritam"
            },
            {
                Songname: "Bachna ae haseeno",
                Film: "Loot Machi sheher mai",
                Music_director: "R.D. Burman",
                Singer: "Kishore Kumar"
            },
        ]

        await Songs.insertMany(documents);
        res.send("Documents inserted Successfully!");
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
})


// QUERY : D
app.get("/documents", (req, res) => {
    Songs.find({})
        .then(songs => {
            res.render("index", {
                songsList: songs
            })
        })
        .catch(error => console.log(error))
})


// QUERY : E
app.get("/music-director", (req, res) => {
    const music_director = "R.D. Burman"

    Songs.find({ "Music_director": music_director })
        .then(songs => {
            res.render("index", {
                songsList: songs
            })
        })
        .catch(error => console.log(error))

})


// QUERY : F
app.get("/singer-music-director", (req, res) => {
    const music_director = "R.D. Burman"
    const singer = "Kishore Kumar"

    Songs.find({ $and: [{ "Music_director": music_director }, { "Singer": singer }] })
        .then(songs => {
            res.render("index", {
                songsList: songs
            })
        })
        .catch(error => console.log(error))
})


// QUERY : G
app.get("/delete-song", async (req, res) => {
    try {
        const song = "Lo me agaya"

        await Songs.deleteOne({ Songname: song })
        res.send(`Song ${song} deleted successfully`)
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
})


// QUERY : H
app.get("/add", async (req, res) => {
    try {
        await Songs.create({
            Songname: "Lo me agaya",
            Film: "Ek waaris",
            Music_director: "R.D. Burman",
            Singer: "Kumar Sanu"
        })

        await Songs.create({
            Songname: "Chahun mai yaa na",
            Film: "Aashiqui 2",
            Music_director: "A.R. Rahman",
            Singer: "Sunidhi Chauhan"
        })

        res.send("New document added successfully!")
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
})


// QUERY : I
app.get("/singer-film", (req, res) => {
    const singerName = "Sunidhi Chauhan"
    const filmName = "Aashiqui 2"

    Songs.find({ $and: [{ "Singer": singerName, "Film": filmName }] })
        .then(songs => {
            res.render("index", {
                songsList: songs
            })
        })
        .catch(error => console.log(error))
})


// QUERY : J
app.get("/update-schema", async (req, res) => {
    try {
        await Songs.updateMany({ Film: "Aashiqui 2" }, { Actor: "Aditya Roy Kapoor", Actress: "Shraddha Kapoor" })
        await Songs.updateOne({ Film: "Rockstar" }, { Actor: "Ranbir Kapoor", Actress: "Nargis Fakhri" })
        await Songs.updateOne({ Film: "Raazi" }, { Actor: "Vicky Kaushal", Actress: "Alia Bhatt" })
        await Songs.updateOne({ Film: "Ye jawani hai deewani" }, { Actor: "Ranbir Kapoor", Actress: "Deepika Padukone" })
        await Songs.updateOne({ Film: "Ek waaris" }, { Actor: "Amitabh Bachhan", Actress: "Huma Qureshi" })

        res.send("Documents updated successfully")
    } catch (error) {
        res.status(401).send(error);
        console.log(error);
    }
})


// QUERY : K
app.get("/new-schema", (req, res) => {
    Songs.find({})
        .then(songs => {
            res.render("update", {
                songsList: songs
            })
        })
        .catch(error => console.log(error))
})


// APP LISTENING ON PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})
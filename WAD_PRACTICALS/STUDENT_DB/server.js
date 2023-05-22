const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const StudentMarks = require("./models/StudentMarks");
const ejs = require("ejs");


// INITIALIZATION
const app = express();
app.set("view engine", "ejs");
dotenv.config();

mongoose.connect("mongodb://localhost:27017/Student")
    .then(() => {
        console.log("MONGODB CONNNECTED");
    })
    .catch(err => console.log(err));


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.get("/", (req, res) => {
    res.send("API is running!");
});


// QUERY : A, B, C
app.post("/insert-documents", async (req, res) => {
    try {
        const documents = [
            {
                Name: "Maitreya Awad",
                Roll_No: 33205,
                WAD_Marks: 20,
                CC_Marks: 18,
                DSBDA_Marks: 28,
                CNS_Marks: 25,
                AI_Marks: 15,
            },
            {
                Name: "Meher Datey",
                Roll_No: 33220,
                WAD_Marks: 21,
                CC_Marks: 16,
                DSBDA_Marks: 23,
                CNS_Marks: 21,
                AI_Marks: 24,
            },
            {
                Name: "Prasad Unecha",
                Roll_No: 33278,
                WAD_Marks: 29,
                CC_Marks: 20,
                DSBDA_Marks: 25,
                CNS_Marks: 17,
                AI_Marks: 19,
            },
            {
                Name: "Khalid Quadri",
                Roll_No: 33240,
                WAD_Marks: 22,
                CC_Marks: 20,
                DSBDA_Marks: 29,
                CNS_Marks: 18,
                AI_Marks: 19,
            },
            {
                Name: "Adwait Bandal",
                Roll_No: 33206,
                WAD_Marks: 27,
                CC_Marks: 15,
                DSBDA_Marks: 19,
                CNS_Marks: 20,
                AI_Marks: 29,
            },
        ]

        const result = await StudentMarks.insertMany(documents);
        console.log(result);

        res.send("Documents inserted successfully!\n");
        // await StudentMarks.deleteMany({ "Roll_No": { $gt: 33201 } });
    } catch (err) {
        res.status(400).send("Some error occured");
        console.log(err);
    }
});


// QUERY : D, J
app.get("/documents", async (req, res) => {
    try {
        const documentsCount = await StudentMarks.countDocuments();

        StudentMarks.find({})
            .then(students => {
                res.render("index", {
                    studentsList: students
                });
            })
            .catch(err => {
                // Handle the error
                console.error(err);
            });

    } catch (error) {
        res.status(400).send("Some error occured in catch");
        console.log(error);
    }
});


// QUERY : E
app.get("/dsbda-marks", (req, res) => {
    try {
        StudentMarks.find({ "DSBDA_Marks": { $gt: 20 } })
            .then(students => {
                res.render("index", {
                    studentsList: students
                });
            })
            .catch(err => {
                res.status(400).send("Some error occured!");
            });
    } catch (error) {
        res.status(400).send(error);
    }
});


// QUERY : F
app.update("/update-marks", async (req, res) => {
    try {
        await StudentMarks.updateOne({ Name: "Maitreya Awad" }, { CC_Marks: 26, WAD_Marks: 28, DSBDA_Marks: 26, CNS_Marks: 29, AI_Marks: 27, });

        res.send("Updated successfully");
    } catch (error) {
        res.status(400).send(error);
    }
})


// QUERY : G
app.get("/high-marks", (req, res) => {
    try {
        StudentMarks.find({
            "WAD_Marks": { $gt: 25 },
            "DSBDA_Marks": { $gt: 25 },
            "CNS_Marks": { $gt: 25 },
            "CC_Marks": { $gt: 25 },
            "AI_Marks": { $gt: 25 },
        })
            .then(students => {
                res.render("index", {
                    studentsList: students
                })
            })
            .catch(error => {
                res.status(400).send(error);
            })
    } catch (error) {
        res.status(400).send(error);
    }
});


// QUERY : H
app.get("/low-marks", (req, res) => {
    try {
        StudentMarks.find({ $and: [{ "DSBDA_Marks": { $lt: 24 } }, { "CNS_Marks": { $lt: 24 } }] })
            .then(students => {
                res.render("index", {
                    studentsList: students
                })
            })
            .catch(error => {
                res.status(400).send(error);
            })
    } catch (error) {
        res.status(400).send(error);
    }
});


// QUERY : I
app.delete("/remove-student", async (req, res) => {
    try {
        await StudentMarks.deleteOne({ Name: "Khalid Quadri" });

        res.send("Removed student successfully!");
    } catch (error) {
        res.status(400).send(error);
    }
});


// PORT CONFIG
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on PORT : ${PORT}`);
});
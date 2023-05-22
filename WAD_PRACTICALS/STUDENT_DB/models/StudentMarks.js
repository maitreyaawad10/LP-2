const mongoose = require("mongoose");

const studentMarksSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number,
});

const StudentMarks = mongoose.model("StudentMarks", studentMarksSchema);

module.exports = StudentMarks;
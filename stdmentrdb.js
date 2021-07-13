const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const app = express();

//const dbUrl = "mongodb://127.0.0.1:27017";
//const dbUrl ="mongodb+srv://task_db:D2OW3FBnawvkk6QJ@taskone.2hsbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000;
app.use(express.json());

/** mentor*/

app.get("/all", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(DB_URL);
        let db = clientInfo.db("stdmentr");
        let data = await db.collection("mentr").find().toArray();
        res.status(200).json(data);
        res.send(data)
        console.log("got all list of mentors")
        clientInfo.close();

    } catch (error) {
        console.log(error);
    }
});

// get all student

app.get("/all_student", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(DB_URL);
        let db = clientInfo.db("stdmentr");
        let data = await db.collection("std").find().toArray();
        res.status(200).json(data);
        res.send(data)
        console.log("got all list of students")
        clientInfo.close();

    } catch (error) {
        console.log(error);
    }
});

//create student

app.post("/create_student", async (req, res) => {
    try {
        let student = await mongoClient.connect(DB_URL);
        let db = student.db("stdmentr");
        console.log(req.body)

        const newStudent = {
            "id": req.body.id,
            "name": req.body.name,
            "mail": req.body.mail,
            "mentor": req.body.mentor
        }
        await db.collection("std").insertOne(newStudent);
        res.status(200).json({ message: "student Created" });
        res.send(newStudent)
        console.log("student created")
        student.close();
    } catch (err) {
        console.log(err)
    }
})

/** create mentor */
app.post("/create_mentor", async (req, res) => {
    try {
        let mentor = await mongoClient.connect(DB_URL);
        let db = mentor.db("stdmentr");
        console.log(req.body)
        const newMentor = {
            "id": req.body.id,
            "name": req.body.name,
            "mail": req.body.mail,
            "student": req.body.student
        }
        await db.collection("mentr").insertOne(newMentor);
        res.status(200).json({ message: "mentor Created" });
        console.log("mentor created created")
        res.send(newMentor);
        mentor.close();
    } catch (err) {
        console.log(err)
    }
})

/** get particular mentor */

app.get("/mentor/:id", async (req, res) => {
    try {
        let client = await mongoClient.connect(DB_URL);
        let db = client.db("stdmentr");
        let data = await db.collection("mentr").findOne({ _id: objectId(req.params.id) });
        console.log(data)
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})





app.listen(port, () => console.log("app runs with", port));
//mongodb+srv://stdmentr:ePRHUkFg3aGZfV9t@cluster0.r1zpo.mongodb.net/stdmentr?retryWrites=true&w=majority
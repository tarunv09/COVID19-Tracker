// v38CnlNNxZsiN3nw
//mongodb+srv://covid19:<password>@covid19-cluster-kpump.mongodb.net/test?retryWrites=true&w=majority

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to express tutorial!");
});

app.get("/api/courses", (req, res) => {
  res.send([
    { id: "1", course: "React Tutorial", tag: "react" },
    { id: "2", course: "Object-oriented programming (OOP)", tag: "oop" },
    { id: "3", course: "The Complete React Native Course", tag: "react" },
    { id: "4", course: "Java Programming", tag: "java" },
    { id: "5", course: "JavaScript Course", tag: "javascript" },
    { id: "6", course: "Spring Boot Tutorial", tag: "spring" },
    { id: "7", course: "Python Bootcamp", tag: "python" },
    { id: "8", course: "Spring Framework Course", tag: "spring" },
    { id: "9", course: "React - The Complete Course", tag: "react" },
    { id: "11", course: "ReactJS + Hooks Course", tag: "react" },
    { id: "12", course: "React with Redux", tag: "react" },
    { id: "13", course: "Advanced React Native and Redux", tag: "react" },
    { id: "14", course: "C#: Classes and OOP", tag: "oop" },
    { id: "15", course: "React with Redux", tag: "react" },
    { id: "16", course: "Java Masterclass", tag: "java" },
    {
      id: "17",
      course: "Modern JavaScript from Zero to Hero",
      tag: "javascript"
    },
    { id: "18", course: "ES6 JavaScript Training", tag: "javascript" },
    { id: "19", course: "Learn Python Programming", tag: "python" },
    { id: "20", course: "Master Microservices with Java", tag: "java" }
  ]);
});

//app.listen(5000, () => console.log("Listening on port 5000"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
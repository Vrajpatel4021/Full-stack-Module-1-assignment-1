const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app= express();
const PORT = 3000;




app.use(bodyParser.json());

const studentDataPath = path.join(__dirname, 'data.json');
const students = JSON.parse(fs.readFileSync(studentDataPath, 'utf8'));


app.use('/students/above-threshold', (req,res)=>{
    const {threshold} = req.body;


    if(threshold <0){
        return res.status(400).json({error: 'Invalid threshold value'});
        //here is the condition if threshold is less than 0 error will display.   

    }

    const filteredStudents = students.filter((student)=>student.total>threshold);
    //Filters the students array to include only those students whose total marks exceed the specified threshold
    const response = {
        count: filteredStudents.length,
        students: filteredStudents.map(({name, total })=> ({
            name, total
        }))
        //Uses destructuring to extract the name and total properties from each student object.
        // Creates a new object for each students with only those properties
        
    };
    return res.status(200).json(response);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
import React from 'react'
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/firebase'
import { getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { password_from_prop, email_from_prop, departments } from "../App.js";
function FacultySignupPage() {
    // const password_from_prop = "test123";
    // const email_from_prop = "test1@gmail.com";
    // const departments = [
    //     { label: "COMPUTER SCIENCE AND ENGINEERING", value: "COMPUTER SCIENCE AND ENGINEERING" },
    //     { label: "ELECTRICAL ENGINEERING", value: "ELECTRICAL ENGINEERING" },
    //     { label: "MECHANICAL ENGINEERING", value: "MECHANICAL ENGINEERING" }

    // ]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facultyID, setFacultyID] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState(departments[0].value)





    useEffect(() => {
        const fetchListTest = async () => {

            //Read data
            try {
                const data = await getDocs(collection(db, "faculty"));

                const filtered_data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(filtered_data);

            }
            catch (err) {
                console.error(err);
            }

        }; fetchListTest();
    }
        , []);
    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }
    const handleSubmit = async (event) => {

        event.preventDefault();
        const docRef = await setDoc(doc(db, "faculty", email), {
            Courses_assigned: [], Department: department, EmailID: email,
            FacultyID: facultyID, Name: name
        });
        console.log(docRef);
        console.log("Added " + facultyID + " with name " + name);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log("You are " + userCredential.user.email);

            })
            .catch((error) => {

                const errorMessage = error.message;
                alert("Error " + errorMessage);


            });
        console.log("Now you are " + auth.currentUser.email);
        await signInWithEmailAndPassword(auth, email_from_prop, password_from_prop)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                // ...
            })
            .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
            });
        console.log("Finally You are " + auth.currentUser.email);

        setEmail('');
        setPassword('');
        setFacultyID('');
        setDepartment('');
        setName('');

    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div > Signup Faculty</div>
                <br></br>
                Faculty ID
                <br></br>
                <input type="text" value={facultyID} onChange={(e) => setFacultyID(e.target.value)}></input>
                <br></br>
                Faculty Name
                <br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br></br>
                *Faculty ID must be unique
                <br></br>
                {department}
                <br></br>
                {"⬇️ Select department ⬇️"}
                <br></br>
                <select onChange={handleDepartmentChange}>

                    {departments.map((department) => <option key={department.label
                    } value={department.value}>{department.label}</option>)}
                </select>
                <div>Email</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>

                <input type="submit"></input>
            </form>

        </div>
    )
}

export default FacultySignupPage
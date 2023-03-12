import React from 'react';
//import { subject_test_array } from "../App.js";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
//import { student_test } from "../App.js";
function StudentCourseRegPage(navigation) {
    const { state } = useLocation();
    const navigate = useNavigate();
    const student_data = state.student;
    const subject_array = [...state.subject_arr];
    const [checkedState, setCheckedState] = useState(
        new Array(subject_array.length).fill(false)
        // fill array size w false
    );
    const [ssubjects, setSsubjects] = useState([]);
    const handleRegisterSubmit = async (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        try {
            const docRef = await setDoc(doc(db, "Student", student_data.EmailID), {
                Courses_Registered: ssubjects,
                CES_Remaining: ssubjects,

            }, { merge: true });

            console.log("DocRef ", docRef);
            setCheckedState(new Array(subject_array.length).fill(false));
            setSsubjects([]);

            navigate(-1);
            //window.location.reload(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    //const getFormattedSubjectID = (SubjectID) => SubjectID;

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        // sub_temp_arr=[]
        const ssubjectsSubjectID = updatedCheckedState.reduce((sum, currentState, index) => { if (currentState === true) { return sum + subject_array[index].SubjectID; } return sum; }, 0);
        let i = 0;
        const ssubjectsSubjectID_arr = [];
        while (i < updatedCheckedState.length) {

            if (updatedCheckedState[i]) {
                //   console.log(i + " th index has value :" + updatedCheckedState[i]);
                ssubjectsSubjectID_arr.push(subject_array[i].SubjectID);
            }
            i++;
        }
        console.log(ssubjectsSubjectID_arr);
        setSsubjects(ssubjectsSubjectID_arr);
    };
    if (student_data.Courses_Registered.length == 0)
        return (
            <div>Student Course RegPage
                <br></br>
                <ul >
                    {subject_array.map(({ SubjectName, SubjectID }, index) => {
                        return (
                            <li key={index}>
                                <div>

                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={SubjectName}
                                        value={SubjectName}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    /><label htmlFor={`custom-checkbox-${index}`}>{SubjectName}</label>
                                    {SubjectID}
                                </div>
                            </li>

                        );
                    })}
                    <button className='styledbutton' onClick={handleRegisterSubmit} >Register</button>
                    <div >Subjects selected :</div>
                    <div>{ssubjects.map((subject) => <li> <div key={subject}>
                        <h6> {subject}</h6>
                    </div></li>)}
                    </div>

                </ul>
            </div>
        );
    else {
        return (<div>Registered </div>)
    }
}

export default StudentCourseRegPage
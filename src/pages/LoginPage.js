import React from 'react'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase'
function LoginPage() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //prevent redirect to oth. page
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {


                // Signed in 
                const user = userCredential.user;
                alert("Login " + user.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error " + errorMessage);

                // ..
            });

    }
    return (
        <div>Login
            Page
            <br></br>
            <form onSubmit={handleSubmit
            }>
                <div >Login</div>
                <br></br>
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

export default LoginPage
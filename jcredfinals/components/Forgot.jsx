import styles from "./Forgot.module.css";
import { useState } from "react";
import Link from 'next/link';
import axios from "axios";
import React from "react";


const Cover = () => {
    const [showPassword, setShowPassword] = useState(false);

    //CHANGE PASSWORD
    const [ ChangeEmail, setChangeEmail ] = useState('');
    const [ ChangePassword, setChangePassword ] = useState('');
    const [ ConfirmchangePassword, setConChangePassword ] = useState('');

    const change_password = () => {
        axios({
            method: "post",
            data: {
                email: ChangeEmail,
                password: ChangePassword,
                confirmpassword: ConfirmchangePassword
            },
            withCredentials: true,
            url: "http://localhost:3004/forgot_password"
            //palitan ng IP
        })
    };

            return (
                <div className={styles.container}>
                    <div className={styles.left}>
                    <div className={styles.left1}>
                        <h1>Change Password</h1>
                            <div className={styles.spread}>
                            <input type='text' onChange={(e) => setChangeEmail(e.target.value)} placeholder="Email" required/>
                            <input type= {showPassword? 'text' : 'password'} onChange={(e) => setChangePassword(e.target.value)}  placeholder="New Password" required />

                            <div className={styles.spr}>
                            <input type= "checkbox"
                            onClick={()=>setShowPassword(!showPassword)}
                            for="toggle"/> <p>Show Password</p>
                            </div>    
                            <div className= {styles.spr1}>
                            <input type= {showPassword? 'text' : 'password'} onChange={(e) => setConChangePassword(e.target.value)} placeholder="Confirm Password" required />
                            </div>
                            <div className={styles.last}>
                            <Link href='/'><button onClick ={change_password}> <h2>Save Changes</h2></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        );
    };

export default Cover;
import styles from "./Title.module.css";
import { useState } from "react";
import Link from 'next/link';
import axios from "axios";
import React from "react";
import { useRouter } from 'next/router'


const Cover = () => {

    //LOG IN USERS
    const [ loginEmail, setLoginEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');
    const [ registerStatus, setRegisterStatus ] = useState('');
    const router = useRouter();

    const login = () => {
        axios({
            method: "post",
            data: {
                email: loginEmail,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:3004/signin"
            //palitan ng IP
        }).then((response) => {
            if(response.data.message == "Not existing"){
                setRegisterStatus(response.data.message);
            }else{
                router.push('/Main_Dashboard')
            }
        })
    };

 
    

return (
    <div>
        <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.left1}>
                        <h1>Login</h1>
                        <h5>Please sign in to continue.</h5>
                        <div className={styles.spread}>
                            <input type='Email' onChange={(e) => setLoginEmail(e.target.value)}  placeholder='Email' required/>
                            <div className={styles.p}>
                                <input type='Pass' id="pswrd" name="pswrd" onChange={(e) => setLoginPassword(e.target.value)} pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder="Password" required />
                            </div>
                        </div>
                        <div className={styles.but}><Link href='/Forgot'><button>Forgot Password</button></Link></div>
                        <div className={styles.next}> <button onClick={login}><h2>LOGIN</h2></button></div>
                        <div className={styles.last}><p>Dont have an account?</p><Link href='/Newa'><button>Sign up</button></Link></div>
                       
                    </div>
                </div>
        </div>
    </div>
);
};


export default Cover;
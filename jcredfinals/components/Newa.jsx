import styles from './Newa.module.css';
import { useState } from "react";
import axios from "axios";
import React from "react";
//import Arrow from '/images/Vector 23.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Newa = () => {
    const [ registerfullname, setRegisterFullName ] = useState('');
    const [ registerEmail, setRegisterEmail ] = useState('');
    const [ registerPassword, setRegisterPassword ] = useState('');
    const [ registerCPassword, setRegisterCPassword ] = useState('');
    const router = useRouter();
  
    const register = () => {
        axios({
            method: "post",
            data: {
                fullname: registerfullname,
                email: registerEmail,
                password: registerPassword,
                confirmpassword: registerCPassword
            },
            withCredentials: false,
            url: "http://localhost:3004/createaccount"
            //palitan ng IP
      
        }).then((response) => {
            if(response.data.message == "Email Taken"){
                setRegisterStatus(response.data.message);
            }else{
                router.push('/');
            }
        })
    };

    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.left1}>
                            <h1>Create Account</h1>
                            <div className={styles.spread}>
                                <input type='Text' onChange={(e) => setRegisterFullName(e.target.value)} placeholder='Full name'></input>
                                <div className={styles.p}>
                                    <input type='Text' onChange={(e) => setRegisterEmail(e.target.value)} placeholder='Email'></input>
                                </div>
                                <div className={styles.p}>
                                    <input type='Text' onChange={(e) => setRegisterPassword(e.target.value)} id="pass" name="pass" pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder='Password' required></input>
                                </div>
                                <div className={styles.p}>
                                    <input type='Text' onChange={(e) => setRegisterCPassword(e.target.value)} id="cpass" name="cpass" pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder='Confirm Password' required></input>
                                </div>
                            </div>
                            <div className={styles.prior}><Link href='/'><button onClick={register}><h2>Sign Up</h2></button> </Link></div>
                            <div className={styles.last}><p>Already have an account?</p><Link href='/'><button>Sign in</button></Link></div>
                            
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Newa;
/* eslint-disable */
import styles from "./Main_Dashboard.module.css";
import Link from 'next/link';
import React from "react";
import { useState, useEffect } from 'react';

const Rpipage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
      async function getPageData(){
          const response = await fetch('http://localhost:3009/imagedisplay');
          //localhost = 192.168.1.9:3009 palitan
          const res = await response.json();
          setData(res.data);
      }
      getPageData();
    }, [])
    
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Loading...</p>
    
    const image_set = 'data:image/png;base64,';
    const now = new Date();
    const date = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`
    

    return (
      <div className={styles.container}>
            <div className={styles.con}>
                  <div className={styles.con1}>
                        <h2>Motion Detection</h2>
                        
                        <div className={styles.mid}>
                              <div className={styles.pictures}>
                              {data ? data.map(datas =>(
                                    <div className={styles.pics}>
                                          <p> Date Captured: {datas.datetime} </p>
                                          <img src={image_set + Buffer.from(datas.image).toString('utf-8')}></img>
                                    </div>
                                    )) :(<p></p>)}
                              </div>
                        </div>
                        <div className={styles.logo}>
                              <p><Link href="/">Logout</Link></p>
                        </div>
                  </div>
                  

            </div>
      </div>
    );
    // return (
        
    //     <div className={styles.background}>
            
    //         <div className={styles.navigation}>
    //         <Link href="/"><button className={styles.logout_button}>LOG OUT</button></Link>
    //             <label className={styles.date_today}>Date Today:{date}</label>
    //         </div>
    //         <div className={styles.container}>
    //             {data ? data.map(datas =>(
    //             <div className={styles.image_container}>
    //                 <div className={styles.main_image_container}>
    //                     <img className={styles.pics} src={image_set + Buffer.from(datas.photo).toString('utf-8')}/>
    //                     <br/>
    //                     <label className={styles.dateTime}>{datas.datetime}</label>
    //                 </div>
    //                 <div className={styles.sub_images}>
    //                     <div>
    //                         <img className={styles.image1} src="/images/no-image.png"/>
    //                         <br/>
    //                         <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
    //                     </div>
    //                     <div >
    //                         <img className={styles.image2} src="/images/no-image.png"/>
    //                         <br/>
    //                         <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
    //                     </div>
    //                     <div>
    //                         <img className={styles.image2} src="/images/no-image.png"/>
    //                         <br/>
    //                         <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
    //                     </div>
    //                 </div>
    //             </div>
    //             )) :(<p> Loading </p>)}
    //         </div>
            
    //     </div>
  
    // );
  };
  
  export default Rpipage;
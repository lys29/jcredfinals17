import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "cpet17finals",
        user: "root",
        password: "elai",  
    });
    try {
        const query ="SELECT * FROM images_table";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        
        res.status(200).json({  accounts: data });    
    } catch (error) {
        res. status(500).json({ error: error.message });
    }
}
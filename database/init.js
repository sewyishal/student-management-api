const createTables=()=>{
    connection.query(`CREATE TABLE IF NOT EXISTS departments(
            department_id INT AUTO_INCREMENT PRIMARY KEY ,department_name VARCHAR(255))`,
            (err,results)=>{
                if(err){
                    console.log(err)
                }else{
                    connection.query(`CREATE TABLE IF NOT EXISTS students(
                        student_id INT AUTO_INCREMENT PRIMARY KEY ,student_name VARCHAR(255) NOT NULL, 
                        email VARCHAR(255) UNIQUE ,department_id  INT,
                         FOREIGN KEY(department_id) REFERENCES departments(department_id))`,
                         (err,results)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log("Table created successfully")
                            }
                         })
                }
            })
} 

module.exports=createTables
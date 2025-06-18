const conn = require('../config/connection');// import the connection function from the config folder

exports.fetchAllExams = () => // to export the function or api 
{
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM exam", (err, result) => {
      if (err) return reject(err);  // if my query is fulfill then it will return the result
      resolve(result);
    });
  });
};

exports.addExam = (name, total, passing) => //for adding new exam
{
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO exam (exname, totalmark, passingmark) VALUES (?, ?, ?)", [name, total, passing], (err, result) => {
      if (err) return reject(err);// same as above comment
      resolve(result);
    });
  });
};

exports.deleteExam = (id) => // if user want to delete the exam
    {
  return new Promise((resolve, reject) =>// same as above comment
     {
    conn.query("DELETE FROM exam WHERE ex_id = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Optional
exports.updateExam = (id, name, total, passing) => { //update exam 
  return new Promise((resolve, reject) => { 
    conn.query("UPDATE exam SET exname = ?, totalmark = ?, passingmark = ? WHERE ex_id = ?", [name, total, passing, id], (err, result) => {
      if (err) return reject(err); 
      resolve(result);//if my query is fulfill then it will return the result
    });
  });
};

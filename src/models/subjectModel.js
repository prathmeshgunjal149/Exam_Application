const conn = require('../config/connection');// database connection

const fetchAllSubjects = () => // get the list of all subjects
    {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM course', (err, results) => {
      if (err) return reject(err);// if the requirement is not met, reject the promise
      resolve(results);// if the requirement is met, resolve the promise
    });
  });
};

const addSubject = (cname) => // to add the subject
    {
  return new Promise((resolve, reject) => 
    {
    conn.query('INSERT INTO course (cname) VALUES (?)', [cname], (err, result) => {
      if (err) return reject(err);// if the requirement is not met, reject the promise
      resolve(result);
    });
  });
};

//  This must be declared BEFORE export
const deleteSubject = (cid) => //for deleting the subject
 {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM course WHERE cid = ?", [cid], (err, result) => {
      if (err) return reject(err);// if the requirement is not met, reject the promise
      resolve(result);// if the requirement is met, resolve the subject
    });
  });
};

// Export all at once (including deleteSubject)
module.exports = {
  fetchAllSubjects,// export the function to disply all the subjects 
  addSubject, // export the function to add the subject
  deleteSubject // export the function to delete the subject
};

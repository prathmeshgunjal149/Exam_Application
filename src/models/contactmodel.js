const conn = require('../config/connection'); // your MySQL connection file

const saveContact = (name, email, phone) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO contact (name, email, phone) VALUES (?, ?, ?)';
    conn.query(query, [name, email, phone], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  saveContact
};

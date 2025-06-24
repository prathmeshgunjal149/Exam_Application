const conn = require("../config/connection");

exports.getStudentResultBySchedule = (sid, schid) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT q.qname, q.correctop, ... FROM question q ... WHERE ...`;
    conn.query(sql, [sid, schid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

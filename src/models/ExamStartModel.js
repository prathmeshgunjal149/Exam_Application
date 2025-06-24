const conn = require("../config/connection");

exports.getQuestionsBySchedule = (schid) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT q.qid, q.qname, q.op1, q.op2, q.op3, q.op4
      FROM schedule s
      JOIN coursequestionjoin cqj ON cqj.cid = s.cid
      JOIN question q ON q.qid = cqj.qid
      WHERE s.schid = ?
    `;

    conn.query(sql, [schid], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

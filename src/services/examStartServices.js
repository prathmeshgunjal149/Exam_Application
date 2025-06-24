const conn = require("../config/connection");

exports.fetchQuestionsBySchedule = (schid) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT q.qid, q.qname, q.op1, q.op2, q.op3, q.op4, q.answer AS correctop
      FROM schedule s
      JOIN coursequestionjoin cqj ON s.cid = cqj.cid
      JOIN question q ON cqj.qid = q.qid
      WHERE s.schid = ?
    `;
    conn.query(sql, [schid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getCorrectAnswers = (qids) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT qid, correct FROM question WHERE qid IN (?)`;
    conn.query(sql, [qids], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

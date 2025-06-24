const conn = require('../config/connection');


const addQuestion = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO question (qname, op1, op2, op3, op4, answer) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.qname, data.op1, data.op2, data.op3, data.op4, data.answer];

    conn.query(sql, values, (err, result) => {
      if (err) return reject(err);

      const qid = result.insertId;
      const joinSql = `INSERT INTO coursequestionjoin (qid, cid) VALUES (?, ?)`;
      conn.query(joinSql, [qid, data.cid], (err2) => {
        if (err2) return reject(err2);
        resolve({ questionId: qid });
      });
    });
  });
};

const getPaginatedQuestions = (limit, offset) => {
  const sql = `
    SELECT q.*, c.cname 
    FROM question q 
    JOIN coursequestionjoin cqj ON q.qid = cqj.qid
    JOIN course c ON cqj.cid = c.cid
    LIMIT ? OFFSET ?
  `;
  return conn.promise().query(sql, [limit, offset]);
};

const getTotalQuestionCount = () => {
  return conn.promise().query(`SELECT COUNT(*) AS count FROM question`);
};

const deleteQuestion = (qid) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM coursequestionjoin WHERE qid = ?", [qid], (err1) => {
      if (err1) return reject(err1);
      conn.query("DELETE FROM question WHERE qid = ?", [qid], (err2, result) => {
        if (err2) return reject(err2);
        resolve(result);
      });
    });
  });
};

const getQuestionById = (qid) => {
  const sql = `
    SELECT q.*, c.cid 
    FROM question q 
    JOIN coursequestionjoin cqj ON q.qid = cqj.qid
    JOIN course c ON cqj.cid = c.cid
    WHERE q.qid = ?
  `;
  return conn.promise().query(sql, [qid]);
};

const updateQuestion = (qid, data) => {
  return new Promise((resolve, reject) => {
    const updateSql = `
      UPDATE question 
      SET qname = ?, op1 = ?, op2 = ?, op3 = ?, op4 = ?, answer = ?
      WHERE qid = ?
    `;
    const values = [data.qname, data.op1, data.op2, data.op3, data.op4, data.answer, qid];

    conn.query(updateSql, values, (err) => {
      if (err) return reject(err);

      const joinSql = `UPDATE coursequestionjoin SET cid = ? WHERE qid = ?`;
      conn.query(joinSql, [data.cid, qid], (err2) => {
        if (err2) return reject(err2);
        resolve();
      });
    });
  });
};

module.exports = {
  addQuestion,
  getPaginatedQuestions,
  getTotalQuestionCount,
  deleteQuestion,
  getQuestionById,
  updateQuestion
};

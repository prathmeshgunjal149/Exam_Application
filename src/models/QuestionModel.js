const conn = require('../config/connection');

// Add a new question and link to course
const addQuestion = (data) => {
  return new Promise((resolve, reject) => {
    // Step 1: Insert question
    const questionSql = `INSERT INTO question (qname, op1, op2, op3, op4, answer) VALUES (?, ?, ?, ?, ?, ?)`;
    const questionValues = [data.qname, data.op1, data.op2, data.op3, data.op4, data.answer];

    conn.query(questionSql, questionValues, (err, result) => {
      if (err) return reject(err);
      const insertedQid = result.insertId;

      // Step 2: Link question to course
      const joinSql = `INSERT INTO coursequestionjoin (qid, cid) VALUES (?, ?)`;
      conn.query(joinSql, [insertedQid, data.cid], (err2, result2) => {
        if (err2) return reject(err2);
        resolve({ questionId: insertedQid, joinResult: result2 });
      });
    });
  });
};

// Get all questions with course name
const getAllQuestions = () => {
  const sql = `
    SELECT q.*, c.cname 
    FROM question q 
    JOIN coursequestionjoin cqj ON q.qid = cqj.qid
    JOIN course c ON cqj.cid = c.cid
  `;

  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete a question by its ID
const deleteQuestion = (qid) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM question WHERE qid = ?", [qid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  addQuestion,
  getAllQuestions,
  deleteQuestion,
};

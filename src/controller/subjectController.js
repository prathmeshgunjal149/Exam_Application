const subjectModel = require('../models/subjectModel');// importing the subject model

exports.getSubjects = (req, res) => // get all subjects
    
    {
  subjectModel.fetchAllSubjects()
    .then(subjects => res.render('subject', { subjects })) // render the subject page with all subjects
    .catch(err => res.send("Error loading subjects"));
};

exports.postAddSubject = (req, res) => // add a new subject
    {
  const { cname } = req.body; // get the name of the subject from the request body
  subjectModel.addSubject(cname)
    .then(() => res.redirect('/subject'))
    .catch(err => res.send("Failed to add subject"));
};
//  POST delete handler (not GET)
exports.postDeleteSubject = (req, res) =>  // delete a subject
    {
  const cid = req.params.id; // get the id of the subject from the request params
  console.log("Deleting course with cid:", cid); // log the id of the subject to be deleted
  subjectModel.deleteSubject(cid)
    .then(() => res.redirect('/subject')) // redirect to the subject page after deletion
    .catch(err => res.send("Failed to delete subject")); // send an error message if deletion fails
};

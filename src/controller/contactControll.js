const contactModel = require('../models/contactmodel');

const contactForm = (req, res) => {
  res.render('contact'); // renders contact.ejs page
};

const handleContactSubmission = (req, res) => {
  const { name, email, phone } = req.body;

  contactModel.saveContact(name, email, phone)
    .then(() => {
      res.send('Thank you for contacting us!');
    })
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        res.send('This email is already used!');
      } else {
        res.status(500).send('Something went wrong!');
      }
    });
};

module.exports = {
  contactForm,
  handleContactSubmission
};

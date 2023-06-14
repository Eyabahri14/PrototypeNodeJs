const yup = require('yup');

const tutorialSchema = yup.object().shape({
  title: yup.string().max(8).required("Le titre est requis."),
  description: yup.string().matches(/^\d+$/|/^[!@#$%^&*()]+$/),
  published: yup.boolean().optional(),
});

module.exports = tutorialSchema;
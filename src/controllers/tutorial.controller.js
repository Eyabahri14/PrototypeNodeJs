const Tutorial = require("../models/tutorial.model");
const tutorialValidation = require("../validations/TutorialValidation.js");

const validateTutorialInputs=async(req, res, next) =>{
  try {
    await tutorialValidation.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', error: error.message });
  }
}

const create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Le titre ne peut pas être vide." });
  }

  // Vérifier si une image a été téléchargée
  if (!req.file) {
    return res.status(400).send({ message: "Veuillez sélectionner une image." });
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
    image: req.file.filename // Récupérer le nom du fichier d'image depuis req.file
  });

  try {
    const data = await tutorial.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la création du tutoriel."
    });
  }
};


const findAll = async (req, res) => {
  try {
    const data = await Tutorial.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Une erreur est survenue lors de la récupération des tutoriels."
    });
  }
};


const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findById(id);
    if (!data) {
      res.status(404).send({ message: "Aucun tutoriel trouvé "});
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Une erreur est survenue " });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Données de mise à jour manquantes." });
  }

  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({ message: `Tutoriel introuvable avec l'identifiant ${id}.` });
    } else {
      res.send({ message: "Tutoriel mis à jour avec succès." });
    }
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de la mise à jour " });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndRemove(id);
    if (!data) {
      res.status(404).send({ message: `Tutoriel introuvable avec l'identifiant ${id}.` });
    } else {
      res.send({ message: "Tutoriel supprimé avec succès." });
    }
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de la suppression du tutoriel avec l'identifiant " + id });
  }
};


module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  validateTutorialInputs
};

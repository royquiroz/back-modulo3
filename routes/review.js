const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Place = require("../models/Place");

router.post("/", (req, res) => {
  Review.create(req.body)
    .then(review => {
      Place.findByIdAndUpdate(review.place, {
        $push: { reviews: review._id }
      }).then(() => {
        res.status(201).json({
          review,
          msg: "Reseña creada exitosamente"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "No se pudo crear la reseña"
      });
    });
});

router.patch("/:id", (req, res) => {
  if (req.body.comment.length <= 0)
    res
      .status(500)
      .json({ msg: "El campo de comentarios no puede estar vacio" });

  Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(review => {
      res.status(202).json({
        review,
        msg: "La reseña se actualizo correctamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al actualizar la reseña"
      });
    });
});

router.delete("/:id", (req, res) => {
  Review.findByIdAndUpdate(req.params.id, { delete: true })
    .then(() => {
      res.status(200).json({
        msg: `Reseña con el id: ${req.params.id} eliminada con exitò`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al eliminar la reseña"
      });
    });
});

module.exports = router;

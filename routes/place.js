const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const User = require("../models/User");
const auth = require("../helpers/auth");
const upload = require("../helpers/multer");

router.post("/", auth.verifyToken, upload.array("photos"), (req, res) => {
  Place.create(req.body)
    .then(place => {
      User.findByIdAndUpdate(place.lessee, {
        $push: { places: place._id }
      }).then(() => {
        res.status(201).json({
          place,
          msg: "Ubicacion creada con exito"
        });
      });
    })
    .catch(err => {
      res.json.status(500).json({
        err,
        msg: "Error al crear la ubicacion"
      });
    });
});

router.get("/", (req, res) => {
  Place.find({ delete: false })
    .populate("lessee", "name last_name role profile_pic")
    .then(places => {
      res.status(200).json({
        places,
        msg: `Ubicaciones encontradas ${places.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al buscar las ubicaciones"
      });
    });
});

router.get("/:id", (req, res) => {
  Place.findById(req.params.id)
    .populate("lessee", "name last_name role profile_pic")
    .populate("reviews", "client raiting comment")
    .then(place => {
      res.status(200).json({
        place,
        msg: `Ubicacion con el id: ${req.params.id} encontrada`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al encontrar las ubicacion"
      });
    });
});

router.patch("/:id", auth.verifyToken, (req, res) => {
  Place.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then(place => {
    res
      .status(200)
      .json({
        place,
        msg: `Ubicacion con el id: ${req.params.id} editada`
      })
      .catch(err => {
        res.status(500).json({
          err,
          msg: "Error al encontrar la ubicacion"
        });
      });
  });
});

router.delete("/:id", auth.verifyToken, (req, res) => {
  Place.findByIdAndUpdate(req.params.id, { delete: true })
    .then(() => {
      res.status(200).json({
        msg: `Ubicacion con el id: ${req.params.id} eliminada con exitò`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al eliminar la ubicacion"
      });
    });
});

module.exports = router;

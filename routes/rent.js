const express = require("express");
const router = express.Router();
const Rent = require("../models/Rent");
const Place = require("../models/Place");
const User = require("../models/User");

router.post("/", (req, res) => {
  Rent.create(req.body).then(rent => {
    Place.findByIdAndUpdate(rent.place, {
      $push: { rents: rent._id }
    }).then(place => {
      User.findByIdAndUpdate(rent.lessee, {
        $push: { rents: rent._id }
      })
        .then(() => {
          res.status(201).json({
            rent,
            place,
            msg: "Solicitud de renta enviada exitosamente"
          });
        })
        .catch(err => {
          res.status(500).json({
            err,
            msg: "No se pudo realizar la solicitud de renta"
          });
        });
    });
  });
});

module.exports = router;

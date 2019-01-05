const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");

router.post("/", (req, res) => {
  const sender_id = req.body.sender;
  const received_id = req.body.addressee;

  Message.create(req.body).then(message => {
    User.findByIdAndUpdate(sender_id, {
      $push: { sent: message._id }
    })
      .then(() => {
        User.findByIdAndUpdate(received_id, {
          $push: { received: message._id }
        }).then(() => {
          res.status(200).json({
            err: false,
            msg: "Mensaje enviado exitosamente"
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          msg: "No se pudo enviar el mensaje"
        });
      });
  });
});

router.get("/sender/:id", (req, res) => {
  console.log(req.params.id);

  Message.find({ sender: req.params.id })
    .populate("addressee", "name last_name profile_pic")
    .then(messages => {
      res.status(200).json({
        messages,
        msg: `Mensajes encontrados ${messages.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al buscar los mensajes"
      });
    });
});

router.get("/addressee/:id", (req, res) => {
  Message.find({ addressee: req.params.id })
    .populate("sender", "name last_name profile_pic")
    .then(messages => {
      res.status(200).json({
        messages,
        msg: `Mensajes encontrados ${messages.length}`
      });
    })
    .catch(err => {
      res.status(500).json({
        err,
        msg: "Error al buscar los mensajes"
      });
    });
});

module.exports = router;

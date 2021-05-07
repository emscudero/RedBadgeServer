let express = require("express");
let router = express.Router();
const validateSession = require("../middleware/validate-session");
const { Babylist } = require("../models");

router.post("/create", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "user") {
    const babyListEntry = {
      brand: req.body.babylist.brand,
      title: req.body.babylist.title,
      quantity: req.body.babylist.quantity,
      price: req.body.babylist.price,
      store: req.body.babylist.store,
      photo: req.body.babylist.photo,
      userId: req.user.id,
    };
    Babylist.create(babyListEntry)
      .then((babylist) => res.status(200).json(babylist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.get("/", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "user") {
    Babylist.findAll({
      where: { userId: req.user.id },
      include: "user",
    })
      .then((babyList) => res.status(200).json(babyList))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.put("/update/:id", validateSession, function (req, res) {
  if (req.user.role === "admin" || req.user.role === "user") {
    const updateEntry = {
      brand: req.body.babylist.brand,
      title: req.body.babylist.title,
      quantity: req.body.babylist.quantity,
      price: req.body.babylist.price,
      store: req.body.babylist.store,
      photo: req.body.babylist.photo,
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Babylist.update(updateEntry, query)
      .then((babylist) => res.status(200).json(babylist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.delete("/delete/:id", validateSession, function (req, res) {
  if (req.user.role === "admin") {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    Babylist.destroy(query)
      .then(() => res.status(200).json({ message: "Item Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not an Admin" });
  }
});

module.exports = router;

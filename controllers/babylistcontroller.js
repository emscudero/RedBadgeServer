let express = require("express");
let router = express.Router();
const validateSession = require("../middleware/validate-session");
const { Babylist } = require("../models");

router.post("/create", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "subscriber") {
    const babyListEntry = {
      brand: req.body.babylist.brand,
      title: req.body.babylist.title,
      price: req.body.babylist.price,
      store: req.body.babylist.store,
      userId: req.user.id,
    };
    Babylist.create(babyListEntry)
      .then((babylist) => res.status(200).json(babylist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a subscriber" });
  }
});

router.get("/", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "subscriber") {
    Babylist.findAll({
      where: { userId: req.user.id },
      include: "user",
    })
      .then((babylist) => res.status(200).json(babylist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a subscriber" });
  }
});

router.put("/update/:id", validateSession, function (req, res) {
  if (req.user.role === "admin" || req.user.role === "subscriber") {
    const updateEntry = {
      brand: req.body.babylist.brand,
      title: req.body.babylist.title,
      price: req.body.babylist.price,
      store: req.body.babylist.store,
    };

    const query = { where: { id: req.params.id, userId: req.user.id } };

    Babylist.update(updateEntry, query)
      .then((babylist) => res.status(200).json(babylist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a subscriber" });
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

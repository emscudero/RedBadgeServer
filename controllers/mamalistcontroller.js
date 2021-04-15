let express = require("express");
let router = express.Router();
const validateSession = require("../middleware/validate-session");
const { Mamalist } = require("../models");

router.post("/create", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "user") {
    const mamaListEntry = {
      brand: req.body.mamalist.brand,
      title: req.body.mamalist.title,
      price: req.body.mamalist.price,
      store: req.body.mamalist.store,
      userId: req.user.id,
    };
    Mamalist.create(mamaListEntry)
      .then((mamalist) => res.status(200).json(mamalist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.get("/", validateSession, (req, res) => {
  if (req.user.role === "admin" || req.user.role === "user") {
    Mamalist.findAll({
      where: { userId: req.user.id },
      include: "user",
    })
      .then((mamalist) => res.status(200).json(mamalist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.put("/update/:id", validateSession, function (req, res) {
  if (req.user.role === "admin" || req.user.role === "user") {
    const updateEntry = {
      brand: req.body.mamalist.brand,
      title: req.body.mamalist.title,
      price: req.body.mamalist.price,
      store: req.body.mamalist.store,
    };
    console.log(req.user.id);
    console.log(req.params.id);
    console.log(updateEntry);
    const query = {
      where: { id: req.params.id, userId: req.user.id },
    };

    Mamalist.update(updateEntry, query)
      .then((mamalist) => res.status(200).json(mamalist))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not a User" });
  }
});

router.delete("/delete/:id", validateSession, function (req, res) {
  if (req.user.role === "admin") {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    Mamalist.destroy(query)
      .then(() => res.status(200).json({ message: "Item Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.json({ message: "Not an Admin" });
  }
});

module.exports = router;

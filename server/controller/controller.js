var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res
      .status(400)
      .send({ message: "Seriously dude? Content cannot be empty!" });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    whisper: req.body.whisper,
    confidence: req.body.confidence,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Hmm! Error Occurred :(" });
    });
};

// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Hmm Whisper not found!" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Hmm! Error :(" });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Hmm! Error Occurred :(" });
      });
  }
};

// update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Seriously? Fill the data!" });
  }

  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Whisper not found!" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error! the errors dude :(" });
    });
};

// delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Uh-oh! Cannot delete" });
      } else {
        res.send({ Message: " Hmm! Whisper deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete the Whisper! :0" });
    });
};

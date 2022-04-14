const Student = require("../models/student.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const s = new Student({
        name: req.body.name,
        gender: req.body.gender,
        DOB: req.body.DOB,
        specialized: req.body.specialized
    });

    Student.create(s, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student"
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Student.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving student with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Student.updateById(
      req.params.id,
      new Student(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Student.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Student with id " + req.params.id
          });
        }
      } else res.send({ message: `Student was deleted successfully!` });
    });
  };
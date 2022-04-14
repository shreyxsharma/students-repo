const sql = require("./db.js");
// constructor
const Student = function(student) {
    this.name = student.name;
    this.gender = student.gender;
    const date = new Date(student.DOB).toJSON().slice(0, 10)
    this.DOB = date;
    this.specialized = student.specialized;
    
};

Student.create = (newStudent, result) => {
  console.log('newStudent: ', newStudent)
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created student: ", { id: res.insertId, ...newStudent });
      result(null, { id: res.insertId, ...newStudent });
    });
  };

Student.getAll = (result) => {
  let query = "SELECT * FROM students";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Student.findById = (id, result) => {
  sql.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE students SET name = ?, gender = ?, DOB = ?, specialized = ? WHERE id = ?",
    [student.name, student.gender, student.DOB, student.specialized , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

module.exports = Student;
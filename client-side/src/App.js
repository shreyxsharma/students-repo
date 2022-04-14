import React, { Component, useState } from "react";
import StudentDataService from "./services/student.service";
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        students: [],
        formValue: {
          name: '',
          gender: '',
          DOB: '',
          specialized: ''
        }
    
    };
  }
  
  componentDidMount(){
    this.fetchAllStudents();
  }

  fetchAllStudents() {
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSubmit = async(e) => {
    console.log(this.state)
    var data = {
      'name' : this.state.name,
      'gender': this.state.gender,
      'DOB': this.state.dob,
      'specialized': this.state.specialized
    }

    StudentDataService.create(data)
    .then((err) => console.log(err))
    .catch(error => console.log(error))   
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Specialization</th>
              </tr>
            {this.state.students.map(student => 
              <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{Date(student.DOB)}</td>
                <td>{student.specialized}</td>
              </tr>
              )}
            </table>
            <form >
              <p>Add a new student form</p>
                <input
                  name="name"
                  placeholder="enter an name"
                  onChange={this.handleChange}
                />
                <select name="gender" onChange={this.handleChange}>
                  <option disabled selected value> -- select a gender -- </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="X">Nonbinary</option>
                </select>
                <input
                  type="date"
                  name="dob"
                  placeholder="enter a date of birth"
                  onChange={this.handleChange}
                />
                <input
                  name="specialized"
                  placeholder="enter an specialization"
                  onChange={this.handleChange}
                />
              <button onClick={this.handleSubmit}>
                Add
              </button>
          </form>
          </header>
        </div>
      );
    }
  
}

export default App;

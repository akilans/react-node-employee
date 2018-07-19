import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"
import "./dashboard.css"
import Auth from "../auth"

/*
const employees = [
  {
    "id": 1,
    "name": "Employee1",
    "location": "Bangalore",
    "role": "Manager"
  },
  {
    "id": 2,
    "name": "Employee2",
    "location": "Pune",
    "role": "Lead"
  },
  {
    "id": 3,
    "name": "Employee3",
    "location": "Hyderabad",
    "role": "Senior"
  }
];
*/

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      redirect: false,
      deleteEmployee_error: ""
    };
  }

  UNSAFE_componentWillMount() {

    if (!Auth.isAuthenticated()) {
      this.setState({
        redirect: true
      });
    }
    window.displayStyle();

  }

  componentDidMount() {
    this.getEmployees();
  }

  deleteEmp(id){

      let url = `${process.env.REACT_APP_API_URL}/deleteEmployee/${id}`;


      fetch(url, {
        method: 'get',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getToken()
        }
      })
        .then((response) => {
          if (response.status === 403) {
            localStorage.removeItem("token_data")
            this.setState({
              redirect: true
            });
            console.log("Access Denied");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if(data.error){
            this.setState({
              deleteEmployee_error:"Failed to delete Employee"
            })
          }else{
            this.getEmployees();
          }
        }).catch((err) => console.log(err))
  }

  getEmployees() {
    fetch(`${process.env.REACT_APP_API_URL}/getEmployees`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      }
    })
      .then((response) => {
        if (response.status === 403) {
          localStorage.removeItem("token_data")
          this.setState({
            redirect: true
          });
          console.log("Access Denied");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.employees); // Getting array from object
        this.setState({
          employees: data.employees,
          redirect: false
        });
      }).catch((err) => console.log(err))
  }


  render() {

    if (this.state.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div>

        <div className="float-right addEmployeeButton">
          <Link to="/addEmployee" className="btn btn-success" replace>Add Employee</Link>
        </div>

        {this.state.deleteEmployee_error ?
          <div className="alert alert-danger" role="alert">
              {this.state.deleteEmployee_error}
          </div> : ""
        }


        <table className="table table-hover employee-table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((emp, index) => (
              <tr key={index}>
                <th>{emp.id}</th>
                <td>{emp.name}</td>
                <td>{emp.location}</td>
                <td>{emp.role}</td>
                <td>
                  <Link to={`/editEmployee/${emp.id}`} className="btn btn-primary" replace>Edit</Link>
                  <button type="button" className="btn btn-danger" onClick={(e)=>this.deleteEmp(emp._id)} >Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    )
  }
}

export default index

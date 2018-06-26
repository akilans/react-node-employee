import React, { Component } from 'react'
import "./dashboard.css"

const employees = [
  {
    "id":1,
    "name": "Employee1",
    "location": "Bangalore",
    "role": "Manager"
  },
  {
    "id":2,
    "name": "Employee2",
    "location": "Pune",
    "role": "Lead"
  },
  {
    "id":3,
    "name": "Employee3",
    "location": "Hyderabad",
    "role": "Senior"
  }
];

class index extends Component {

  render() {
    return (
      <div>
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
              {employees.map((emp, index) => (
                <tr>
                  <th>{emp.id}</th>
                  <td>{emp.name}</td>
                  <td>{emp.location}</td>
                  <td>{emp.role}</td>
                  <td>
                  <button type="button" className="btn btn-primary">Edit</button>
                  <button type="button" className="btn btn-danger">Delete</button>
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
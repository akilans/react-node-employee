import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"
import Auth from "../auth"
import "./form.css"

export default class index extends Component {

    constructor(props) {
        super(props);
        this.editEmployeeAction = this.editEmployeeAction.bind(this);
        this.state = {
            editEmployee_error: "",
            employee: [],
            redirect: false
        };
    }

    componentWillMount() {

        if (!Auth.isAuthenticated()) {
            this.setState({
                redirect: true
            });
        }
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('dashboardLink').style.display = 'block';
        document.getElementById('logoutLink').style.display = 'block';
        

    }

    componentDidMount(){
        this.getEmployee();
        
    }

    getEmployee() {
        let emp_id = this.props.match.params.id;
        let url = `http://localhost:5000/api/getEmployee/${emp_id}`;

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
            console.log(data.employee); // Getting array from object
            this.setState({
              employee: data.employee,
              redirect: false
            });
          }).catch((err) => console.log(err))
      }



    editEmployeeAction(e){
        e.preventDefault();

        let emp_id = this.refs.emp_id.value;
        let emp_name = this.refs.emp_name.value;
        let emp_location = this.refs.emp_location.value;
        let emp_role = this.refs.emp_role.value;
        let emp_email = this.refs.emp_email.value;
        let emp_ext = this.refs.emp_ext.value;

        let emp_data = {
            emp_id: emp_id,
            emp_name: emp_name,
            emp_location: emp_location,
            emp_role: emp_role,
            emp_email: emp_email,
            emp_ext: emp_ext
        }

        fetch('http://localhost:5000/api/editEmployee', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken()
            },
            body: JSON.stringify(emp_data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log("Failed");
                    this.setState({
                        editEmployee_error: "Edit Employee failed"
                    });
                } else {
                    console.log("Success");
                    this.props.history.push('/dashboard');
                }
            })
    }



    
    render() {

        

        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className="container">
                <div className="container">

                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col-8 edit-employee-form">

                       
                        {this.state.employee.map((emp, index) => (
                            
                              <p key={index} >{emp.id}
                              {emp.name}
                              {emp.location}
                              {emp.role}</p>
                              
                          ))}

                            <div className="card">
                                <div className="card-header">Add Employee</div>
                                {this.state.editEmployee_error ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.editEmployee_error}
                                    </div> : ""
                                }

                                <div className="card-body">
                                    <form onSubmit={this.editEmployeeAction}>
                                        <div className="form-group">
                                            <label htmlFor="emp_id">ID</label>
                                            <input type="text" className="form-control" id="emp_id" placeholder="Enter ID" ref="emp_id" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emp_name">Name</label>
                                            <input type="text" className="form-control" id="emp_name" placeholder="Enter Name" ref="emp_name" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emp_location">Location</label>
                                            <input type="text" className="form-control" id="emp_location" placeholder="Enter Location" ref="emp_location" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emp_role">Role</label>
                                            <input type="text" className="form-control" id="emp_role" placeholder="Enter Role" ref="emp_role" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emp_email">Email</label>
                                            <input type="text" className="form-control" id="emp_email" placeholder="Enter Email" ref="emp_email" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emp_ext">Extention</label>
                                            <input type="text" className="form-control" id="emp_ext" placeholder="Enter Extention" ref="emp_ext" />
                                        </div>

                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                    </form>
                                </div>

                            </div>




                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

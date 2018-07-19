import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import Auth from "../auth"
import "./form.css"

export default class index extends Component {

    constructor(props) {
        super(props);
        this.addEmployeeAction = this.addEmployeeAction.bind(this);
        this.state = {
            addEmployee_error: "",
            redirect: false
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

    addEmployeeAction(e){
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

        fetch(`${process.env.REACT_APP_API_URL}/addEmployee`, {
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
                        addEmployee_error: "Add Employee failed"
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
                        <div className="col-8 add-employee-form">


                            <div className="card">
                                <div className="card-header">Add Employee</div>
                                {this.state.addEmployee_error ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.addEmployee_error}
                                    </div> : ""
                                }

                                <div className="card-body">
                                    <form onSubmit={this.addEmployeeAction}>
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

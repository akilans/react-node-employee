import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import Auth from "../auth"
import "./form.css"

export default class index extends Component {

    constructor(props) {
        super(props);
        this.editEmployeeAction = this.editEmployeeAction.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            editEmployee_error: "",
            employee: [],
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

    componentDidMount() {
        this.getEmployee();
    }

    getEmployee() {
        let emp_id = this.props.match.params.id;
        let url = `${process.env.REACT_APP_API_URL}/getEmployee/${emp_id}`;

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
                console.log("Printing state");
                console.log(this.state.employee[0]);
            }).catch((err) => console.log(err))
    }


    handleInputChange() {
 
        let emp_uid = this.refs.emp_uid.value;
        let emp_id = this.refs.emp_id.value;
        let emp_name = this.refs.emp_name.value;
        let emp_location = this.refs.emp_location.value;
        let emp_role = this.refs.emp_role.value;
        let emp_email = this.refs.emp_email.value;
        let emp_ext = this.refs.emp_ext.value;

        let emp_data = [{
            emp_uid: emp_uid,
            emp_id: emp_id,
            emp_name: emp_name,
            emp_location: emp_location,
            emp_role: emp_role,
            emp_email: emp_email,
            emp_ext: emp_ext
        }]

        this.setState({
            employee: emp_data
        })

    }


    editEmployeeAction(e) {
        e.preventDefault();

        let emp_uid = this.refs.emp_uid.value;
        let emp_id = this.refs.emp_id.value;
        let emp_name = this.refs.emp_name.value;
        let emp_location = this.refs.emp_location.value;
        let emp_role = this.refs.emp_role.value;
        let emp_email = this.refs.emp_email.value;
        let emp_ext = this.refs.emp_ext.value;

        let emp_data = {
            emp_uid: emp_uid,
            emp_id: emp_id,
            emp_name: emp_name,
            emp_location: emp_location,
            emp_role: emp_role,
            emp_email: emp_email,
            emp_ext: emp_ext
        }

        fetch(`${process.env.REACT_APP_API_URL}/editEmployee`, {
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

                                <div key={index} className="card">
                                    <div className="card-header">Edit Employee</div>
                                    {this.state.editEmployee_error ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.editEmployee_error}
                                        </div> : ""
                                    }

                                    <div className="card-body">
                                        <form onSubmit={this.editEmployeeAction}>
                                            <input type="hidden" id="emp_uid" ref="emp_uid" defaultValue={emp._id} onChange={this.handleInputChange} />
                                            <div className="form-group">
                                                <label htmlFor="emp_id">ID</label>
                                                <input type="text" className="form-control" id="emp_id" placeholder="Enter ID" ref="emp_id" defaultValue={emp.id} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emp_name">Name</label>
                                                <input type="text" className="form-control" id="emp_name" placeholder="Enter Name" ref="emp_name" defaultValue={emp.name} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emp_location">Location</label>
                                                <input type="text" className="form-control" id="emp_location" placeholder="Enter Location" ref="emp_location" defaultValue={emp.location} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emp_role">Role</label>
                                                <input type="text" className="form-control" id="emp_role" placeholder="Enter Role" ref="emp_role" defaultValue={emp.role} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emp_email">Email</label>
                                                <input type="text" className="form-control" id="emp_email" placeholder="Enter Email" ref="emp_email" defaultValue={emp.email} onChange={this.handleInputChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emp_ext">Extention</label>
                                                <input type="text" className="form-control" id="emp_ext" placeholder="Enter Extention" ref="emp_ext" defaultValue={emp.ext} onChange={this.handleInputChange} />
                                            </div>

                                            <button type="submit" className="btn btn-primary" >Submit</button>
                                        </form>
                                    </div>

                                </div>

                            ))}


                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

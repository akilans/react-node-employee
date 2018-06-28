import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import "./login.css"

class index extends Component {

    constructor() {
        super();
        this.loginAction = this.loginAction.bind(this);
        this.state = {
            login_error: "",
            redirect:false
        }
    }

    componentWillMount(){
        console.log(localStorage.getItem("token_data"));
        if(localStorage.getItem("token_data")){
            this.setState({
                redirect:true
            });
        }else{
            document.getElementById('dashboardLink').style.display = 'none';
            document.getElementById('logoutLink').style.display = 'none';
        }
    }

    loginAction(e) {
        e.preventDefault();

        let user_name = this.refs.user_name.value;

        let login_data = {
            user_name: user_name,
            password: this.refs.password.value
        }

        fetch('http://localhost:5000/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        login_error: "Login failed"
                    });
                } else if (data.token) {
                    let token_data={
                        user:user_name,
                        token:data.token
                    };
                    localStorage.setItem("token_data", JSON.stringify(token_data));
                    this.setState({
                        login_error: "",
                        redirect:true
                    });
                }
            })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/dashboard' />;
        }

        return (
            <div className="container">
                <div className="container">

                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col-5 login-form">


                            <div className="card">
                                <div className="card-header">Login</div>
                                {this.state.login_error ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.login_error}
                                    </div> : ""
                                }

                                <div className="card-body">
                                    <form onSubmit={this.loginAction}>
                                        <div className="form-group">
                                            <label htmlFor="userName">User Name</label>
                                            <input type="text" className="form-control" id="userName" placeholder="Enter user name" ref="user_name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" className="form-control" id="Password" placeholder="Password" ref="password" />
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

export default index

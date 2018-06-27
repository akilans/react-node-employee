import React, { Component } from 'react'
import "./login.css"

class index extends Component {

    constructor(){
        super();
        this.loginAction = this.loginAction.bind(this);
    }

    loginAction(e){
        e.preventDefault();
        console.log("Submitted");
        console.log(this.refs);
        console.log(this.refs.user_name.value);
        console.log(this.refs.password.value)
        
    }

    render() {
        return (
            <div className="container">
                <div className="container">

                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col-5 login-form">


                            <div className="card">
                                <div className="card-header">
                                    Login
  </div>
                                <div className="card-body">
                                    <form onSubmit={this.loginAction}>
                                        <div className="form-group">
                                            <label htmlFor="userName">User Name</label>
                                            <input type="text" className="form-control" id="userName" placeholder="Enter user name" ref="user_name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" className="form-control" id="Password" placeholder="Password" ref="password"/>
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

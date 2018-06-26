import React, { Component } from 'react'
import "./login.css"

class index extends Component {
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
                                    <form>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Submit</button>
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

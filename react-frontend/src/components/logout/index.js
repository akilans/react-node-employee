import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class index extends Component {

    UNSAFE_componentWillMount(){
        localStorage.removeItem("token_data");
    }

    render() {
        return <Redirect to='/' />;
    }
}

export default index

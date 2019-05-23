import React, { Component } from "react";
import { ErrorMessage } from "../Main/Style";
import logo from "./logo/error.png";

class Error extends Component {
    render() { 
        return ( 
            <>
                <ErrorMessage>
                <p>Connection error!</p>
                <img src={logo} alt="Error"/>
                <p>Can`t get data from fixer.io!</p>
                </ErrorMessage>
            </>
         );
    }
}
 
export default Error;
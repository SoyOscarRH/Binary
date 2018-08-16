// ======================================================================
// ============          WEB APP IN REACT           =====================
// ======================================================================

import React from "react"
import ReactDOM from "react-dom"
import M from "materialize-css"

import {Header} from "../Header/Header.jsx"

import style from "./App.css"

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            SideMenu: null
        }
    }

    componentDidMount() {
        let DOMNode = document.getElementById('SideNav')
        let SideMenu = M.Sidenav.init(DOMNode, {})

        this.setState({SideMenu}) 
    }

    render() {
        return (
            <div>
                <Header />
    
                
    
            </div>
        )
    }
    
}


ReactDOM.render(<App />, document.getElementById("ReactApp"))
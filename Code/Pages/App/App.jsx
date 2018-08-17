// ======================================================================
// ============          WEB APP IN REACT           =====================
// ======================================================================

import React from "react"
import ReactDOM from "react-dom"
import M from "materialize-css"
import { HashRouter, Switch, Route } from 'react-router-dom'

import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"

import Complement1 from "../Complement1/Complement1.jsx"

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
            <React.Fragment>
                <Header />

                <main>
                    <br />
                    <Switch>
                        <Route
                            exact  = {false}
                            path   = '/FromBinarytoComplement1/' 
                            render = {(props) =>  <Complement1 {...props} />}
                        />
                    </Switch>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </main>

                <Footer />
            </React.Fragment>
        )
    }
    
}


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById("ReactApp"))
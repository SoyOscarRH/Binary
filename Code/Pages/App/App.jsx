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
            <div>
                <Header />

                <Switch>
                    {/*<Route 
                        path='/FromBase10ToBase2/:numberInBase10' 
                        render={ (props) => <FromBase10ToBase2 {...props} /> }
                    />*/}

                    <Route 
                        path='/Complement1/:numberToComplement1' 
                        render={ (props) => <Complement1 {...props} /> }
                    />

                </Switch>

                <Footer />
    
            </div>
        )
    }
    
}


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById("ReactApp"))
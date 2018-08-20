// ======================================================================
// ============          WEB APP IN REACT           =====================
// ======================================================================

import React from "react"
import ReactDOM from "react-dom"
import M from "materialize-css"
import { HashRouter, Switch, Route, Link } from 'react-router-dom'

import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"

import * as DataConverts from "../App/Converters.json"

import Complement1 from "../Complement1/Complement1.jsx"
import Complement2 from "../Complement2/Complement2.jsx"
import DecimalToBinary from "../DecimalToBinary/DecimalToBinary.jsx"
import PartialRepresentation from "../PartialRepresentation/PartialRepresentation.jsx"
import FloatingPoint from "../FloatingPoint/FloatingPoint.jsx"

import style from "./App.css"


function Home(props) {

    const ColorsForCards = [
        "indigo lighten-2",
        "cyan lighten-1",
        "green lighten-2",
        "orange lighten-2",
        "teal lighten-2",
        "brown lighten-2",
    ].sort(() => Math.random() - 0.5)

    let i = 0
    return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel white">

                    <h4 className="blue-grey-text text-darken-2 center"> Converters </h4>
                    <br />
                    {
                        DataConverts.Data.map(
                            Topic => {
                                const SubTopics = Topic.SubTypes.map(
                                    (Type) =>
                                    <div key={Type[0]} className="row"> 
                                        <Link 
                                            className={`col s10 offset-s1 btn-large waves-effect ${ColorsForCards[++i % 6]}`}
                                            to={Type[1]}>
                                            {Type[0]}
                                        </Link>
                                    </div>
                                )
                                return (
                                    <React.Fragment key={Topic.Name}>
                                        {SubTopics}
                                    </React.Fragment>
                                )
                            }
                        )
                    }
                </div> 
            </div>
        </div>
    )
}

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
                        <Route
                            exact  = {false}
                            path   = '/DecimalToBinary/'
                            render = {(props) =>  <DecimalToBinary {...props} />}
                        />
                        <Route
                            exact  = {false}
                            path   = '/FromBinarytoComplement2/' 
                            render = {(props) =>  <Complement2 {...props} />}
                        />
                        <Route
                            exact  = {true}
                            path   = '/' 
                            render = {(props) =>  <Home {...props} />}
                        />
                        <Route
                            exact  = {true}
                            path   = '/PartialRepresentation' 
                            render = {(props) =>  <PartialRepresentation {...props} />}
                        />
                        <Route
                            exact  = {true}
                            path   = '/FloatingPoint' 
                            render = {(props) =>  <FloatingPoint {...props} />}
                        />
                    </Switch>
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
import React from "react"
import {Link} from "react-router-dom"

export default function Header(props) {

    return (
        <React.Fragment>
            <div className="navbar-fixed blue-grey darken-3">
                <nav className="blue-grey darken-3">
                    <div className="nav-wrapper blue-grey darken-3 container">
                        <a className="brand-logo center" style={{fontSize: "1.3rem"}}>
                            <b>Binary</b> Conversions
                        </a>
                        <a href="" data-target="SideNav" className="sidenav-trigger show-on-large">
                            <i className="material-icons white-text">menu</i>
                        </a>
                        <a href="/" className="right" style={{height: "100%"}}>
                            <i className="material-icons">home</i>
                        </a>
                    </div>
                </nav>
            </div>

            <ul id="SideNav" className="sidenav">
                <li className="center">
                    <br />
                    <h5 style={{fontWeight: 200, fontSize: "1.9rem"}}>
                        <b>Binary</b> Conversions
                    </h5>
                </li>
				<br />

                <li><a className="subheader">Simple Conversions</a></li>
                <li>
                    <a className="waves-effect" href="#!">
                        From binary to base-10
                    </a>
                </li>
                <li>
                    <a className="waves-effect" href="#!">
                        From base-10 to binary
                    </a>
                </li>
                
                <li><div className="divider"></div></li>
                <li><a className="subheader">Negative Representations</a></li>
                <li>
                    <a className="waves-effect" href="#!">
                        Reserve bit
                    </a>
                </li>
                <li>
                    <Link className="waves-effect" to="/FromBinarytoComplement1/">
                        Complement-1
                    </Link>
                </li>
                <li>
                    <a className="waves-effect" href="#!">
                        Complement-2
                    </a>
                </li>
                <li>
                    <a className="waves-effect" href="#!">
                        Partial Representation
                    </a>
                </li>
            </ul>
        </React.Fragment>
    )
}

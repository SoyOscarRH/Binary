import React from "react"
import {toBinaryStyle, toIntegerStyle} from "../../Helpers/Binary"
import SimpleInput from "../../Components/SimpleInput"

export default class Complement2 extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            Binary: "",
            Complement2: "",
            isBinaryUp: true,
            SizeOfWord: 3,
        }
    }

    componentDidMount() {
        let buttons = document.querySelectorAll('.fixed-action-btn')
        let selectors = document.querySelectorAll('select')

        M.FloatingActionButton.init(buttons, {})
        M.FormSelect.init(selectors, {})
    }

    ConvertFromBinary(text) {
        let binary = text
        let semiComplement2 = 
            (parseInt(
                binary.replace(/ /g, "").split("").map(e => {
                    if (e !== "0" && e !== "1") return e 
                    if (e === "0") return  "1" 
                    if (e === "1") return  "0" 
                })
                .join(""),
                2
            )
            + 1
            ).toString(2)

        let numberOfZeros = text.replace(/ /g, "").length - semiComplement2.length
        let complement2 = "0".repeat(numberOfZeros > 0? numberOfZeros : 0) + semiComplement2

        return isNaN(complement2)? "" : complement2
    }

    ConvertFromComplement2(text) {
        let complement2 = text
        let semiBinary = (parseInt(complement2.replace(/ /g, ""),2) - 1).toString(2)

        let numberOfZeros = text.replace(/ /g, "").length - semiBinary.length
        semiBinary = "0".repeat(numberOfZeros > 0? numberOfZeros : 0) + semiBinary
        let binary = semiBinary.split("").map(e => {
            if (e !== "0" && e !== "1") return e 
            if (e === "0") return  "1" 
            if (e === "1") return  "0" 
        })
        .join("")

        return binary
    }

    render () {

        let Element1 =  <SimpleInput 
                            title={"Binary"}
                            materializeCSSColorText = "blue-text text-darken-1"
                            value={this.state.Binary}
                            onChange={e => {
                                this.setState({
                                    Binary: toBinaryStyle(e.target.value),
                                    Complement2: toBinaryStyle(this.ConvertFromBinary(e.target.value))
                                })
                            }}
                        />

        let Element2 =  <SimpleInput 
                        title={"Complement 2"}
                        materializeCSSColorText = "orange-text text-darken-2"
                        value={this.state.Complement2}
                        onChange={e => {
                            this.setState({
                                Complement2: toBinaryStyle(e.target.value),
                                Binary: toBinaryStyle(this.ConvertFromComplement2(e.target.value))
                            })
                        }}
                    />
        
        const Flip = e => this.setState(prevState => ({ isBinaryUp: !prevState.isBinaryUp}))
        if (!this.state.isBinaryUp) [Element1, Element2] = [Element2, Element1]

        return (
            <React.Fragment>
                <div className="row" style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
                    <div ></div>
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        
                        <div className="row">
                            <h3 style={{fontWeight: 200}}> Complement <b>2</b> </h3>
                            This is simple, just divide and save the residues
                            <br />
                            <br />
                        </div>

                        <div className="row">
                            {Element1}
                            <br />
                            {Element2}
                            <br />
                            <br />
                        </div>

                        <div className="row">
                            <p className="range-field">
                                <input 
                                    type="range"
                                    min="1"
                                    max="7"
                                    step="1"
                                    value={this.SizeOfWord}
                                    onChange={e => this.setState({SizeOfWord: parseInt(e.target.value)})}/>
                            </p>
                        </div>

                        <div className="row">
                            <table>
                                <thead>
                                <tr>
                                    <th>Binary</th>
                                    <th>Complement 2</th>
                                </tr>
                                </thead>

                                <tbody>
                                    {
                                        [...Array(2**this.state.SizeOfWord).keys()].map(
                                            (e, index) => {
                                                let elementInBinary = index.toString(2)
                                                let numberOfZeros = this.state.SizeOfWord - elementInBinary.length
                                                elementInBinary = "0".repeat(numberOfZeros > 0? numberOfZeros : 0) + elementInBinary
                                                return (
                                                    <tr key={index}>
                                                        <td>{toBinaryStyle(elementInBinary)}</td>
                                                        <td>{toBinaryStyle(this.ConvertFromBinary(elementInBinary))}</td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div ></div>
                </div>

                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red waves-effect waves-light" onClick={e=>Flip()}>
                        <i className="material-icons">autorenew</i>
                    </a>
                </div>

            </React.Fragment>
        )
    }
}
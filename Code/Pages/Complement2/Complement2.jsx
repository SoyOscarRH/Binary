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
        MathJax.Hub.Typeset()
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

        return isNaN(complement2)? "" : 
            (text.replace(/ /g, "").replace(/0/g, "") === "")? complement2.substr(1) : complement2
    }

    ConvertFromComplement2(text) {
        if (text.replace(/ /g, "").replace(/0/g, "") === "") return text
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

    ConvertFromComplent2toDecimal(text) {
        if (text.replace(/0/g, "") === "") return "+0"
        if (text.substr(1).replace(/0/g, "") === "") return "??"

        if (text.charAt(0) == "0")
            return "+" + (parseInt(text.replace(/ /g, ""), 2).toString(10))
        else {
            let semiBinary = parseInt(
                text.substr(1).replace(/ /g, "").split("").map(e => {
                    if (e !== "0" && e !== "1") return e 
                    if (e === "0") return  "1" 
                    if (e === "1") return  "0" 
                })
                .join("")
                , 2
            )
            return (semiBinary + 1) * -1
        }
        
    }

    render () {

        
        let Element1 =  
            <SimpleInput 
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

        let Element2 =  
            <SimpleInput 
                title={"Complement 2 (Bin)"}
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


        let TableOfData = 
            <table className="highlight">
                <thead>
                <tr style={{fontSize: "1.2rem"}}>
                    <th>Decimal</th>
                    <th>Complement 2 </th>
                    <th>Inverse</th>
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
                                    <tr 
                                        key={index}
                                        style={{
                                            fontSize: "1.3rem", 
                                            fontFamily: "Courier New",
                                            fontWeight: "600"
                                        }}
                                    >
                                        <td>{this.ConvertFromComplent2toDecimal(elementInBinary)}   </td>
                                        <td>{toBinaryStyle(elementInBinary)}                        </td>
                                        <td>{toBinaryStyle(this.ConvertFromBinary(elementInBinary))}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        

        return (
            <React.Fragment>
                <div className="row" style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
                    <div ></div>
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        
                        <div className="row">
                            <h3 style={{fontWeight: 200}}> Complement <b>2</b> </h3>
                                
                                <p>
                                    This is ... This is awesome.
                                </p>

                                <h5>Definition</h5>
                                <p>
                                    Let \( {`x_{2}`} \) a number in binary, then \( {`Complement_2(x)`} \)
                                    is a binary number, call it \( {`y_2`} \) such that \( {`x_2 + y_2 = 0`} \).
                                    At least in the space we have to store \( {`x_{2}, y_{2}`} \).
                                </p>

                                <p>
                                    There is a simple formula to find such it: 
                                    \( {`y_2 := Complement_1(x_2) + 1`} \).

                                    <br />
                                    This formula is really intuitive, because 
                                    \( {`x + Complement_1(x) = 1111 \\dots 1`} \), so, when you add a \( {`1`} \), all
                                    become a zero.
                                </p>

                                <p>
                                    This is a curiosity:  \( {`x = Complement_2(Complement_2(x))`} \)
                                </p>

                                <h5>Handy Tips</h5>

                                Suppose that you have a number that you know that are encoded
                                in complement 2.
                                Then to know the number that it represent follow this tips:

                                <ul className="browser-default" >
                                    <li>
                                        If the first bit is a "0": <br/>Just ignore the last bit.
                                        Your number is a positive
                                    </li>
                                    <li>
                                        If the first bit is a "1": <br/>Just ignore the last bit
                                        and do a 1 + the complement of 1 of the remaining bits.
                                        Your number is negative
                                    </li>
                                </ul>

                                <h5>Limits</h5>
                                <ul className="browser-default" >
                                    <li>
                                        Suppose we have space to store \( {`n`} \) bits, then 
                                        we have numbers from \( {`[-(2^{n-1}-1), +(2^{n-1}-1)]`} \)
                                    </li>
                                    <li>
                                        We have just 1 zero, the \( {`000\\dots00`} \)
                                    </li>
                                    <li>
                                        We have a strange case: the \( {`1000\\dots00`} \), because
                                        this number is its own inverse :v
                                    </li>
                                </ul>

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

                        <div className="row" style={{fontWeight: "200"}}>
                            <h4>N = {this.state.SizeOfWord}</h4>
                        </div>

                        <div className="row">
                            <p className="range-field">
                                <input 
                                    type="range"
                                    min="1"
                                    max="7"
                                    step="1"
                                    value={this.state.SizeOfWord}
                                    onChange={e => this.setState({SizeOfWord: parseInt(e.target.value)})}/>
                            </p>
                        </div>

                        <div className="row">
                            {TableOfData}
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
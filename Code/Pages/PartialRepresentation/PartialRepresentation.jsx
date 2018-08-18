import React from "react"
import {toBinaryStyle, toIntegerStyle} from "../../Helpers/Binary"
import SimpleInput from "../../Components/SimpleInput"

export default class PartialRepresentation extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            Binary: "",
            PartialRepresentation: "",
            SizeOfWord: 3,
        }
    }

    componentDidMount() {
        let selectors = document.querySelectorAll('select')
        M.FormSelect.init(selectors, {})
        MathJax.Hub.Typeset()
    }

    ConvertFromBinary(text) {
        let binary = text.replace(/ /g, "")
        let offSet = 2**(binary.length-1)
        let PartialRepresentation = (parseInt(binary, 2) - (offSet - 1)).toString()

        return isNaN(PartialRepresentation)? "" : 
            (PartialRepresentation.charAt(0) == "-")? 
                PartialRepresentation : "+" + PartialRepresentation 
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
                        PartialRepresentation: (this.ConvertFromBinary(e.target.value))
                    })
                }}
            />

        let Element2 =  
            <SimpleInput 
                title={"Dec-Partial Representation"}
                materializeCSSColorText = "orange-text text-darken-2"
                value={this.state.PartialRepresentation}
                onChange={() => {}}
            />


        let TableOfData = 
            <table className="highlight">
                <thead>
                <tr style={{fontSize: "1.4rem"}}>
                    <th>Binary</th>
                    <th>Partial Representation</th>
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
                                        <td>{toBinaryStyle(elementInBinary)}                        </td>
                                        <td>{this.ConvertFromBinary(elementInBinary)}</td>
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
                            <h3 style={{fontWeight: 200}}> <b>Partial</b> Representation </h3>
                                
                                <p>
                                    This is ... This is awesome.
                                </p>

                                <h5>Definition</h5>
                                <p>
                                    Is a simple formula, you have \( {`n`} \) bit to represent
                                    your numbers, so you just shift the number line,
                                    so you can represent the negatives.
                                </p>

                                <h5>Handy Tips</h5>
                                <ul className="browser-default" >
                                    <li>
                                        If the first bit is a "0": <br/>Just ignore the last bit and add \( {`1`} \).
                                        Your number is a positive
                                    </li>
                                    <li>
                                        If the first bit is a "1": <br/>Just ignore the last bit
                                        the complement of 1 of the remaining bits.
                                        Your number is negative
                                    </li>
                                </ul>

                                <h5>Limits</h5>
                                <ul className="browser-default" >
                                    <li>
                                        Suppose we have space to store \( {`n`} \) bits, then 
                                        we have numbers from \( {`[-2^{n-1}+1, 2^{n-1}]`} \)
                                    </li>
                                    <li>
                                        We have just 1 zero, the \( {`0111\\dots11`} \)
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
                                    max="8"
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

            </React.Fragment>
        )
    }
}
import React from "react"
import MathJax from 'react-mathjax-preview'

import {toBinaryStyle} from "../../Helpers/Binary"
import SimpleInput from "../../Components/SimpleInput"
import Style from "./FloatingPoint.css"

export default class FloatingPoint extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            Decimal: "",
            Sign: "0",
            Mantissa: "101 1010 1010 1010 1010 1010",
            Exponent: "1010 1010",
            isDecimalUp: true,
        }
    }


    ConvertFromNormalBinary(text) {
        text = toBinaryStyle(text)

        let complement1 =  text.split("").map(e => {
                    if (e !== "0" && e !== "1") return e 
                    if (e === "0") return  "1" 
                    if (e === "1") return  "0" 
                })
                .join("")

        this.setState({
            NormalBinary: text,
            Complement1: complement1,
        })
    }

    ConvertFromComplement1(text) {
        text = toBinaryStyle(text)

        let normal =  text.split("").map(e => {
                    if (e !== "0" && e !== "1") return e 
                    if (e === "0") return  "1" 
                    if (e === "1") return  "0" 
                })
                .join("")

        this.setState({
            NormalBinary: normal,
            Complement1: text,
        })
    }

    render () {
        console.log("asasa")
        return (
            <React.Fragment>
                <div className="row" style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
                    <div ></div>
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        
                        <div className="row">
                            <h3 style={{fontWeight: 200}}> <b>Floating</b> Point </h3>

                            <br />

                            <h5>Definition</h5>
                            <p>
                                Floating point representation is based on scientific notation,
                                so, lets be \({`x`}\) the number to store in floating point.

                                Then we have:
                                $${`
                                    x := -1^{Sign} \\; Mantissa \\times 2^{Exponent}
                                `}$$

                                <br />

                                There are other authors that generalize it more and say 
                                \({`x \\in F(base, precision, minExp, maxExp)`}\)
                            </p>

                            <h5>Hidden bit</h5>
                            <p>
                                Something awesome of the binary and base-2 is that
                                any number that is not zero, when we express it in
                                scientific notation are of the form \({`\\pm 1.xxxx \\times 2^E`}\)
                                so... We do not need to store the first bit, that why it is called
                                the hidden bit.
                            </p>
                            
                        </div>
                        <br />

                        <div className="row">
                            
                            <SimpleInput 
                                title={"Decimal Input"}
                                materializeCSSColorText = "blue-grey-text text-darken-1"
                                value={this.state.NormalBinary}
                                onChange={e => this.ConvertFromNormalBinary(e.target.value)}
                            />
                            <br />
                            <br />

                            <div>
                                <MathJax 
                                    math={
                                        `$$
                                            ${this.state.Sign === "1"? "-":"+"}
                                            ${this.state.Exponent == "0000 0000"? "0.": "1."}
                                            ${this.state.Mantissa}
                                            \\times 2
                                            ^
                                            {
                                                ${this.state.Exponent}
                                            }
                                        $$`
                                    } 
                                />
                            </div>

                            <div className={Style.Wrapper}>
                                
                                <div className={Style.SignText}>
                                    S
                                </div>
                                <div className={Style.ExponentText}>
                                    Exponent
                                </div>
                                <div className={Style.MantissaText}>
                                    Mantissa
                                </div>
                                <div style={{height: "1rem"}} className="white-text">
                                    a
                                </div>

                                <div className={Style.Sign}>
                                    <input 
                                        style={{
                                            borderBottom: "2px solid #FFFFFF",
                                            fontFamily: 'Courier New',
                                            fontSize: "1.5rem",
                                            fontWeight: "600",
                                            color: "white"
                                        }}
                                        maxLength={1}
                                        value={this.state.Sign}
                                        onChange={
                                            e => {
                                                this.setState({
                                                    Sign: toBinaryStyle(e.target.value)
                                                })
                                            }
                                        }
                                    />
                                </div>
                                <div className={Style.Exponent}>
                                    <input 
                                        style={{
                                            borderBottom: "2px solid #FFFFFF",
                                            fontFamily: 'Courier New',
                                            fontSize: "1.5rem",
                                            fontWeight: "600",
                                            color: "white"
                                        }}
                                        maxLength={9}
                                        value={this.state.Exponent}
                                        onChange={
                                            e => {
                                                this.setState({
                                                    Exponent: toBinaryStyle(e.target.value)
                                                })
                                            }
                                        }
                                        
                                    />
                                </div>
                                <div className={Style.Mantissa}>
                                    <input 
                                        style={{
                                            borderBottom: "2px solid #FFFFFF",
                                            fontFamily: 'Courier New',
                                            fontSize: "1.5rem",
                                            fontWeight: "600",
                                            color: "white"
                                        }}
                                        maxLength={28}
                                        value={this.state.Mantissa}
                                        onChange={
                                            e => {
                                                this.setState({
                                                    Mantissa: toBinaryStyle(e.target.value)
                                                })
                                            }
                                        }

                                    />
                                </div>
                                <div style={{height: "1rem"}} className="white-text">
                                    a
                                </div>

                            </div>

                            <br />
                            <br />

                        </div>
                    </div>
                    <div ></div>
                </div>
            </React.Fragment>
        )
    }
}
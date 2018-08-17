import React from "react"
import {toBinaryStyle} from "../../Helpers/Binary"


function SimpleInput (props) {
    return (
        <React.Fragment>
            <h4>{props.title}</h4>
            <div className="input-field">
                <input 
                    className="validate" 
                    value={props.value}
                    onChange={e => props.onChange(e)}
                    style={{
                        fontWeight: "200",
                        fontSize: "3.0rem"
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default class Complement1 extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            NormalBinary: "",
            Complement1: "",
            isNormalBinaryUp: true,
        }
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
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

        let Element1 =  <SimpleInput 
                            title={"Normal Binary"}
                            value={this.state.NormalBinary}
                            onChange={e => this.ConvertFromNormalBinary(e.target.value)}
                        />

        let Element2 =  <SimpleInput 
                        title={"Complement 1"}
                        value={this.state.Complement1}
                            onChange={e => this.ConvertFromComplement1(e.target.value)}
                    />
        
        const Flip = e => this.setState(prevState => ({ isNormalBinaryUp: !prevState.isNormalBinaryUp}))
        if (!this.state.isNormalBinaryUp) [Element1, Element2] = [Element2, Element1]

        return (
            <React.Fragment>
                <div className="row" style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
                    <div ></div>
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        
                        <div className="row">
                            <h3 style={{fontWeight: 200}}> Complement to <b>1</b> </h3>
                            This is simple, just flip all the bits
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
                    </div>
                    <div ></div>
                </div>

                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red waves-effect waves-light" onClick={e => Flip()}>
                        <i className="material-icons">autorenew</i>
                    </a>
                </div>

            </React.Fragment>
        )
    }
}
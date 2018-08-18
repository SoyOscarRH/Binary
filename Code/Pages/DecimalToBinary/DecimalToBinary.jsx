import React from "react"
import {toBinaryStyle, toIntegerStyle} from "../../Helpers/Binary"
import SimpleInput from "../../Components/SimpleInput"

export default class DecimalToBinary extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            Binary: "",
            Decimal: "",
            isBinaryUp: true,
        }
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
    }

    ConvertFromBinary(text) {
        let binary = toBinaryStyle(text)
        let decimal =  String(parseInt(binary.replace(/ /g, ""), 2))

        this.setState({
            Binary: binary,
            Decimal: toIntegerStyle(decimal),
        })
    }

    ConvertFromDecimal(text) {
        let decimal = toIntegerStyle(text)
        let binary = (decimal.replace(/ /g, "") >>> 0).toString(2)

        this.setState({
            Binary: toBinaryStyle(binary),
            Decimal: decimal,
        })
    }


    render () {

        let Element1 =  <SimpleInput 
                            title={"Decimal"}
                            materializeCSSColorText = "blue-text text-darken-1"
                            value={this.state.Decimal}
                            onChange={e => this.ConvertFromDecimal(e.target.value)}
                        />

        let Element2 =  <SimpleInput 
                        title={"Binary"}
                        materializeCSSColorText = "orange-text text-darken-2"
                        value={this.state.Binary}
                            onChange={e => this.ConvertFromBinary(e.target.value)}
                    />
        
        const Flip = e => this.setState(prevState => ({ isBinaryUp: !prevState.isBinaryUp}))
        if (!this.state.isBinaryUp) [Element1, Element2] = [Element2, Element1]

        return (
            <React.Fragment>
                <div className="row" style={{display: "grid", gridTemplateColumns: "5% 90% 5%"}}>
                    <div ></div>
                    <div className="col s12 m10 l8 offset-m1 offset-l2">
                        
                        <div className="row">
                            <h3 style={{fontWeight: 200}}> Binary and Decimal </h3>
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
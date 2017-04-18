import React, { Component } from 'react';
import { connect } from 'react-redux';
import { positionSelected } from '../actions';
const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS', '11 IDEAL'];

class Header extends Component {
    clickHandler(position) {
        this.props.positionSelected(position);
    }

    renderLinks() {
        return positions.map( (position, index) =>
            <div key={index} className="position" onClick={() => this.clickHandler(position)}>{position}</div>
        );
    }

    render() {
        return (
            <div className="positions">
                {this.renderLinks()}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        positionSelected: selection => dispatch(positionSelected(selection))
    }
}

export default connect(null, mapDispatchToProps)(Header);


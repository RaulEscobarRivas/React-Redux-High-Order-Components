import React, { Component } from 'react';
import { connect } from 'react-redux';
import { positionSelected } from '../actions';
const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS'];

class Header extends Component {
    clickHandler(position) {
        this.props.positionSelected(position);
    }

    resultClickHandler() {
        console.log('11 IDEAL');
    }

    renderLinks() {
        const links = positions.map( (position, index) =>
            <div key={index} className="position" onClick={() => this.clickHandler(position)}>{position}</div>
        );

        links.push(<div key={4} className="position result" onClick={() => this.resultClickHandler()}>{'11 IDEAL'}</div>)

        return links;

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


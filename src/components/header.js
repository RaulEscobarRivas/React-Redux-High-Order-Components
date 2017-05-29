import React, { Component } from 'react';
import { connect } from 'react-redux';
import { positionSelected } from '../actions';
import { getPositionSelected, getPlayersPositions } from '../reducers';

const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS'];

const getPositionToSelect = position => {
    switch (position) {
        case 'DEFENSA':
            return 'DEFENSA_LATERAL_IZQUIERDO';
        case 'MEDIOCAMPO':
            return 'MEDIOCAMPO_LATERAL_IZQUIERDO';
        case 'DELANTEROS':
            return 'DELANTEROS_LATERAL_IZQUIERDO';
        default:
            return position;
    }
};

const getPositionForClassName = position => {
    switch (position) {
        case 'DEFENSA_LATERAL_IZQUIERDO':
        case 'DEFENSA_LATERAL_DERECHO':
        case 'DEFENSA_CENTRAL_DERECHO':
        case 'DEFENSA_CENTRAL_IZQUIERDO':
            return 'DEFENSA';
        case 'MEDIOCAMPO_LATERAL_IZQUIERDO':
        case 'MEDIOCAMPO_CENTRAL':
        case 'MEDIOCAMPO_LATERAL_DERECHO':
            return 'MEDIOCAMPO';
        case 'DELANTEROS_LATERAL_IZQUIERDO':
        case 'DELANTEROS_CENTRAL':
        case 'DELANTEROS_LATERAL_DERECHO':
            return 'DELANTEROS';
        default:
            return position;
    }
};

class Header extends Component {
    injectLinksWithLogos(links) {
        const logos = (
            <div className="logos-selection">
                <img src={'../images/11-marca-11.png'} className="app-logo-selection"/>
                <img src={'../images/11-marca-PN.png'} className="paladarnegro-logo-selection"/>
            </div>
        );

        links[0].splice(2, 0, logos);

        return links;
    }

    clickHandler(position) {
        // this.props.positionSelected(getPositionToSelect(position));
    }

    renderLinks() {
        let links = [];
        links.push(positions.map( (position, index) => {
            const className = ( position === getPositionForClassName(this.props.selectedPosition)) ? 'position-selected' : 'position';
            return <div key={index} className={className} onClick={() => this.clickHandler(position)}>{position}</div>
        }));

        return this.injectLinksWithLogos(links);
    }

    render() {
        return (
            <div className="positions">
                {this.renderLinks()}
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        selectedPosition: getPositionSelected(state),
        playersPositions: getPlayersPositions(state)
    }
);

const mapDispatchToProps = dispatch => {
    return {
        positionSelected: selection => dispatch(positionSelected(selection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


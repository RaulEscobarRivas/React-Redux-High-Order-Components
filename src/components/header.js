import React, { Component } from 'react';
import { connect } from 'react-redux';
import { positionSelected } from '../actions';
import { getPositionSelected, getPlayersPositions } from '../reducers';

const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS', '11 IDEAL'];

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
}
class Header extends Component {
    clickHandler(position) {
        this.props.positionSelected(getPositionToSelect(position));
    }

    renderLinks() {
        return positions.map( (position, index) => {
            const className = ( position === getPositionForClassName(this.props.selectedPosition)) ? 'position-selected' : 'position';
            return <div key={index} className={className} onClick={() => this.clickHandler(position)}>{position}</div>
        });
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


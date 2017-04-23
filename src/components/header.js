import React, { Component } from 'react';
import { connect } from 'react-redux';
import { positionSelected } from '../actions';
import { getPositionSelected } from '../reducers';

const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS', '11 IDEAL'];

class Header extends Component {
    clickHandler(position) {
        this.props.positionSelected(position);
    }

    renderLinks() {
        return positions.map( (position, index) => {
            const className = (position === this.props.selectedPosition) ? 'position-selected' : 'position';
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

const mapStateToProps = state => {
    return {
        selectedPosition: getPositionSelected(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        positionSelected: selection => dispatch(positionSelected(selection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import {
    positionSelected
} from '../actions';
import PlayerSelection from './player-selection';
import Share from './share';

class Content extends Component {
    renderHome() {
        return (
            <div className="home-title">
                <h1>{'ELIGE A TU 11 IDEAL'}</h1>
                <div className="home-button">
                    <button className="comenzar btn btn-primary" onClick={() => this.props.updatePositionSelected()}>{'Comenzar'}</button>
                </div>
            </div>
        )
    }

    renderTitle() {
        return (
            <div className="title">
                {this.props.positionSelected}
                <div className="subtitle">
                    {`ELIGE A TU ${this.props.positionSelected}`}
                </div>
            </div>
        );
    }

    render() {
        const { positionSelected } = this.props;

        return (
            <div className="content">
                { !positionSelected && this.renderHome() }
                { positionSelected && positionSelected !== '11 IDEAL' && this.renderTitle() && <PlayerSelection /> }
                { positionSelected === '11 IDEAL' && <Share />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        positionSelected: getPositionSelected(state)
    }
};

const mapDispatchToProps = dispatch => (
    {
        updatePositionSelected: () => dispatch(positionSelected('ARQUERO'))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Content);


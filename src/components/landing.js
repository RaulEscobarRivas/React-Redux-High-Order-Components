import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import {
    positionSelected
} from '../actions';
import PlayerSelection from './player-selection';
import Header from './header';
import Content from './content';

class Landing extends Component {
    renderHome() {
        return (
            <div className="home">
                <div className="logos">
                    <img className="app-logo"/>
                    <img className="paladarnegro-logo"/>
                </div>
                <h1 className="home-title">{'ELIGE A TU 11 IDEAL'}</h1>
                <div className="home-button">
                    <button className="comenzar btn btn-primary" onClick={() => this.props.updatePositionSelected()}>{'Comenzar'}</button>
                </div>
            </div>
        )
    }

    render() {
        const { positionSelected } = this.props;

        return (
            <div className="landing">
                { !positionSelected && this.renderHome() }
                { positionSelected &&
                    [<Header/>,
                    <Content/>]
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);


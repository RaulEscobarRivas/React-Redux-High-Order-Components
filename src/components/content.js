import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import {
    positionSelected
} from '../actions';
import PlayerSelection from './player-selection';
import Share from './share';

const getStyle = positionSelected => {
    if (positionSelected === '11 IDEAL') {
        return {
                backgroundSize: '100% 100%',
            };
        }
};

class Content extends Component {
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
        const style = getStyle(positionSelected);

        return (
            <div className="content" style={style} >
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

export default connect(mapStateToProps)(Content);


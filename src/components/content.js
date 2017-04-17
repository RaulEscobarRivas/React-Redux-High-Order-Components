import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import PlayerSelection from './player-selection';

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

        return (
            <div className="content">
                {positionSelected && this.renderTitle()}
                {positionSelected &&
                    <PlayerSelection position={positionSelected} freeSpots={2} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        positionSelected: getPositionSelected(state)
    }
}

export default connect(mapStateToProps)(Content);


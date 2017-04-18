import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import PlayerSelection from './player-selection';
import Share from './share';

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
                {positionSelected && positionSelected !== '11 IDEAL' && this.renderTitle()}
                {positionSelected==='ARQUERO' &&
                    <PlayerSelection freeSpots={1} />
                }
                {positionSelected==='DEFENSA' &&
                    <PlayerSelection freeSpots={3} />
                }
                {positionSelected==='MEDIOCAMPO' &&
                    <PlayerSelection freeSpots={4} />
                }
                {positionSelected==='DELANTEROS' &&
                    <PlayerSelection freeSpots={3} />
                }
                {positionSelected==='11 IDEAL' &&
                    <Share />
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


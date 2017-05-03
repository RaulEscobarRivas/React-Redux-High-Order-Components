import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updatePlayerSelection,
    positionSelected
} from '../actions';
import {
    getPositionSelected,
    getPlayers,
    getPlayersPositions
} from '../reducers';

let position;

class PlayerSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            saveDisabled: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.positionSelected !== this.props.positionSelected) {
            this.setState({ players: nextProps.players });
            this.setState({ saveDisabled: true });
        }
    }

    playerSelectedHighlight(player) {
        if (this.state.players[player].selected === true) return 'selected';
    }

    unselectAndReturnPlayers() {
        const unselectedPlayers = {};

        for (const player in this.state.players) {
            Object.assign(unselectedPlayers, this.state.players, this.state.players[player].selected = false)
        }

        return unselectedPlayers;
    }

    selectPlayer(player) {
        return Object.assign({}, this.unselectAndReturnPlayers(), this.state.players[player].selected = !this.state.players[player].selected);
    }

    clickHandler(player) {
        this.setState( prevState => {
            return Object.assign({}, this.state, { players: this.selectPlayer(player) } );
        });

        this.setState({ saveDisabled: false });
        this.props.updatePlayerSelection(this.state.players);
    }

    renderPlayers() {
        position = Object.keys(this.state.players);
        return position.map( (player, index) => {
            const className = this.playerSelectedHighlight(player) ? 'player-selected' : 'player';
            return <div key={index} className={className} onClick={() => this.clickHandler(player)}>{this.state.players[player].name}</div>;
            }
        );
    }

    saveHandler() {
        let positionIndex = this.props.playersPositions.findIndex( element => element === this.props.positionSelected) + 1;
        if (positionIndex === this.props.playersPositions.length) {
            this.props.updatePositionSelected('11 IDEAL');
        } else {
            this.props.updatePositionSelected(this.props.playersPositions[positionIndex]);
        }
    }

    render() {
        const buttonClass = this.state.saveDisabled ? 'btn btn-default disabled' : 'btn btn-primary';
        return (
            <div className="player-selection">
                {this.renderPlayers()}
                <div className="save-button">
                    <button className={buttonClass} disabled={this.state.saveDisabled} onClick={() => this.saveHandler()}>{'Guardar'}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const positionSelected = getPositionSelected(state);

    return {
        positionSelected,
        players: getPlayers(state, positionSelected),
        playersPositions: getPlayersPositions(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerSelection: selection => dispatch(updatePlayerSelection(selection)),
        updatePositionSelected: position => dispatch(positionSelected(position))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelection);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerSelection } from '../actions';
import { getPositionSelected, getPlayersSelected } from '../reducers';

class PlayerSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: this.props.positionSelected,
            validSelection: false,
            players: this.props.players,
            freeSpots: this.props.freeSpots
        }
    }

    unselectAndReturnPlayers() {
        const unselectedPlayers = {};

        for (const player in this.state.players) {
            Object.assign(unselectedPlayers, this.state.players, this.state.players[player].selected = false)
        }

        return unselectedPlayers;
    }

    playerSelectedHighlight(player) {
        if (this.state.players[player].selected === true) return 'selected';
    }

    selectPlayer(player) {
        if (this.state.freeSpots > 0) {
            this.setState({ freeSpots: this.state.freeSpots-1 });
            return Object.assign({}, this.state.players, this.state.players[player].selected = !this.state.players[player].selected);
        } else {
            this.setState({ freeSpots: this.props.freeSpots-1 });
            return Object.assign({}, this.unselectAndReturnPlayers(), this.state.players[player].selected = !this.state.players[player].selected);
        }
    }

    clickHandler(player) {
        this.setState( prevState => {
            return Object.assign({}, this.state, { players: this.selectPlayer(player) } );
        });

        this.props.updatePlayerSelection(this.state);
    }

    renderPlayers() {
        const players = Object.keys(this.state.players);
        return players.map( (player, index) => {
            const className = this.playerSelectedHighlight(player) ? 'player-selected' : 'player';
            return <div key={index} className={className} onClick={() => this.clickHandler(player)}>{this.state.players[player].name}</div>;
            }
        );

    }

    render() {
        return (
            <div className="player-selection">
                {this.renderPlayers()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const positionSelected = getPositionSelected(state);

    return {
        positionSelected,
        players: getPlayersSelected(state, positionSelected)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerSelection: selection => dispatch(updatePlayerSelection(selection))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelection);


import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updatePlayerSelection,
    positionSelected
} from '../actions';
import {
    getPositionSelected,
    getPlayers
} from '../reducers';

const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO', 'DELANTEROS', '11 IDEAL'];

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
        const players = Object.keys(this.state.players);
        return players.map( (player, index) => {
            const className = this.playerSelectedHighlight(player) ? 'player-selected' : 'player';
            return <div key={index} className={className} onClick={() => this.clickHandler(player)}>{this.state.players[player].name}</div>;
            }
        );
    }

    saveHandler() {
        let selectedIndex = positions.indexOf(this.props.positionSelected);
        selectedIndex++;
        this.props.updatePositionSelected(positions[selectedIndex]);
    }

    render() {
        console.log('JUGADORES', this.props.players);
        const buttonClass = this.state.saveDisabled ? 'btn btn-default disabled' : 'btn btn-default';
        return (
            <div className="player-selection">
                {this.renderPlayers()}
                <div className="save-button">
                    <button className={buttonClass} onClick={() => this.saveHandler()}>{'Guardar'}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const positionSelected = getPositionSelected(state);

    return {
        positionSelected,
        players: getPlayers(state, positionSelected)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlayerSelection: selection => dispatch(updatePlayerSelection(selection)),
        updatePositionSelected: position => dispatch(positionSelected(position))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelection);


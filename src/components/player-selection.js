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
import { isPlayerSelected } from '../helpers';

let position;

class PlayerSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            saveDisabled: true,
            backDisabled: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.positionSelected !== this.props.positionSelected) {
            this.setState({ players: nextProps.players, saveDisabled: true });
        }

        if (nextProps.positionSelected === this.props.playersPositions[0]) {
            this.setState({ backDisabled: true });
        } else {
            this.setState({ backDisabled: false });
        }

        if (isPlayerSelected(nextProps.players)) {
            this.setState({ saveDisabled: false });
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
        return position.map((player, index) => {
            const className = this.playerSelectedHighlight(player) ? 'player-wrapper-selected' : 'player-wrapper';
            const style = {
                backgroundSize: 'cover',
                background: `url(../images/players/${this.state.players[player].key}.png) center no-repeat`
            };
            return (
                <div key={index} className={className} onClick={() => this.clickHandler(player)}>
                    <div className={'player'} style={style}/>
                    <div className={'player-name'}>{this.state.players[player].name}</div>
                </div>
                );
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

    backHandler() {
        let positionIndex = this.props.playersPositions.findIndex( element => element === this.props.positionSelected) - 1;
        this.props.updatePositionSelected(this.props.playersPositions[positionIndex]);
    }

    render() {
        return (
            <div className="player-selection">
                <div className="players">
                    {this.renderPlayers()}
                </div>
                <div className="player-buttons-container">
                        <button className={'back btn'} disabled={this.state.backDisabled} onClick={() => this.backHandler()}>{'Atrás'}</button>
                        <button className={'save btn'} disabled={this.state.saveDisabled} onClick={() => this.saveHandler()}>{'Avanzar'}</button>
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


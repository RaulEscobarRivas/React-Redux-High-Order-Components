import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedPlayers, getPlayersPositions } from '../reducers';
import SharingTemplate from './sharing-template';
import { fromJS } from 'immutable';
import { formattSharingUrl } from '../helpers';

class Share extends Component {
    renderRow(position, players) {
        if (players.length > 1) {
            return players.map((player, index) => {
                const style = { background: `url(../images/players/${player.key}.png) center no-repeat` };
                const className = `selected-player-wrapper ${player.key}`;
                return (
                    <div key={index} className={className}>
                        <div className={'selected-player'} style={style} />
                        <div className={'selected-player-name'}>{player.name}</div>
                    </div>
                );
            });
        } else {
            const style = {
                backgroundSize: 'cover',
                background: `url(../images/players/${players.key}.png) center no-repeat`
            };
            const className = `selected-player-wrapper ${position}`;
            return (
                <div className={className}>
                    <div className={'selected-player'} style={style} />
                    <div className={'selected-player-name'}>{players.name}</div>
                </div>
            );
        }
    }

    renderPlayers(players) {
        const playersList = fromJS(players);
        const keys = Object.keys(players).sort();
        const arquero = playersList.get(keys[0]).toJS();

        let defensa = [];

        for(let i = 1; i <= 4; i++) {
            defensa.push(playersList.get(keys[i]).toJS());
        }

        let mediocampo = [];

        for(let i = 8; i < keys.length; i++) {
            mediocampo.push(playersList.get(keys[i]).toJS());
        }

        let delanteros = [];

        for(let i = 5; i < 8; i++) {
            delanteros.push(playersList.get(keys[i]).toJS());
        }

        return (
            <div className="selected-players">
                <div className="selected-players-row">
                    { this.renderRow(keys[0], arquero) }
                </div>
                <div className="selected-players-row">
                    { this.renderRow('DEFENSA', defensa) }
                </div>
                <div className="selected-players-row">
                    { this.renderRow('MEDIOCAMPO', mediocampo) }
                </div>
                <div className="selected-players-row">
                    { this.renderRow('DELANTEROS', delanteros) }
                </div>
            </div>
        )
    }

    render() {
        const { selectedPlayers } = this.props;
        return (
            <div className="share">
                { this.renderPlayers(selectedPlayers) }
                <SharingTemplate url={formattSharingUrl(selectedPlayers)}/>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        selectedPlayers: getSelectedPlayers(state),
        positions: getPlayersPositions(state)
    }
);

export default connect(mapStateToProps)(Share);


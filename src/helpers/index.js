import { fromJS } from 'immutable';

const formattSelectedPlayers = players => {
    let playersStructure = {};

    Object.keys(players).map((position, index) => {
        for (const player in players[position]) {
            if (players[position][player].selected === true) {
                Object.assign(playersStructure, { [Object.keys(players)[index]] : players[position][player] });
            }
        }
    });

    return playersStructure;
};

const isPlayerSelected = players => {
    const playersMap = fromJS(players);
    let isSelected;

    playersMap.map(player => {
        if (player.get('selected')) {
            isSelected = true;
        }
    });

    return isSelected;
};

const formattSharingUrl = players => {
    let playersSelectedUrlString = '?';

    Object.keys(players).map(position => {
        playersSelectedUrlString += `${position}=${players[position].key}&`;
    });

    playersSelectedUrlString = playersSelectedUrlString.replace(/\&$/, "");

    return playersSelectedUrlString;
};

export { 
    formattSelectedPlayers,
    isPlayerSelected,
    formattSharingUrl
};
const formattSelectedPlayers = players => {
    let playersStructure = {};

    Object.keys(players).map( (position, index) => {
        for (const player in players[position]) {
            if (players[position][player].selected === true) {
                Object.assign(playersStructure, { [Object.keys(players)[index]] : players[position][player] });
            }
        }
    });

    return playersStructure;
};

export { formattSelectedPlayers };
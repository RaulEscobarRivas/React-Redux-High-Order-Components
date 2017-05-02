const getSelectedItems = players => (
    Object.keys(players).map( position => {
        for (const player in players[position]) {
            if (players[position][player].selected === true ) {
                return Object.assign({},  players[position] , players[position][player].name);
            }
        }
    })
);

const formattSelectedPlayers = players => {
    console.log('raul', getSelectedItems(players));
    return Object.assign({}, { players: getSelectedItems(players)} );
};

export { formattSelectedPlayers };
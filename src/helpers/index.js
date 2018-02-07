import { fromJS } from 'immutable';

const mapUrlParametersToSelectedPlayers = (playersModel, playersSelected) => {
    let playersStructure = {};

    Object.keys(playersModel).map((position, index) => {
        for (const player in playersModel[position]) {
            if (playersModel[position][player].key === playersSelected[position]) {
                playersModel[position][player].selected = true;
                Object.assign(playersStructure, { [Object.keys(playersModel)[index]] : playersModel[position][player] });
            }
        }
    });

    return playersStructure;
};

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
        playersSelectedUrlString += `${position}=${players[position].key}` + '&';
    });

    playersSelectedUrlString = playersSelectedUrlString.replace(/\&$/, "");

    const fullUrl = window.location.origin + playersSelectedUrlString;

    return encodeURIComponent(fullUrl);
};

const getAllUrlParams = url => {
    // get query string from url (optional) or window
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    let resultObj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        const params = queryString.split('&');

        for (let i=0; i<params.length; i++) {
            // separate the keys and the values
            let a = params[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            let paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toUpperCase();
            paramValue = paramValue.toUpperCase();

            // if parameter name already exists
            if (resultObj[paramName]) {
                // convert value to array (if still string)
                if (typeof resultObj[paramName] === 'string') {
                    resultObj[paramName] = [resultObj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    resultObj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    resultObj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                resultObj[paramName] = paramValue;
            }
        }
    }

  return resultObj;
};

export { 
    formattSelectedPlayers,
    isPlayerSelected,
    formattSharingUrl,
    getAllUrlParams,
    mapUrlParametersToSelectedPlayers
};
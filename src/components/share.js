import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedPlayers } from '../reducers';
import SharingTemplate from './sharing-template';

class Share extends Component {
    render() {
        const { selectedPlayers } = this.props;
        console.log('raul', selectedPlayers);
        return (
            <div className="share">
                <pre>{JSON.stringify(selectedPlayers, null, 2)}</pre>
                <SharingTemplate />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedPlayers: getSelectedPlayers(state)
    }
}

export default connect(mapStateToProps)(Share);


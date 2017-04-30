import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import SharingTemplate from './sharing-template';

class Share extends Component {
    render() {
        const { positionSelected } = this.props;

        return (
            <div className="share">
                <SharingTemplate />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        positionSelected: getPositionSelected(state)
    }
}

export default connect(mapStateToProps)(Share);


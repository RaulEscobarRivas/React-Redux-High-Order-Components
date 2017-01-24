import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSignedInStatus } from '../reducers';

export default function(ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.signedIn) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.signedIn) {
                this.context.router.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            signedIn: getSignedInStatus(state)
        }
    }

    return connect(mapStateToProps)(Authentication);
}
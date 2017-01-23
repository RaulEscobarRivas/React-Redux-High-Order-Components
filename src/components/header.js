import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getSignedInStatus } from '../reducers';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    authButton() {
        console.log(this.props.signedIn);
        if(this.props.signedIn) {
            return <button onClick={this.props.toggleAuth}>Sign Out</button>;
        } else {
            return <button onClick={this.props.toggleAuth}>Sign In</button>;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/resources">Resources</Link>
                    </li>
                    <li className="nav-item">
                        {this.authButton()}
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        signedIn: getSignedInStatus(state)
    }
};

export default connect(mapStateToProps, actions)(Header);
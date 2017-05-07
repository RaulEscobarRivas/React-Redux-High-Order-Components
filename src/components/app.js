import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import Landing from './landing';

export default class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Landing />
            </div>
        );
    }
}

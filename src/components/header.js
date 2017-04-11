import React, { Component } from 'react';

const positions = ['ARQUERO','DEFENSA','MEDIOCAMPO','11 IDEAL'];

export default class Header extends Component {
    renderLinks() {
        return positions.map( (position, index) =>
            <div key={index} className="position">{position}</div>
        );
    }

    render() {
        return (
            <div className="positions">
                {this.renderLinks()}
            </div>
        );
    }
}
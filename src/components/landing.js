import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPositionSelected } from '../reducers';
import {
    positionSelected
} from '../actions';
import PlayerSelection from './player-selection';
import Header from './header';
import Content from './content';

class Landing extends Component {
    renderHome() {
        return (
            <div className="home">
                <div className="logos">
                    <img src={'../images/11-marca-11.png'} className="app-logo"/>
                    <img src={'../images/11-marca-PN.png'} className="paladarnegro-logo"/>
                </div>
                <h1 className="home-title">{'CAMPEONES DEL MUNDO'}</h1>
                <div className="home-subtitle">
                    <span className="home-subtitle-1">
                        {
                            'Ponete el traje de DT, selecciona tu #11ideal'
                        }
                    </span>
                    <span className="home-subtitle-2">
                        {
                            'y compartilo con tus amigos.'
                        }
                    </span>
                </div>
                <div className="home-button">
                    <button className="comenzar btn" onClick={() => this.props.updatePositionSelected()}>{'INICIAR SELECCIÓN'}</button>
                </div>
                <a className="paladarnegro-link" href="http://paladarnegro.net/">{'www.paladarnegro.net'}</a>
            </div>
        )
    }

    backgroundStyle(position) {
        if (!position) {
            return {
                background: `url(../images/11-bg-inicio.jpg) center no-repeat`,
                backgroundSize: 'cover'
            };
        }

        if (position === "11 IDEAL") {
            return {
                background: `url(../images/11-bg-final.jpg) no-repeat`,
                backgroundSize: 'cover',
                backgroundPosition: '50% -30%'
            };
        } else {
            return {
                background: `url(../images/11-bg-seleccion.jpg) center no-repeat`,
                backgroundSize: 'cover'
            };
        }
    }

    render() {
        const { positionSelected } = this.props;
        const className = positionSelected ? 'selection' : 'landing';
        const style = this.backgroundStyle(positionSelected);
        console.log('RAUL', style);

        return (
            <div className={className} style={style} >
                { !positionSelected && this.renderHome() }
                { positionSelected &&
                    [<Header/>,
                    <Content/>]
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        positionSelected: getPositionSelected(state)
    }
};

const mapDispatchToProps = dispatch => (
    {
        updatePositionSelected: () => dispatch(positionSelected('ARQUERO'))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Landing);


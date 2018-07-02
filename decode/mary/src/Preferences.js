import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Food from './Food.js';
import Fun from './Fun.js';
import Price from './Price.js';

// preferences to have all the states (not in App.js)
class Preferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            foods: {
                latinMexCheap: false,
                asianCheap: false,
                latinMexExpensive: false,
                asianExpensive: false
            },
            bars: {
                barsCheap: false,
                barsExpensive: false
            },
            hungry: true,
            historical: false,
            museums: false,
            parks: false,
            cheap: false,
            expensive: false,
        }
    }

    setFood = (key) => {
        //console.log(key)
        let foods = { ...this.state.foods } //duplicating
        foods[key] = !foods[key]; //
        this.setState({ foods });
        //console.log(foods);
    }

    setHungry = () => {
        let newHungry = !this.state.hungry;
        this.setState({ hungry: newHungry, foods: newHungry ? {} : null });
        //console.log(newHungry);
    }

    toggleState = (key, fn = null) => {
        this.setState({ [key]: !this.state[key] },
            fn)
        //console.log(this)
    }

    togglePrice = (key) => {
        this.toggleState(key, this.setPriceMap)
    }

    setPriceMap = () => {
        let ret = {
            foods: {},
            bars: {}
        };
        if (this.state.cheap) {
            if (this.state.foods.asian) {
                ret.foods.asianCheap = true;
            }
            else if (this.state.foods.latinMex) {
                ret.foods.latinMexCheap = true;
            }
            else if (this.state.bars) {
                ret.bars.barsCheap = true;
            }
            
        }

        else if (this.state.expensive) {
            if (this.state.foods.asian) {
                ret.foods.asianExpensive = true;
            }
            else if (this.state.foods.latinMex) {
                ret.foods.latinMexExpensive = true;
            }
            else if (this.state.bars) {
                ret.bars.barsExpensive = true;
            }
        }
        else if (this.state.expensive && this.state.cheap) {
            if (this.state.foods.asian) {
                ret.foods.asianExpensive = true;
                ret.foods.asianCheap = true;
            }
            else if (this.state.foods.latinMex) {
                ret.foods.latinMexExpensive = true;
                ret.foods.latinMexCheap = true;
            }
            else if (this.state.bars) {
                ret.bars.barsExpensive = true;
                ret.bars.barsCheap = true;
            }
            //console.log(ret);
        }
        console.log(ret);
        //return ret;
    }

    //rendering
    renderPrice = (routeProps) => {
        return <Price
            cheap={this.state.cheap}
            expensive={this.state.expensive}
            togglePrice={this.togglePrice}
            username={this.props.username}
            historyPush={routeProps.history.push} />;
    }

    renderFood = (routeProps) => {
        return <Food setHungry={this.setHungry}
            setFood={this.setFood}
            foods={this.state.foods}
            username={this.props.username}
            historyPush={routeProps.history.push} />;
    }

    renderFun = (routeProps) => {
        return <Fun toggleState={this.toggleState}
            bars={this.state.bars}
            username={this.props.username}
            historyPush={routeProps.history.push} />;
    }

    render() {
        console.log(this.state);
        return (<div>
            <Route exact={true} path='/food' render={this.renderFood} />
            <Route exact={true} path='/fun' render={this.renderFun} />
            <Route exact={true} path='/price' render={this.renderPrice} />
        </div>
        )
    }
}

export default Preferences;
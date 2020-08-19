import React from 'react'
import MasterView from './MasterView'
import DetailView from './DetailView'
import CartView from './CartView'
import CheckoutView from './CheckoutView'
import { Route, Switch } from 'react-router-dom'

export default function ViewContainer() {
    return (
        <Switch>
            <Route exact path='/' component={MasterView} />
            <Route path='/products/:id' component={DetailView} />
            <Route path='/cart/' component={CartView} />
            <Route path='/checkout/' component={CheckoutView} />
        </Switch>
    )
};
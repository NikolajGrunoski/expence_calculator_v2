import React from 'react';
import ReactDOM from 'react-dom';
import Newproduct from './components/Newproduct/Newproduct'
import Products from './components/calculator/Products'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Expences from './components/calculator/Expences'





import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'


const app = document.getElementById('root')

const Routes = () => {
    return (
        <Router>
            
            <Switch> 
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />  
                <Route exact path='/newproduct' render={() => <Newproduct/>}/>
                <Route exact path='/products' render={() => <Products/>}/>
                <Route exact path="/edit-product" render={() => <Newproduct/>} />
                <Route exact path="/expences" render={() => <Expences/>} />
                   
            </Switch>
        </Router>
    )
}


ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>, app)

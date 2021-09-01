import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from 'react-dom'
import Home from './home'

export const browserHistory = createBrowserHistory()
const container = document.getElementById('root')
render(
    <Router history={browserHistory}>
        <Home />
    </Router>,
    container,
    () => console.log('render'),
)

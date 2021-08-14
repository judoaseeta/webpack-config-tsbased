import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from 'react-dom'
import Home from './home'

const container = document.getElementById('root')
export const browserHistory = createBrowserHistory()
const App = render(
    <Router history={browserHistory}>
        <Home />
    </Router>,
    container,
)

export default App

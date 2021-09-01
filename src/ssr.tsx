import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import Home from './home'

export const browserHistory = createBrowserHistory()
loadableReady(() => {
    const container = document.getElementById('root')
    hydrate(
        <Router history={browserHistory}>
            <Home />
        </Router>,
        container,
        () => console.log('hydrate'),
    )
})

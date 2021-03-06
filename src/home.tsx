import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import RouteWithParam from './components/routeWithParam'
import './index.scss'
import styles from './home.module.scss'
import styles2 from './home.module.css'

const SS = loadable(() => import('./components/ss'))
export default function Home(): React.ReactElement {
    return (
        <div className={styles.container}>
            Testing Typescript-based webpack config app.
            <div className={styles2.region}>fewfe</div>
            <div className={styles.example_img} />
            <SS />
            <Switch>
                <Route path="/param/:id">
                    <RouteWithParam name="roy" />
                </Route>
            </Switch>
        </div>
    )
}

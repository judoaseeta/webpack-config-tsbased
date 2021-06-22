import React from 'react'
import './index.scss'
import styles from './home.module.scss'
import styles2 from './home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            Testing Typescript-based webpack config app.
            <div className={styles2.region}>fewfe</div>
            <div className={styles.example_img} />
        </div>
    )
}

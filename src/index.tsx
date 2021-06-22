import React from 'react'
import { render } from 'react-dom'
import Home from './home'
const container = document.getElementById('root')

const App = render(<Home />, container)

export default App

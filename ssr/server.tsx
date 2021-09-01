import React from 'react'
import path from 'path'
import express from 'express'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import CreateHtml from './createHtml'

const server = express()
server.use(express.static(path.resolve('ssrbuild', 'web')))
server.get('*', (req, res) => {
    const nodeStats = path.resolve('./ssrbuild/node/loadable-stats.json')
    const webStats = path.resolve('./ssrbuild/web/loadable-stats.json')
    const context = {}
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
    const webExtractor = new ChunkExtractor({ statsFile: webStats })
    const entry = nodeExtractor.requireEntrypoint()
    // App Component
    const App = entry.default
    const jsx = webExtractor.collectChunks(
        <StaticRouter location={req.url} context={context}>
            {App}
        </StaticRouter>,
    )
    const helmet = Helmet.renderStatic()
    res.set('content-type', 'text/html')
    res.send(renderToString(<CreateHtml elements={jsx} extractor={webExtractor} helmetData={helmet} />))
})
const port = process.env.port || 8000
server.listen(port, () => {
    console.log(`server side rendering starts on port ${port}`)
})

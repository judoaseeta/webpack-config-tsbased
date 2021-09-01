import React from 'react'
import { ChunkExtractor } from '@loadable/server'
import { HelmetData } from 'react-helmet'

interface CreateHtmlProps {
    extractor: ChunkExtractor
    helmetData: HelmetData
    elements: JSX.Element
}

const CreateHtml: React.FC<CreateHtmlProps> = ({ elements, extractor, helmetData }) => (
    <html lang="en">
        <head>
            <meta name="google" content="notranslate" />
            {
                // css injection elements
                extractor.getStyleElements()
            }
            {
                // <link> injection elements
                extractor.getLinkElements()
            }
            {
                // helmet data goes here....`
            }
            {
                // title
                helmetData.title.toComponent()
            }
            {
                // meta
                helmetData.meta.toComponent()
            }
            {
                // helmet links
                helmetData.link.toComponent()
            }
        </head>
        <body>
            <div id="root">{elements}</div>
            {
                // server side bundled scripts goes here..
                extractor.getScriptElements()
            }
        </body>
    </html>
)

export default CreateHtml

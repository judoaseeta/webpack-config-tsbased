import React from 'react'
import { useParams } from 'react-router-dom'

export interface RouteWithParamsProps {
    name: string
}
export default function RouteWithParams({ name }: RouteWithParamsProps): React.ReactElement {
    const { id } = useParams<{
        id: string
    }>()
    return (
        <div>
            Param id : {id} and {name}{' '}
        </div>
    )
}

import Router from 'next/router'
import { useEffect } from 'react'

const ClientReload = (): any => {
    useEffect(() => {
        import('socket.io-client').then((module) => {
            const socket = module.io()

            socket.on('reload', () => {
                Router.replace(Router.asPath, undefined, {
                    scroll: false,
                })
            })
        })
    })

    return null
}

export default ClientReload

import React from 'react'

export default function SS(): React.ReactElement {
    const [name, setName] = React.useState('judo')
    const onChangeName: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const newName = e.target.value
        setName(newName)
    }, [])
    const [secret, setSecret] = React.useState('secret')
    const onChangeSecret: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const newSecret = e.target.value
        setSecret(newSecret)
    }, [])
    const [isSecretOn, setIsSecretOn] = React.useState(true)
    return (
        <div>
            <form data-testid="form">
                <label htmlFor="name">
                    Username
                    <input id="name" type="text" value={name} onChange={onChangeName} />
                </label>
                {isSecretOn && (
                    <>
                        <label htmlFor="secret">
                            Secret
                            <input
                                data-testid="secret"
                                id="secret"
                                type="password"
                                value={secret}
                                onChange={onChangeSecret}
                            />
                        </label>
                        <button onClick={() => setIsSecretOn(false)} type="button">
                            Close
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

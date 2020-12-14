import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const history = useHistory()
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isChecked, setIsChecked ] = useState(false)
    const [ error, setError ] = useState('')

    function signIn(event) {
        event.preventDefault()
        if (!isChecked) {
            setError('check your field')
        } else if (!username || !password) {
            setError('fill username or password field')
        } else {
            localStorage.setItem("access_token", "tokensecretdemo")
            history.push('/')
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            history.push('/')
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card m-5">
                        <div className="card-header">
                            Sign In
                        </div>
                        <div className="card-body">
                            <form onSubmit={signIn}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" value={username} onChange={ (e) => { setUsername(e.target.value) }}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={password} onChange={ (e) => { setPassword(e.target.value) }}/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" checked={isChecked} onChange={(e) => { setIsChecked(e.target.checked) }}/>
                                    <label className="form-check-label">Check me out</label>
                                </div>
                                { error && <small className="form-text text-muted mb-3">{error}</small> }
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

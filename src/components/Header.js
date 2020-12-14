import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function Header() {
    const history = useHistory()

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('access_token')
        history.push("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="navbar-brand">
                    <img src="https://www.logo.wine/a/logo/GitHub/GitHub-Wordmark-Logo.wine.svg" width="100" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
                    Jobs
                </div>
                { localStorage.getItem("access_token") && <Link className="navbar-brand" to="/login" onClick={logout}>Logout</Link> }
            </nav>
        </div>
    )
}

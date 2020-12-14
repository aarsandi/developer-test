import React, { useEffect, useState } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function PositionSingle() {
    const history = useHistory()
    const { pathname } = useLocation()
    const [ position , setPosition ] = useState([])
    const [ error, setError ] = useState('')

    function fetchDataSingle(id) {
        axios.get(`http://localhost:3001/positions/${id}`)
        .then(res => {
            setPosition(res.data)
        }).catch(err => {
            setError('fetch data failed')
        })
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            fetchDataSingle(pathname.slice(10))
        } else {
            history.push('/login')
        }
    }, [pathname, history])
    return (
        <div>
            { position &&
            <>
                <Link to="/">
                    <span><i className="fa fa-arrow-left mt-3 mx-3"></i>back</span>
                </Link>
                <div className="card m-3 position-single">
                    <div class="card-header">
                        <span>{position.type} / {position.location}</span>
                        <h1 className="header-title">{position.title}</h1>
                    </div>
                    <div class="card-body">
                        <div className="row">
                            <div className="col-8">
                                <div dangerouslySetInnerHTML={{__html: position.description}} />
                            </div>
                            <div className="col-4">
                                <div class="card">
                                    <h5 class="card-header">{position.company}</h5>
                                    <div class="card-body">
                                        <img src={position.company_logo} alt="img"/>
                                        <a href={position.company_url} target="_blank" rel="noopener noreferrer">{position.company_url}</a>
                                    </div>
                                </div>
                                <div class="card">
                                    <h5 class="card-header">How to Apply</h5>
                                    <div class="card-body">
                                        <div dangerouslySetInnerHTML={{__html: position.how_to_apply}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
            {
                error && <h1>{error}</h1>
            }
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import PositionsListItem from '../components/PositionsListItem'

export default function Home() {
    const history = useHistory()
    const [ positions, setPositions ] = useState([])
    const [ error, setError ] = useState('')
    const [ byDesc, setByDesc ] = useState('')
    const [ byLocation, setByLocation ] = useState('')
    const [ isFullTime, setIsFullTime ] = useState(false)

    function fetchData() {
        axios.get('http://localhost:3001/positions')
        .then(res => {
            setPositions(res.data)
        }).catch(err => {
            setError('fetch data failed')
        })
    }

    function search(event) {
        event.preventDefault()
        if (byDesc) {
            let temp = positions.filter(positions => positions.title === byDesc)
            setPositions(temp)
        } else if (byLocation) {
            let temp = positions.filter(positions => positions.location === byLocation)
            setPositions(temp)
        } else if (isFullTime) {
            let temp = positions.filter(positions => positions.type === "Full Time")
            setPositions(temp)
        } else {
            fetchData()
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            fetchData()
        } else {
            history.push('/login')
        }
    }, [history])

    return (
        <div className="container-fluid">
            { positions && 
                <>
                    <div className="row positions-page">
                        <div className="col-12 search">
                            <form onSubmit={search}>
                                <div className="row">
                                    <div className="col-4">
                                        <div>
                                            <label>Title</label>
                                            <input type="text" className="form-control" value={byDesc} placeholder="filter by title" onChange={(e) => { setByDesc(e.target.value) }}/>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div>
                                            <label>Location</label>
                                            <input type="text" className="form-control" value={byLocation} placeholder="filter by location" onChange={(e) => { setByLocation(e.target.value) }}/>
                                        </div>
                                    </div>
                                    <div className="col-2 checkbox">
                                        <div>
                                            <input type="checkbox" className="form-check-input" checked={isFullTime} onChange={(e) => {setIsFullTime(e.target.checked)}}/>
                                            <label className="form-check-label">Full Time Only</label>
                                        </div>
                                    </div>
                                    <div className="col-2 buttonsearch">
                                        <button type="submit" className="btn btn-primary">search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12">
                            <div className="card m-2 p-3 job-list">
                                <h1 className="card-title joblist-title">Job List</h1>
                                <ul className="list-group list-group-flush">
                                    {
                                        positions.map((position) => {
                                            return <PositionsListItem position={position} key={position.id}/>
                                        })
                                    }
                                </ul>
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

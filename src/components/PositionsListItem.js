import React from 'react'
import { Link } from 'react-router-dom'
import timeFormat from 'aarsandi-time-format'

export default function PositionsListItem({ position }) {
    return (
        <>
            <li className="list-group-item d-flex justify-content-between position-list-item">
                <div className="flex-column">
                    <Link className="text-left" to={`/position/${position.id}`}><h5 className="title">{position.title}</h5></Link>
                    <p className="text-left company">{position.company} - <span className="type">{position.type}</span></p>
                </div>
                <div className="flex-column">
                    <p className="text-right location">{position.location}</p>
                    <p className="text-right date">{timeFormat(position.created_at)}</p>
                </div>
            </li>
        </>
    )
}

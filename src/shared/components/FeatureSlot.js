import React from 'react'
import ReactDOM from 'react-dom'
import featureSlot from '../style/featureSlot.scss'

const FeatureSlot = ({
    title,
    content1,
    content2
}) => {
    return (
        <div className="col feature">
            <div className="sc"><p>{title}</p></div>
            <p>{content1}<br />
            {content2}</p>
        </div>
    )
}

export default FeatureSlot

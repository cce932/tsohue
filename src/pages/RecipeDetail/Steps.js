import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Player, BigPlayButton, ControlBar } from 'video-react'

import 'shared/style/steps.scss'
import { transMSecToMin } from 'shared/utility/common'

const Steps = ({ steps, link }) => {
  const videoRef = useRef()

  const changeTime = (startTime) => {
    videoRef.current.seek(_.floor(startTime / 1000))
  }

  return (
    <div className="steps">
      <p>料理步驟</p>
      <div className="video">
        <Player src={link} fluid ref={videoRef}>
          <BigPlayButton position="center" />
          <ControlBar />
        </Player>
      </div>
      {steps.map((step, index) => (
        <div key={index} className="step">
          <label className="order">{index + 1}</label>
          <button className="time" onClick={() => changeTime(step.startTime)}>
            {transMSecToMin(step.startTime)}
          </button>
          <label className="note">{step.note}</label>
        </div>
      ))}
    </div>
  )
}

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
}

export default Steps

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
      <table>
        {steps.map((step, index) => (
          <tr key={index} className="step">
            <td className="order">{index + 1}</td>
            <td className="time">
              <button onClick={() => changeTime(step.startTime)}>
                {transMSecToMin(step.startTime)}
              </button>
            </td>
            <td className="note">{step.note}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
}

export default Steps

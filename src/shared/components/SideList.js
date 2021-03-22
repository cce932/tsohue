import React from "react"
import { Link } from "react-router-dom"
import "shared/style/components/sideList.scss"

const SideList = ({ items }) => {
  return (
    <div className="side-list">
      {items.map((item, index) => (
        <div key={index}>
          {item.topStroke && <div className="top-stroke" />}
          <Link to={item.url} onClick={item.onClick}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SideList

import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import 'shared/style/components/sideList.scss'

const SideList = ({ items }) => {
  return (
    <div className="side-list" id="side-list">
      {items.map((item, index) => (
          <NavLink
            key={index}
            activeClassName="selected"
            to={item?.url || '#'}
            onClick={item?.onClick}
          >
            {item.title}
          </NavLink>
      ))}
    </div>
  )
}

SideList.propTypes = {
  items: PropTypes.array.isRequired,
  style: PropTypes.object,
}

export default SideList

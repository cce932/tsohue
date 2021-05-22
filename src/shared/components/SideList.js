import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

import "shared/style/components/sideList.scss"

const SideList = ({ items, style }) => {
  const defaultStyle = {
    top: "150px",
    left: "10%",
    width: "auto", // safari
    backgroundColor: "white",
    boxShadow: "0px 0px 15px rgba(205, 211, 216, 0.7)",
    padding: "10px 30px",
    borderRadius: "20px",
    border: "none",
    textAlign: "left",
    ...style,
  }

  const SideListWapper = styled.div`
    position: fixed;
    top: ${defaultStyle.top};
    left: ${defaultStyle.left}; // 和logo同步對齊
    width: ${defaultStyle.width};
    background-color: ${defaultStyle.backgroundColor};
    box-shadow: ${defaultStyle.boxShadow};
    padding: ${defaultStyle.padding};
    border-radius: ${defaultStyle.borderRadius};
    text-align: ${defaultStyle.textAlign};
    border: ${defaultStyle.border};
    text-align: ${defaultStyle.textAlign};
  `

  return (
    <SideListWapper className="side-list" id="side-list">
      {items.map((item, index) => (
        <div key={index}>
          {item.topStroke && <div className="top-stroke" />}
          <NavLink
            activeClassName="selected"
            to={item?.url || "#"}
            onClick={item?.onClick}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
    </SideListWapper>
  )
}

export default SideList

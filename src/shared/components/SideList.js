import React from "react"
import { Link } from "react-router-dom"
import "shared/style/components/sideList.scss"
import styled from "styled-components"
import $ from "jquery"

const SideList = ({ items, style }) => {
  const defaultStyle = {
    top: "135px",
    left: "10%",
    width: "fit-content",
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
  `

  $(window).scroll(function () {
    if ($(this).scrollTop() < $("#footer").offset().top / 2) {
      $("#side-list").fadeIn("fast")
    } else {
      $("#side-list").fadeOut("fast")
    }
  })

  return (
    <SideListWapper className="side-list" id="side-list">
      {items.map((item, index) => (
        <div key={index}>
          {item.topStroke && <div className="top-stroke" />}
          <Link to={item.url} onClick={item.onClick}>
            {item.title}
          </Link>
        </div>
      ))}
    </SideListWapper>
  )
}

export default SideList

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Form, Row, Col } from "react-bootstrap"

import "shared/style/recipes.scss"
import Recipe from "./Recipe"
import { loadRecipes } from "actions/load"
import { versionOptions } from "shared/constants/options"

const NAME_ASC = "名稱A-Z"
const NAME_DESC = "名稱Z-A"
const PRICE_ASC = "價格低到高"
const PRICE_DESC = "價格高到低"
const ASC = "ASC"
const DESC = "DESC"

const SideListWapper = styled.div`
  position: fixed;
  top: 200px;
  left: 8%;
  width: auto;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(205, 211, 216, 0.7);
  padding: 10px 30px;
  border-radius: 20px;
  border: none;
  text-align: left;
`

const Recipes = () => {
  const dispatch = useDispatch()
  const { allRecipes } = useSelector((state) => state.recipes)
  const [recipes, setRecipes] = useState([])
  const [sortType, setSortType] = useState("")

  useEffect(() => {
    dispatch(loadRecipes()).then((data) => {
      setRecipes(data)
    })
  }, [dispatch])

  const compareBy = (key, order) => {
    return function (a, b) {
      if (order === ASC) {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      } else {
        if (a[key] < b[key]) return 1
        if (a[key] > b[key]) return -1
        return 0
      }
    }
  }

  const sortBy = (key, order, filteredRecipes) => {
    filteredRecipes.sort(compareBy(key, order))
    setRecipes(filteredRecipes)
  }

  const sort = (order, filteredRecipes = recipes) => {
    switch (order) {
      case NAME_ASC:
        sortBy("name", ASC, filteredRecipes)
        setSortType(NAME_ASC)
        break
      case NAME_DESC:
        sortBy("name", DESC, filteredRecipes)
        setSortType(NAME_DESC)
        break
      case PRICE_ASC:
        sortBy("price", ASC, filteredRecipes)
        setSortType(PRICE_ASC)
        break
      case PRICE_DESC:
        sortBy("price", DESC, filteredRecipes)
        setSortType(PRICE_DESC)
        break
      default:
        return null
    }
  }

  const versionFilterOnClick = (e) => {
    const selectedVersion = e.target.outerText.trim() + "版本"
    const filteredRecipes = allRecipes.filter((recipe) => {
      return versionOptions[recipe.version] === selectedVersion
    })
    setRecipes(filteredRecipes)
    sort(sortType, filteredRecipes)
  }

  const sortOnChange = (e) => {
    sort(e.target.value)
  }

  return (
    <div className="container recipes">
      <SideListWapper className="cus-side-list" id="side-list">
        <p>分類</p>
        <div>
          <div>
            <button
              className="all"
              onClick={() => {
                setRecipes(allRecipes)
                sort(sortType, allRecipes)
              }}
            >
              全部
            </button>
            <button className="normal" onClick={(e) => versionFilterOnClick(e)}>
              正常
            </button>
            <button className="lowfat" onClick={(e) => versionFilterOnClick(e)}>
              低脂
            </button>
          </div>
          <div>
            <button className="meat" onClick={(e) => versionFilterOnClick(e)}>
              多肉
            </button>
            <button className="vage" onClick={(e) => versionFilterOnClick(e)}>
              素食
            </button>
          </div>
        </div>
        <p>排序</p>
        <Form.Control as="select" onChange={(e) => sortOnChange(e)}>
          <option>{NAME_ASC}</option>
          <option>{NAME_DESC}</option>
          <option>{PRICE_ASC}</option>
          <option>{PRICE_DESC}</option>
        </Form.Control>
      </SideListWapper>

      <Row>
        <Col sm="2"></Col>
        <Col sm="10">
          {recipes &&
            recipes.map((recipe, index) => {
              return <Recipe key={index} recipe={recipe} />
            })}
        </Col>
      </Row>
    </div>
  )
}

export default Recipes

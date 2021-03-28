import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Form, Row, Col, Spinner } from "react-bootstrap"
import { useLocation } from "react-router-dom"

import "shared/style/recipes.scss"
import Recipe from "./Recipe"
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
  const { allRecipes } = useSelector((state) => state.recipes)
  const [recipes, setRecipes] = useState([])
  const [queryFiltered, setQqueryFiltered] = useState([])
  const [sortType, setSortType] = useState("")
  const query = new URLSearchParams(useLocation().search).get("search")

  useEffect(() => {
    if (allRecipes) {
      if (query) {
        const _queryFiltered = allRecipes.filter((recipe) =>
          recipe.name.match(query)
        )
        if (_queryFiltered.length) {
          setRecipes(_queryFiltered)
          setQqueryFiltered(_queryFiltered)
        } else {
          setRecipes(`目前無「${query}」相關的烹飪包喔～`)
        }
      } else {
        setRecipes(allRecipes)
      }
    }
  }, [allRecipes, query])

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
    if (typeof filteredRecipes === "string") return

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
    const versionFiltered = query
      ? queryFiltered.filter(
          (recipe) => versionOptions[recipe.version] === selectedVersion
        )
      : allRecipes.filter(
          (recipe) => versionOptions[recipe.version] === selectedVersion
        )

    setRecipes(
      versionFiltered.length
        ? versionFiltered
        : query
        ? `「${query}」相關的食譜中 目前沒有${selectedVersion}喔～`
        : `目前沒有「${selectedVersion}」喔～`
    )
    versionFiltered.length && sort(sortType, versionFiltered)
  }

  const sortOnChange = (e) => {
    sort(e.target.value)
  }

  return (
    <div className="container recipes">
      <SideListWapper className="cus-side-list" id="side-list">
        <p>分類</p>
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
          {Object.keys(versionOptions).map((option, index) => (
            <button
              key={index}
              className={option.toLowerCase()}
              onClick={(e) => versionFilterOnClick(e)}
            >
              {versionOptions[option].slice(
                0,
                versionOptions[option].length - 2
              )}
            </button>
          ))}
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
          {recipes.length ? (
            typeof recipes === "string" ? (
              <p className="no-result">{recipes}</p>
            ) : (
              recipes.map((recipe, index) => {
                return <Recipe key={index} recipe={recipe} />
              })
            )
          ) : (
            <Spinner
              animation="border"
              variant="warning"
              role="status"
            ></Spinner>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Recipes

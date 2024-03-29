import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Form, Pagination, Row, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import 'shared/style/recipes.scss'
import Recipe from './Recipe'
import { versionOptions } from 'shared/constants/options'
import SearchBar from 'shared/components/SearchBar'
import { splitToRows } from 'shared/utility/common'

const NAME_ASC = '名稱順序'
const NAME_DESC = '名稱倒序'
const PRICE_ASC = '價格低到高'
const PRICE_DESC = '價格高到低'
const ASC = 'ASC'
const DESC = 'DESC'

const Recipes = () => {
  const { allRecipes } = useSelector((state) => state.recipes)
  const [recipes, setRecipes] = useState([])
  const [queryFiltered, setQqueryFiltered] = useState([])
  const [sortType, setSortType] = useState('')
  const [activePage, setActivePage] = useState(1)
  const query = new URLSearchParams(useLocation().search).get('search')

  useEffect(() => {
    if (allRecipes) {
      if (query) {
        const _queryFiltered = allRecipes.filter((recipe) =>
          recipe.name.match(query),
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
    if (typeof filteredRecipes === 'string') return

    switch (order) {
      case NAME_ASC:
        sortBy('name', ASC, filteredRecipes)
        setSortType(NAME_ASC)
        break
      case NAME_DESC:
        sortBy('name', DESC, filteredRecipes)
        setSortType(NAME_DESC)
        break
      case PRICE_ASC:
        sortBy('price', ASC, filteredRecipes)
        setSortType(PRICE_ASC)
        break
      case PRICE_DESC:
        sortBy('price', DESC, filteredRecipes)
        setSortType(PRICE_DESC)
        break
      default:
        return null
    }
  }

  const versionFilterOnClick = (e) => {
    const selectedVersion = e.target.outerText.trim()
    const versionFiltered = query
      ? queryFiltered.filter(
        (recipe) => versionOptions[recipe.version] === selectedVersion,
      )
      : allRecipes.filter(
        (recipe) => versionOptions[recipe.version] === selectedVersion,
      )

    setActivePage(1)
    setRecipes(
      versionFiltered.length
        ? versionFiltered
        : query
          ? `「${query}」相關的食譜中 目前沒有${selectedVersion}喔～`
          : `目前沒有「${selectedVersion}」喔～`,
    )
    versionFiltered.length && sort(sortType, versionFiltered)
  }

  const sortOnChange = (e) => {
    sort(e.target.value)
  }

  const ITEMS_PER_PAGE = 12
  const PAGE_COUNT = recipes.length / ITEMS_PER_PAGE
  const pageitems = []

  const pageOnChange = (e) => {
    const to = e.target.id

    if (/next/.test(to)) {
      setActivePage(
        parseInt(activePage) < PAGE_COUNT
          ? parseInt(activePage) + 1
          : activePage,
      )
    } else if (/prev/.test(to)) {
      setActivePage(
        parseInt(activePage) > 1 ? parseInt(activePage) - 1 : activePage,
      )
    } else {
      setActivePage(e.target.text)
    }
  }

  for (let number = 1; number <= Math.ceil(PAGE_COUNT); number++) {
    pageitems.push(
      <Pagination.Item
        id={number}
        key={number}
        active={number === parseInt(activePage)}
        onClick={pageOnChange}
      >
        {number}
      </Pagination.Item>,
    )
  }

  return (
    <div className="recipes pages">
      <Row sm="1" lg="2">
        <Col lg="3">
          <div className="cus-side-list mx-auto" id="side-list">
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
                  {versionOptions[option]}
                </button>
              ))}
            </div>

            <p>排序</p>
            <Form.Select onChange={(e) => sortOnChange(e)}>
              <option value={NAME_ASC}>{NAME_ASC}</option>
              <option value={NAME_DESC}>{NAME_DESC}</option>
              <option value={PRICE_ASC}>{PRICE_ASC}</option>
              <option value={PRICE_DESC}>{PRICE_DESC}</option>
            </Form.Select>

            <div className="cus-side-list_search">
              <p>搜尋</p>
              <SearchBar at="recipes" />
            </div>
          </div>
        </Col>
        <Col lg="9" >
          <div className="content">
            {recipes.length
              ? (
                  typeof recipes === 'string'
                    ? (
                <p className="no-result">{recipes}</p>
                      )
                    : (
                        splitToRows(recipes, ITEMS_PER_PAGE)[activePage - 1].map(
                          (recipe, index) => {
                            return <Recipe key={index} {...{ ...recipe }} />
                          },
                        )
                      )
                )
              : (
              <Spinner animation="border" variant="warning" role="status"></Spinner>
                )}

          </div>
          <div className="pagination mx-auto">
            <Pagination>
              <Pagination.Prev id="prev" onClick={pageOnChange} />
              {pageitems}
              <Pagination.Next id="next" onClick={pageOnChange} />
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Recipes

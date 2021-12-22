import React, { useState } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { FaSearch } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import 'shared/style/components/searchBar.scss'
import { allPaths, recipes } from 'shared/constants/pathName'

// SearchBar is used in Nav and RecipeOverview now.
// In order to distinct the different Search input,
// `props.at` is used.
const SearchBar = ({ at }) => {
  const history = useHistory()
  const [isEmpty, setIsEmpty] = useState(true)

  const clearOnClick = e => {
    e?.preventDefault()
    console.log('reset')

    $(`#search-${at}`).val('')
    setIsEmpty(true)
    window.location.pathname.search(allPaths[recipes]) >= 0 &&
      history.push(`${allPaths[recipes]}`)
  }

  const searchOnClick = e => {
    e?.preventDefault()

    history.push(
      `${allPaths[recipes]}?search=${$(`#search-${at}`)
        .val()
        .trim()}`,
    )
  }

  const queryOnChange = e => {
    setIsEmpty(e.target.value === '')
  }

  return (
    <Form className="d-flex search-bar" onSubmit={e => searchOnClick(e)}>
      <input
        type="text"
        id={`search-${at}`}
        className="search-input"
        onChange={queryOnChange}
        placeholder="搜尋烹飪包"
      />
      {isEmpty
        ? (
        <button
          type="submit"
          className="search-btn"
          onClick={e => searchOnClick(e)}
        >
          <FaSearch fill="#755734" />
        </button>
          )
        : (
        <button
          type="reset"
          className="search-btn"
          onClick={e => clearOnClick(e)}
        >
          <CgClose strokeWidth="2px" stroke="#755734" />
        </button>
          )}
    </Form>
  )
}

SearchBar.propTypes = {
  at: PropTypes.string.isRequired,
}

export default SearchBar

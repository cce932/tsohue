import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import 'shared/style/recipe.scss'
import { SemiRoundedLabel } from 'shared/components/styled'
import { versionOptions } from 'shared/constants/options'
import { allPaths, recipe as recipePath } from 'shared/constants/pathName'
import { addFavorite } from 'actions/add'
import { removeFavorite } from 'actions/edit'

const Recipe = ({ id, version, photo, name, price, likesCount }) => {
  const [like, setLike] = useState(false)
  const dispatch = useDispatch()

  const likeOnClick = (id) => () => { // TODO: back-end has connection problem so the favorite feature hasn't test
    if (like) {
      dispatch(removeFavorite(id)).then((data) => {
        console.log('addFavorite', data)
      })
    } else {
      dispatch(addFavorite(id)).then((data) => {
        console.log('addFavorite', data)
      })
    }
    setLike(!like)
  }

  return (
    <div className="recipe">
      <a href={allPaths[recipePath] + id}>
        <SemiRoundedLabel
          className={`version version-${version.toLowerCase()}`}
        >
          {versionOptions[version]}版本
        </SemiRoundedLabel>
        <img
          src={photo}
          alt={name + '-img'}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/common-pic/noImage.jpg'
          }}
        />
        <label className="title">{name}</label>
      </a>
      <div className="info">
        <div className="info_space-between">
          <span> $ {price}</span>
          <span>
            <button onClick={likeOnClick(id)}>
              {like
                ? (
                <FaHeart fill="#755134" />
                  )
                : (
                <FaRegHeart fill="#755734" />
                  )}
            </button>
            {likesCount}
          </span>
        </div>
      </div>
    </div>
  )
}

Recipe.propTypes = {
  id: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
}

export default Recipe

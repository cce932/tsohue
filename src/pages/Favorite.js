import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'shared/style/favorite.scss'
import { loadFavorite } from 'actions/load'
import Recipe from './Recipes/Recipe'

const Favorite = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorite.allFavorites)

  useEffect(() => {
    dispatch(loadFavorite())
  }, [])
  return (
    <div className="favorite pages">
      <h2>我的最愛</h2>

      <div className="recipes-wrapper">
        {favorites.map((favorite, index) =>
          <Recipe key={index} {...{ ...favorite }} />,
        )}
      </div>
    </div>
  )
}

export default Favorite

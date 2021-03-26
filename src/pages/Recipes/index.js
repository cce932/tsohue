import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import "shared/style/recipes.scss"
import Recipe from "./Recipe"
import SideList from "shared/components/SideList"
import { loadRecipes } from "actions/load"

const Recipes = () => {
  const dispatch = useDispatch()
  const { allRecipes } = useSelector((state) => state.recipes)

  useEffect(() => {
    dispatch(loadRecipes())
  }, [dispatch])

  const sideListItems = [
    {
      title: "排序",
      onClick: () => null,
      url: "#",
    },
    {
      title: "正版版本",
      onClick: () => null,
      url: "#",
      topStroke: true,
    },
    {
      title: "低脂版本",
      onClick: () => null,
      url: "#",
    },
    {
      title: "肉多版本",
      onClick: () => null,
      url: "#",
    },
  ]

  const sideListStyle = {
    top: "200px",
  }

  return (
    <div className="container recipes">
      <SideList style={sideListStyle} items={sideListItems} />
      {allRecipes &&
        allRecipes.map((recipe, index) => {
          return <Recipe key={index} recipe={recipe} />
        })}
    </div>
  )
}

export default Recipes

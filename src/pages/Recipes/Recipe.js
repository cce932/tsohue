import { SemiRoundedLabel } from "shared/components/styled"
import { versionOptions } from "shared/constants/options"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import "shared/style/recipe.scss"
import { useState } from "react"
import { allPaths, recipe as recipePath } from "shared/constants/pathName"

const Recipe = (props) => {
  const recipe = props.recipe
  const [like, setLike] = useState(false)

  return (
    <a className="recipe" href={allPaths[recipePath] + recipe.id}>
      <SemiRoundedLabel
        className={`version version-${recipe.version.toLowerCase()}`}
      >
        {versionOptions[recipe.version]}版本
      </SemiRoundedLabel>
      {recipe.photo === "No Image" ? (
        <img src="/common-pic/loading.gif" alt="loading-pic" />
      ) : (
        <img src={recipe.photo} alt={recipe.name + "-img"} />
      )}
      <div className="info">
        <p>{recipe.name}</p>
        <div className="distributed">
          <span> $ {recipe.price}</span>
          <span>
            <button onClick={() => setLike(!like)}>
              {like ? (
                <FaHeart fill="#755734" />
              ) : (
                <FaRegHeart fill="#755734" />
              )}
            </button>
            {recipe.likesCount}
          </span>
        </div>
      </div>
    </a>
  )
}

export default Recipe

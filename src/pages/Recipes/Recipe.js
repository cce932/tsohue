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
    <div className="recipe">
      <a href={allPaths[recipePath] + recipe.id}>
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
        <p>{recipe.name}</p>
      </a>
      <div className="info">
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
    </div>
  )
}

export default Recipe

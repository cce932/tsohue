import { SemiRoundedLabel } from "shared/components/styled"
import { versionOptions } from "shared/constants/options"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import "shared/style/recipe.scss"
import { useState } from "react"

const Recipe = (props) => {
  const recipe = props.recipe
  const [like, setLike] = useState(false)

  return (
    <div className="recipe">
      <SemiRoundedLabel className="version">
        {versionOptions[recipe.version]}
      </SemiRoundedLabel>
      <img src={recipe.photo} alt={recipe.name + "-img"} />
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
    </div>
  )
}

export default Recipe

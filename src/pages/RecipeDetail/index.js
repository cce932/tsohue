import _, { floor } from "lodash"
import $ from "jquery"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Spinner, Carousel } from "react-bootstrap"

import "shared/style/recipeDetail.scss"
import Steps from "./Steps"
import CartAdderForDefault from "./MemberCartAdder"
import CartAdderForCustomization from "./VipCartAdder"
import { versionOptions } from "shared/constants/options"
import { loadRecipeById, loadRecipeImagesById } from "actions/load"
import { allPaths, recipe as recipePath } from "shared/constants/pathName"
import { MEMBER } from "shared/constants/common"

const RecipeDetail = (props) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [recipe, setRecipe] = useState({})
  const [images, setImages] = useState([])
  const id = props.match.params.id

  useEffect(() => {
    dispatch(loadRecipeById(id)).then((data) => setRecipe(data))
    dispatch(loadRecipeImagesById(id)).then((data) => setImages(data))
  }, [dispatch, id])

  $(() => {
    $("#recipe-name-wave").width($("#recipe-name").width())
  })

  return !_.isEmpty(recipe) ? (
    <div sm={5} className="recipe-detail">
      <Row className="info-image">
        <Col className="info">
          <div className="version">
            {recipe.existedVersions.map((version, index) =>
              version.recipeId.toString() === id ? (
                <a
                  className={`version version-${version.version.toLowerCase()} located`}
                  key={index}
                  href={allPaths[recipePath] + version.recipeId}
                >
                  {versionOptions[version.version]}版本
                </a>
              ) : (
                <a
                  className={`version version-${version.version.toLowerCase()}`}
                  key={index}
                  href={allPaths[recipePath] + version.recipeId}
                >
                  {versionOptions[version.version]}
                </a>
              )
            )}
          </div>

          <div className="name">
            <div id="recipe-name">{recipe.currentRecipe.name}</div>
            {/* <img
              id="recipe-name-wave"
              src="/common-pic/wave.svg"
              alt="Decorating wave"
            /> */}
          </div>

          <div className="description">{recipe.currentRecipe.description}</div>
        </Col>
        <Col sm={7} className="images">
          <Carousel>
            {images.length ? (
              images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.s3Url}
                    alt={`${index}-slide`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/common-pic/loading.gif"
                  alt={"wait-upload"}
                />
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>

      {recipe.currentRecipe.recipeIngredients.length > 0 &&
        (!user || user.role === MEMBER ? (
          <CartAdderForDefault
            recipeId={id}
            ingredients={recipe.currentRecipe.recipeIngredients}
            price={recipe.currentRecipe.price}
            isOutOfStock={recipe.currentRecipe.outOfStockIngredients.length > 0}
          />
        ) : (
          <CartAdderForCustomization
            recipeId={id}
            ingredients={recipe.currentRecipe.recipeIngredients}
            price={recipe.currentRecipe.price}
            outOfStockIngredients={recipe.currentRecipe.outOfStockIngredients}
            handmadePrice={recipe.handmade}
          />
        ))}

      <Steps
        steps={recipe.currentRecipe.recipeSteps}
        link={recipe.currentRecipe.link}
      />
    </div>
  ) : (
    <Spinner animation="border" variant="warning" role="status" />
  )
}

export default RecipeDetail

import _ from "lodash"
import $ from "jquery"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Row, Col, Spinner, Carousel } from "react-bootstrap"

import "shared/style/recipeDetail.scss"
import Steps from "./Steps"
import { versionOptions } from "shared/constants/options"
import { loadRecipeById, loadRecipeImagesById } from "actions/load"
import { allPaths, recipe as recipePath } from "shared/constants/pathName"

const RecipeDetail = (props) => {
  const disaptch = useDispatch()
  const [recipe, setRecipe] = useState({})
  const [images, setImages] = useState([])
  const id = props.match.params.id

  useEffect(() => {
    disaptch(loadRecipeById(id)).then((data) => setRecipe(data))
    disaptch(loadRecipeImagesById(id)).then((data) => setImages(data))
  }, [disaptch, id])

  $(() => {
    $("#recipe-name-wave").width($("#recipe-name").width())
  })

  return !_.isEmpty(recipe) ? (
    <div sm={5} className="recipe-detail">
      <Row>
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
            <img
              id="recipe-name-wave"
              src="/common-pic/wave.svg"
              alt="Decorating wave"
            />
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

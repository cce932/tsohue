import _ from 'lodash'
import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Spinner, Carousel, Tabs, Tab } from 'react-bootstrap'
import { RiVipFill } from 'react-icons/ri'

import 'shared/style/recipeDetail.scss'
import Steps from './Steps'
import CartAdderForDefault from './CartAdderForDefault'
import CartAdderForCustomization from './CartAdderForCustomization'
import { versionOptions } from 'shared/constants/options'
import { MEMBER } from 'shared/constants/common'
import { loadRecipeById, loadRecipeImagesById } from 'actions/load'
import {
  allPaths,
  recipe as recipePath,
  recipeNotFound,
} from 'shared/constants/pathName'

const RecipeDetail = (props) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [recipe, setRecipe] = useState({})
  const [images, setImages] = useState([])
  const id = props.match.params.id
  const [description, setDescription] = useState([])

  useEffect(() => {
    dispatch(loadRecipeById(id))
      .then((data) => {
        setRecipe(data)
        setDescription(data.currentRecipe.description.split('\n'))
      })
      .catch((error) => {
        if (error.status === 'NOT_FOUND') { window.location = allPaths[recipeNotFound] }
      })

    dispatch(loadRecipeImagesById(id)).then((data) => setImages(data))
  }, [dispatch, id])

  $(() => {
    $('#recipe-name-wave').width($('#recipe-name').width())
  })

  return (
    <div className="recipe-detail pages">
      {!_.isEmpty(recipe)
        ? (<>
          <Row sm="1" md="2" lg="2" className="info-image">
            <Col lg="5" className="info">
              <div className="version">
                {recipe.existedVersions.map((version, index) =>
                  version.recipeId.toString() === id
                    ? (
                    <a
                      className={`version version-${version.version.toLowerCase()} located`}
                      key={index}
                      href={allPaths[recipePath] + version.recipeId}
                    >
                      {versionOptions[version.version]}版本
                    </a>
                      )
                    : (
                    <a
                      className={`version version-${version.version.toLowerCase()}`}
                      key={index}
                      href={allPaths[recipePath] + version.recipeId}
                    >
                      {versionOptions[version.version]}
                    </a>
                      ),
                )}
              </div>

              <div className="name">
                <h2 id="recipe-name">{recipe.currentRecipe.name}</h2>
                {/* <img
              id="recipe-name-wave"
              src="/common-pic/wave.svg"
              alt="Decorating wave"
            /> */}
              </div>

              <div className="description">
                {description && description.map((des, index) => <p key={index}>{des}</p>)}
              </div>
            </Col>
            <Col lg="7">
              <Carousel>
                {images.length
                  ? (images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={image.s3Url}
                        alt={`${index}-slide`}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/common-pic/noImage.jpg'
                        }}
                      />
                    </Carousel.Item>
                    ))
                    )
                  : (
                  <Carousel.Item>
                    <img src="/common-pic/loading.gif" alt={'wait-upload'} />
                  </Carousel.Item>
                    )}
              </Carousel>
            </Col>
          </Row>

          <Tabs
            defaultActiveKey={
              !user || user.role === MEMBER
                ? 'CartAdderForDefault'
                : 'CartAdderForCustomization'
            }
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="CartAdderForDefault" title={<span>推薦配方</span>}>
              <CartAdderForDefault
                recipeId={id}
                ingredients={recipe.currentRecipe.recipeIngredients}
                price={recipe.currentRecipe.price}
                isOutOfStock={
                  recipe.currentRecipe.outOfStockIngredients.length > 0
                }
              />
            </Tab>
            <Tab
              eventKey="CartAdderForCustomization"
              title={
                <span>
                  客製配方
                  <RiVipFill size="20px" />
                </span>
              }
            >
              <CartAdderForCustomization
                recipeId={id}
                ingredients={recipe.currentRecipe.recipeIngredients}
                price={recipe.currentRecipe.price}
                outOfStockIngredients={
                  recipe.currentRecipe.outOfStockIngredients
                }
                handmadePrice={recipe.handmade}
              />
            </Tab>
          </Tabs>

          <Steps
            steps={recipe.currentRecipe.recipeSteps}
            link={recipe.currentRecipe.link}
          />
        </>)
        : (
        <Spinner animation="border" variant="warning" role="status" />
          )}
    </div>
  )
}

RecipeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}

export default RecipeDetail

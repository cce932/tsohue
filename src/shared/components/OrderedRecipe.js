import React from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import styled from "styled-components"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

import color from "shared/style/color"
import { splitToRows } from "shared/utility/common"
import { StrokeLabel } from "shared/components/styled"
import { versionOptions } from "shared/constants/options"
import { allPaths, recipe as recipePath } from "shared/constants/pathName"

const ItemBlock = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  margin: 10px 13px 30px 0; // [right: 13px] align to float-bottom
  border: 1px ${(props) => props.theme.fifthColor} solid;
  background-color: white;
  padding: 20px 25px;
  text-align: left;
`

const ItmeImg = styled.img`
  width: 100%;
  border-radius: 13px;
  height: 140px;
  object-fit: cover;
`

const BottomLine = styled.div`
  padding-bottom: 10px;
  margin-bottom: 8px;
  border-bottom: solid ${(props) => props.theme.fifthColor} 1px;
`

const FloatRight = styled.div`
  float: right;
  & > button {
    margin-left: 15px;

    svg {
      margin-top: -4px;
    }
  }
`

const FloatDiv = styled.div`
  position: absolute;
  text-align: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  margin: -20px;
`

const RelativeDiv = styled.div`
  position: relative;
  height: 100%;
`

const IngredientsTable = styled.table`
  width: 100%;
  margin-top: 5px;
`

const IngredientTd = styled.td`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme.thirdColor};
  font-size: 0.8rem;
  padding: 4px;
  padding-left: 0;

  &.quantitiy-zero {
    color: ${(props) => props.theme.forthColor};
  }
`

const StyledFont = styled.span`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme[props.color] || props.theme.primeColor};
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.size || "1rem"};
`

const OrderedRecipe = ({
  cartId,
  recipe,
  customize,
  sum,
  recipeImage,
  isCustomize,
  modifiable = true,
  editOnClick = () => null,
  removeOnClick = () => null,
  updatingCart = [],
}) => {
  const styled = customize.map((ingredient, index) => (
    <IngredientTd
      key={index}
      className={`${ingredient.quantityRequired === 0 ? "quantitiy-zero" : ""}`}
    >
      {/* for /cart/all, /cart/get/:id || /order/all */}
      {ingredient?.ingredient?.name || ingredient?.ingredientName}
      {" " + ingredient.quantityRequired + " "}
      {ingredient?.ingredient?.unit || ingredient?.ingredientUnit}
    </IngredientTd>
  ))

  const splited = splitToRows(styled, 3).map((gredients, index) => (
    <tr className="g-row" key={index}>
      {gredients}
    </tr>
  ))

  return (
    <ItemBlock className="ordered-recipe">
      <Row>
        <Col sm="3">
          <a href={allPaths[recipePath] + recipe.id}>
            <ItmeImg
              src={recipeImage}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/common-pic/noImage.jpg"
              }}
            />
          </a>
        </Col>
        <Col sm="9">
          <BottomLine>
            <a href={`/recipe/${recipe.id}`}>
              <StyledFont weight="bold">{recipe.name}</StyledFont>
            </a>
            <StrokeLabel
              color={recipe.version.toLowerCase() + "Color"}
              borderColor={recipe.version.toLowerCase() + "Color"}
            >
              {versionOptions[recipe.version] + "版本"}
            </StrokeLabel>
            {isCustomize && <StrokeLabel>客製化</StrokeLabel>}
            <FloatRight>
              <StyledFont>NT. {sum}</StyledFont>
              {modifiable && (
                <>
                  <button onClick={removeOnClick}>
                    <AiOutlineDelete fill="#e76845" size="18px" />
                  </button>
                  <button
                    onClick={(e) => editOnClick(e)}
                    disabled={!isCustomize}
                  >
                    <AiOutlineEdit
                      fill={isCustomize ? color.vage : color.fifth}
                      size="18px"
                    />
                  </button>
                </>
              )}
            </FloatRight>
          </BottomLine>

          <RelativeDiv>
            <StyledFont color="thirdColor" weight="bold" size="0.8rem">
              食材
            </StyledFont>
            <IngredientsTable>
              <tbody>{splited}</tbody>
            </IngredientsTable>
            {updatingCart.some((itemId) => itemId === cartId) && (
              <FloatDiv>
                <Spinner animation="border" variant="warning" role="status" />
              </FloatDiv>
            )}
          </RelativeDiv>
        </Col>
      </Row>
    </ItemBlock>
  )
}

export default OrderedRecipe

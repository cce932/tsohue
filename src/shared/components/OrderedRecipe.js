import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import color from 'shared/style/color'
import { splitToRows } from 'shared/utility/common'
import { StrokeSpan } from 'shared/components/styled'
import { versionOptions } from 'shared/constants/options'
import { allPaths, recipe as recipePath } from 'shared/constants/pathName'

const ItemBlock = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  margin: 10px 13px 30px 0; // [right: 13px] align to float-bottom
  border: 1px ${props => props.theme.fifthColor} solid;
  background-color: white;
  padding: 20px 25px;
  text-align: left;

  .title {
    margin-right: 15px;
    line-height: 2.2;
  }

  @media screen and (max-width: 566px) {
    .title { order: 2; }
    .version {
      order: 1;
    }

    div.md-flex {
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (min-width: 567px) {
    div.md-flex {
      display: flex;
      margin-bottom: 10px;
    }

    div.md-flex-space {
      display: flex;
      justify-content: space-between;
    }
  }
`

const ItmeImg = styled.img`
  width: 100%;
  border-radius: 13px;
  height: 140px;
  object-fit: cover;
  margin-bottom: 10px;
`

const BorderBottom = styled.div`
  margin-bottom: 8px;
  border-bottom: solid ${props => props.theme.fifthColor} 1px;
`

const PriceToolsWrapper = styled.div`
  margin: 4px 0;

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
  ${props => props.theme.font} color: ${props => props.theme.thirdColor};
  font-size: 0.8rem;
  padding: 4px;
  padding-left: 0;
  vertical-align: top;

  &.quantitiy-zero {
    color: ${props => props.theme.forthColor};
  }
`

const StyledFont = styled.span`
  ${props => props.theme.font} color: ${props =>
      props.theme[props.color] || props.theme.primeColor};
  font-weight: ${props => props.weight || 'normal'};
  font-size: ${props => props.size || '1rem'};
`

const OrderedRecipe = ({
  cartId,
  recipe,
  customize: orderedItems,
  sum,
  recipeImage,
  isCustomize,
  modifiable = true,
  editOnClick = () => null,
  removeOnClick = () => null,
  updatingCart = [],
}) => {
  const styled = orderedItems.map((ingredient, index) => (
    <IngredientTd
      key={index}
      className={`${ingredient.quantityRequired === 0 ? 'quantitiy-zero' : ''}`}
    >
      {ingredient.ingredient.name + ' '}
      {ingredient.quantityRequired + ' '}
      {ingredient.ingredient.unit}
    </IngredientTd>
  ))

  // if width<small, split to 2 row
  // if width>=small, split to 3 row
  // no dynamic update, need to refresh to check this effect
  const maxRow = window.screen.width < 576 ? 2 : window.screen.width < 1200 ? 3 : 4
  const splited = splitToRows(styled, maxRow)
    .map((gredients, index) => (
      <tr className="splited-row" key={index}>
        {gredients}
      </tr>
    ))

  return (
    <ItemBlock className="ordered-recipe">
      <Row sm="1" md="2">
        <Col md="3">
          <a href={allPaths[recipePath] + recipe.id}>
            <ItmeImg
              src={recipeImage}
              onError={e => {
                e.target.onerror = null
                e.target.src = '/common-pic/noImage.jpg'
              }}
            />
          </a>
        </Col>

        <Col md="9">
          <BorderBottom className="md-flex-space">
            <div className="md-flex">
              <a className="title" href={`/recipe/${recipe.id}`}>
                <StyledFont weight="bold">{recipe.name}</StyledFont>
              </a>
              <div className="version">
                <StrokeSpan
                  lineHeight="2.8"
                  margin="0 15px 0 0"
                  color={recipe.version.toLowerCase() + 'Color'}
                  borderColor={recipe.version.toLowerCase() + 'Color'}
                >
                  {versionOptions[recipe.version] + '版本'}
                </StrokeSpan>
                {isCustomize && <StrokeSpan lineHeight="2.8" margin="0 15px 0 0">客製化</StrokeSpan>}
              </div>
            </div>
            <PriceToolsWrapper>
              <StyledFont>NT. {sum}</StyledFont>
              {modifiable && (
                <>
                  <button onClick={removeOnClick}>
                    <AiOutlineDelete fill="#e76845" size="18px" />
                  </button>
                  <button onClick={e => editOnClick(e)} disabled={!isCustomize}>
                    <AiOutlineEdit
                      fill={isCustomize ? color.vage : color.fifth}
                      size="18px"
                    />
                  </button>
                </>
              )}
            </PriceToolsWrapper>
          </BorderBottom>

          <RelativeDiv>
            <StyledFont color="thirdColor" weight="bold" size="0.8rem">
              食材
            </StyledFont>
            <IngredientsTable>
              <tbody>{splited}</tbody>
            </IngredientsTable>
            {updatingCart.some(itemId => itemId === cartId) && (
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

OrderedRecipe.propTypes = {
  cartId: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  customize: PropTypes.array.isRequired,
  sum: PropTypes.number.isRequired,
  recipeImage: PropTypes.string.isRequired,
  isCustomize: PropTypes.bool.isRequired,
  modifiable: PropTypes.bool,
  editOnClick: PropTypes.func,
  removeOnClick: PropTypes.func,
  updatingCart: PropTypes.array,
}
export default OrderedRecipe

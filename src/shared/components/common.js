import React from 'react'
import common from '../style/common.scss'
import { splitToRows } from '../utility/common'

export const FeatureSlot = ({
    title,
    content1,
    content2
}) =>
    <div className={["col", "feature-slot"].join(" ")}>
        <div className="sc"><p>{title}</p></div>
        <p>{content1}<br />
            {content2}</p>
    </div>



export const MonthlySpecial = ({
    title,
    gredients,
    gredientsMaxRow = 5
}) => {
    const styled = gredients.map((gredient) => <p>{gredient}</p>)
    const splited = splitToRows(styled, gredientsMaxRow)
        .map(gredient => 
            <div className="g-row">{gredient}</div>
    )

    return (
        <div className="monthly-special">
            <img src="/home-pic/monthlySpecial.jpg" alt="Monthly special" />

            <div className="special">
                <label>本月特餐</label>
                <p className="title">{title}</p>
                <img src="/home-pic/wave.svg" />
                <div className="gredients">
                    {splited}
                </div>
            </div>
        </div>
    )
}

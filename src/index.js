import React from "react"
import ReactDOM from "react-dom"
import "shared/style/index.css"
import App from "./App"
import store from "./store"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { Footer } from "./shared/components/common"
import { ThemeProvider, css } from "styled-components"

const footerLinks = [
  "關於我們",
  "常見問答",
  "售後服務",
  "會員權益",
  "隱私保護",
  "門市位置",
  "企業徵才",
  "異業合作",
]

const theme = {
  primeColor: "#755734",
  viceColor: "#9e8568",
  accentColor: "#fbd779",
  accentDeeperColor: "#f9bd23",
  accentRedColor: "#e76845",
  firstColor: "rgb(52, 58, 64)",
  secondaryColor: "rgb(129, 132, 135)",
  thirdColor: "rgb(123, 127, 131)",
  forthColor: "rgb(183, 186, 191)",
  fifthColor: "rgb(232, 235, 240)",
  sixthColor: "rgb(249, 250, 252)",
  normalColor: "#9e8568",
  lowfatColor: "#8093b5",
  meatColor: "#f09797",
  vageColor: "#7ca390",
  font: css`
    font-family: sans-serif;
    text-decoration: none;
    letter-spacing: 0.03em;
  `,
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <Footer links={footerLinks} />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()

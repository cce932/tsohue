import React from "react"
import ReactDOM from "react-dom"
import "shared/style/index.css"
import App from "./App"
import store from "./store"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { Footer } from "./shared/components/common"

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

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Footer links={footerLinks} />
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()

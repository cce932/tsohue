import React from 'react'
import ReactDOM from 'react-dom'
import 'shared/style/index.css'
import App from './App'
import store from './store'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { Footer } from './shared/components/common'
import { ThemeProvider, css } from 'styled-components'
import {
  aboutUs,
  allPaths,
  policies,
  position,
  privacy,
  QA,
} from 'shared/constants/pathName'

const footerLinks = [
  { title: aboutUs, href: allPaths[aboutUs] },
  { title: QA, href: allPaths[QA] },
  { title: policies, href: allPaths[policies] },
  { title: privacy, href: allPaths[privacy] },
  { title: position, href: allPaths[position] },
  { title: '售後服務', href: '/developing' },
  { title: '會員權益', href: '/developing' },
  { title: '企業徵才', href: '/developing' },
  { title: '異業合作', href: '/developing' },
]

const theme = {
  primeColor: '#755734',
  viceColor: '#9e8568',
  viceLighterColor: '#fef1e3',
  accentColor: '#fef1e3',
  // accentDeeperColor: '#f9bd23',
  accentRedColor: '#e77045',
  firstColor: 'rgb(52, 58, 64)',
  secondaryColor: 'rgb(129, 132, 135)',
  thirdColor: 'rgb(123, 127, 131)',
  forthColor: 'rgb(183, 186, 191)',
  fifthColor: 'rgb(225, 228, 233)',
  sixthColor: 'rgb(249, 250, 252)',
  normalColor: '#9e8568',
  lowfatColor: '#8093b5',
  meatColor: '#f09797',
  vageColor: '#7ca390',
  font: css`
    font-family: sans-serif;
    text-decoration: developing;
    letter-spacing: 0.03em;
  `,
  defaultShadow: '0px 0px 15px rgba(183, 186, 191, 0.3)',
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <Footer links={footerLinks} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

reportWebVitals()

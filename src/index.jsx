import Post from './post'
import * as style from './assets/style.css'
import './assets/less/style.less'
import './assets/sass/style.sass'
import './assets/scss/style.scss'
import logo from './assets/icon-square-big.png'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

const post = new Post('Webpack Post Title!!!')

const App = () => {
  return (
    <div className="container">
      <h1>Webpack training</h1>
      <img src="./assets/icon-square-big.png" alt="webpack logo" className="logo" />

      <div className="less-demo">
        <h2>Less</h2>
      </div>
      <div className="scss-demo">
        <h2>Scss</h2>
      </div>
      <div className="sass-demo">
        <h2>Sass</h2>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

// const container = document.getElementsByClassName('container')[0]
// const element = document.createElement('pre')
// element.innerHTML = post.toString()
// element.classList.add('code')

// // container.appendChild(element)

console.log('Post to string:', post.toString())

async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

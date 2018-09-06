import { Component, type Element } from 'react'
import { setBaseStyles } from '~/utilities'
import { Provider } from 'unstated'
import Router from './Router'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { install } from 'offline-plugin/runtime'

setBaseStyles()

class App extends Component<{}> {
  render = () =>
    <Provider>
      <Router />
    </Provider>
}

type Root = Element<HTMLDivElement> | null
const root: Root = document.getElementById('root')
if(root) render(<App />, root)
export default hot(module)(App)
install() // service worker & offline
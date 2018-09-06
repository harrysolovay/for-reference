import Loadable from 'react-loadable'
import { Loading } from '~/components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Load = (
  loader: () => Promise<any>,
  fullScreen?: boolean,
): {
  preload(): Promise<void>
} =>
  Loadable({
    loading: (props) =>
      <Loading { ...props } />,
    loader,
  })

export default () =>
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path='/'
        component={ Load(() => import('~/pages/Landing')) }
      />
      <Route
        path='/first'
        component={ Load(() => import('~/pages/First')) }
      />
      <Route
        path='/second'
        component={ Load(() => import('~/pages/Second')) }
      />
      <Route
        path='/third'
        component={ Load(() => import('~/pages/Third')) }
      />
    </Switch>
  </BrowserRouter>
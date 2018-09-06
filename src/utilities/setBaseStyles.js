import { injectGlobal } from 'styled-components'
import normalize from 'styled-normalize'

export default () =>
  injectGlobal`
    ${ normalize }
  `
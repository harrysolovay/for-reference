import Container from './styles'
import { Nav } from '~/components'

export default ({ children }) => 
  <Container>
    <Nav />
    { children }
  </Container>
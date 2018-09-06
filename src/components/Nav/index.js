import { Subscribe } from 'unstated'
import { Auth } from '~/stores'
import Container from './styles'
import { ExternalLink } from '~/components'
import { NavLink } from 'react-router-dom'
import BlockstackLogo from '~/assets/images/blockstack-logo.svg'

export default () => (
  <Subscribe to={[ Auth ]}>
    {({ state: { loggedIn }, logIn }) => (
      <Container>
        <div>

          <ExternalLink
            href={
              loggedIn
                ? "http://localhost:8888"
                : 'https://blockstack.org'
            }
            children={ <BlockstackLogo /> }
            className='blockstack-link'
          />

          <NavLink
            exact
            to='/'
            children='feed'
          />

          <NavLink
            to='/evangelists'
            children='evangelists'
          />

          <div className='separation' />

          {
            loggedIn
              ? (
                <NavLink
                  to='/account'
                  children='account'
                />
              ) : (
                <button
                  onClick={ logIn }
                  children='log in'
                  className='active'
                />
              )
          }

        </div>
      </Container>
    )}
  </Subscribe>
)
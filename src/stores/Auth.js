import { Container } from 'unstated'
import {
  redirectToSignIn,
  isUserSignedIn,
  isSignInPending,
  handlePendingSignIn,
  loadUserData,
  signUserOut
} from 'blockstack'



type AuthState = {
  isLoading: boolean,
  loggedIn: boolean,
  username: string | null,
  name: string | null,
}

const INITIAL_STATE: AuthState = {
  isLoading: true,
  loggedIn: false,
  username: null,
  name: null,
}

export default class Auth extends Container<AuthState> {


  state = INITIAL_STATE


  logIn = () => {
    console.log('doing it')
    this.setState({ isLoading: true, })
    const origin = window.location.origin
    redirectToSignIn(origin, `${ origin }/manifest.json`, [ 'store_write', 'publish_data' ])
  }


  logOut = () => {
    signUserOut(window.location.origin)
    this.setState({
      INITIAL_STATE,
      isLoading: false,
    })
  }


  info = ({
    username,
    profile: {
      name,
    },
  }: {
    username: string,
    profile: {
      name: string,
    }
  } = loadUserData()) => ({
    username,
    name,
    loggedIn: true,
  })


  async componentDidMount() {

    this.setState({ isLoading: true, })

    if(isSignInPending()) {
      try {
        const user = await handlePendingSignIn()
        if(user) {
          this.setState({
            ...this.info(user),
            isLoading: false,
          })
        }
      } catch(error) {
        console.error(`failed to handle pending sign-in: ${ error }`)
      }
    }
    
    else if(isUserSignedIn()) {
      this.setState({
        ...this.info(),
        isLoading: false,
      })
    }
    
    else {
      if(window.location.pathname.indexOf('account') >= 0)
        window.location = `${ window.location.protocol }//${ window.location.host }`
      this.setState({
        INITIAL_STATE,
        isLoading: false,
      })
    }
  }


}
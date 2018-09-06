import type { LoadingProps as AsyncComponentLoadingProps } from 'react-loadable'
import Container from './styles'
import SpinnerIcon from '~/assets/images/spinner.svg'

type LoadingProps = {
  ...$Exact<AsyncComponentLoadingProps>,
  fullScreen?: boolean,
  message?: string,
}

export default ({
  error,
  retry,
  timedOut,
  pastDelay,
  fullScreen,
  message,
}: LoadingProps) =>
  <Container>
    {
      timedOut || error ? (
        <div>
          <span children={ `Failed to load. ` } />
          <button
            children='Click here to retry.'
            onClick={ retry }
          />
        </div>
      ) : (
        <div>
          <SpinnerIcon />
          { message && <span children={ message } /> }
        </div>
      )
    }
  </Container>
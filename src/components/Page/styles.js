import styled from 'styled-components'

export default styled.div`
  padding-top: ${ props => props.hideNav ? '0px' : '60px' };
`
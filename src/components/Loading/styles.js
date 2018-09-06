import styled from 'styled-components'
import { animations } from '~/utilities'

export default styled.div`

  ${ props =>  
    props.fullScreen
      ? `
        display: fixed;
        top: 0px; right: 0px; bottom: 0px; left: 0px;
        width: 100%;
        height: 100vh;
      `
      : `
        display: flex;
        flex: 1;
      `
  }

  justify-content: center;
  align-items: center;
  background-color: #241131;
  color: #fff;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      width: 25px;
      height: 25px;
      margin: 5px;
      animation: ${ animations.spin } infinite 1.5s linear;
    }

    span {
      margin: 5px;
    }
  }

`
import styled from 'styled-components'

export default styled.nav`

  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 60px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, .5);
  z-index: 1000;
  background-color: #fff;

  > div {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    @media screen and (max-width: 600px) {
      justify-content: space-between;
    }
  }

  a, button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 24px;
    padding-left: 24px;
    color: #3a3a3a;

    &:hover {
      background-color: #f9f9f9;
    }

    &.active {
      color: #3498db;
      border-bottom: 1px solid #3498db;
      padding-top: 1px;
    }

    &.blockstack-link {
      width: 60px;
      padding: 0px;
      > svg {
        margin-top: 1px;
        margin-right: 1px;
        width: 16px;
        height: 16px;
      }
    }

  }

  .separation {
    display: none;
    @media screen and (min-width: 600px) {
      display: flex;
      flex: 1;
    }
  }

`
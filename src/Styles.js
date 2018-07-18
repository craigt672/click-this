import styled from 'styled-components'

export const ListItem = styled.li`
  display: inline-block;
  transition: all 0.05s ease-in-out;
  width: 200px;
  height: 200px;
  animation: scrollDown;
  animation-duration: .5s;
  animation-delay: ${props => props.id * .2}s;
  opacity: 1;

  @keyframes scrollDown {
  0% {transform: translateY(-200%);}
  50% {transform: translateY(50%);}
  100% {transform: translateY(0%);} 
  }

  &:focus {
    transition: all 0.05s ease-in-out;
    border: 1px solid #fff;
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
  }

  background: white;
  margin: 35px; 
  border: 1px solid #191919;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  font-weight: 100 !important;
  letter-spacing: 8px;;
  width: 70%;
  margin: 0 auto;
  padding: 0;
  color: #cca3a3;
  text-align: center;
  position: relative;
  text-transform: uppercase;

  h1 {
    font-style: normal;
    line-height: normal;
    font-size: 64px;
    text-transform: uppercase;
    color: #ececec;
    animation-name: zoomout;
    animation-duration: .8s;
  }

  /* The animation code */
  @keyframes zoomout {
    0% {transform: scale(4); transform: translateZ(-3000%);}
    100% {transform: scale(1); transform: translateZ(0%);}
  }

  p {
    font-style: normal;
    line-height: normal;
    font-size: 1.8rem;
    margin: 20px 0;
  }

  ul {
    margin: 30px auto;
    padding: 20px;
    min-height: 200px;
    list-style: none;

    .leave {
      transition: all 0.05s ease-in-out;
      animation: scrollOff;
      animation-duration: .2s;
      @keyframes scrollOff {
        0% {transform: translateY(0%);}
        100% {transform: translateY(300%);} 
      }
    }

    .slideDown-leave {
      opacity: 1;
    }

    .slideDown-leave.slideDown-leave-active {
      opacity: 0.01;
      transition: opacity 300ms ease-in;
    }

    .spin {
      position: absolute;
      left: 50%;
      top: 18%;
      margin: 200px auto;
      transform: scale(2.6);
      >div {
        background: #ff7979;
        transform: scale(2.0);
      }
    }
  }

  .slogan {
    font-style: normal;
    line-height: normal;
    font-size: 2.6rem;
    color: #caacac;

    .raise-text {
      text-shadow: -2px 1px 6px #191919;
      color: #F3EFEF;
      transform: rotate(40deg);
    }
  }
`
import React, { Component } from 'react'
import styled from 'styled-components'
import anime from 'animejs'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ListItem = styled.li`
  display: inline-block;
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }

  background: white;
  margin: 35px; 
  border: 1px solid #191919;
  border-radius: 2px;

  
  .example-appear {
    animation: scrollDown;
    animation-duration: 2s;
    opacity: 0.01;
    animation-delay: ${ props => props.index * 1}s;
    @keyframes scrollDown {
    0% {transform: translateY(-200%); opacity: 0;}
    100% {transform: translateY(0%); opacity: 1;}
    }
  }

  .example-appear.example-appear-active {
    /* transform: translateY(0%); */
    opacity: 1;
    transition: all 2s ease-in;
  }


  &:hover {
    cursor: pointer;
  }
`;


export default class List extends Component {


  render() {
    const lis = this.props.images.map((url, id) => (
          <ListItem className="loaded" index={id} key={id} onClick={this.props.getMoreImages}>
          <img src={url} alt="" />
          </ListItem>
    ))

    return (
       <div>
          <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnter={false}
          transitionLeave={false}>
        {lis}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

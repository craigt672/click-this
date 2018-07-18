import React, { Component, Fragment } from 'react';
import {Container, ListItem} from './Styles'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Spinner from 'react-spinkit'
import axios from 'axios'
import shuffle from 'shuffle-array'
import isEmpty from 'lodash.isempty'
import flatten from 'lodash.flatten'

let clickSound = new Audio("sounds/buttonClick.mp3");
let swishSound = new Audio("sounds/Swishes.mp3");

class App extends Component {
  state = {
    loading: false,
    catagories: {
      good: ['happy', 'excitement', 'entertainment', 'amusement', 'content', 'lovely'],
      neutral: ['neutral', 'objective', 'ordinary', 'impersonal', 'abstract', 'regular'],
      bad: ['anger', 'sad', 'fear', 'explosive', 'racial', 'negative']
    },
    timer: false,
    imageUrls: [],
    displayUrls: [],
    soundOn: false,
  }

  async componentWillMount() {
    await this.loadNewImages()
    this.imageLoadSound()
  }

  componentDidMount() {
    swishSound.play()
  }

  imageLoadSound = async () => {
    
    await setTimeout(() => (new Audio("sounds/QuickImpact.mp3")).play(), 5)
    await setTimeout(() => (new Audio("sounds/QuickImpact.mp3")).play(), 300)
    await setTimeout(() => (new Audio("sounds/QuickImpact.mp3")).play(), 500)
  }

  loadNewImages = () => {
    const self = this

    return Promise.all(this.displayRandomImg())
      .then(function (values) {
        console.log(values)
        const arr = values.map((item) => {
          const imageListArr = item.data.images.filter((val, i) => i < 25)
          const randomImgs = shuffle(imageListArr)
          return randomImgs.map((item, i) => item.display_sizes[0].uri)
        })
        self.setState({
          imageUrls: [arr[0], arr[1], arr[2]]
        })
        self.setState({ loading: false })
        self.setState({
          displayUrls: []
        })
        self.setState({
          displayUrls: self.getUrls()
        })
      })
  }

  toggleTimer = () => {
    const { timer } = this.state
    this.setState({ timer: !timer })
  }

  displayRandomImg = () => {
    this.setState({ loading: true })
    const randomCatagories = this.randomCatagories()
    console.log(randomCatagories[0])
    console.log(randomCatagories[1])
    console.log(randomCatagories[2])
    return randomCatagories.map((item) => (
      this.getImageUrl(item)
    ))
  }

  randomCatagories() {
    let { good, neutral, bad } = this.state.catagories
    let goodItem = shuffle(good)[0]
    let neutralItem = shuffle(neutral)[0]
    let badItem = shuffle(bad)[0]
    let arr = [goodItem, neutralItem, badItem]

    this.setState({
      catagories: {
        good: good.filter(value => value !== goodItem),
        bad: bad.filter(value => value !== badItem),
        neutral: neutral.filter(value => value !== neutralItem)
      }
    })
    return shuffle(arr)
  }

  handleClick = async () => {
    clickSound.play();
    this.imageLoadSound()
    
    const { imageUrls } = this.state
    await this.setState({ soundOn: true })
    await this.setState({ imageUrls: imageUrls.map(arr => (arr.slice(1))) })
    await this.setState({ displayUrls: this.getUrls() })

    if (isEmpty(flatten(imageUrls))) {
      await this.loadNewImages()
    }
  }

  getImageUrl = (catagory) => {
    const baseUrl = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase='
    axios.defaults.headers.common['Api-Key'] = 'zh6fvmpgc25aucwwrr5mkgth'
    return axios.get(baseUrl + catagory)
  }

  getUrls = () => {
    return this.state.imageUrls.map(arr => arr[0])
  }

  render() {
    console.log(this.state.imageUrls)
    const { displayUrls, soundOn, imageUrls, loading } = this.state

    const urls = shuffle(displayUrls).map((url, i) => (
      <ListItem id={i} key={url} onClick={(url) => this.handleClick(url)}>
        <img src={url} />
      </ListItem>
    ))

    return (
      <Container>
        <h1 className="App-title">Round One</h1>
        <p>Click on a picture to begin</p>
        <ul>
          {loading ?
            <Spinner className="spin" fadeIn='half' name="wandering-cubes" color='#F3EFEF' />
            :
            <ReactCSSTransitionGroup
              transitionName="slideDown"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              <Fragment>
                {urls}
              </Fragment>
            </ReactCSSTransitionGroup>
          }
        </ul>
        <p className="slogan">
          <span className="raise-text">What</span> would <span className="raise-text">you</span> click <span className="raise-text">on?</span>
        </p>
      </Container>
    )
  }
}

export default App;

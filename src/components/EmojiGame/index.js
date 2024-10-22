// Write your code here.
import './index.css'
import {Component} from 'react'
import NavBar from '../NavBar/index'
import EmojiCard from '../EmojiCard/index'
import WinOrLoseCard from '../WinOrLoseCard/index'

class EmojiGame extends Component {
  state = {
    clickedEmojis: [],
    isGameEnd: false,
    topScore: 0,
    score: 0,
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  onClickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    
    const isPresent = clickedEmojis.includes(id)
    if (isPresent) {
      this.finishGameAndSetTopScore(clickedEmojis.length)
    } else {
      if (emojisList.length - 1 === clickedEmojis.length) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojis: [...prevState.clickedEmojis, id],
      }))
    }
  }

  finishGameAndSetTopScore = newScore => {
    const {topScore} = this.state
    if (newScore > topScore) {
      this.setState({topScore: newScore})
    }
    this.setIsGameEnd(true)
  }

  restartGame = () => {
    const {clickedEmojis, topScore} = this.state
    const currentScore = clickedEmojis.length
    if (currentScore > topScore) {
      this.setState({topScore: currentScore})
    }
    this.setState({clickedEmojis: [], isGameEnd: false})
  }

  setIsGameEnd = value => {
    this.setState({isGameEnd: value})
  }

  /* a render application to display score once we win/lose the game  */
  renderWinOrLose = () => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const isWon = emojisList.length === clickedEmojis.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.restartGame}
        score={clickedEmojis.length}
      />
    )
  }

  /* render emojis list method gets emojis shuffled list  */
  renderEmojiList = () => {
    const shuffledEmojiList = this.getShuffledEmojisList()
    return (
      <ul className="emoji-list">
        {shuffledEmojiList.map(emojiItem => (
          <EmojiCard
            key={emojiItem.id}
            emoji={emojiItem}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isGameEnd, clickedEmojis, topScore} = this.state
    const currentScore = clickedEmojis.length
    return (
      <div className="app-container">
        <NavBar
          currentScore={currentScore}
          topScore={topScore}
          isGameEnd={isGameEnd}
        />
        <div className="emoji-body-container">
          {isGameEnd ? this.renderWinOrLose() : this.renderEmojiList()}
        </div>
      </div>
    )
  }
}

export default EmojiGame

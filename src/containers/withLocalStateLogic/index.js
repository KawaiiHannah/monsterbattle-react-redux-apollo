import React, {Component} from 'react'

import monsterList from '../../lib/monsters'
import {
  // calcDamage,
  shuffle
} from '../../lib/utils'

const monsters = shuffle(monsterList)

const findMonster = monsterName =>
  monsters.find(({name}) => name === monsterName)

const withLocalStateLogic = Board => {
  class Game extends Component {
    state = {
      turns: [],
      monster1: monsters[0],
      monster2: monsters[1],
      monster1Health: monsters[0].health,
      monster2Health: monsters[1].health,
      battleStarted: false
    }

    reset = () =>
      this.setState({
        turns: [],
        monster1Health: this.state.monster1.health,
        monster2Health: this.state.monster2.health
      })

    selectMonster1 = monster1 =>
      this.setState({monster1: findMonster(monster1)}, this.reset)

    selectMonster2 = monster2 =>
      this.setState({monster2: findMonster(monster2)}, this.reset)

    startBattle = () => {}

    monster1Attack = () => {}

    monster2Attack = () => {}

    actionMethod = () => {}

    render() {
      const {
        turns,
        monster1,
        monster2,
        monster1Health,
        monster2Health,
        battleStarted
      } = this.state

      return (
        <Board
          defender={turns.length % 2 ? monster1.name : monster2.name}
          monsters={monsters}
          monster1={monster1}
          monster2={monster2}
          monster1Health={monster1Health}
          monster2Health={monster2Health}
          monster1Log={turns.filter((_, i) => Boolean(i % 2))}
          monster2Log={turns.filter((_, i) => !Boolean(i % 2))}
          battleStarted={battleStarted}
          selectMonster1={this.selectMonster1}
          selectMonster2={this.selectMonster2}
          nextTurnAction={this.actionMethod()}
        />
      )
    }
  }

  return Game
}

export default withLocalStateLogic

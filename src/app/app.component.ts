import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  totalBox = Array;
  player1: string = ''
  player2: string = ''
  gameGrid: Array<any> = []
  clickCount: number = 0
  currentPlayer: string = 'player1'
  winner: string = ''
  stopTheGame: boolean = false
  hovered: boolean = false
  winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  constructor() {

    this.player1 = 'X'
    this.player2 = this.player1 == 'X' ? '0' : 'X'

    this.gameGrid = this.winningCombinations
  }

  getBoxIndex(index: number, event: any) {

    if (this.stopTheGame == false) {
      this.currentPlayer == 'player1' ? event.target.innerHTML = this.player1 : event.target.innerHTML = this.player2
      this.currentPlayer == 'player1' ? event.target.classList.add("player1") : event.target.classList.add("player2")

      this.switchPlayer()

      let gameValue = {
        index: index,
        value: event.target.innerHTML,
      }

      this.createGameGrid(gameValue)
    }
  }

  createGameGrid(gameValue: any) {
    this.gameGrid.map((e: any[]) => {
      var index = e.indexOf(gameValue.index);
      if (~index) {
        e[index] = gameValue.value;
      }

      if (e.every(v => v == 'X')) {
        this.winner = 'PLAYER 1'
        this.stopTheGame = true
        return
      } else if (e.every(v => v == '0')) {
        this.stopTheGame = true
        this.winner = 'PLAYER 2'
        return
      } else if (this.clickCount == 9) {
        this.stopTheGame = true
      }
    })
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer == 'player1' ? 'player2' : 'player1'
    this.clickCount++
  }

}



import React, { Component} from 'react';
import io from 'socket.io-client'
import background from './background.jpg'

class Game extends Component{
  state = {btnDisabled: true, win: [false, false], turn: [false,false], ply: [false, false]}
  web = "https://khisoft-snake-and-ladder.herokuapp.com"
  socket = io(this.web)
  position = [1,1]
  location = [[15,465],[15,465]]
  player = -1
  angkaDadu = 'Silahkan Kocok Dadu'
  first = 0
  pertama = true
  id = this.props.match.params.id
  arr = [
    [0,0],
    [15,465],
    [15+50,465],
    [15+100,465],
    [15+150,465],
    [15+200,465],
    [15+250,465],
    [15+300,465],
    [15+350,465],
    [15+400,465],
    [15+450,465],
    
    
    [15+450,415],
    [15+400,415],
    [15+350,415],
    [15+300,415],
    [15+250,415],
    [15+200,415],
    [15+150,415],
    [15+100,415],
    [15+50,415],
    [15,415],

    [15,365],
    [15+50,365],
    [15+100,365],
    [15+150,365],
    [15+200,365],
    [15+250,365],
    [15+300,365],
    [15+350,365],
    [15+400,365],
    [15+450,365],

    [15+450,315],
    [15+400,315],
    [15+350,315],
    [15+300,315],
    [15+250,315],
    [15+200,315],
    [15+150,315],
    [15+100,315],
    [15+50,315],
    [15,315],

    [15,265],
    [15+50,265],
    [15+100,265],
    [15+150,265],
    [15+200,265],
    [15+250,265],
    [15+300,265],
    [15+350,265],
    [15+400,265],
    [15+450,265],

    [15+450,215],
    [15+400,215],
    [15+350,215],
    [15+300,215],
    [15+250,215],
    [15+200,215],
    [15+150,215],
    [15+100,215],
    [15+50,215],
    [15,215],

    [15,165],
    [15+50,165],
    [15+100,165],
    [15+150,165],
    [15+200,165],
    [15+250,165],
    [15+300,165],
    [15+350,165],
    [15+400,165],
    [15+450,165],

    [15+450,115],
    [15+400,115],
    [15+350,115],
    [15+300,115],
    [15+250,115],
    [15+200,115],
    [15+150,115],
    [15+100,115],
    [15+50,115],
    [15,115],

    [15,65],
    [15+50,65],
    [15+100,65],
    [15+150,65],
    [15+200,65],
    [15+250,65],
    [15+300,65],
    [15+350,65],
    [15+400,65],
    [15+450,65],

    [15+450,15],
    [15+400,15],
    [15+350,15],
    [15+300,15],
    [15+250,15],
    [15+200,15],
    [15+150,15],
    [15+100,15],
    [15+50,15],
    [15,15],

  ]


  componentDidMount() {
    if(this.pertama == true){
        fetch(`${this.web}/${this.id}`).then(x => {
            // console.log(x)
            x.json().then(data => {
                for(var i = 0; i<data.data.length; i++){
                  if(data.data[i][4] == this.id){
                      console.log('id : ' + this.id)
                      console.log('data : ' + data.data[i][4])
                      this.permainan(data.data[i])
                  }
                }
            })
        })
        this.pertama = false
    }
    this.canvas = this.refs.game.getContext('2d')
    this.imgBackground = this.refs.image
    this.angka = this.refs.angka
    this.tblPlayer = this.refs.btnPlayer
    this.canvas.drawImage(this.imgBackground, 0, 0)
    this.angka.innerHTML = 0
    this.socket.on('position', data => {
      for(var i = 0; i<data.length; i++){
        if(data[i][4] == this.id){
          this.permainan(data[i])
        }
      } 
    })
  }

  permainan(data){
        console.log(data)
        let winTmp = this.state.win
        winTmp[0] = data[1][0]
        winTmp[1] = data[1][1]

        this.setState({win : winTmp})

        if(this.player == 0){
            if(data[1][0] === true && data[1][1] === false){
            alert("Selamat Anda menang")
            }
            
            if(data[1][0] === false && data[1][1] === true){
            alert("Anda kalah")
            }
        }else if(this.player == 1){
            if(data[1][0] === false && data[1][1] === true){
            alert("Selamat Anda menang")
            }
            
            if(data[1][0] === true && data[1][1] === false){
            alert("Anda kalah")
            }
        }

        let turnTmp = this.state.turn
        turnTmp[0] = data[2][0]
        turnTmp[1] = data[2][1]

        this.setState({turn : turnTmp})

        
        if(this.first < 2){
            if(data[3][0] === true && data[3][1] === false && this.player === 0){
            alert("Anda player 1")
            }else if(data[3][0] === false && data[3][1] === true && this.player === 1){
            alert("Anda player 2")
            }else if(data[3][0] === false && data[3][1] === true && this.player === -1){
            alert("Anda player 1")
            this.player = 0
            this.setState({btnDisabled: false})
            }else if(data[3][0] === true && data[3][1] === false && this.player === -1){
            alert("Anda player 2")
            this.player = 1
            this.setState({btnDisabled: false})
            }
            
            this.first++
        }


        for(var i=0; i<=1; i++){

            switch (data[0][i]) {
                case 4:
                this.position[i] = 14
                break;

                case 9:
                this.position[i] = 31
                break;

                case 17:
                this.position[i] = 7
                break;
            
                case 20:
                this.position[i] = 38
                break;

                case 28:
                this.position[i] = 84
                break;

                case 40:
                this.position[i] = 59
                break;

                case 51:
                this.position[i] = 67
                break;

                case 54:
                this.position[i] = 34
                break;

                case 62:
                this.position[i] = 19
                break;

                case 63:
                this.position[i] = 81
                break;

                case 64:
                this.position[i] = 60
                break;

                case 71:
                this.position[i] = 91
                break;

                case 93:
                this.position[i] = 73
                break;

                case 95:
                this.position[i] = 75
                break;

                case 99:
                this.position[i] = 78
                break;
        
                default:
                this.position[i] = data[0][i]
                break;
            }
        }

        if((this.position[0] === this.position[1]) == true){
            let p1 = [this.arr[this.position[0]][0],this.arr[this.position[0]][1]]
            let p2 = [this.arr[this.position[1]][0],this.arr[this.position[1]][1]]
            p1[1] -= 10
            p2[1] += 10
            this.location = [p1,p2]
        }else{
            this.location = [[this.arr[this.position[0]][0],this.arr[this.position[0]][1]],[this.arr[this.position[1]][0],this.arr[this.position[1]][1]]]
        }
        
        this.angka.innerHTML = this.angkaDadu
        this.canvas.clearRect(0, 0, this.refs.game.width, this.refs.game.height)
        this.canvas.fillRect(this.location[0][0], this.location[0][1], 20, 20)
        this.canvas.fillStyle = "#0000FF"
        this.canvas.fillRect(this.location[1][0], this.location[1][1], 20, 20)
        this.canvas.fillStyle = "#000000"
  }

  move(){
    this.angkaDadu = this.getRndInteger(1,6)
    this.position[this.player] += this.angkaDadu
    // this.position[this.player] += 2

    let turnTmp = this.state.turn
    turnTmp[0] = !this.state.turn[0]
    turnTmp[1] = !this.state.turn[1]

    this.setState({turn : turnTmp})
    this.socket.emit("move", [this.position, this.state.win, this.state.turn, this.state.ply, this.player, this.id])
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

  player1(){
    this.player = 0
    this.setState({btnDisabled: false})

    let turnTmp = this.state.turn
    turnTmp[0] = true
    this.setState({turn: turnTmp})
    
    let plyTmp = this.state.ply
    plyTmp[0] = true
    this.setState({ply : plyTmp})

    this.socket.emit("move", [this.position, this.state.win, this.state.turn, this.state.ply, this.player, this.id])
  }

  player2(){
    this.player = 1
    this.setState({btnDisabled: false})

    let turnTmp = this.state.turn
    turnTmp[1] = true
    this.setState({turn: turnTmp})
    
    let plyTmp = this.state.ply
    plyTmp[1] = true
    this.setState({ply: plyTmp})
    this.socket.emit("move", [this.position, this.state.win, this.state.turn, this.state.ply, this.player, this.id])
  }

  render() { 
    return (
      <div>
        <canvas
          ref="game"
          width={500}
          height={500}
          style={{ 
            'border': '1px solid black',
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': 500,
            'height': 500,
            'z-index': '1'
            }}/>
        <img ref="image"
          src="https://khisoft.id/ulartangga/background.jpg"
          style={{ 
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': 500,
            'height': 500,
            'z-index': 0,
            // 'visibility': 'hidden'
          }} />
        <p>
          <button 
            style={{ 
              'position': 'absolute',
              'top': 550,
              'left': 10,
            }}
            disabled={!this.state.turn[this.player]}
            onClick={this.move.bind(this)}>Dadu (Angka dadu : <span ref="angka"></span>)</button>
            
            <button 
            disabled={!this.state.btnDisabled}
            style={{ 
              'position': 'absolute',
              'top': 510,
              'left': 10,
            }}
            onClick={this.player1.bind(this)}>Player 1</button>

            <button
            disabled={!this.state.btnDisabled}
            style={{ 
              'position': 'absolute',
              'top': 510,
              'left': 80,
            }}
            onClick={this.player2.bind(this)}>Player 2</button>
            
        </p>
      </div>
    );
  }
}
 
export default Game;
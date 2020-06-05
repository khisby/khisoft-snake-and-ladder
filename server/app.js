const Express = require("express")()
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)
const Cors = require('cors')

var position = [1,1]
var win = [false,false]
var turn = [false,false]
var ply = [false, false]
var room = []

Socketio.on('connection', socket => {
    socket.on("move", (arrData) => {
        if(arrData[0][arrData[4]] > 100){
            var sisa = arrData[0][arrData[4]] - 100
            for(var i = 0; i < room.length; i++){
                if(room[i][4] === arrData[5]){
                    room[i][0][arrData[4]] = 100 - sisa
                }
            }
        }else if(arrData[0][arrData[4]] === 100){
            arrData[1][arrData[4]] = true
        }else{
            for(var i = 0; i < room.length; i++){
                if(room[i][4] === arrData[5]){
                    room[i][0][arrData[4]] = arrData[0][arrData[4]]
                }
            }
        }

        for(var i = 0; i < room.length; i++){
            if(room[i][4] === arrData[5]){
                room[i][1] = arrData[1]
                room[i][2] = arrData[2]
                room[i][3] = arrData[3]
            }
        }
        
        Socketio.emit("position", room)
        console.log(room)
    })
})


Express.get("/:id", Cors(), (req, res) => {
    console.log(room)
    const {id} = req.params
    let ada = false

    for(var i = 0; i < room.length; i++){
        if(room[i][4] === id){
            ada = true
        }
    }

    if(ada === true){
        console.log("Join room " + id)
        res.json({data: room})
    }else{
        console.log("Buat room baru " + id)
        room.push([[1,1], win, turn, ply, id,])
        res.json({data: room})
    }
})

Http.listen(4000, () =>{
    console.log("Listening at port 4000")
})
const express = require("express")
const app=express()

const path=require("path")
const http=require("http")
const {Server}=require("socket.io")

const server=http.createServer(app)

const io= new Server(server)

app.use(express.static(path.resolve("")))

let arr = [];
let playingArray = [];

io.on("connection", (socket) => {
    console.log("Client connected");
  
    socket.on("find", (e) => {
      console.log("Find event received", e);
  
      if (e.name != null) {
        arr.push({ socket, name: e.name });
        if (arr.length >= 2) {
          console.log("Match found, emitting find event to both clients");
  
          let p1 = arr[0];
          let p2 = arr[1];
  
          let p1obj = {
            p1name: p1.name,
            p1value: "X",
            p1move: "",
          };
  
          let p2obj = {
            p2name: p2.name,
            p2value: "O",
            p2move: "",
          };
  
          let obj = {
            p1: p1obj,
            p2: p2obj,
          };
          playingArray.push(obj);
  
          p1.socket.emit("find", { allPlayers: [obj], opponent: p2.name, value: "X" });
          p2.socket.emit("find", { allPlayers: [obj], opponent: p1.name, value: "O" });
  
          arr.splice(0, 2);
        } else {
          console.log("Waiting for second player to join");
          setTimeout(() => {
            if (arr.length === 1) {
              console.log("No second player found, emitting find event to single player");
              socket.emit("find", { message: "No opponent found" });
            }
          }, 5000); // wait for 5 seconds
        }
      }
    });
  });

app.get("/",(req,res)=>{
    return res.sendFile("index.html")
})

server.listen(3000,()=>{
    console.log("port connected to 3000")
})
import express from 'express';
import {Server} from 'socket.io';
import http from "http"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import roomRouter from "./routes/room.route.js"
import cors from "cors"



dotenv.config()

const app = express();

// Configure CORS for Express HTTP routes
const corsOptions = {
  origin: [
    "http://192.168.0.104:5173",
    "http://localhost:5173",
    // Add other allowed origins
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  
};

app.use(cors(corsOptions));





const server = http.createServer(app);
const io = new Server(server, {

  cors: {
    origin: corsOptions.origin, // Adjust for production
    methods: ["GET", "POST"],

  }

})




app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/rooms",roomRouter )
io.on('connection', (socket) => {
    console.log("user online")

    socket.on("join-room",(roomId) => {
          socket.join(roomId);
          socket.currentRoom = roomId;
        
    } )


    socket.on("draw-start" , (data) => {
        socket.to(data.roomId).emit("draw-start", data)
    })

    socket.on("draw-move", (data)=> {
        socket.to(data.roomId).emit("draw-move", data)


    })

    socket.on("draw-end" ,(data) => {
        socket.to(data.roomId).emit("draw-end", data)
    })

    socket.on("clear-canvas",(data) => {
        socket.to(data.roomId).emit("clear-canvas")
    })

    socket.on("disconnect", () => {
        console.log("socket disconnected")
    })


})



mongoose.connect(process.env.MONGODB_URI)
  .then(() => server.listen(3000, () => {
    console.log("running on port 3000")
}))
  .catch(err => console.error('MongoDB connection error:', err));

import Room from "../models/room.model.js";
import express from "express"

const router = express.Router();


router.post('/join', async (req, res) => {
  try {
 
    if (!req.body.roomId) {
      return res.status(400).json({ error: 'roomId is required' });
    }

    const roomAlreadyexist = await Room.findOne({roomId:req.body.roomId})
    if(roomAlreadyexist){
        return res.status(200).json({
       message: 'Room already exist' 
    });

    }
    const newRoom = await Room.create({
      roomId: req.body.roomId,
      drawingData: req.body.drawingData || [] 
    });

    
    
    return res.status(200).json({
      message: 'Room created successfully',
      room: newRoom
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error creating room' });
  }
});

export default router;
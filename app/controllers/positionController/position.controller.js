import Position from "../../model/Position/position.model.js";

const positionController = {
    getAll: async (req, res) => {
        try {
        const positions = await Position.find().sort({ PositionDescription: -1,PositionName:-1 })
        res.json(positions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    getOne: async (req, res) => {
        try {
        const positions = await Position.findById(req.params.id);
        res.json(positions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } 
    , 
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
        const positions = new Position(req.body);
        await positions.save();
        res.json(positions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } 
    ,
    update: async (req, res) => {
        console.log("===0000000000000000000");
        conso
        try {
        const positions = await Position.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(positions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    deleteOne: async (req, res) => {
        try {
        const positions = await Position.findByIdAndDelete(req.params.id);
        res.json(positions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    };

export default positionController;

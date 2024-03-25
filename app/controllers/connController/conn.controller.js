import Conn from "../../model/ConnModel/conn.model.js";
import Asset from "../../model/AssetModel/asset.model.js";

const connController = {
    getAll: async (req, res) => {
        try {
        const conn = await Conn.find().populate([{
            path: 'asset',
            populate: {
                path:'currentUser',
                populate: {
                    path:'office'
                }   
              }}])
        res.json({conn});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    getOne: async (req, res) => {
        try {
        const conn = await Conn.findById(req.params.id).populate("asset");
        res.json({conn});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    create: async (req, res) => {
        console.log("===>",req.body);
        try {
        const asset = await Asset.findById(req.body.asset);
        // console.log("===>",asset);
        if (!asset)
            return res
            .status(400)
            .json({ error: true, message: "asset doesn't exist" });
        const conn = new Conn(req.body);
        await conn.save();
        res.json({conn});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    update: async (req, res) => {
        try {
        const asset = await Asset.findById(req.body.asset);
        // console.log("===>",asset);
        if (!asset)
            return res
            .status(400)
            .json({ error: true, message: "asset doesn't exist" });
    
        const conn = await Conn.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({conn});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    deleteOne: async (req, res) => {
        try {
        const conn = await Conn.findByIdAndDelete(req.params.id);
        res.json(conn);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default connController;

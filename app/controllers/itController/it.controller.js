import IT from "../../model/ItModel/it.model.js";
import Asset from "../../model/AssetModel/asset.model.js";

const itController = {
    getAll: async (req, res) => {
        try {
        const it = await IT.find().populate([{
            path: 'asset',
            populate: {
                path:'currentUser',
                populate: {
                    path:'office',
                    populate:{
                        path:'country'
                    }
                }   
              }}])
        res.json({it});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    getOne: async (req, res) => {
        try {
        const it = await IT.findById(req.params.id).populate("asset");
        res.json(it);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    create: async (req, res) => {
        console.log("@@@===>",req.body);
        try {
        const asset = await Asset.findById({ _id: req.body.asset });
        console.log("#===>",asset);
        if (!asset)
            return res
            .status(400)
            .json({ error: true, message: "asset doesn't exist" });
        const it = new IT(req.body);
        console.log("#######",it)
        await it.save();
        res.json({it});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    update: async (req, res) => {
        try {
        console.log("------===>",req.body);
        const asset = await Asset.findById(req.body.asset);
        if (!asset)
            return res
            .status(400)
            .json({ error: true, message: "asset doesn't exist" });
    
        const it = await IT.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({it});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    deleteOne: async (req, res) => {
        try {
        const it = await IT.findByIdAndDelete(req.params.id);
        res.json(it);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default itController;

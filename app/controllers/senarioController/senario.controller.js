import Senario from "../../model/Senario/senario.model.js"

const senarioController = {
    getAll: async (req, res) => {
        try {
        const senarios = await Senario.find()
        // .sort({ PositionDescription: -1,PositionName:-1 })
        res.json(senarios);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    getOne: async (req, res) => {
        try {
        const senarios = await Senario.findById(req.params.id);
        res.json(senarios);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } 
    , 
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
        const senarios = new Senario(req.body);
        await senarios.save();
        res.json(senarios);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } 
    ,
    update: async (req, res) => {
        console.log("===0000000000000000000");
        try {
        const senarios = await Senario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(senarios);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    deleteOne: async (req, res) => {
        try {
        const senarios = await Senario.findByIdAndDelete(req.params.id);
        res.json(senarios);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    ,
    };

export default senarioController;

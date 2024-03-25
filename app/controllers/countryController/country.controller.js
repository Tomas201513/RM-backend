import Country from "../../model/Country/country.model.js";

const countryController = {
    getAll: async (req, res) => {
        try {
        const country = await Country.find()
        res.json(country);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    getOne: async (req, res) => {
        try {
        const country = await Country.findById(req.params.id);
        res.json(country);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    create: async (req, res) => {
        console.log("===>",req.body);
        try {
        const country = new Country(req.body);
        await country.save();
        res.json({country});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    update: async (req, res) => {
        try {
    
        const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({country});
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    
    deleteOne: async (req, res) => {
        try {
        const country = await Country.findByIdAndDelete(req.params.id);
        res.json(country);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default countryController;

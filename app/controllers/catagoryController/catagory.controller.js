import Category from "../../model/CatagoryModel/category.model.js";

const categoryController = {
    getAll: async (req, res) => {
        try {
        const categories = await Category.find();
        res.json(categories);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const category = await Category.findById(req.params.id);
        res.json(category);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        const category = new Category(req.body);
        try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const catagory = await Category.findById(req.params.id);
            Object.assign(catagory, req.body);
            await catagory.save();
            res.json(catagory);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Category" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default categoryController;

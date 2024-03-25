import Project from "../../model/financeModel/project.model.js";
import Budget from "../../model/financeModel/budget.model.js";

const prjectController = {
    getAll: async (req, res) => {
        try {
        const projects = await Project.find().populate(["projectManager","country"])
        res.json(projects);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const projects = await Project.findById(req.params.id);
        res.json(projects);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
        const projects = new Project(req.body);
        await projects.save();
        res.json(projects);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
        const projects = await Project.findById(req.params.id);
        Object.assign(projects, req.body);
        await projects.save();
        res.json(projects);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {

            await Project.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Project deleted successfully' });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    },
    };

export default prjectController;
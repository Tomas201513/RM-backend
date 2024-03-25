import Department from '../../model/DepartmentModel/department.model.js';
import Office from '../../model/OfficeModel/office.model.js';

const departmentController = {
    getAll: async (req, res) => {
        try {
            const departments = await Department.find()
            res.json(departments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    getOne: async (req, res) => {
        try {
            const departments = await Department.findById(req.params.id)
            res.json(departments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }   
    ,
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
           
            const departments = new Department(req.body);
            await departments.save();
            res.json(departments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    update: async (req, res) => {
        try {
          
            
            const departments = await Department.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(departments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    ,
    deleteOne: async (req, res) => {
        try {
            const departments = await Department.findByIdAndRemove(req.params.id);
            res.json({ message: "Department deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default departmentController;

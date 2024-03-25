import Office from "../../model/OfficeModel/office.model.js";

const officeController = {  

  getAll: async (req, res) => {
    try {
      const offices = await Office.find().populate('country')
      const today = new Date();
    const lastMonth = new Date();
    console.log("today",today, "lastMonth",lastMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const count = await Office.countDocuments({
      registrationTime: { $gte: lastMonth, $lt: today }
    });

      res.json({count,offices});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  ,

  
  getOne: async (req, res) => {
    try {
      const offices = await Office.findById(req.params.id);
      res.json(offices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } 
  , 
  create: async (req, res) => {
    // console.log("===>",req.body);
    try {
      const offices = new Office(req.body);
      await offices.save();
      res.json(offices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } 
  ,
  update: async (req, res) => {
    try {
      const offices = await Office.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(offices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  ,
  deleteOne: async (req, res) => {
    try {
      const offices = await Office.findByIdAndDelete(req.params.id);
      res.json(offices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  ,
};

export default officeController;
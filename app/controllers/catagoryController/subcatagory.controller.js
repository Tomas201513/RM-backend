import SubCatagory from "../../model/CatagoryModel/subCatagory.model.js";
import Catagory from "../../model/CatagoryModel/category.model.js";
import Asset from "../../model/AssetModel/asset.model.js";

const subCatagoryController = {
    getAll: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.find().populate("catagory");
        
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },

// getSome: async (req, res) => {
//         try {
//         const subCatagory = await SubCatagory.find().populate("catagory");
//         const categorizedData = subCatagory.reduce((result, item) => {
//             const category = item.catagory.catagory;
//             const subCategory = item.subCatagory;
        
//             if (!result[category]) {
//               result[category] = [];
//             }
        
//             result[category].push(subCategory);
        
//             return result;
//           }, {});
        
//           // Return the categorized data as the response
//         //   res.json(categorizedData);
//         const data = await Asset.find().populate([{
//             path: 'subCatagory',
//             populate: {
//                 path:'catagory'   
//               }
            
//          }, {
//             path: 'budget',
//             populate: {
//                 path:'project'
//               }
//           }, {
//             path: 'registeringOfficer'
//           }, {
//             path: 'currentUser',
//             populate: {
//                 path:'position',
//                 // path:'office',
//               }
//           },{
//             path: 'currentUser',
//             populate: {
//                 // path:'position',
//                 path:'office',
//               }
//           }]);
//           const subcategoryCounts = {};

//           // Iterate through the data and count occurrences of each subcategory based on reason
//           data.forEach(item => {
//             const subcategory = item.subCatagory.subCatagory;
//             const reason = item.reason;
          
//             // If the subcategory exists, create an object to store reason counts for it
//             if (subcategory && reason) {
//               if (!subcategoryCounts[subcategory]) {
//                 subcategoryCounts[subcategory] = {};
//               }
          
//               // Increment reason count for the subcategory
//               subcategoryCounts[subcategory][reason] = (subcategoryCounts[subcategory][reason] || 0) + 1;
//             }
//           });
          
//           // Send the subcategoryCounts object as a response (for use in an Express route)
//           res.json({subcategoryCounts,categorizedData});
        
//         } catch (error) {
//         res.status(500).json({ message: error.message });
//         }
//     },
getSome: async (req, res) => {
  try {
      const subCatagory = await SubCatagory.find().populate("catagory");
      const categorizedData = subCatagory.reduce((result, item) => {
          const category = item.catagory.catagory;
          const subCategory = item.subCatagory;
      
          if (!result[category]) {
              result[category] = {};
          }
      
          if (!result[category][subCategory]) {
              result[category][subCategory] = {};
          }
      
          return result;
      }, {});
      
      // Return the categorized data as the response
      // res.json(categorizedData);

      const data = await Asset.find().populate([{
          path: 'subCatagory',
          populate: {
              path:'catagory'   
          }
      }, {
          path: 'budget',
          populate: {
              path:'project'
          }
      }, {
          path: 'registeringOfficer'
      }, {
          path: 'currentUser',
          populate: {
              path:'position',
              // path:'office',
          }
      },{
          path: 'currentUser',
          populate: {
              // path:'position',
              path:'office',
          }
      }]);

      const subcategoryCounts = {};

      // Iterate through the data and count occurrences of each subcategory based on reason
      data.forEach(item => {
          const subcategory = item.subCatagory.subCatagory;
          const reason = item.reason;
        
          // If the subcategory exists, create an object to store reason counts for it
          if (subcategory && reason) {
              if (!subcategoryCounts[subcategory]) {
                  subcategoryCounts[subcategory] = {};
              }
        
              // Increment reason count for the subcategory
              subcategoryCounts[subcategory][reason] = (subcategoryCounts[subcategory][reason] || 0) + 1;
          }
      });
        
      // Merge subcategoryCounts into categorizedData
      Object.keys(categorizedData).forEach(category => {
          Object.keys(categorizedData[category]).forEach(subcategory => {
              categorizedData[category][subcategory] = subcategoryCounts[subcategory] || {};
          });
      });

      // Send the modified categorizedData object as a response
      res.json({ categorizedData });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
},

    getOne: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.findById(req.params.id).populate(
            "catagory"
        );
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        // console.log("===>",req.body);
        try {
        const cat = await Catagory.findOne({ _id: req.body.catagory });
        // console.log("===>",cat);
        if (!cat)
            return res
            .status(400)
            .json({ error: true, message: "catagory doesn't exist" });
        const subCatagory = new SubCatagory(req.body);
        await subCatagory.save();
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
        const subCatagory = await SubCatagory.findById(req.params.id);
        Object.assign(subCatagory, req.body);
        await subCatagory.save();
        res.json(subCatagory);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {
        await SubCatagory.findByIdAndDelete(req.params.id);
        res.json({ message: "SubCatagory deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    };

export default subCatagoryController;
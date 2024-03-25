import Asset from "../../model/AssetModel/asset.model.js";
import Budget from "../../model/financeModel/budget.model.js";
import SubCatagory from "../../model/CatagoryModel/subCatagory.model.js";
import User from "../../model/UserModel/user.model.js";

const assetController = {
    getAll: async (req, res) => {
        try {
        const assets = await Asset.find().populate([{
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
          }]).sort({ registrationTime: -1 })
          const laptop = assets.filter(asset => asset.subCatagory.subCatagory === 'Laptop' || 'laptop' ||'Laptops' || 'laptops');
          const internet_equipment = assets.filter(asset => asset.subCatagory.subCatagory === 'Internet equipment' ||'internet equipment' );

          //   const counted = assets.reduce((acc, asset) => {
        //     const officeAreaName = asset.currentUser.office.officeAreaName;
        //     acc[officeAreaName] = acc[officeAreaName] || 0;
        //     acc[officeAreaName]++;
        //     return acc;
        //   }, {});
        const counted = assets.reduce(
            (acc, asset) => {
              const officeAreaName = asset.currentUser.office.officeAreaName;
              acc.names.push(officeAreaName);
              acc.counts[officeAreaName] = (acc.counts[officeAreaName] || 0) + 1;
              return acc;
            },
            { names: [], counts: {} }
          );
          
          const result = {
            0: counted.names,
            1: counted.names.map((name) => counted.counts[name]),
          };
          
const uniqueNames = [...new Set(result["0"])]; // Get unique officeAreaNames

const uniqueCounts = uniqueNames.map(name => {
  const index = result["0"].indexOf(name);
  return result["1"][index];
});

const countedAssets = {
  "office": uniqueNames,
  "asset": uniqueCounts
};



const today = new Date();
    const lastMonth = new Date();
    // console.log("today",today, "lastMonth",lastMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const count = await Asset.countDocuments({
      registrationTime: { $gte: lastMonth, $lt: today }
    });

    // res.json({ netAssetCount: count });

        res.json({laptop, internet_equipment,count,countedAssets, assets});
        // https://acted-asset-backend.onrender.com/api/assets
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
        const assets = await Asset.findById(req.params.id).populate(["subCatagory" , "budget" , "registeringOfficer", "currentUser"]);
        res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }, 
     getSinceLastMonth: async (req, res) => {
        
         console.log("0000000000000000000000000getSinceLastMonth");
//   try {
//     const today = new Date();
//     const lastMonth = new Date();
//     console.log("today",today, "lastMonth",lastMonth);
//     lastMonth.setMonth(lastMonth.getMonth() - 1);

//     const count = await Asset.countDocuments({
//       registrationTime: { $gte: lastMonth, $lt: today }
//     });

//     res.json({ netAssetCount: count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve net asset count' });
//   }
    },
    create: async (req, res) => {
        console.log("===>",req.body.subCatagory);
        try {
        const subCatagory = await SubCatagory.findById(req.body.subCatagory);
        const budget = await Budget.findById(req.body.budget).populate({
            path: 'project',
            populate: {
                path:'country'
              }
          });
        const registeringOfficer = await User.findById(req.body.registeringOfficer);
        if (!subCatagory)
            return res
            .status(400)
            .json({ error: true, message: "subCatagory doesn't exist" });
        if (!budget)
            return res
            .status(400)
            .json({ error: true, message: "budget doesn't exist" });    
        if (!registeringOfficer)
            return res
            .status(400)
            .json({ error: true, message: "registeringOfficer doesn't exist" });
        
            // Find existing assets with the exact match of projectCode, budgetCode, and code
        const existingAssets = await Asset.find({
            'probudcat': `${budget.project.projectCode}-${budget.budgetCode}-${subCatagory.code}`
        });
        console.log("budget",budget);

        const assets = new Asset(req.body);
        assets.probudcat = `${budget.project.projectCode}-${budget.budgetCode}-${subCatagory.code}`;
        assets.item_count = existingAssets.length+1;
        assets.tag = `${budget.project.country.countryCode}${budget.project.projectCode}-${budget.project.donorCode}${budget.budgetCode}-${subCatagory.code}-${existingAssets.length+1}`;
        console.log("create asset=",assets)
        await assets.save();

        res.json(assets);
        } catch (error) {   
        res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const subCatagory = await SubCatagory.findById(req.body.subCatagory);
            const budget = await Budget.findById(req.body.budget);
            const registeringOfficer = await User.findById(req.body.registeringOfficer);
            
            if (!subCatagory)
                return res
                .status(400)
                .json({ error: true, message: "subCatagory doesn't exist" });
            if (!budget)
                return res
                .status(400)
                .json({ error: true, message: "budget doesn't exist" });
            if (!registeringOfficer)
                return res
                .status(400)
                .json({ error: true, message: "registeringOfficer doesn't exist" });
            const assets = await Asset.findById(req.params.id);
            Object.assign(assets, req.body);
            await assets.save();
            res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },

    deleteOne: async (req, res) => {
        try {
        const assets = await Asset.findByIdAndDelete(req.params.id);
        res.json(assets);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
    };
    

export default assetController;



        
const AdminModel = require("../models/AdminModel");

// get all admins
const getAdmins = async (req, res) => {
  const admins = await AdminModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(admins);
};

// get a single admin
const getAdmin = async (req, res) => {
  const { id } = req.params; //grab id from params (url)
  try {
    const admin = await AdminModel.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create a new admin
const createAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  const deletedAdmin = await AdminModel.findByIdAndDelete(id); // This deletes the admin
  if (!deletedAdmin) {
    // alternate of try-catch
    return res.status(404).json({ error: "Admin not found" });
  }
  res.status(200).json({ message: "ITEM DELETED!", admin: deletedAdmin });
};

// update a admin
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const admin = await AdminModel.findByIdAndUpdate({ _id: id },{...req.body})
    if(!admin) {
        res.status(400).json({error:"Admin not found"});
    }
    res.status(200).json(admin);
};

module.exports = {
  getAdmins,
  getAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};

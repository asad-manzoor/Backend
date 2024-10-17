import User from '../models/userModel.js';

export const create = async (req, res) => {
   try{
    const exisitEmail = await User.findOne({email: req.body.email});
    if (exisitEmail) {
        return res.status(400).json({"msg": "Email already exists"});
    }
    const userData = new User(req.body);
    if (!userData) {
    return res.status(400).json({"msg": "User not created"});
    }
    const savedData = await userData.save();
    res.status(201).json({"msg":"User Created Successfully","data": savedData});
   } catch (error) {
     res.status(500).json({message: error.message});
   }
}

export const getAll = async (req, res) => {
    try{
        const userData = await User.find();
        if (!userData) {
            return res.status(400).json({message: "No user found"});
        }
        res.status(200).json(userData);
    }catch{
        res.status(500).json({message: error.message});
    }
}


export const getOne = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(400).json({message: "No user found"});
        }
        res.status(200).json(userData);
    }
    catch{
        res.status(500).json({message: error.message});
    }
}



export const update = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findByIdAndUpdate(id, req.body, {new: true});
        if (!userData) {
            return res.status(400).json({message: "No user found"});
        }
        res.status(200).json({"msg":"User Update Successfully","data": userData});
    }
    catch{
        res.status(500).json({message: error.message});
    }
}


export const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findByIdAndDelete(id);
        if (!userData) {
            return res.status(400).json({message: "No user found"});
        }
        res.status(200).json({"msg":"User Deleted Successfully","data": userData});
    }
    catch{
        res.status(500).json({message: error.message});
    }
}
const express = require('express');
const formRouter = express.Router();
const formSchema = require('../schema/forms');
const {isAuth} = require('../utils/isAuth');
const forms = require('../schema/forms');

formRouter.post("/create", isAuth,async (req, res) => {
    const name = req.body.name;
    console.log(name);
    try{
        const form = new formSchema({
            formName: name
        });
        await form.save();
        return res.status(200).json({
            message: "Form created successfully",
            success: true
        })
    }catch(err){
        return res.status(500).json({
            message: "Unable to create form",
            error: err.message,
            success: false
        })
    }
});
formRouter.post('/get-all', isAuth,async (req, res)=>{
    console.log("Hello")
    try{
        const forms = await formSchema.find().select("_id formName version");
        return res.status(200).json({
            data: forms
        });
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Unable to send data",
            error : err.message
        })
    }
})
formRouter.post('/get-all/:identifier', isAuth,async (req, res) => {
    const identifier = req.params.identifier.toLowerCase();

    try {
        const userForms = await userSchema.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        }).populate("forms").select("_id");

        if (!userForms) {
            return res.status(404).json({
                message: "User not found",
                error: "user not found",
                success: false
            });
        }

        return res.status(200).json({
            message: `All forms of user ${identifier}`,
            data: userForms.forms,
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: "Unable to get forms",
            error: err.message,
            success: false
        });
    }
});
formRouter.post('/:id', isAuth,async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const data = await formSchema.findById(id);
        console.log(data)
        if (!data) return res.status(404).json({
            message: "Unable to find data",
            error: "404 not found",
            success: false
        });
        // console.log(data);
        return res.status(200).json({
            message: `form data ${id}`,
            data: data,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to get data",
            error: err.message,
            success: false
        });
    }
});



formRouter.post('/update/:id', isAuth,async (req, res) => {
    console.log("request")
    const id = req.params.id;
    const { data, version } = req.body;
    try {
        const form = await formSchema.findOne({_id: id});
        if(!form) return res.status(404).json({
            message: "Not found",
            success: false
        });
        // console.log(form);
        form.data = data;
        form.version = version;
        await form.save();
        return res.status(201).json({
            message: "data updated successfully",
            data: form,
            success: true
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Unable to update",
            success: false,
            error: err.message
        })
    }
})

formRouter.post('/delete/:id', isAuth,async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try{
        await formSchema.findOneAndDelete({_id: id});
        return res.status(201).json({
            message: "deleted successfully",
            success: true
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to delete form",
            success: false
        })
    }
})
module.exports = formRouter;
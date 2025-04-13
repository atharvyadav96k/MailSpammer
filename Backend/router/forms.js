const express = require('express');
const formRouter = express.Router();
const userSchema = require('../schema/user');
const formSchema = require('../schema/forms');

formRouter.get('/get-all/:identifier', async (req, res) => {
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

formRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await formSchema.findById(id);
        if (!data) return res.status(404).json({
            message: "Unable to find data",
            error: "404 not found",
            success: false
        });
        console.log(data);
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

formRouter.post("/create", async (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    console.log(name)
    try {
        const form = formSchema({
            formName: name
        });
        await form.save();
        return res.status(200).json({
            message: "form create successfully",
            data: form._id
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create form",
            error: err.message,
            success: false
        });
    }
});

formRouter.post('/update/:id', async (req, res) => {
    console.log("request")
    const id = req.params.id;
    const { data, version } = req.body;
    // console.log(data, id);
    try {
        const form = await formSchema.findOne({_id: id});
        console.log(form);
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

module.exports = formRouter;
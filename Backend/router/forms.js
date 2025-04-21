const express = require('express');
const formRouter = express.Router();
const formSchema = require('../schema/forms');
const { isAuth } = require('../utils/isAuth');
const forms = require('../schema/forms');

formRouter.post("/create", isAuth, async (req, res) => {
    const name = req.body.name;
    try {
        const form = new formSchema({
            formName: name,
            user: req.user._id
        });
        await form.save();
        return res.status(200).json({
            message: "Form created successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create form",
            error: err.message,
            success: false
        })
    }
});
formRouter.post('/get-all', isAuth, async (req, res) => {
    try {
        const forms = await formSchema.find({ user: req.user._id }).select("_id formName version data");
        return res.status(200).json({
            data: forms
        });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Unable to send data",
            error: err.message
        })
    }
})

formRouter.post('/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    try {
        const data = await formSchema.findOne({ _id: id });
        if (data.user.toString() !== req.user._id.toString()) {
            return res.status(409).json({
                message: "You don't have access to this content",
                error: "Access Denied",
                success: false
            });
        }
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
        console.log(err.message)
        return res.status(500).json({
            message: "Unable to get data",
            error: err.message,
            success: false
        });
    }
});

formRouter.post('/update/:id', isAuth, async (req, res) => {
    console.log("Update")
    const id = req.params.id;
    const { data, version } = req.body;
    try {
        const form = await formSchema.findOne({ _id: id });
        console.log(form.user, req.user._id)
        if (form.user.toString() !== req.user._id.toString()) {
            return res.status(409).json({
                message: "You don't have access to this content",
                error: "Access Denied",
                success: false
            });
        }
        if (!form) return res.status(404).json({
            message: "Not found",
            success: false
        });
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

formRouter.post('/delete/:id', isAuth, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const data = await formSchema.findOne({ _id: id });
        if (data.user.toString() !== req.user._id.toString()) {
            return res.status(409).json({
                message: "You don't have access to this content",
                error: "Access Denied",
                success: false
            });
        }
        await formSchema.findOneAndDelete({ _id: id });
        return res.status(201).json({
            message: "deleted successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete form",
            success: false
        })
    }
})
module.exports = formRouter;
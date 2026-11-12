import Qualification from "../models/qualification.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {

    const qualification = new Qualification(req.body);

    try {
        await qualification.save();
        return res.status(200).json({
            message: "Qualification successfully created!",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }

};

const list = async (req, res) => {
    
    try {
        let qualifications = await Qualification.find();
        res.json(qualifications);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }

};

const qualificationByID = async (req, res, next, id) => {
    
    try {
        let qualification = await Qualification.findById(id);

        if (!qualification)
        return res.status(400).json({
            error: "Qualification not found",
        });

        req.profile = qualification;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve qualification",
        });
    }

};

const read = (req, res) => {
  
    return res.json(req.profile);

};

const update = async (req, res) => {
    
    try {
        let qualification = req.profile;
        qualification = extend(qualification, req.body);
        await qualification.save();
        res.json(qualification);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }

};

const remove = async (req, res) => {
    
    try {
        let qualification = req.profile;
        await qualification.deleteOne();

        res.json({
            message: "Qualification successfully deleted!",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }

};

const removeAll = async (req, res) => {
    
    try {
        let result = await Qualification.deleteMany({});
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }

};

export default {
    
    create,
    qualificationByID,
    read,
    list,
    update,
    remove,
    removeAll,

};




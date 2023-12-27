import mongoose from "mongoose";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import stream from "stream";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: "../.env" });
import PatientMedicalHistory from "../models/PatientMedicalHistory.js";
import internal from "stream";
export const PatientMedicalRecord = async (req, res) => {
    const id = req.params.id;
    console.log("id=" + id + " " + typeof (id));
    try {
        const objectIdTemp = new mongoose.Types.ObjectId(id);
        console.log(typeof (objectIdTemp));
        const checkExistence = await PatientMedicalHistory.find({ id: objectIdTemp });
        console.log(checkExistence.length);
        // console.log(req.file.length);
        if (checkExistence.length > 0) {
            console.log("Entered !!");
            let newRecord = await PatientMedicalHistory.findOneAndUpdate({ id: objectIdTemp }, { $push: req.body }, { new: true });
            newRecord = await PatientMedicalHistory.findOneAndUpdate({ id: objectIdTemp }, { $set: { lastUpdatedAt: Date.now() } }, { new: true });
            res.status(200).json({
                message: "Record Updated succesfully!!",
                newRecord
            })
        }
        else {
            res.status(400).json({
                message: "No record found with following ID"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const uploadToGoogleDrive = async (auth, fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const response = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: [process.env.GOOGLE_FOLDER_ID],
        },
        fields: "id,name",
    });
    console.log("done");
    console.log(response.data);
    return response.data;
};

export const PatientProfileImageUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const objectIdTemp = new mongoose.Types.ObjectId(id);
        console.log(typeof (objectIdTemp));
        const data = await PatientMedicalHistory.findOne({ id: objectIdTemp });
        if (data) {
            const KeyPath = process.env.KeyPath;
            console.log(req.file);
            const SCOPES = [process.env.SCOPES_0, process.env.SCOPES_1];
            const auth = new GoogleAuth({
                keyFile: KeyPath,
                scopes: SCOPES
            });
            console.log(auth);
            const new_profile_img = await uploadToGoogleDrive(auth, req.file);
            let newRecord = await PatientMedicalHistory.findOneAndUpdate({ id: objectIdTemp }, { $set: { profile_img: new_profile_img } }, { new: true });
            res.status(200).json({
                message: "Record Updated succesfully!!",
                newRecord
            })
        }

    }
    catch (err) {
        console.log(err);
        res.send("something went wrong");
    }
}

export const PatientMedicalRecordSubElementUpdate = async (req, res) => {
    console.log(req.query);
    const id = req.params.id;
    const idInstantiation = new mongoose.Types.ObjectId(id);
    const attribute_name = req.query.attribute;
    const attribute_element_id = req.query.id;
    const newID = new mongoose.Types.ObjectId(attribute_element_id);
    const checkExistence = await PatientMedicalHistory.find({ id: idInstantiation });
    console.log(checkExistence[0][attribute_name]);
    const newAttribute = `${attribute_name}._id`;
    if (checkExistence.length > 0) {
        let checkAttribute = await PatientMedicalHistory.findOneAndUpdate({ id: idInstantiation, [newAttribute]: newID }, { $set: req.body }, { returnDocument: 'after' });
        console.log(checkAttribute);
        res.status(200).json({
            checkAttribute
        })
    }
}

export const PatientMedicalRecordSubElementDelete = async (req, res) => {
    const id = req.params.id;
    const idInstantiation = new mongoose.Types.ObjectId(id);
    const attribute_name = req.query.attribute;
    const attribute_element_id = req.query.id;
    const newID = new mongoose.Types.ObjectId(attribute_element_id);

    try {
        const checkExistence = await PatientMedicalHistory.findOne({ id: idInstantiation });

        if (!checkExistence) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const newAttribute = `${attribute_name}._id`;
        checkExistence[attribute_name] = checkExistence[attribute_name].filter(item => String(item._id) !== String(newID));
        await checkExistence.save();
        res.status(200).json({
            success: true,
            message: 'Attribute deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export const PatientMediccalHistoryRecord = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const idInstantiation = new mongoose.Types.ObjectId(id);
    try {
        const getElement = await PatientMedicalHistory.findOne({ id: idInstantiation });
        console.log(getElement);
        if (getElement) {
            res.status(200).json({
                "message": "Task Done",
                getElement
            })
        }
        else {
            res.status(400).json({
                "message": "no user found with the fowllowing ID"
            })
        }
    }
    catch (err) {
        console.log("something went wrong");
        res.status(400).json({
            "message": "Something Went Wrong!!"
        })
    }
}

export const PatientMedicalRecordSubToSubElementDelete = async (req, res) => {
    console.log(req.params.id);
    console.log(req.query.attribute);
    console.log(req.query.attribute_id);
    console.log(req.query.internal_id);
    console.log(req.query.internal_attribute);
    const collection_id = new mongoose.Types.ObjectId(req.params.id);
    const attribute_element_id = new mongoose.Types.ObjectId(req.query.attribute_id);
    const attribute_sub_element_id = new mongoose.Types.ObjectId(req.query.internal_id);
    const projection = `${req.query.attribute}.$[].${req.query.internal_attribute}`;
    // const data = await PatientMedicalHistory.find({ id: collection_id });
    // console.log(data);
    const filteredData = await PatientMedicalHistory.updateOne({ id: collection_id }, { $pull: { [projection]: { _id: attribute_sub_element_id } } })
    console.log(filteredData);
    res.status(200).json({
        message: "Completed",
        filteredData
    });
}

export const PatientMedicalRecordAttributeSubElementArrayUpdate = async (req, res) => {
    console.log(req.params.id);
    console.log(req.query.attribute);
    console.log(req.query.attribute_id);
    console.log(req.query.final_attribute);
    console.log(req.body);
    const collection_id = new mongoose.Types.ObjectId(req.params.id);
    const attribute_element_id = new mongoose.Types.ObjectId(req.query.attribute_id);
    const query = `${req.query.attribute}._id`;
    const queryProjection = `${req.query.attribute}.$[attribute].${req.query.final_attribute}`;
    const updatedRecord = await PatientMedicalHistory.findOneAndUpdate({ id: collection_id, [query]: attribute_element_id }, { $push: { [queryProjection]: req.body } }, { arrayFilters: [{ "attribute._id": attribute_element_id }] })
    res.status(201).json({
        message: "Updation Successfull",
        updatedRecord
    })
}

export const PatientMedicalRecordAttributeSubElementUpdate = async (req, res) => {
    console.log(req.params.id);
    console.log(req.query.id);
    console.log(req.query.internal_id);
    console.log(req.query.internal_attribute);
    console.log(req.query.sub_internal_attribute);
    console.log(req.file);
    const KeyPath = process.env.KeyPath;
    console.log(req.file);
    const SCOPES = [process.env.SCOPES_0, process.env.SCOPES_1];
    const auth = new GoogleAuth({
        keyFile: KeyPath,
        scopes: SCOPES
    });
    const collection_id = new mongoose.Types.ObjectId(req.params.id);
    const attribute_element_id = new mongoose.Types.ObjectId(req.query.id);
    const checkExistence = await PatientMedicalHistory.find({ id: collection_id });
    const collectionElementAttribute = `${req.query.attribute_name}._id`;
    console.log(collectionElementAttribute);
    const collectionSubElementAttribute = `${req.query.attribute_name}.${req.query.internal_attribute}._id`;
    const projectionElementAttribute = `${req.query.attribute_name}.$[attribute].${req.query.internal_attribute}.$[element].${req.query.sub_internal_attribute}`;
    console.log(collectionSubElementAttribute);
    console.log(projectionElementAttribute);
    const attribute_sub_element_id = new mongoose.Types.ObjectId(req.query.internal_id);
    let updatedData;
    if (checkExistence.length > 0) {
        await req.files.map(async (file) => {
            const tempResult = await uploadToGoogleDrive(auth, file);
            console.log("tempRes");
            console.log(tempResult);
            updatedData = await PatientMedicalHistory.findOneAndUpdate({ id: collection_id, [collectionElementAttribute]: attribute_element_id, [collectionSubElementAttribute]: attribute_sub_element_id }, { $push: { [projectionElementAttribute]: tempResult } }, { arrayFilters: [{ "attribute._id": attribute_element_id }, { "element._id": attribute_sub_element_id }] }, { returnDocument: 'after' });
            console.log(updatedData);
            await res.status(200).json({
                updatedData
            })
        })

    }
    else {
        res.status(400).json({
            message: "error!! something went wrong!!"
        })
    }
}
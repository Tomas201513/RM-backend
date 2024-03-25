import mongoose from "mongoose";
import Asset from "../AssetModel/asset.model.js";

const Schema = mongoose.Schema;

const ConnSchema = new Schema(
    {
        asset : {
            type: String,
            ref: "Asset",
            required: true,
        },
        actedPremises: {
            type: String,
            required: true,
        },
        actedPremises: {
            type: String,
            required: true,
        },
        userN: {
            type: String,
            required: true,
        },
        internetLink: {
            type: String,
            required: true,
        },
        isp: {
            type: String,
            required: true,
        },
        uploadSpeed: {
            type: String,
            required: true,
        },
        downloadSpeed: {
            type: String,
            required: true,
        },
        contentionRatio: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        device: {
            type: String,
            required: true,
        },
        
    });

const Conn = mongoose.model("Conn", ConnSchema);

export default Conn;


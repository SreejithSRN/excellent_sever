"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const models_1 = require("../../models");
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data, "iam from repository add category");
        const catName = data.name.trim();
        const isExisting = yield models_1.Category.findOne({ name: catName });
        if (isExisting && data._id === isExisting._id) {
            return "Category already exist, try another name";
        }
        const newData = Object.assign(Object.assign({}, data), { name: catName });
        const { _id } = newData, updateData = __rest(newData, ["_id"]);
        const result = data._id ? yield models_1.Category.findOneAndUpdate({ _id: data._id }, // Match based on _id if provided
        newData, // Update fields with new data
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
        ) : yield models_1.Category.create(updateData);
        // const created=await Category.create(newData)
        if (!result) {
            return "Error Occured, try again.....";
        }
        return "Category updated sucessfully.....";
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error occurred");
    }
});
exports.addCategory = addCategory;

const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { company, featured, name, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = { $regex: company, $options: "i" };
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
        let sortfix = sort.replace(",", " ");
        apiData = apiData.sort(sortfix);
    }
    if (select) {
        let selectfix = select.split(",").join(" ");
        apiData = apiData.select(selectfix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({ myData })
};

const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find(req.query);
    res.status(200).json({ myData })
};

module.exports = { getAllProducts, getAllProductsTesting };
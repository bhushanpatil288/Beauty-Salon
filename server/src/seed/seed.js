const serviceModel = require("../models/service.models.js")

const services = [
    {
        name: "hairspa",
        price: 1000,
        duration: 60,
    },
    {
        name: "facial",
        price: 1500,
        duration: 90,
    },
    {
        name: "waxing",
        price: 500,
        duration: 30,
    },
    {
        name: "threading",
        price: 200,
        duration: 15,
    },
    {
        name: "manicure",
        price: 800,
        duration: 45,
    },
    {
        name: "pedicure",
        price: 1200,
        duration: 60,
    },
    {
        name: "makeup",
        price: 2000,
        duration: 120,
    },
    {
        name: "haircut",
        price: 500,
        duration: 30,
    },
    {
        name: "haircolor",
        price: 1500,
        duration: 120,
    },
    {
        name: "henna",
        price: 300,
        duration: 30,
    },
]

const seedServices = async () => {
    try {
        await serviceModel.create(services);
        console.log("testing services added");
    } catch (e) {
        console.log("failed to seed services");
    }
}

module.exports = { seedServices };
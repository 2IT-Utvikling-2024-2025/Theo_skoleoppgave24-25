const { getAllObjects, getObjectById, deleteObjectById, updateObjectById, addObject } = require('../Data/databaseGeneric');


const getAllData = async (req, res) => {
    try {
        const products = await getAllObjects();
        res.status(200).json({ sucess: true, data: products});
    } catch (error) {
        res.status(500).json({ sucess: false, error: "Something went wrong" });
    }
};




const getSingleData = async (req, res) => {
    try {
        const product = await getObjectById(req.params.id);

        res.status(200).json({ sucess: true, data: product});

    } catch (error) {
        res.status(500).json({ sucess: false, error: "Something went wrong" });
    }
};



const createData = async (req, res) => {
    try {
        const { productName, price, description } = req.body;

        const newProduct = await addObject({ productName, price, description });

        res.status(201).json({ sucess: true, data: newProduct});

    } catch (error) {
        res.status(500).json({ sucess: false, error: "Something went wrong" });
    }
};


const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, description } = req.body;

        const updatedObject = await updateObjectById(id, { productName, price, description });

        res.status(200).json({ sucess: true, data: updatedObject});

    } catch (error) {
        res.status(500).json({ sucess: false, error: "Something went wrong" });
    }
};

const deleteData = async (req, res) => {
    try {

        const { id } = req.params;
        const deleted = await deleteObjectById(id);

        res.status(200).json({ sucess: true, message: "Data deleted" });

    } catch (error) {
        res.status(500).json({ sucess: false, error: "Something went wrong" });
    }
};


module.exports = { getAllData, getSingleData, createData, updateData, deleteData };
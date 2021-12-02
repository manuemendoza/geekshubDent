const { Client, Token, Pet } = require('../../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getPets = async(req, res) => {
    const name = req.query.name;

    let filters = {
        where: {}
    }
    if (req.auth.user.role === 'client') {
        filters.where.idUser = req.auth.user.id;
    }

    if (name) {
        filters.where.name = {
            [Op.like]: `%${req.query.name}%`
        };
    }

    try {
        
        const pet = await Pet.findAll(filters);
        res.json(pet);

    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    };
};

const getPetById = async(req, res) => {
    const primaryK = req.params.id;
    try {
        const pet = await Pet.findByPk(primaryK);
        if (pet) {
            res.json(pet);
        } else {
            res.json({
                messege: 'pet not found'
            }, 404)
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const createPet = async(req, res) => {

    const petData = req.body;

    try {
        const pet = await Pet.create(petData);
        res.json({
            pet
        }, 201);
    } catch (error) {
        console.error(error);
        if (error.message == "Validation error") { // @TODO: include mysql validation errors
            res.json({
                message: error.original.message
            }, 400);
        } else {
            res.json({
                message: error.message
            }, 500);
        }
    };

};

const updatePet = async(req, res) => {
    try {
        const primaryK = req.params.id;
        const pet = await Pet.findByPk(primaryK);
        const newData = req.body;
        if (pet) {
            const petUpdate = await Pet.update(newData);
            res.json(petUpdate);
        } else {
            res.json({
                message: 'Pet not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const deletePet = async(req, res) => {
    const primaryK = req.params.id;
    try {
        const pet = await Pet.findByPk(primaryK);
        if (pet) {
            await Pet.destroy({
                where: { id: primaryK }
            });
            res.json({
                message: "Pet deleted"
            });
        } else {
            res.json({
                message: 'Pet not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

module.exports = {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
};
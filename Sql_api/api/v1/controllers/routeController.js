const express = require("express");

const { pool } = require('../data/db');

const getAllRoutes = async(req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM route');
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getSingleRoute = async(req, res) => {
    try {
        const [results] = await pool.execute(
            'SELECT * FROM route WHERE name = ?',
            [req.params.name]
        );
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const createRoute = async(req, res) => {
    try {
        const { routeId, name, stationId } = req.body;
        
        const [results] = await pool.execute(
            'INSERT INTO route (routeId, name, stationId) VALUES (?, ?, ?)',
            [routeId, name, stationId]
        );

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateRoute = async(req, res) => {
    try {
        const { name, stationId } = req.body;
        
        const [results] = await pool.execute(
            'UPDATE route SET name = ?, stationId = ? WHERE routeId = ?',
            [name, stationId, req.params.id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Route not found" });
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteRoute = async(req, res) => {
    try {
        const [results] = await pool.execute(
            'DELETE FROM route WHERE routeId = ?',
            [req.params.id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Route not found" });
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllRoutes,
    getSingleRoute,
    createRoute,
    updateRoute,
    deleteRoute,
};

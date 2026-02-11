import express from "express"
import pool from "../config/database.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const [rows] = await pool.query("SELECT * FROM post ORDER BY created_at DESC")
        res.json(rows)
    } catch (err) {
        next(err)
    }
})

export default router
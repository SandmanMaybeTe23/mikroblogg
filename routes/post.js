import express from "express"
import { param, validationResult } from "express-validator"
import pool from "../config/database.js"

const router = express.Router()


router.get(
    "/:id",
    param("id").isInt().withMessage("Inläggs-ID måste vara ett heltal."),
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const postId = req.params.id

            const [rows] = await pool.query(
                `SELECT post.id, post.content, post.created_at, user.name
                FROM post
                JOIN user ON post.user_id = user.id
                WHERE post.id = ?`,
                [postId],
            )

            if (rows.length === 0) {
                throw new Error("Inlägget kunde inte hittas.")
            }

            res.json(rows[0])
        } catch (err) {
            next(err)
        }
    },
)
export default router
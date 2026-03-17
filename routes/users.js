import express from "express"
import bcrypt from "bcrypt"
import pool from "../config/database.js"
import { body, validationResult } from "express-validator"
const router = express.Router()

// Test route för att skapa en lösenordshash
router.get("/test-hash/:password", async (req, res) => {
    const { password } = req.params
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    res.send(`Lösenord: ${password} Hash: ${hash}`)
})



router.get("/login", async(req,res) =>{

    res.render(("login.njk"))


})



router.post("/login",
    // ... validering ...
    async (req, res) => {
        // ... kontrollera valideringsfel ...
        const { username, password } = req.body

        try {
            // ... hämta användare från databasen ...
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" })
            }


            const [rows] = await pool.query("SELECT * FROM user WHERE name = ?", [username])
            const user = rows[0]

            if (!user) {
                return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" })
            }

            // Användarens lösenord matchar och vi kan logga in användaren
            return res.json({ message: "Användaren inloggad", user })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Något gick fel" })
        }
    }
)
















        try {
            // ... hämta användare från databasen ...
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" })
            }


        try {
            const [rows] = await pool.query("SELECT * FROM user WHERE name = ?", [username])
            const user = rows[0]

            if (!user) {
                return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" })
            }




export default router
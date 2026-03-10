import express from "express"
import bcrypt from "bcrypt"
import { body, validationResult } from "express-validator"
const router = express.Router()

// Test route för att skapa en lösenordshash
router.get("/test-hash/:password", async (req, res) => {
    const { password } = req.params
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    res.send(`Lösenord: ${password} Hash: ${hash}`)
})


router.post("/login", async (req, res) => {
    // Validering och sanering av data kommer här
    const { username, password } = req.body

    // test
    res.json({username, password})
})





router.post("/login",
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Användarnamn krävs"),
    body("password")
        .notEmpty()
        .withMessage("Lösenord krävs"),
    async (req, res) => {
        // Kontrollera valideringsfel
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // Här kan det vara snyggt med ett flash-meddelande eller liknande för att visa felen för användaren
            return res.status(400).json({ errors: errors.array() })
        }
        const { username, password } = req.body
        // Fortsätt med inloggning...
        res.json({username, password})
    }
)

export default router
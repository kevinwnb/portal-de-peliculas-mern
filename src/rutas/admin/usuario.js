const router = require("express").Router()
const { searchUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario } = require("../../controladores/admin/usuario")
const auth = require("../../middleware/auth")
const adminCheck = require("../../middleware/admin-check")

router.use(auth)
router.use(adminCheck)
router.get("/", searchUsuarios)
router.get("/:id", getUsuario)
router.post("/", createUsuario)
router.put("/", updateUsuario)
router.delete("/", deleteUsuario)

module.exports = router
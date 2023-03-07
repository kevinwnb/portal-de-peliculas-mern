const router = require("express").Router()
const { searchUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario } = require("../../controladores/admin/usuario")
const auth = require("../../middleware/auth")
const adminCheck = require("../../middleware/admin-check")

router.use(auth)
router.use(adminCheck)
router.get("/", searchUsuarios)
router.post("/", createUsuario)
router.put("/:id", updateUsuario)
router.delete("/", deleteUsuario)

module.exports = router
import express from "express"
import { ask } from "../controllers/AI"
import { deleteUser, getUserDetails, getUsers, loginUser, protectUser, registerUser, updateUser, verifyEmail } from "../controllers/user"
const router=express.Router()

router.post("/verify",verifyEmail)
router.post("/auth/register",registerUser)
router.post("/auth/login",loginUser)
router.get("/accounts/:email",protectUser,getUserDetails)
// router.get("/accounts",protectUser,getUsers)
router.patch("/accounts/:email",protectUser,updateUser)
router.delete("/accounts/:email",protectUser,deleteUser)

router.post('/request',protectUser,ask)

export default router
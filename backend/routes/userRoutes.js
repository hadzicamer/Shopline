import express from 'express'
const router=express.Router()
import { authUser, deleteUser, getProfile, getUserById, getUsers, registerUser, updateProfile, updateUser }from '../controllers/userController.js'
import{isAdmin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,isAdmin, getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect,getProfile).put(protect,updateProfile)
router.route('/:id').delete(protect,isAdmin,deleteUser).get(protect,isAdmin,getUserById).put(protect,isAdmin,updateUser)


export default router
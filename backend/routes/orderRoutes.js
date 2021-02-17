import express from 'express'
const router=express.Router()
import { addOrderItems,getOrderById, getUserOrders, updateOrder }from '../controllers/orderController.js'
import{protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItems)
router.route('/myOrders').get(protect,getUserOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrder)



export default router
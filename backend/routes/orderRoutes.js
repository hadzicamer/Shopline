import express from 'express'
const router=express.Router()
import { addOrderItems,getOrderById, getOrders, getUserOrders, updateOrder, updateOrderToDeliver }from '../controllers/orderController.js'
import{isAdmin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItems).get(protect,isAdmin,getOrders)
router.route('/myOrders').get(protect,getUserOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrder)
router.route('/:id/deliver').put(protect,isAdmin, updateOrderToDeliver)




export default router
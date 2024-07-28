const express=require('express')
const router=express.Router()
const {createNewDish,updateOne,deleteOne,createNewForm,updateOneForm,showDishes}=require('../controllers/dish_controllers.js')

router.route('/:id').get(createNewForm)
router.route('/:id/edit').get(updateOneForm)
router.route('/:name/:id').get(showDishes)
router.route('/new').post(createNewDish)
// router.route('/id/edit').get(updateOneForm)
router.route('/:id/edit').put(updateOne)
router.route('/:id/delete').delete(deleteOne)
module.exports=router

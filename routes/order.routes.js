const router = require("express").Router();
const isAuthenticated = require("../authConfig/isAuthenticated");
const OrderController = require("../controllers/order.controllers");

router.post("/order/new", isAuthenticated, OrderController.createOrder);
router.get("/order/view_all_past_orders", isAuthenticated, OrderController.getPastOrders);
router.get("/order/view_past_order/:id", isAuthenticated, OrderController.getPastOrder);
router.get("/order/open_order/:id", isAuthenticated, OrderController.getOpenOrder);
router.put("/update_order_paid/:id", isAuthenticated, OrderController.updateOrderPaid);

module.exports = router;
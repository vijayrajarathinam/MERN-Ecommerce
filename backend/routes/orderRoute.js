const router = require("express").Router();

const { create, getOneOrder, myOrder, getAll, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

router.route("/order/new").post(isAuthenticatedUser, create);
router.route("/order/:id").get(isAuthenticatedUser, getOneOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAll);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;

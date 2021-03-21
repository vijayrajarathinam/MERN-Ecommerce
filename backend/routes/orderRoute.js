const router = require("express").Router();

const { create, getOneOrder, myOrder, getAll } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

router.route("/order/new").post(isAuthenticatedUser, create);
router.route("/order/:id").get(isAuthenticatedUser, getOneOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAll);

module.exports = router;

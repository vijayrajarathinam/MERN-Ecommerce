const router = require("express").Router();
const { create, all, getOne, update, remove } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

router.route("/products").get(all).post(
  isAuthenticatedUser, //, authorizeRoles("admin")
  create
);
router
  .route("/product/:id")
  .get(getOne)
  .put(isAuthenticatedUser, authorizeRoles("admin"), update)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), remove);

module.exports = router;
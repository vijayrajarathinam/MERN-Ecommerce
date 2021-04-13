const router = require("express").Router();
const {
  create,
  all,
  getOne,
  update,
  remove,
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

router.route("/products").get(all).post(isAuthenticatedUser, authorizeRoles("admin"), create);

router
  .route("/products/:id")
  .get(getOne)
  .put(isAuthenticatedUser, authorizeRoles("admin"), update)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), remove);

router.route("/review").put(isAuthenticatedUser, createReview);
router.route("/reviews").get(isAuthenticatedUser, getReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;

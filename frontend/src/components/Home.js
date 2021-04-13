import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Slider, { Range } from "rc-slider";

import { Meta, Loader } from "../components/layout";
import { allProducts } from "../redux/actions/productAction";

import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const range = createSliderWithTooltip(Range);

function Home({ match }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([1, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.products);

  const keyword = match.params.keyword;
  useEffect(() => {
    if (error)
      return alert.show(error, {
        type: "error",
        timeout: 5000,
        onOpen: () => console.log(`triggered alert to open`),
        onClose: () => console.log(`triggered alert to close`),
      });
    dispatch(allProducts(keyword, currentPage, price));
  }, [dispatch, error, alert, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Meta title="Buy Best Products Online" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                    <div className="card p-3 rounded">
                      <img className="card-img-top mx-auto" src={product.images[0].url} alt={product.name} />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                          <Link to={`/product/${product._id}`}>{product.name}</Link>
                        </h5>
                        <div className="ratings mt-auto">
                          <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                          </div>
                          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                        </div>
                        <p className="card-text">${product.price}</p>
                        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;

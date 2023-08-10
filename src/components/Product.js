import { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import StatusCode from "../utils/StatusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    // dispatch an action for fetch products
    dispatch(getProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    // dispath an add action
    dispatch(add(product));
  };

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>;
  }

  if (status === StatusCode.ERROR) {
    return (
      <Alert key={"danger"} variant={"danger"}>
        Something went wrong! Please try again!
      </Alert>
    );
  }

  const cards = products.map((prod) => (
    <div className="col-md-3 mb-2" key={prod.id}>
      <Card style={{ width: "18rem" }} className="h-100">
        <div>
          <Card.Img
            variant="top"
            src={prod.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Text>{prod.price}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={() => addToCart(prod)}>
            Add to cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;

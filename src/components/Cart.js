import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const productCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeToCart = (id) => {
    // dispath a remove action
    dispatch(remove(id));
  };

  const cards = productCart.map((prod) => (
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
          <Button variant="danger" onClick={() => removeToCart(prod.id)}>
            Remove item
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

export default Cart;

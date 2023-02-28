import Card from "react-bootstrap/Card";
import Price from "./Price";

const Product = ({ product }) => {
  return (
    <Card className="mt-3 mb-3 rounded">
      <Card.Img src={product.image1} alt={product.name} variant="top" />
      <Card.Body className="p-0">
        <a href={`products/${product.id}`} className="text-decoration-none">
          <Card.Title className="txt--black p-4">{product.name}</Card.Title>
          <Card.Footer as="div">
            <Price
              hasDiscount={product.hasDiscount}
              discount={product.discount}
              price={Number(product.price)}
              noIcon
            />
          </Card.Footer>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;

import Card from "react-bootstrap/Card";
import Price from "./Price";

const Product = ({ product }) => {
  return (
    <Card className="mt-3 mb-3 p-3 rounded">
      <Card.Img src={product.image1} alt={product.name} />
      <Card.Body>
        <a href={`products/${product.id}`} className="text-decoration-none">
          <Card.Title className="txt--black">{product.name}</Card.Title>
          <Card.Text as="div">
            <Price
              hasDiscount={product.hasDiscount}
              discount={product.discount}
              price={Number(product.price)}
              noIcon
            />
          </Card.Text>
        </a>
      </Card.Body>
    </Card>
  );
};

export default Product;

import Card from 'react-bootstrap/Card';

const Product = ({ product }) => {
  return (
    <Card className='mt-3 mb-3 p-3 rounded'>
        <a href={`product/${product.id}`}>
            <Card.Img src={product.image} alt={product.name} fluid />
        </a>
    </Card>
  )
}

export default Product
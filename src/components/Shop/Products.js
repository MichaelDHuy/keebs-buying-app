import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { 
    id: 'p1', 
    price: 300, 
    title: 'KBDFans Bella', 
    description: 'The 75% layout mechanical keyboard'
  },
  { 
    id: 'p2', 
    price: 200, 
    title: 'KBDFans Tofu', 
    description: 'The 65% layout mechanical keyboard'
  },
  { 
    id: 'p3', 
    price: 500, 
    title: 'Cyberboard', 
    description: 'The OLED screeen mechanical keyboard'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
        />
        ))}       
      </ul>
    </section>
  );
};

export default Products;

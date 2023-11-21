import axios from 'axios';

export async function productData() {
  const product = await axios.get('https://fakestoreapi.com/products');
  return product;
}

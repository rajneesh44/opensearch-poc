export default interface Product {
  id: string;
  crawl_timestamp: string;
  product_url: string;
  product_name: string;
  product_category_tree: string[];
  pid: string;
  retail_price: number;
  discounted_price: number;
  image: string[];
  is_FK_Advantage_product: string;
  description: string;
  product_rating: string;
  overall_rating: string;
  brand: string;
  product_specifications: string;
}

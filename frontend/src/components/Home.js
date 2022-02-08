import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from '../features/products/productsApi'


const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);

  const { data, error, isLoading, isSuccess } = useGetAllProductsQuery();
  console.log({ data })

  // isLoading && <h2>Loading...</h2> && console.log("Loading...")
  // isSuccess && <h2>Success</h2> && console.log("Success")


  return (
    <div className="home-container">
    {status === "success" ? (
      <>
        <h2>New Arrivals</h2>

        <div className="products">
          { data && data?.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              {/* <button onClick={() => handleAddToCart(product)}> */}
              <button>
                Add To Cart
              </button>
            </div>
            ))}
        </div>
      </>
    ) : status === "pending" ? (
      <p>Loading...</p>
    ) : (
      <p>Unexpected error occurred...</p>
    )}
  </div>
  )
};

export default Home;

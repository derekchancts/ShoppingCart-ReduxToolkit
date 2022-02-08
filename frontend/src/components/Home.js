import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from '../features/products/productsApi'
import { FadeLoader } from 'react-spinners';
import { addToCart } from '../features/products/cartSlice'
import { useHistory } from "react-router";


const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, error, isLoading, isSuccess } = useGetAllProductsQuery();
  // console.log({ data })

  // isLoading && <h2>Loading...</h2> && console.log("Loading...")
  // isSuccess && <h2>Success</h2> && console.log("Success")
  // console.log(isSuccess)

  const handleAddToCart = (product) => {
    // console.log(product)
    dispatch(addToCart(product));
    history.push("/cart");
  };


  const template = (
    isSuccess ? (
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
              <button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
            ))}
        </div>
      </>
    // ) : status === "pending" ? (
    ) : isLoading ? (
      <div className="home-loading"><FadeLoader sizeUnit={"px"} size={250} color={'orange'} loading={true} /></div>
    ) : error && (
      <div class="home-error">Unexpected error occurred...</div>
    )
  );


  const template1 = (
    isSuccess ? <h2>Success</h2> : isLoading ? <h2>Loading...</h2> : error ? <h2>Some Error</h2> : null
  );
  
  
  return (
    <>
      {/* <div className="home-container">
        { template1 }
      </div>
       */}

      <div className="home-container">
      {/* {status === "success" ? ( */}
      { isSuccess ? (
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
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
              ))}
          </div>
        </>
      // ) : status === "pending" ? (
      ) : isLoading ? (
        <div className="home-loading"><FadeLoader sizeUnit={"px"} size={250} color={'orange'} loading={true} /></div>
      ) : error && (
        <div class="home-error">Unexpected error occurred...</div>
      )}
    </div>
  </>
  )
};

export default Home;

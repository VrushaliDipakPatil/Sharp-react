import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isinitial = true;

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending..",
          message: "sending data to cart!",
        })
      );
      const respone = await fetch(
        "https://movies-2a006-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!respone.ok) {
        throw new Error("sending cart data failed....");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success..",
          message: "sent data to cart successfully!",
        })
      );
    };

    if (isinitial) {
      isinitial= false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error..",
          message: "failed sending data to cart!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showcart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

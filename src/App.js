import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-data';


let initialNoti = true;
function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);

  const cart  = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
      // dispatch(uiActions.showNotification({
      //   status: 'pending',
      //   title: 'Sending...',
      //   message: 'Sending cart data!'
      // }));
      
      // const response = await fetch('https://react-maxi-project-04-default-rtdb.firebaseio.com/keebsCart.json', { 
      // method: 'PUT',
      // body: JSON.stringify(cart),
      // });

      // if (!response.ok) {
      //   throw new Error('Sending cart data failed!');
      // }

      // dispatch(uiActions.showNotification({
      //   status: 'success',
      //   title: 'Success!',
      //   message: 'Sending cart data successfully!'
      // }));
    // };

    if (initialNoti) {
      initialNoti = false;
      return;
    }
    
    // sendCartData().catch(error => {
    //   dispatch(uiActions.showNotification({
    //     status: 'error',
    //     title: 'Error!',
    //     message: 'Sending cart data failed!'
    //   }));
    // });
    if (!cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && 
        <Notification 
          status={notification.status} 
          title={notification.title}  
          message={notification.message} 
        />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-maxi-project-04-default-rtdb.firebaseio.com/keebsCart.json'); // we don't need use GET because GET request is default
    

      if (!response.ok) {
      throw new Error("Could not fetch cart data!");
    }
    
      const data = await response.json();

       return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [], // it's ok if we don't put empty array here because at first, items is empty array
        totalQuantity: cartData.totalQuantity
      }));

    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed!'
      }));
    }
  };
};


export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
      })
    );
    
    const sendRequest = async () => {
      const response = await fetch('https://react-maxi-project-04-default-rtdb.firebaseio.com/keebsCart.json', { 
        method: 'PUT',
        body: JSON.stringify({  
            items: cart.items,
            totalQuantity: cart.totalQuantity 
          }),
        });
  
      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };
  
  try {
    await sendRequest();

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sending cart data successfully!'
    }));   
  } catch (error) {
    dispatch(uiActions.showNotification({
      status: 'error',
      title: 'Error!',
      message: 'Sending cart data failed!'
    }));
  }   
  };
}; 
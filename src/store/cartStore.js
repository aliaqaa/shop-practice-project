import { create } from 'zustand';  
import { persist } from 'zustand/middleware';  

const cartStore = (set, get) => ({  
  cartItems: [], // Array of items in the cart  
  itemCount: 0,   // Total number of items in the cart  
  totalPrice: 0,  // Total price of items in the cart  
  addItem: (item) => {  
    const existingItem = get().cartItems.find((cartItem) => cartItem.id === item.id);  

    if (existingItem) {  
      // Item already in cart, increase quantity  
      set((state) => ({  
        cartItems: state.cartItems.map((cartItem) =>  
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem  
        ),  
        itemCount: state.itemCount + 1,  
        totalPrice: state.totalPrice + item.price,  
      }));  
    } else {  
      // Item not in cart, add it with quantity 1  
      set((state) => ({  
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],  
        itemCount: state.itemCount + 1,  
        totalPrice: state.totalPrice + item.price,  
      }));  
    }  
  },  
  removeItem: (itemId) => {  
    const itemToRemove = get().cartItems.find((item) => item.id === itemId);  

    if (!itemToRemove) return; // Item not in cart  

    set((state) => ({  
      cartItems: state.cartItems.filter((item) => item.id !== itemId),  
      itemCount: state.itemCount - itemToRemove.quantity,  
      totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,  
    }));  
  },  
  increaseQuantity: (itemId) => {  
    set((state) => ({  
      cartItems: state.cartItems.map((cartItem) =>  
        cartItem.id === itemId  
          ? { ...cartItem, quantity: cartItem.quantity + 1 }  
          : cartItem  
      ),  
      itemCount: state.itemCount + 1,  
      totalPrice: state.totalPrice + state.cartItems.find(item => item.id === itemId).price,  
    }));  
  },  
  decreaseQuantity: (itemId) => {  
    set((state) => {  
      const cartItem = state.cartItems.find((item) => item.id === itemId);  

      if (!cartItem) return state; // Item not found  

      if (cartItem.quantity === 1) {  
        // Remove item if quantity is 1  
        return {  
          cartItems: state.cartItems.filter((item) => item.id !== itemId),  
          itemCount: state.itemCount - 1,  
          totalPrice: state.totalPrice - cartItem.price,  
        };  
      } else {  
        // Decrease quantity  
        return {  
          cartItems: state.cartItems.map((cartItem) =>  
            cartItem.id === itemId  
              ? { ...cartItem, quantity: cartItem.quantity - 1 }  
              : cartItem  
          ),  
          itemCount: state.itemCount - 1,  
          totalPrice: state.totalPrice - cartItem.price,  
        };  
      }  
    });  
  },  
  clearCart: () => {  
    set({ cartItems: [], itemCount: 0, totalPrice: 0 });  
  },  
});  

const useCartStore = create(persist(cartStore, {  
  name: 'cart-storage', // unique name  
  getStorage: () => localStorage, // (optional) by default the 'localStorage' is used  
}));  

export default useCartStore;  
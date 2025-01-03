import { useEffect, useState } from "react";
import YourBookings from "./components/YourBookings";
import CheckoutPage from "./components/CheckoutPage";
import { Route, Routes } from "react-router";
import { Cart } from "./types/types";
import AvailableSessions from "./components/AvailableSessions";
import LoginPage from "./components/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import RegisterPage from "./components/RegisterPage";
import { ProtectedRoute } from "./route/ProtectedRoute";

function App() {
  const [cartList, setCartList] = useState<Cart[]>(() => {
    const savedCart = localStorage.getItem("cartList");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const emptyCartList = () => setCartList([]);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...cartList];
    updatedCart.splice(index, 1);
    setCartList(updatedCart);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        <Routes>
          <Route
            element={
              <ProtectedRoute
                cartList={cartList}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            }
          >
            <Route path="/" element={<AvailableSessions />} />
            <Route
              path="your-bookings"
              element={
                <YourBookings setCartList={setCartList} cartList={cartList} />
              }
            />
            <Route
              path="checkout"
              element={
                <CheckoutPage
                  cartList={cartList}
                  onRemove={handleRemoveFromCart}
                  emptyCartList={emptyCartList}
                />
              }
            />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

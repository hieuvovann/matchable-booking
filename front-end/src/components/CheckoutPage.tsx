import BookingForm from "./BookingForm";
import CartOverview from "./CartOverview";
import { Cart } from "@/types/types";

interface CheckoutPageProps {
  cartList: Cart[];
  onRemove: (index: number) => void;
  emptyCartList: () => void;
};

const CheckoutPage = ({ cartList, onRemove, emptyCartList }: CheckoutPageProps) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <BookingForm cartList={cartList} emptyCartList={emptyCartList} />

        {/* Cart Overview */}
        <CartOverview cartList={cartList} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default CheckoutPage;
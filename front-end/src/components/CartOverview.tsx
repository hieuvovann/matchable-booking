import { Cart } from "@/types/types";
import { format } from "date-fns";

interface CartOverviewProps {
  cartList: Cart[];
  onRemove: (index: number) => void;
};

function CartOverview({ cartList, onRemove }: CartOverviewProps) {
  const totalCost = cartList.reduce((total, session) => total + session.price, 0);
  
  return (
    <div>
      {cartList.length === 0 ? (
        <p className="text-gray-500">No sessions added to the cart yet.</p>
      ) : (
        <div>
          {cartList.map((session, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{session.sessionType}</p>
                <p className="text-sm text-gray-600">
                  <strong>Trainer:</strong> {session.trainer}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Start Date and Time:</strong> {format(session.startDate, "yyyy-MM-dd HH:mm")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {session.duration} Hour{session.duration > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> ${session.price}
                </p>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartList.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="text-lg font-bold">Total</h3>
          <p className="text-gray-700 text-xl font-semibold">${totalCost}</p>
        </div>
      )}
    </div>
  );
}

export default CartOverview;

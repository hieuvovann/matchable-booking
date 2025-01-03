import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { format } from "date-fns";
import { Cart } from "@/types/types";
import { Link, useNavigate } from "react-router";

interface CartItemProps {
  item: Cart;
  onRemove: () => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => (
  <div className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 h-[180px] relative">
    <p>
      <span className="font-medium">Session:</span> {item.sessionType}
    </p>
    <p>
      <span className="font-medium">Trainer:</span> {item.trainer}
    </p>
    <p>
      <span className="font-medium">Start date:</span>{" "}
      {format(item.startDate, "yyyy-MM-dd")}
    </p>
    <p>
      <span className="font-medium">Time slot:</span>{" "}
      {format(item.startDate, "HH:mm")} - {item.duration} Hour
      {item.duration > 1 ? "s" : ""}
    </p>
    <p>
      <span className="font-medium">Cost:</span> ${item.price}
    </p>
    <button
      onClick={onRemove}
      className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
    >
      Remove
    </button>
  </div>
);

interface TopbarProps {
  cartList: Cart[];
  handleRemoveFromCart: (index: number) => void;
}

function Topbar({ cartList, handleRemoveFromCart }: TopbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-zinc-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-4 align-middle">
        <div className="text-xl font-bold">Matchable</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                to="/"
                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              >
                Available Bookings
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/your-bookings"
                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              >
                Your Bookings
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/checkout"
                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              >
                Checkout
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="bg-white hover:bg-gray-100 hover:border-gray-100 text-black rounded-full transition duration-200 mr-2 relative"
            >
              <ShoppingCart className="w-8 h-8" />
              {!!cartList.length && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                  {cartList.length}
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mr-[15px]">
            {cartList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No sessions added to the cart.
              </p>
            ) : (
              <div className="flex gap-2 flex-col">
                {cartList.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    onRemove={() => handleRemoveFromCart(index)}
                  />
                ))}
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-4"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </PopoverContent>
        </Popover>
        <Button
          variant="secondary"
          size="sm"
          className="bg-red-500 text-white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Topbar;

import { Button } from "@/components/ui/button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button type="button" size="sm" disabled={isCheckingOut} onClick={() => checkOut(bookingId)}>
      {isCheckingOut ? "Checking out..." : "Check out"}
    </Button>
  );
}

export default CheckoutButton;

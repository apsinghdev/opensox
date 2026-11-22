import CheckoutPageShell from "@/components/checkout/checkout-page-shell";
import CheckoutWrapper from "@/components/checkout/CheckoutWrapper";
import MembershipChangeConfirmation from "@/components/checkout/membership-change-confirmation";

export default function ExtendPage() {
  return (
    <CheckoutPageShell>
      <CheckoutWrapper
        confirmation={
          <MembershipChangeConfirmation message="Thanks for extending! We've extended your plan." />
        }
      />
    </CheckoutPageShell>
  );
}

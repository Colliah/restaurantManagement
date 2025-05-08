import { Calculator, CreditCard, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import PosVoucherDialog from "./pos-voucher-dialog";
import PosPromotionDialog from "./pos-promotion-dialog";

export default function OrderSummary() {
  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>

          <Button variant="outline">
            <User className="mr-2 size-4" />
            Customer
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-0">
        <ScrollArea className="h-[calc(100vh-26rem)]"></ScrollArea>
      </CardContent>

      <CardFooter className="flex-col border-t p-4">
        <div className="mb-4 w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$100</span>
          </div>

          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$150</span>
          </div>
        </div>

        <div className="mb-4 grid w-full grid-cols-2 gap-2">
          <PosVoucherDialog />

          <PosPromotionDialog />

          <Button variant="outline" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Tip</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Split</span>
          </Button>
        </div>

        <div className="w-full">
          <Button className="w-full" size="lg">
            Pay
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

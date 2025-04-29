import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function OrderSummary() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>

          <Button variant="outline">
            <User className="mr-2 size-4" />
            Customer
          </Button>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

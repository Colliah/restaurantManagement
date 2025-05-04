import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Percent } from "lucide-react";

const promotions = [
  {
    id: "HAPPY_HOUR",
    name: "Happy Hour - 15% Off",
    description: "Available from 4-6pm daily",
  },
  {
    id: "LUNCH_SPECIAL",
    name: "Lunch Special - 10% Off",
    description: "Available from 11am-2pm",
  },
  {
    id: "WEEKEND_DEAL",
    name: "Weekend Deal - Free Dessert",
    description: "Available Saturday and Sunday",
  },
  {
    id: "MEMBER_BRONZE",
    name: "Bronze Member - 5% Off",
    description: "Loyalty program discount",
  },
  {
    id: "MEMBER_SILVER",
    name: "Silver Member - 10% Off",
    description: "Loyalty program discount",
  },
  {
    id: "MEMBER_GOLD",
    name: "Gold Member - 15% Off",
    description: "Loyalty program discount",
  },
  {
    id: "MEMBER_PLATINUM",
    name: "Platinum Member - 20% Off",
    description: "Loyalty program discount",
  },
];

export default function PosPromotionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Percent className="h-4 w-4" />
          <span>Promotion</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Promotion</DialogTitle>
          <DialogDescription>
            Choose from available promotions
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className={`cursor-pointer rounded-md border p-3 hover:bg-muted`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{promo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {promo.description}
                    </p>
                  </div>
                  {/* {appliedPromotion === promo.id && (
                  <Badge variant="secondary">Applied</Badge>
                )} */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tag } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const availableVouchers = [
  {
    code: "WELCOME10",
    description: "10% off for new customers",
    discount: 0.1,
  },
  { code: "SUMMER25", description: "25% off summer special", discount: 0.25 },
  { code: "BDAY50", description: "50% off birthday discount", discount: 0.5 },
];

export default function PosVoucherDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <span>Voucher</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Voucher</DialogTitle>
          <DialogDescription>
            Enter a voucher code or select from available vouchers
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="voucher-code">Voucher Code</Label>
            <div className="flex gap-2">
              <Input
                id="voucher-code"
                placeholder="Enter code"
                className="flex-1"
              />
              <Button>Apply</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Available Vouchers</Label>
            <div className="space-y-2">
              {availableVouchers.map((voucher) => (
                <div
                  key={voucher.code}
                  className={`cursor-pointer rounded-md border p-3 hover:bg-muted`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{voucher.code}</h3>
                      <p className="text-sm text-muted-foreground">
                        {voucher.description}
                      </p>
                    </div>
                    <Badge>{(voucher.discount * 100).toFixed(0)}% Off</Badge>
                  </div>
                </div>
              ))}
            </div>
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

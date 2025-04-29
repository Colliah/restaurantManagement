import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function TableSetting() {
  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to POS</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Table Management</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tables</CardTitle>
              <CardDescription>
                Manage restaurant tables and their status.
              </CardDescription>
            </div>

            <Button>
              <Plus className="size-4" />
              Add Table
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

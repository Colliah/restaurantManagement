import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tag, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Food } from "@/app/(protect)/admin/menu-items/columns";

export default function MenuItemCard({ data }: { data: Food[] }) {
  return (
    <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
      <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Menu Category</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2">
            10 items
          </Badge>
        </div>
        <CardDescription className="mt-2">Description</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          {data
            .filter((item) => item.category === "dairy")
            .slice(0, 3)
            .map((item) => (
              <Badge key={item.name} variant="secondary" className="text-xs">
                {item.name}
              </Badge>
            ))}
          {data.filter((item) => item.category === "dairy").length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{data.filter((item) => item.category === "dairy").length - 3}{" "}
              more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-2">
        <div className="text-xs text-muted-foreground">
          {/* Updated: {formatDate(category.updatedAt)} */}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            View Items
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                      Make changes to the menu category.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </DropdownMenuItem>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e: any) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this category? This will
                      also remove or update all menu items in this category.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

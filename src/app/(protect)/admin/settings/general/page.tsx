import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSetting from "./_components/table-setting";

export default function GeneralSettingsPage() {
  return (
    <Tabs value="tables">
      <TabsList className="w-full justify-start rounded-none border-b bg-background p-0">
        <TabsTrigger
          value="tables"
          className="h-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Tables
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tables">
        <TableSetting />
      </TabsContent>
    </Tabs>
  );
}

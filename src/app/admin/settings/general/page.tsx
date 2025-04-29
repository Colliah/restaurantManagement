import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSetting from "./_components/table-setting";

export default function GeneralSettingsPage() {
  return (
    <Tabs value="tables">
      <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
        <TabsTrigger
          value="tables"
          className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
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

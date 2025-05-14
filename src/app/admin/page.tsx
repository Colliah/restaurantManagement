import { redirect } from "next/navigation";

const Page = async () => {
  return redirect("/admin/pos");
};

export default Page;

import { redirect } from "next/navigation";

const Page = async () => {
  return redirect("/admin/ingredients");
};

export default Page;

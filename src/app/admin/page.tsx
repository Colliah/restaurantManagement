// "use client"

// import * as React from "react"
// import { Pie, PieChart } from "recharts"
// import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LabelList } from "recharts"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart"
// const maleData = [
//     { month: "january", male: 186, fill: "var(--color-january)" },
//     { month: "february", male: 305, fill: "var(--color-february)" },
//     { month: "march", male: 237, fill: "var(--color-march)" },
//     { month: "april", desktop: 173, fill: "var(--color-april)" },
// ]

// const femaleData = [
//     { month: "january", female: 80, fill: "var(--color-january)" },
//     { month: "february", female: 200, fill: "var(--color-february)" },
//     { month: "march", female: 120, fill: "var(--color-march)" },
//     { month: "april", female: 190, fill: "var(--color-april)" },
// ]

// const chartConfig1 = {
//     visitors: {
//         label: "Sex",
//     },
//     male: {
//         label: "Male",
//     },
//     female: {
//         label: "Female",
//     },
//     january: {
//         label: "January",
//         color: "hsl(var(--chart-1))",
//     },
//     february: {
//         label: "February",
//         color: "hsl(var(--chart-2))",
//     },
//     march: {
//         label: "March",
//         color: "hsl(var(--chart-3))",
//     },
//     april: {
//         label: "April",
//         color: "hsl(var(--chart-4))",
//     },
//     may: {
//         label: "May",
//         color: "hsl(var(--chart-5))",
//     },
// }
// const chartData2 = [
//     { monan: "trungchien", soluong: 275, fill: "var(--color-chrome)" },
//     { monan: "thitkho", soluong: 200, fill: "var(--color-safari)" },
//     { monan: "hutieu", soluong: 187, fill: "var(--color-firefox)" },
//     { monan: "pizza", soluong: 173, fill: "var(--color-edge)" },
//     { monan: "other", soluong: 90, fill: "var(--color-other)" },
// ]
// const chartConfig2 = {
//     visitors: {
//         label: "Visitors",
//     },
//     chrome: {
//         label: "Chrome",
//         color: "hsl(var(--chart-1))",
//     },
//     safari: {
//         label: "Safari",
//         color: "hsl(var(--chart-2))",
//     },
//     firefox: {
//         label: "Firefox",
//         color: "hsl(var(--chart-3))",
//     },
//     edge: {
//         label: "Edge",
//         color: "hsl(var(--chart-4))",
//     },
//     other: {
//         label: "Other",
//         color: "hsl(var(--chart-5))",
//     },
// }
// const chartData3 = [
//     { tien: "matbang", soluong: 205, fill: "var(--color-chrome)" },
//     { tien: "tiendien", soluong: 200, fill: "var(--color-safari)" },
//     { tien: "tiennhanvien", soluong: 187, fill: "var(--color-firefox)" },
//     { tien: "tienthucpham", soluong: 173, fill: "var(--color-edge)" },
//     { tien: "khac", soluong: 90, fill: "var(--color-other)" },
// ]
// function MainPage() {
//     return (
//         <div className=" grid gap-4 w-full h-[808px]">
//             <Card className="flex flex-col">
//                 <CardHeader className="items-center pb-0">
//                     <CardTitle className="text-2xl font-bold">Analytics Overview</CardTitle>
//                     <CardDescription>Revenue First Quarter</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Chart 1 */}
//                         <div className="w-full">
//                             <ChartContainer
//                                 config={chartConfig1}
//                                 className="mx-auto aspect-square max-h-[250px]"
//                             >
//                                 <PieChart>
//                                     <ChartTooltip
//                                         content={
//                                             <ChartTooltipContent
//                                                 labelKey="sex"
//                                                 nameKey="month"
//                                                 indicator="line"
//                                                 labelFormatter={(_, payload) => {
//                                                     return chartConfig1[
//                                                         payload?.[0].dataKey as keyof typeof chartConfig1
//                                                     ].label
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                     <Pie
//                                         data={maleData}
//                                         dataKey="male"
//                                         outerRadius={60}
//                                         fill="var(--color-male)"
//                                     />
//                                     <Pie
//                                         data={femaleData}
//                                         dataKey="female"
//                                         innerRadius={70}
//                                         outerRadius={90}
//                                         fill="var(--color-female)"
//                                     />
//                                 </PieChart>
//                             </ChartContainer>
//                             <div className="text-center mt-2">
//                                 <h3 className="font-semibold">Sex</h3>
//                                 <p className="text-sm text-muted-foreground">Male vs Female</p>
//                             </div>
//                         </div>
//                         {/* Second Pie Chart */}
//                         <div className="w-full">
//                             <ChartContainer
//                                 config={chartConfig2}
//                                 className="mx-auto aspect-square max-h-[250px]"
//                             >
//                                 <PieChart>
//                                     <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//                                     <Pie data={chartData2} dataKey="soluong" label nameKey="monan" />
//                                 </PieChart>
//                             </ChartContainer>
//                             <div className="text-center mt-2">
//                                 <h3 className="font-semibold">Best Seller Dish</h3>
//                                 <p className="text-sm text-muted-foreground">Most bought</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom Row with Bar Chart */}
//                     <div className=" mt-12 w-full">
//                         <ChartContainer config={chartConfig2} className="h-[300px] w-full">
//                             <BarChart
//                                 accessibilityLayer
//                                 data={chartData3}
//                                 layout="vertical"
//                                 margin={{
//                                     right: 16,
//                                     left: 16,
//                                     top: 16,
//                                     bottom: 16
//                                 }}
//                                 width={800}
//                                 height={300}
//                             >
//                                 <CartesianGrid horizontal={false} />
//                                 <YAxis
//                                     dataKey="tien"
//                                     type="category"
//                                     tickLine={false}
//                                     tickMargin={10}
//                                     axisLine={false}
//                                 />
//                                 <XAxis dataKey="soluong" type="number" />
//                                 <ChartTooltip
//                                     cursor={false}
//                                     content={<ChartTooltipContent indicator="line" />}
//                                 />
//                                 <Bar
//                                     dataKey="soluong"
//                                     fill="var(--color-desktop)"
//                                     radius={4}
//                                 >
//                                     <LabelList
//                                         dataKey="soluong"
//                                         position="right"
//                                         offset={8}
//                                         className="fill-foreground"
//                                         fontSize={12}
//                                     />
//                                 </Bar>
//                             </BarChart>
//                         </ChartContainer>
//                         <div className="text-center mt-2">
//                             <h3 className="font-semibold">Revenue Chart</h3>
//                             <p className="text-sm text-muted-foreground">1st Jan - 1st Apr</p>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
// export default MainPage
// 'use client'
// import React from "react";

// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// const page = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '<p>Hello World! 🌎️</p>',
//   })

//   return <EditorContent editor={editor} />
// };

// export default page;
const Page = () => {
  return <div>Page</div>;
};
export default Page;

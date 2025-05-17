import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsChart from "./stats-chart";

export default function Stats() {
  return (
    <div className="grow mx-auto space-y-6 p-10">
      {/* Course Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-gray-100">
          <h2 className="text-3xl font-bold">11</h2>
          <p className="text-gray-500">Courses completed</p>
        </Card>
        <Card className="p-4 text-center bg-gray-100">
          <h2 className="text-3xl font-bold">4</h2>
          <p className="text-gray-500">Courses in progress</p>
        </Card>
      </div>

      <StatsChart/>


      {/* Premium Offer */}
      <Card className="bg-gray-100 p-4 text-center">
        <h3 className="font-bold">Learn even more!</h3>
        <p className="text-gray-500 text-sm">Premium features only for <strong>$9.99</strong> per month. Available Soon.</p>
        <Button className="mt-2 cursor-pointer">Go Premium</Button>
      </Card>
    </div>
  );
}

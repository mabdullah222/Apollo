"use client"

import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weeklyData = [
  { day: "Monday", hours: 2 },
  { day: "Tuesday", hours: 3 },
  { day: "Wednesday", hours: 1 },
  { day: "Thursday", hours: 4 },
  { day: "Friday", hours: 2 },
  { day: "Saturday", hours: 5 },
  { day: "Sunday", hours: 3 },
];

const monthlyData = [
  { month: "January", hours: 40 },
  { month: "February", hours: 50 },
  { month: "March", hours: 35 },
  { month: "April", hours: 45 },
  { month: "May", hours: 60 },
  { month: "June", hours: 55 },
  { month: "July", hours: 42 },
  { month: "August", hours: 48 },
  { month: "September", hours: 52 },
  { month: "October", hours: 38 },
  { month: "November", hours: 44 },
  { month: "December", hours: 50 },
];

export default function StatsChart() {
  const [timeframe, setTimeframe] = useState(null);

  useEffect(() => {
    setTimeframe("weekly");
  }, []);

  if (!timeframe) return null;

  const data = timeframe === "weekly" ? weeklyData : monthlyData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Hours Over Time</CardTitle>
        <CardDescription>Select timeframe to view study hours</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setTimeframe} defaultValue={timeframe}>
          <SelectTrigger className="w-48 mb-4 cursor-pointer">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            <SelectItem  className="cursor-pointer" value="weekly">Weekly</SelectItem>
            <SelectItem  className="cursor-pointer" value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timeframe === "weekly" ? "day" : "month"} />
          <YAxis label={{ value: "Hours Studied", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Displaying {timeframe} study hours
      </CardFooter>
    </Card>
  );
}

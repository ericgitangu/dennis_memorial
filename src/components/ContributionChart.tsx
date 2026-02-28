"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Contribution {
  contributor_name: string | null;
  amount: number;
  status: string;
  created_at: string;
}

interface ContributionChartProps {
  contributions: Contribution[];
}

const GOLD = "#b8924a";

export function ContributionChart({ contributions }: ContributionChartProps) {
  const completed = contributions.filter((c) => c.status === "completed");

  if (completed.length === 0) {
    return null;
  }

  // Group by day
  const byDay = completed.reduce<Record<string, number>>((acc, c) => {
    const day = new Date(c.created_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    acc[day] = (acc[day] || 0) + c.amount;
    return acc;
  }, {});

  const chartData = Object.entries(byDay).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#8b92a8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#8b92a8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            formatter={(value) => [`KES ${Number(value).toLocaleString()}`, "Total"]}
            contentStyle={{
              background: "#12162a",
              border: `1px solid ${GOLD}40`,
              borderRadius: "8px",
              fontSize: "12px",
              color: "#e8ecf4",
            }}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} fill={GOLD} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

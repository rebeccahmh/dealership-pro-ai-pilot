
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface PerformanceChartProps {
  title: string;
  data: ChartData[];
  dataKey?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
}

const PerformanceChart = ({
  title,
  data,
  dataKey = "value",
  xAxisLabel,
  yAxisLabel,
  showLegend = false,
}: PerformanceChartProps) => {
  // Check if all values are zero
  const allZeros = data.every(item => item.value === 0);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        {allZeros ? (
          <div className="flex items-center justify-center h-[250px] text-gray-400">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} 
              />
              <YAxis 
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
              />
              <Tooltip />
              {showLegend && <Legend />}
              <Bar 
                dataKey={dataKey} 
                fill="#00A3FF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;

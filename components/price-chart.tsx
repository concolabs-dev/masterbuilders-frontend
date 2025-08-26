"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle ,CardFooter} from "@/components/ui/card"
import { X } from "lucide-react"

interface PricePoint {
  date: string
  price: number | null
}

interface PriceChartProps {
  itemName: string
  currency:string
  prices: PricePoint[]
  onClose: () => void
}

export function PriceChart({ itemName, prices, currency, onClose }: PriceChartProps) {
  const validPrices = prices.filter((p): p is { date: string; price: number } => p.price !== null)

  return (
    <Card className="w-full border ">
<CardHeader className="relative flex items-center justify-center pb-2">
  {/* <CardTitle className="absolute text-md ">Price History</CardTitle> */}
  <br/>
  {/* <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
    <X className="h-4 w-4" />
  </button> */}
</CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={validPrices}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ebc07fff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f79029ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                stroke="#888888"
                fontSize={12}
              />
              <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `${currency} ${value}`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-muted-foreground">Date</div>
                          <div className="text-sm font-medium">
                            {new Date(payload[0].payload.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Price</div>
                          <div className="text-sm font-medium">{currency} {payload[0].value}</div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                // type="monotone"
                dataKey="price"
                stroke="#ee774fff"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{ r: 4, stroke: "var(--primary)", strokeWidth: 2, fill: "var(--background)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="relative flex items-center justify-center pb-2">
  <CardTitle className="absolute -top-2 text-xs font-normal uppercase tracking-wider text-gray-600">Price History</CardTitle>
  <br/>
  {/* <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
    <X className="h-4 w-4" />
  </button> */}
</CardFooter>
    </Card>
  )
}


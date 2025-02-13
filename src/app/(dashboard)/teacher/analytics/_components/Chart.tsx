'use client'

import { Card } from '@/components/ui/card'
import React from 'react'
import {Bar , BarChart , ResponsiveContainer , XAxis , YAxis} from "recharts"


// type ChartsDataProps ={
//     data:{
//         name:string,
//         total:number
//     }
// }
const Chart = ({data}:{data:any}) => {
  console.log(data)
  return (
    <Card className='w-full h-[500px] flex justify-center items-center'>
        <ResponsiveContainer width="100%" height={350}>
           <BarChart data={data}>
            <XAxis dataKey={"name"} axisLine={false} tickLine={false} fontSize={12} stroke='#888888'/>
            <YAxis stroke='#888888' axisLine={false} tickLine={false} fontSize={11} tickFormatter={(value)=>`$${value}`}/>
            <Bar dataKey={"total"} fill='#0369a1' radius={[4 , 4 , 0 , 0]}/>
           </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart

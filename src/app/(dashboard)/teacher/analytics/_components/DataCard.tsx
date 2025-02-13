import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'



interface DataCardProps {
    value:number,
    label:string
}
const DataCard = ({value , label}:DataCardProps) => {
  return (
   <Card className='w-1/2'>

    <CardHeader><CardTitle className='text-2xl'>{label}</CardTitle></CardHeader>
    <CardContent>
        <CardDescription className='text-xl'>{value}</CardDescription>
    </CardContent>
   </Card>
  )
}

export default DataCard

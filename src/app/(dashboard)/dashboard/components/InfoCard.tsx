import { Card } from '@/components/ui/card'
import { Clock, LucideIcon } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons'


interface IconCardProps {
    icon:LucideIcon,
    label:string,
    noOfItem:number
}




const InfoCard = ({icon:Icon , label , noOfItem}:IconCardProps) => {
  return (
    <Card className=' shadow-sm text-black lg:w-1/2 mt-10 p-4 '>
        <div className='flex gap-x-5 items-center '><Icon className={`text-black text-4xl rounded-full shadow-md${Icon===Clock?  "bg-blue-200 ":"text-green-600"}`}/> <p className='text-3xl font-semibold'> {label} {noOfItem} Courses</p></div>
      
    </Card>
  )
}

export default InfoCard

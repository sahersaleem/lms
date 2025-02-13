"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";

interface PriceButtonProps {
  price: number;
  courseId: string;
}
const PriceButton = ({ price, courseId }: PriceButtonProps) => {
  const onClick = async () => {
    try {
      const response :{data:{url:any}}= await axios.post(`/api/create/${courseId}/checkout`);
      window.location=response?.data?.url
      
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={onClick}>Enroll in ${price}</Button>;
};

export default PriceButton;

"use client";

import { Category } from "@prisma/client";
import React from "react";
import {
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItems from "./CategoryItem";

interface CategoriesProps {
  item: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
 "Music": FcMusic,
  "Accounting": FcOldTimeCamera,
  "maths": FcSalesPerformance,
  'bachelor': FcSportsMode,
  "software engineering":FcFilmReel
};

const Categories = ({ item }: CategoriesProps) => {
    console.log(item)
  return (
    <div className="w-full flex justify-evenly items-center p-4 overflow-y-auto">
      {item.map((i) => (
        <CategoryItems label={i.id} value={i.name} icon={iconMap[i.name]} key={i.id}/>
      ))}
    </div>
  );
};

export default Categories;

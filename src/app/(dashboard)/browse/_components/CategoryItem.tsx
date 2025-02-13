"use client";

import React from "react";
import { IconType } from "react-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  value: string;
  label: string;
  icon?: IconType;
}

const CategoryItems = ({ value, label, icon: Icon }: CategoryItemProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === label;

  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : label,
      },
    },{skipNull:true , skipEmptyString:true});

    router.push(url)
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={ cn(" bg-white px-4 py-2 flex  gap-x-2 shadow-sm hover:border-black border-2 " ,isSelected && "bg-blue-200 border-blue-500" )}
    >
      {Icon && (
        <div>
          <Icon size={20} />
        </div>
      )}
      <span className="truncate">{value}</span>
    </button>
  );
};

export default CategoryItems;

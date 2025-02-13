"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { usedebounce } from "@/hooks/use-debounce";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Input = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter()
  const [value, setValue] = useState<string>("");
  const debouncedValue = usedebounce(value);

  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        categoryId,
        title: debouncedValue,
      },
    },{skipEmptyString:true,skipNull:true});

    router.push(url)
  }, [value, debouncedValue , router , pathName]);
 
  return <div className="text-black bg-slate-100 xs:px-2 lg:px-4 lg:py-2 rounded-xl flex items-center gap-x-4 xs:order-2 lg:order-1"><FaSearch/><input placeholder="search course" value={value} onChange={(e)=>setValue(e.target.value)} className="px-4 py-2 rounded-xl bg-slate-100 focus:outline-none"/></div>;
};

export default Input;

import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const IconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ variant, label }: BannerProps) => {
  const Icon = IconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }) , "flex justify-center items-center") }>
      <Icon className="lg:h-4 lg:w-4 lg:mr-2 xs:text-xs lg:text-lg" />
     <p className="xs:text-xs lg:tex-lg">{label}</p> 
    </div>
  );
};

export default Banner;

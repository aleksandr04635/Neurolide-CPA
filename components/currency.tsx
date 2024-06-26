"use client";

import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="font-semibold h-[28px]">{""}</div>;
  }

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;

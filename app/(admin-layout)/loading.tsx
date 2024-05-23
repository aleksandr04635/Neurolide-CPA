"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center pt-10">
      <Loader />
    </div>
  );
};

export default Loading;

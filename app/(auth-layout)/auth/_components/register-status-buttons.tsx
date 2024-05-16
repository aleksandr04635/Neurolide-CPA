"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface RegisterStatusButtonsProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
}

const RegisterStatusButtons: React.FC<RegisterStatusButtonsProps> = ({
  disabled,
  onChange,
  value,
}) => {
  /*   console.log("value from RegisterStatusButtons", value);
  console.log("value==='BRAND' from RegisterStatusButtons", value === "BRAND");
  console.log(
    "value==='AFFILIATE' from RegisterStatusButtons",
    value === "AFFILIATE"
  ); */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-row items-center justify-between gap-2">
      <Button
        size="sm"
        type="button"
        disabled={disabled}
        className={
          " w-full " +
          (value === "AFFILIATE" ? " main-button " : " gray-button ")
        }
        onClick={() => onChange("AFFILIATE")}
      >
        Афіліат
      </Button>
      <Button
        size="sm"
        type="button"
        disabled={disabled}
        className={
          "w-full " + (value === "BRAND" ? " main-button " : " gray-button ")
        }
        onClick={() => onChange("BRAND")}
      >
        Бренд
      </Button>
      {/* <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div
              onClick={onClick}
              className="cursor-pointer relative w-[100px] h-[100px] rounded-full overflow-hidden"
            >
              <Image fill className="object-cover" alt="Image" src={value} />
            </div>
           
          );
        }}
      </CldUploadWidget> */}
    </div>
  );
};

export default RegisterStatusButtons;

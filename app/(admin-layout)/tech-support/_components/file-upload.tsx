"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface FileUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const FrontImageUpload: React.FC<FileUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  console.log("value from FrontImageUpload", value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  /*   console.log(
    "process.env.NEXT_PUBLIC_UPLOAD_PRESET",
    process.env.NEXT_PUBLIC_UPLOAD_PRESET
  );
  console.log("process.env.UPLOAD_PRESET", process.env.UPLOAD_PRESET); */

  return (
    <div>
      {/*  <div className="mb-4 flex items-center gap-4">
        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
          <Image fill className="object-cover" alt="Image" src={value} />
        </div>
      </div> */}
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            /* <div
              onClick={onClick}
              className="cursor-pointer relative w-[100px] h-[100px] rounded-full overflow-hidden"
            >
              <Image fill className="object-cover" alt="Image" src={value} />
            </div> */
            /*  <Button
              size="sm"
              type="button"
              onClick={onClose}
              className=" gray-button w-full !rounded-full "
            ></Button> */
            <div className="flex flex-row w-fit gap-2">
              <Button
                size="sm"
                type="button"
                disabled={disabled}
                /* variant="secondary" */
                onClick={onClick}
                className=" gray-button w-full !rounded-full "
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Додати файл
              </Button>
              {value && <div>{value}</div>}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FrontImageUpload;

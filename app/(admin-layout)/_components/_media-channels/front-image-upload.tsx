"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
/* import * from "./all"; */
import Script from "next/script";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { DEFAULT_MEDIA_CHANNEL_IMAGE } from "@/lib/utils";

//new
//import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;

  setOpen: (value: boolean) => void;
  imageUploaderIsOpen: boolean;
  setImageUploaderIsOpen: (value: boolean) => void;
}

const FrontImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,

  setOpen,
  imageUploaderIsOpen,
  setImageUploaderIsOpen,
}) => {
  const [openL, setOpenL] = useState(false);
  console.log("openL: ", openL);
  console.log("imageUploaderIsOpen: ", imageUploaderIsOpen);

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
    <div className="w-full flex flex-col items-center justify-center">
      {/* <div id="inline_container"></div>
      <div id="thumbnails"></div>
      <div id={"my-widget-container"}></div> */}

      {/*  <div className="mb-4 flex items-center gap-4">
        <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
          <Image fill className="object-cover" alt="Image" src={value} />
        </div>
      </div> */}
      {/* <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      ></CldUploadButton> */}

      <CldUploadWidget
        options={{
          //autoMinimize: true,
          inlineContainer: "#lewidget",
          //sources: ["local", "url", "camera"],
          //inlineContainer: document.getElementById("my-widget-container"),
        }}
        //onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
        //new:
        onClose={(result, { widget }) => {
          widget.close();
          setOpen(true);
          setImageUploaderIsOpen(false);
        }}
        onSuccess={(result, options) => {
          console.log("result from CldUploadWidget: ", result);
          onUpload(result);
        }}
        /* inlineContainer={document.getElementById("my-widget-container")} */
        //autoMinimize={true}
      >
        {({ cloudinary, widget, open, results, error }) => {
          const onClick = () => {
            setOpenL(!openL);
            open();
            //new
            //widget?.open();

            setImageUploaderIsOpen(!imageUploaderIsOpen);

            //new
            //setOpen(false);
          };

          return (
            <div
              onClick={onClick}
              className="cursor-pointer relative w-[100px] h-[100px] rounded-full overflow-hidden"
            >
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={value || DEFAULT_MEDIA_CHANNEL_IMAGE}
              />
            </div>
            /* <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button> */
          );
        }}
      </CldUploadWidget>
      <div
        id="lewidget"
        className={
          "max-h-[300px]  h-[300px] overflow-auto w-full  flex-row items-center justify-center " +
          (!imageUploaderIsOpen ? " hidden " : " flex ")
        }
      >
        {/* Le widget (container) */}
      </div>
      {/* <Script
        id="cloudinary"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
    </div>
  );
};

export default FrontImageUpload;

/* import { useRef } from 'react';
import Script from "next/script";

const UploadWidget = ({ children, onUpload }) => {
  const cloudinary = useRef();
  const widget = useRef();

  function createWidget() {
    const options = {
      cloudName: '<Your Cloud Name>',
      uploadPreset: '<Your Upload Preset>'
    }

    return cloudinary.current?.createUploadWidget(options,
      function (error, result) {
        if ( error || result.event === 'success' ) {
          onUpload(error, result);
        }
      }
    );
  }

  function open() {
    if ( !widget?.current ) {
      widget.current = createWidget();
    }

    widget?.current && widget.current.open();
  }

  function handleOnLoad() {
    cloudinary.current = window.cloudinary;
  }

  return (
    <>
      {children({ open })}
      <Script id="cloudinary" src="https://widget.cloudinary.com/v2.0/global/all.js" onLoad={handleOnLoad} />
    </>
  )
} */

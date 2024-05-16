"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import MyButton from "./my-button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Ви впевнені?"
      description="Ця дія не може бути відмінена."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          size="sm"
          disabled={loading}
          onClick={onClose}
          className=" main-button        "
        >
          Відмінити
        </Button>
        <Button
          size="sm"
          type="button"
          disabled={loading}
          onClick={onConfirm}
          className=" danger-button       "
        >
          Продовжити
        </Button>
        {/*  <MyButton className=" " disabled={loading} onClick={onClose}>
          Cancel
        </MyButton>
        <MyButton
          className=""
          disabled={loading}
          style="danger"
          onClick={onConfirm}
        >
          Continue
        </MyButton> */}
      </div>
    </Modal>
  );
};

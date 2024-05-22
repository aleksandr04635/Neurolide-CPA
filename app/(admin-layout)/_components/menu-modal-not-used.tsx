"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog-menu";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange} /*  modal={!imageUploaderIsOpen} */
    >
      <DialogContent>
        {/*   <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader> */}
        Menu
      </DialogContent>
    </Dialog>
    /*   <Modal
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
        
      </div>
    </Modal> */
  );
};

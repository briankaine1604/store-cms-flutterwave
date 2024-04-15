"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const AlertModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Are you sure ?"
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 justify-end space-x-2 w-full flex items-center">
          <Button variant={"outline"} disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

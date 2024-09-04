import React from "react";
import { MdClose } from "react-icons/md";

interface OverlayCardProps {
  setShowModal: (bool: boolean) => void;
  customClass?: string;
  children: React.ReactNode;
  removecloser?: boolean;
}

const OverlayCard = ({
  children,
  customClass,
  setShowModal,
  removecloser = false,
}: OverlayCardProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-90 p-4 flex justify-center items-center `}
      >
        <div
          className={`relative h-full flex justify-center items-start pt-20 ${customClass}`}
        >
          {!removecloser && (
            <MdClose
              className="text-orange-800 text-2xl cursor-pointer absolute top-4 right-4"
              onClick={() => setShowModal(false)}
            />
          )}

          <>{children}</>
        </div>
      </div>
    </>
  );
};

export default OverlayCard;

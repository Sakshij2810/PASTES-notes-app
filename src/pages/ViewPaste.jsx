import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const currentPaste = pastes && pastes.filter((p) => p._id === id);

  const contentRef = useRef(null);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(contentRef.current.value)
      .then(() => {
        toast.success("Content Copied to Clipboard");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="px-15 py-15 ">
      <div className="flex items-center justify-between gap-20">
        <input
          className="bg-[#353535] w-[50%] rounded-[1rem] px-4 py-4"
          type="text"
          disabled
          placeholder="Enter Title here"
          value={currentPaste[0]?.title}
        />
        <button
          onClick={handleCopyClick}
          className="w-[30%] bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
        >
          Copy Paste
        </button>
      </div>
      <br />
      <br />
      <div className=" flex items-center justify-center">
        <textarea
          ref={contentRef}
          value={currentPaste[0]?.content}
          disabled
          className="w-full min-h-[20rem] h-full bg-[#353535] rounded-[1rem] px-4 py-4"
          placeholder="Enter content Here"
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;

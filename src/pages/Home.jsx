import React, { useEffect, useState } from "react";
import { addToPastes, updateToPastes } from "../features/Paste/PasteSlice.js";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const allPastes = useSelector((state) => state.paste.pastes);

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const handleCreatePaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update paste
      dispatch(updateToPastes(paste));
    } else {
      //create paste
      dispatch(addToPastes(paste));
    }

    //cleanup
    setSearchParams({});
    setTitle("");
    setValue("");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPastes]);

  return (
    <div className="px-15 py-15 ">
      <div className="flex items-center justify-between gap-20">
        <input
          className="bg-[#353535] w-[50%] rounded-[1rem] px-4 py-4"
          type="text"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleCreatePaste}
          className="w-[30%] bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <br />
      <br />
      <div className=" flex items-center justify-center">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full min-h-[20rem] h-full bg-[#353535] rounded-[1rem] px-4 py-4"
          placeholder="Enter content Here"
        ></textarea>
      </div>
    </div>
  );
};

export default Home;

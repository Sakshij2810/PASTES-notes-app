import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromPastes,
  resetAllPastes,
} from "../features/Paste/pasteSlice.js";

const Paste = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchVal, setSearchVal] = useState("");

  const filteredPastes = pastes.filter((p) =>
    p.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleRedirect = (paste) => {
    navigate(`/pastes/${paste._id}`);
  };

  const handleCopyClick = (paste) => {
    navigator.clipboard
      .writeText(paste?.content)
      .then(() => {
        toast.success("Content Copied to Clipboard");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleDeleteClick = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleResetClick = () => {
    dispatch(resetAllPastes());
  };

  const handleShareClick = (pasteId) => {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    console.log(shareableLink);

    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast.success("Link Copied Successfully");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-10 mx-4 mt-15">
        <input
          className="border rounded-[1rem] border-[#353535] px-4 py-4  bg-[#353535] w-[55%] "
          type="search"
          placeholder="Search Pastes here"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button
          className="border rounded-[1rem] border-[#353535] px-4 py-4  "
          onClick={handleResetClick}
        >
          Reset All Pastes
        </button>
      </div>

      <ul>
        {filteredPastes.length > 0 &&
          filteredPastes.map((paste) => {
            return (
              <li
                className="border rounded-[1rem] border-[#353535] px-4 py-4 my-4 mx-4 flex items-center justify-between"
                key={paste?._id}
              >
                <div>
                  <h2>Title: {paste?.title}</h2>
                  <p>Content: {paste?.content}</p>
                </div>
                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => handleRedirect(paste)}
                    className=" bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
                  >
                    View
                  </button>
                  <button className=" bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer">
                    <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => handleCopyClick(paste)}
                    className=" bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleShareClick(paste?._id)}
                    className=" bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => handleDeleteClick(paste?._id)}
                    className=" bg-[#353535] rounded-[1rem] px-4 py-4 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Paste;

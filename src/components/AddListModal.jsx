import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { listColors } from "@assets/listColors";
import { getDisplayColors } from "@utils/getDisplayColors";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiGrin } from "react-icons/bs";
import { IoListSharp } from "react-icons/io5";

export const AddListModal = ({
  reminderLists,
  setIsAddListModalOpen,
  setReminderLists,
}) => {
  const [newList, setNewList] = useState({
    color: "red",
    icon: undefined,
    name: "",
  });
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutsideEmojiPicker = (event) => {
      if (
        isEmojiPickerOpen &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideEmojiPicker);

    return () => {
      document.removeEventListener("click", handleClickOutsideEmojiPicker);
    };
  }, [isEmojiPickerOpen]);

  const handleClickEmojiPicker = (event) => {
    event.stopPropagation();
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleSelectEmoji = (emojiObject) => {
    setNewList({ ...newList, icon: emojiObject.emoji });
    setIsEmojiPickerOpen(false);
  };

  const handleClickIconReset = (event) => {
    event.stopPropagation();
    setNewList({ ...newList, icon: undefined });
  };

  const handleSubmitAddListForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const listIcon = formData.get("icon");
    if (!listIcon) {
      formData.set("icon", "");
    }

    const newListData = Object.fromEntries(formData);

    const lastListId = reminderLists.reduce(
      (max, list) => (list.id > max ? list.id : max),
      0,
    );

    const updatedReminderLists = [
      ...reminderLists,
      {
        color: newListData.color,
        icon: newListData.icon,
        id: lastListId + 1,
        name: newListData.name,
        reminders: [],
        type: newListData.type,
      },
    ];

    setReminderLists(updatedReminderLists);
    setIsAddListModalOpen(false);
  };

  const { bgColorLight, bgColorStandard } = getDisplayColors(newList.color);

  return createPortal(
    <dialog className="fixed inset-0 flex size-full items-center justify-center bg-gray-400 bg-opacity-50">
      <form
        className="flex h-64 w-auto flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 shadow-md"
        method="dialog"
        onSubmit={handleSubmitAddListForm}
      >
        <div className="flex flex-row  rounded bg-gray-200">
          <div className="flex w-36 items-center justify-center rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow">
            New list
          </div>
          <div className="flex w-36 items-center justify-center rounded text-sm">
            Models
          </div>
        </div>
        <div className="flex w-full flex-row justify-center gap-2">
          <label className="text-sm" htmlFor="list-name">
            Name:
          </label>
          <input
            className="h-5 w-96 border border-solid border-gray-300 bg-white p-1 shadow-sm"
            id="list-name"
            name="name"
            onChange={(event) =>
              setNewList({ ...newList, name: event.target.value })
            }
            ref={firstInputRef}
            type="text"
            value={newList.name}
          />
        </div>

        <div className="flex w-full flex-row justify-between gap-2 border-b border-solid border-gray-200 pb-4">
          <div className="flex w-56 flex-row justify-start gap-2 border-r border-solid border-gray-200 pr-8">
            <label className="text-sm" htmlFor="list-color">
              Color:
            </label>
            <div className="flex flex-row flex-wrap justify-start gap-2">
              {listColors.map((color, index) => (
                <div
                  className="relative flex items-center"
                  key={`list-${color.name}`}
                >
                  <input
                    className={`peer h-4 w-4 appearance-none rounded-full ${color.bgColors.standard}`}
                    defaultChecked={index === 0}
                    id="list-color"
                    name="color"
                    onChange={() =>
                      setNewList({ ...newList, color: color.name })
                    }
                    type="radio"
                    value={color.name}
                  />
                  <span className="pointer-events-none absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></span>
                </div>
              ))}
            </div>
          </div>

          <div className=" flex flex-row flex-wrap justify-start gap-5">
            <label className="text-sm" htmlFor="list-icon">
              Icon:
            </label>
            {newList.icon ? (
              <input
                className={` h-11 w-11 cursor-pointer appearance-none rounded-full ${bgColorLight} pl-3 text-sm`}
                id="list-icon"
                name="icon"
                onClick={handleClickEmojiPicker}
                readOnly
                value={newList.icon}
              />
            ) : (
              <div
                className={`flex h-11 w-11 cursor-pointer appearance-none items-center justify-center rounded-full ${bgColorLight} text-sm`}
              >
                <BsEmojiGrin
                  className=" h-6 w-6  text-gray-500"
                  onClick={handleClickEmojiPicker}
                />
              </div>
            )}

            <div className="absolute top-12 z-10" ref={emojiPickerRef}>
              <EmojiPicker
                height={500}
                onEmojiClick={handleSelectEmoji}
                open={isEmojiPickerOpen}
                previewConfig={{
                  showPreview: false,
                }}
                width={400}
              />
            </div>

            <div
              className={`flex h-11 w-11 cursor-pointer appearance-none items-center justify-center rounded-full ${bgColorStandard} text-sm`}
            >
              <IoListSharp
                className="h-6 w-6 text-white"
                onClick={handleClickIconReset}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row flex-wrap justify-start gap-2 border-b border-solid border-gray-200 pb-4">
          <label className="text-sm" htmlFor="list-type">
            Type of list:
          </label>
          <select
            className="rounded border border-solid border-gray-300 bg-white pr-10 text-sm shadow-sm"
            id="list-type"
            name="type"
          >
            <option value="standard">Standard</option>
            <option value="shopping">Shopping</option>
            <option value="smart">Smart</option>
          </select>
        </div>
        <div className="flex w-full flex-row justify-end gap-3">
          <button
            className="w-20 rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow"
            onClick={() => setIsAddListModalOpen(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-16 rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow disabled:opacity-30"
            disabled={!newList.name}
            type="submit"
          >
            OK
          </button>
        </div>
      </form>
    </dialog>,
    document.querySelector("#root"),
  );
};

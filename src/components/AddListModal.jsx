import { listColors } from "@assets/listColors";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsEmojiGrin } from "react-icons/bs";
import { IoListSharp } from "react-icons/io5";

export const AddListModal = ({
  setIsAddListModalOpen,
  reminderLists,
  setReminderLists,
}) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenListName, setChosenListName] = useState("");
  const [chosenListEmoji, setChosenListEmoji] = useState(undefined);
  const [chosenListColor, setChosenListColor] = useState("red");
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

  const handleChangeName = (event) => {
    setChosenListName(event.target.value);
  };

  const handleEmojiPickerClick = (event) => {
    event.stopPropagation();
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiSelect = (emojiObject) => {
    setChosenListEmoji(emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    setChosenListEmoji(undefined);
  };

  const getDisplayColors = (listColors) => {
    const color = listColors.find((color) => color.name === chosenListColor);
    return {
      standardColorDisplay: color.properties.standardColorDisplay,
      lightColorDisplay: color.properties.lightColorDisplay,
    };
  };

  const { standardColorDisplay, lightColorDisplay } =
    getDisplayColors(listColors);

  const handleSubmitAddListForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const listIcon = formData.get("list-icon");
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
        id: lastListId + 1,
        name: newListData.name,
        color: newListData.color,
        icon: newListData.icon,
        type: newListData.type,
        reminders: [],
      },
    ];

    setReminderLists(updatedReminderLists);
    setIsAddListModalOpen(false);
  };

  return createPortal(
    <dialog className="fixed inset-0 flex size-full items-center justify-center bg-gray-400 bg-opacity-50">
      <form
        method="dialog"
        onSubmit={handleSubmitAddListForm}
        className="flex h-64 w-auto flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 shadow-md"
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
          <label htmlFor="list-name" className="text-sm">
            Name:{" "}
          </label>
          <input
            ref={firstInputRef}
            type="text"
            id="list-name"
            name="name"
            className="h-5 w-96 border border-solid border-gray-300 bg-white p-1 shadow-sm"
            value={chosenListName}
            onChange={handleChangeName}
          />
        </div>

        <div className="flex w-full flex-row justify-between gap-2 border-b border-solid border-gray-200 pb-4">
          <div className="flex w-56 flex-row justify-start gap-2 border-r border-solid border-gray-200 pr-8">
            <legend className="text-sm">Color:</legend>
            <div className="flex flex-row flex-wrap justify-start gap-2">
              {listColors.map((color, index) => (
                <label
                  key={`list-${color.name}`}
                  htmlFor={color.name}
                  className="relative inline-flex items-center"
                >
                  <input
                    type="radio"
                    id={`list-${color.name}`}
                    name="color"
                    value={color.name}
                    className={`peer h-4 w-4 appearance-none rounded-full ${color.properties.standardColorDisplay}`}
                    defaultChecked={index === 0}
                    onChange={() => setChosenListColor(color.name)}
                  />
                  <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></span>
                </label>
              ))}
            </div>
          </div>

          <div className="relative flex flex-row flex-wrap justify-start gap-5">
            <label htmlFor="list-icon" className="text-sm">
              Icon:
            </label>
            {chosenListEmoji ? (
              <input
                id="list-icon"
                name="icon"
                className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${lightColorDisplay} pl-3 text-sm`}
                value={chosenListEmoji}
                onClick={handleEmojiPickerClick}
                readOnly
              />
            ) : (
              <div
                className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${lightColorDisplay} pl-3 text-sm`}
              >
                <BsEmojiGrin
                  className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform text-gray-500"
                  onClick={handleEmojiPickerClick}
                />
              </div>
            )}

            <div className="absolute top-12 z-10" ref={emojiPickerRef}>
              <EmojiPicker
                open={isEmojiPickerOpen}
                onEmojiClick={handleEmojiSelect}
                height={500}
                width={400}
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>

            <div
              className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${standardColorDisplay} pl-3 text-sm`}
            >
              <IoListSharp
                className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform text-white"
                onClick={handleIconClick}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row flex-wrap justify-start gap-2 border-b border-solid border-gray-200 pb-4">
          <label htmlFor="list-type" className="text-sm">
            Type of list:
          </label>
          <select
            id="list-type"
            name="type"
            className="rounded border border-solid border-gray-300 bg-white pr-10 text-sm shadow-sm"
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
            disabled={!chosenListName}
            className="w-16 rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow disabled:opacity-30"
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

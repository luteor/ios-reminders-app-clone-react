import { listColors } from "@assets/listColors";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiGrin } from "react-icons/bs";
import { IoListSharp } from "react-icons/io5";

export const AddListModal = () => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(undefined);
  const [chosenColor, setChosenColor] = useState("red");

  const handleEmojiSelect = (emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  const getColorDisplayLight = (listColors) => {
    const color = listColors.find((color) => color.name === chosenColor);
    return {
      colorDisplay: color.properties.colorDisplay,
      colorDisplayLight: color.properties.colorDisplayLight,
    };
  };

  const { colorDisplay, colorDisplayLight } = getColorDisplayLight(listColors);

  return (
    <dialog
      open
      className="fixed inset-0 flex size-full items-center justify-center bg-gray-400 bg-opacity-50"
    >
      <form
        method="dialog"
        className="  flex h-64 w-auto flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 shadow-md"
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
            type="text"
            id="list-name"
            name="list-name"
            className="h-5 w-96 border border-solid border-gray-300 bg-white shadow-sm"
          />
        </div>

        <div className="flex w-full flex-row justify-between gap-2 border-b border-solid border-gray-200 pb-4">
          <div className="flex w-56 flex-row justify-start gap-2 border-r border-solid border-gray-200 pr-8">
            <legend className="text-sm">Color:</legend>
            <div className="flex flex-row flex-wrap justify-start gap-2">
              {listColors.map((color, index) => (
                <label
                  key={color.name}
                  htmlFor={color.name}
                  className="relative inline-flex items-center"
                >
                  <input
                    type="radio"
                    id={color.name}
                    name="list-color"
                    value={color.name}
                    className={`peer h-4 w-4 appearance-none rounded-full ${color.properties.colorDisplay}`}
                    defaultChecked={index === 0}
                    onChange={() => setChosenColor(color.name)}
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
            {chosenEmoji ? (
              <input
                name="list-icon"
                id="list-icon"
                className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${colorDisplayLight} pl-3 text-sm`}
                value={chosenEmoji}
                onClick={() => setIsEmojiPickerOpen(true)}
                readOnly
              />
            ) : (
              <div
                className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${colorDisplayLight} pl-3 text-sm`}
              >
                <BsEmojiGrin
                  className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 transform text-gray-500"
                  onClick={() => setIsEmojiPickerOpen(true)}
                />
              </div>
            )}

            <div className="absolute top-12 z-10 ">
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
              className={`relative h-11 w-11 cursor-pointer appearance-none rounded-full ${colorDisplay} pl-3 text-sm`}
            >
              <IoListSharp
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform text-white"
                onClick={() => setChosenEmoji(undefined)}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row flex-wrap justify-start gap-2 border-b border-solid border-gray-200 pb-4">
          <label htmlFor="list-type" className="text-sm">
            Type of list:
          </label>
          <select
            name="list-type"
            id="list-type"
            className="rounded border border-solid border-gray-300 bg-white pr-10 text-sm shadow-sm"
          >
            <option value="standard">Standard</option>
            <option value="shopping">Shopping</option>
            <option value="smart">Smart</option>
          </select>
        </div>
        <div className="flex w-full flex-row justify-end gap-3">
          <button className="w-20 rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow">
            Cancel
          </button>
          <button
            disabled
            className="w-16 rounded border border-solid border-gray-300 bg-gray-50 text-sm shadow disabled:opacity-30"
            type="submit"
          >
            OK
          </button>
        </div>
      </form>
    </dialog>
  );
};

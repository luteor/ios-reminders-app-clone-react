export const AddListModal = () => {
  const listColors = [
    {
      name: "red",
      properties: {
        colorDisplay: "bg-red-500",
      },
    },
    {
      name: "orange",
      properties: {
        colorDisplay: "bg-orange-500",
      },
    },
    {
      name: "yellow",
      properties: {
        colorDisplay: "bg-yellow-500",
      },
    },
    {
      name: "green",
      properties: {
        colorDisplay: "bg-green-500",
      },
    },
    {
      name: "cyan",
      properties: {
        colorDisplay: "bg-cyan-500",
      },
    },
    {
      name: "blue",
      properties: {
        colorDisplay: "bg-blue-500",
      },
    },
    {
      name: "violet",
      properties: {
        colorDisplay: "bg-violet-500",
      },
    },
    {
      name: "rose",
      properties: {
        colorDisplay: "bg-rose-500",
      },
    },
    {
      name: "fuchsia",
      properties: {
        colorDisplay: "bg-fuchsia-500",
      },
    },
    {
      name: "stone",
      properties: {
        colorDisplay: "bg-stone-500",
      },
    },
    {
      name: "gray",
      properties: {
        colorDisplay: "bg-gray-500",
      },
    },
    {
      name: "pink",
      properties: {
        colorDisplay: "bg-pink-500",
      },
    },
  ];

  return (
    <dialog
      open
      className="fixed inset-0 flex size-full items-center justify-center bg-gray-400 bg-opacity-50"
    >
      <form
        method="dialog"
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
                  />
                  <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-start gap-5">
            <label htmlFor="list-icon" className="text-sm">
              Icon:
            </label>
            <select
              name="list-icon"
              id="list-icon"
              className="h-11 w-11 appearance-none rounded-full bg-red-200 pl-3 text-sm"
            >
              <option value="🛒">🛒</option>
              <option value="💼">💼</option>
              <option value="📚">📚</option>
              <option value="💰">💰</option>
              <option value="🩺">🩺</option>
              <option value="🚗">🚗</option>
              <option value="🏠">🏠</option>
              <option value="🏖️">🏖️</option>
            </select>
            <select
              name="list-icon"
              id="list-icon"
              className="h-11 w-11 appearance-none rounded-full bg-red-200 pl-3 text-sm"
            >
              <option value="🛒">🛒</option>
              <option value="💼">💼</option>
              <option value="📚">📚</option>
              <option value="💰">💰</option>
              <option value="🩺">🩺</option>
              <option value="🚗">🚗</option>
              <option value="🏠">🏠</option>
              <option value="🏖️">🏖️</option>
            </select>
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

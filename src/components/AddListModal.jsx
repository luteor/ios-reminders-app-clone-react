export const AddListModal = () => {
  const listColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "violet",
    "rose",
    "fuchsia",
    "stone",
    "gray",
    "pink",
  ];
  return (
    <dialog
      open
      className="fixed inset-0 flex size-full items-center justify-center bg-gray-50 bg-opacity-50"
    >
      <form
        method="dialog"
        className="flex h-auto w-96 flex-col items-center justify-between gap-4 rounded-lg bg-gray-200 p-4"
      >
        <div className="flex flex-row rounded border border-solid border-gray-400">
          <div className="rounded bg-gray-400 px-10 text-sm">New list</div>
          <div className="rounded bg-gray-300 px-10 text-sm">Models</div>
        </div>
        <div className="flex w-full flex-row justify-center gap-2">
          <label htmlFor="list-name" className="text-sm">
            Name:{" "}
          </label>
          <input
            type="text"
            id="list-name"
            name="list-name"
            className="w-full"
          />
        </div>

        <div className="flex w-full flex-row items-start justify-start gap-2 border-b border-solid border-gray-400 pb-4">
          <div className="flex w-7/12 flex-row justify-start gap-2">
            <legend className="text-sm">Color:</legend>
            <div className="flex flex-row flex-wrap justify-start gap-2">
              {listColors.map((color, index) => (
                <label
                  key={color}
                  htmlFor={color}
                  className="relative inline-flex items-center"
                >
                  <input
                    type="radio"
                    id={color}
                    name="list-color"
                    value={color}
                    className={`peer h-4 w-4 appearance-none rounded-full bg-${color}-500`}
                    defaultChecked={index === 0}
                  />
                  <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-start gap-2">
            <label htmlFor="list-icon" className="text-sm">
              Icon:
            </label>
            <select
              name="list-icon"
              id="list-icon"
              className="h-10 w-10 rounded-full text-sm"
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

        <div className="flex w-full flex-row flex-wrap justify-start gap-2 border-b border-solid border-gray-400 pb-4">
          <label htmlFor="list-type" className="text-sm">
            Type of list:
          </label>
          <select name="list-type" id="list-type" className="text-sm">
            <option value="standard">Standard</option>
            <option value="shopping">Shopping</option>
            <option value="smart">Smart</option>
          </select>
        </div>
        <div className="flex w-full flex-row justify-end gap-4">
          <button className="rounded bg-gray-400 px-3 text-sm">Cancel</button>
          <button className="rounded bg-gray-400 px-3 text-sm" type="submit">
            OK
          </button>
        </div>
      </form>
    </dialog>
  );
};

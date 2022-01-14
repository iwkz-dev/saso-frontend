function MenuForm({ id }) {
  return (
    <div className="w-10/12">
      <form>
        <h2 className="text-2xl font-bold">
          Menu number
          {id}
        </h2>
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Full name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">When is your event?</span>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">What type of event is it?</span>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Corporate event</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Additional details</span>
              <textarea
                className=" mt-1 block w-full rounded-md  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              />
            </label>
            <div className="block">
              <div className="mt-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className=" rounded order-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2">
                      Email me news and special offers
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-4">
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
          <button
            type="button"
            className="group relative flex justify-center mx-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuForm;

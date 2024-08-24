/* eslint-disable react/prop-types */

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
      <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Delete {resourceName}
        </h3>
        <p className="text-gray-500">
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>
  
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-200"
            onClick={onCloseModal}
            disabled={disabled}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-400"
            onClick={onConfirm}
            disabled={disabled}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default ConfirmDelete;
  
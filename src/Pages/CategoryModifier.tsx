import React, { useReducer } from 'react';

interface Category {
  id: string;
  category_name: string;
  category_description: string;
  is_active: boolean;
}

interface Props {
  category: Category;
  onUpdate: (updatedCategory: Category) => void;
}

const reducer = (state: Category, action: Partial<Category>) => {
  return { ...state, ...action };
};

const CategoryModifier: React.FC<Props> = ({ category, onUpdate }) => {
  const [updatedCategory, dispatch] = useReducer(reducer, category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ [name]: name === 'is_active' ? value === 'true' : value });
  };

  const handleSave = () => {
    onUpdate(updatedCategory);
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Edit Category</h3>
      <div className="flex flex-col sm:flex-row">
        <label className="mr-2">
          <span className="block mb-1">ID:</span>
          <input
            type="text"
            name="id"
            value={updatedCategory.id}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
            readOnly // Make the ID field read-only if needed
          />
        </label>
        <label className="mr-2">
          <span className="block mb-1">Category Name:</span>
          <input
            type="text"
            name="category_name"
            value={updatedCategory.category_name}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
          />
        </label>
        <label className="mr-2">
          <span className="block mb-1">Category Description:</span>
          <input
            type="text"
            name="category_description"
            value={updatedCategory.category_description}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
          />
        </label>
        <label className="mr-2">
          <span className="block mb-1">Is Active:</span>
          <select
            name="is_active"
            value={updatedCategory.is_active.toString()} // Convert boolean to string
            onChange={handleChange}
            className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
          >
            <option key="true" value="true">True</option>
            <option key="false" value="false">False</option>
          </select>
        </label>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CategoryModifier;

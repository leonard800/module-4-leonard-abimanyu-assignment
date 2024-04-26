import React, { useState, useEffect } from 'react';
import CategoryModifier from './CategoryModifier';

const CategoryPage: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loggedOut, setLoggedOut] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState<any>({
    category_name: '',
    category_description: '',
    is_active: true
  });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setLoggedOut(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch('https://library-crud-sample.vercel.app/api/user/profile', options);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch('https://library-crud-sample.vercel.app/api/category', options);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCategory)
      };

      const response = await fetch('https://library-crud-sample.vercel.app/api/category/create', options);
      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();
      
      setCategories([...categories, data]);

      setNewCategory({
        category_name: '',
        category_description: '',
        is_active: true
      });

      setSuccessMessage('Category created successfully');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch(`https://library-crud-sample.vercel.app/api/category/${categoryId}`, options);
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(categories.filter((category) => category.id !== categoryId));
      setSuccessMessage('Category deleted successfully');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateCategory = async (updatedCategory: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedCategory)
      };

      const response = await fetch('https://library-crud-sample.vercel.app/api/category/update', options);
      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const data = await response.json();

      setCategories(categories.map(category => category.id === updatedCategory.id ? data : category));
      setEditingCategoryId(null);
      setSuccessMessage('Category updated successfully');
    } catch (error: any) {
      setError(error.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (loggedOut) {
      window.location.href = '/login';
    }
  }, [loggedOut]);

  useEffect(() => {
    fetchUserProfile();
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {profileData && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {profileData.password && <p>Password: {profileData.password}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <hr className="my-8" />
      <div>
        <h2 className="text-2xl font-semibold mb-4">Category Management</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2">Categories</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Category Name</th>
                <th className="p-2 border">Category Description</th>
                <th className="p-2 border">Is Active</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="p-2 border">{category.id}</td>
                  <td className="p-2 border">{category.category_name}</td>
                  <td className="p-2 border">{category.category_description}</td>
                  <td className="p-2 border">{category.is_active ? 'True' : 'False'}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setEditingCategoryId(category.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Create Category</h3>
          <div className="flex flex-col sm:flex-row">
            <input
              type="text"
              className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
              placeholder="Category Name"
              value={newCategory.category_name}
              onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
            />
            <input
              type="text"
              className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
              placeholder="Category Description"
              value={newCategory.category_description}
              onChange={(e) => setNewCategory({ ...newCategory, category_description: e.target.value })}
            />
            <select
              className="bg-gray-100 rounded-lg py-2 px-4 mb-2 sm:mr-2"
              value={newCategory.is_active ? 'true' : 'false'}
              onChange={(e) => setNewCategory({ ...newCategory, is_active: e.target.value === 'true' })}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCreateCategory}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {editingCategoryId && (
        <CategoryModifier
          category={categories.find(category => category.id === editingCategoryId)}
          onUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default CategoryPage;

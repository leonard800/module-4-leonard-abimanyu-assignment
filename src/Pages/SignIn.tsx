import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import * as Yup from 'yup';

interface FormData {
    name: string;
    email: string;
    password: string;
  }
  
  const SignInPage = () => {
    const navigate = useNavigate();
  
    const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    });
  
    const handleSubmit = async (
      values: FormData,
      { setSubmitting, resetForm }: FormikHelpers<FormData>
    ) => {
      try {
        const response = await fetch(
          'https://library-crud-sample.vercel.app/api/user/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        );
  
        if (response.ok) {
          navigate('/');
          resetForm();
        } else {
          const error = await response.json();
          if (
            response.status === 400 &&
            error.message.includes('duplicate key value violates unique constraint')
          ) {
            console.error('Registration failed: Email already exists');
          } else {
            console.error('Registration failed:', error.message);
          }
        }
      } catch (error) {
        console.error('Error during registration:', error);
      } finally {
        setSubmitting(false);
      }
    };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInPage;
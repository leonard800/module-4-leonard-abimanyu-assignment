import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const StepOneSchema = Yup.object().shape({
	fullName: Yup.string().required('Please enter your full name'),
	email: Yup.string().email('Invalid email format, please try again').required('Please enter your email'),
	birthDate: Yup.date().required('Please enter your birth date')
});

const StepOneForm: React.FC = () => {
	return (
	<Formik
		initialValues={{ fullName: '', email: '', birthDate: ''}}
		validationSchema={StepOneSchema}
		onSubmit={(values) => {
			console.log(values);
		}}
	>
		{() => (
			<Form>
				<div className="mb-4">
					<label
						htmlFor="fullName"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						Name
					</label>
					<br />
					<Field
						type="text"
						name="fullName"
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<br />
					<ErrorMessage
						name="fullName"
						component="div"
						className="text-red-500 mt-1"
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="email"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						Email
					</label>
					<br />
					<Field 
						type="email" 
						name="email" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<br />
					<ErrorMessage 
						name="email" 
						component="div" 
						className="text-red-500 mt-1"
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="birthDate"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						Birth Date
					</label>
					<br />
					<Field 
						type="date" 
						name="birthDate" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<br />
					<ErrorMessage 
						name="birthDate" 
						component="div" 
						className="text-red-500 mt-1"
					/>
					
				</div>
			</Form>
        )}
		</Formik>
	);
}

export default StepOneForm;
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const StepThreeSchema = Yup.object().shape({
	username: Yup.string().required('Please enter your username'),
	password: Yup.string().min(8, 'Your password is too weak, please enter stronger password').required('Please enter your password'),
});

const StepThreeForm: React.FC = () => {
	return (
	<Formik
		initialValues={{ username: '', password: ''}}
		validationSchema={StepThreeSchema}
		onSubmit={(values) => {
			console.log(values);
		}}
	>
		{() => (
			<Form>
				<div>
					<label 
						htmlFor="username"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						Username
					</label>
					<Field 
						type="text" 
						name="username" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="username" 
						component="div"
						className="text-red-500 mt-1" 
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="password" 
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						Password
					</label>
					<Field 
						type="password" 
						name="password" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="password" 
						component="div"
						className="text-red-500 mt-1" 
					/>
					<br />
				</div>
			</Form>
        )}
		</Formik>
	);
}

export default StepThreeForm;
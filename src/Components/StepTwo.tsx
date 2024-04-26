import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const StepTwoSchema = Yup.object().shape({
	address: Yup.string().required('Please enter your address'),
	city: Yup.string().required('Please enter your city'),
	state: Yup.string().required('Please enter your state'),
	zipCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code, please try again').required('Please enter your ZIP Code'),
});

const StepTwoForm: React.FC = () => {
	return (
	<Formik
		initialValues={{ address: '', city: '', state: '', zipCode: ''}}
		validationSchema={StepTwoSchema}
		onSubmit={(values) => {
			console.log(values);
		}}
	>
		{() => (
			<Form>
				<div>
					<label 
						htmlFor="address"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>Home Address
					</label>
					<Field 
						type="text" 
						name="address" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="address" 
						component="div" 
						className="text-red-500 mt-1"
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="city"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						City
					</label>
					<Field 
						type="text" 
						name="city"
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="city" 
						component="div" 
						className="text-red-500 mt-1"
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="state"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>
						State
					</label>
					<Field 
						type="text" 
						name="state"
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="state" 
						component="div" 
						className="text-red-500 mt-1"
					/>
				</div>
				<br />
				<div>
					<label 
						htmlFor="zipCode"
						className="text-4xl block mb-1 text-white text-lg font-bold"
					>ZIP Code</label>
					<Field 
						type="text" 
						name="zipCode" 
						className="w-5/6 content-center text-3xl block rounded-md border border-white text-white bg-transparent placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white mx-auto"
					/>
					<ErrorMessage 
						name="zipCode" 
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

export default StepTwoForm;
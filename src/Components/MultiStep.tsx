import React, {useState} from "react";
import StepThreeForm from "./StepThree";
import StepTwoForm from "./StepTwo";
import StepOneForm from "./StepOne";


const MultiStepFormPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);

    const next = () => {
        setStep(step + 1);
    };

    const prev = () => {
        setStep(step - 1);
    };

    const render = () => {
        switch (step) {
            case 1: 
                return <StepOneForm/>;
            case 2:
                return <StepTwoForm/>;
            case 3:
                return <StepThreeForm/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            {render()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-6 py-4 border-2 border-white text-white font-bold text-lg rounded-lg font-serif hover:text-black hover:bg-white"
                >
                  Previous
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-4 border-2 border-white text-white font-bold text-lg rounded-lg font-serif hover:text-black hover:bg-white"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className="px-6 py-4 border-2 border-white text-white font-bold text-lg rounded-lg font-serif hover:text-black hover:bg-white"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
    );
};


export default MultiStepFormPage;
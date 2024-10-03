import { FieldError } from "react-hook-form";

type InputFieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    hidden?: boolean
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
    label,
    type = "text",
    register,
    name,
    defaultValue,
    error,
    hidden,
    placeholder,
    inputProps
}: InputFieldProps) => {
    return (
        // <div className="flex flex-col gap-2 w-full md:w-1/4">
        <>
            {/* <label className="text-xs text-gray-500">{label}</label> */}
            <div className={hidden ? "hidden" : "sm:col-span-3"}>
                <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 ">
                    {label}
                </label>
            </div>

            <div className={hidden ? "hidden" : "sm:col-span-9"}>
                <input
                    type={type}
                    {...register(name)}
                    className={`py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm sm:mt-0
                                text-sm -mt-px -ms-px  rounded-lg ring-1 ring-gray-300
                                focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                    {...inputProps}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                />
                {error?.message && (
                    <p className="text-xs text-red-600">{error.message.toString()}</p>
                )}
            </div>
            {/* // </div> */}
        </>
    );
};

export default InputField;
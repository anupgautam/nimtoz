import { FieldError } from "react-hook-form";

type TextFieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const TextField = ({
    label,
    type = "text",
    register,
    name,
    defaultValue,
    error,
    inputProps,
    placeholder,
}: TextFieldProps) => {
    return (
        // <div className="flex flex-col gap-2 w-full md:w-1/4">
        <>
            {/* <label className="text-xs text-gray-500">{label}</label> */}
            <div className="sm:col-span-3">
                        <label htmlFor="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 ">
                            {label}
                        </label>
                    </div>

            <div className="sm:col-span-9">

                <textarea
                    type={type}
                    {...register(name)}
                    rows={4}
                    className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0
                                text-sm relative rounded-lg ring-1 ring-gray-300
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

export default TextField;
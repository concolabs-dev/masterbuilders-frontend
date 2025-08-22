import { useState } from "react";

//sanitize by removing html tags and trim
const sanitize = (value: string) =>
    value.replace(/<\/?[^>]+(>|$)/g, "");

const validators: Record<string, Array<(value:string)=> string | null>> = {

    companyName: [
        (v) => !v ? "Company name is required" : null,
        (v) => v.length < 2 ? "Company name must be at least 2 characters" : null,
    ],
    type: [
        (v) => !v ? "Company type is required." : null,
    ],
    email: [
        (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Please enter a valid email address." : null,
        (v) => v.length > 50 ? "Email must be less than 50 characters." : null,
    ],
    telephone: [
        (v) =>
            !/^[0-9+\-\s]{7,}$/.test(v)
                ? "Please enter a valid telephone number."
                : null,
    ],
    website: [
        (v) =>
            v && !/^https?:\/\/.+\..+$/.test(v)
      ? "Please enter a valid website URL."
      : null,
    ],
    address: [
        (v) => (!v ? "Address is required." : null),
    ],
    founded: [
        (v) =>
            v && (!/^\d{4}$/.test(v) || Number(v) < 1800 || Number(v) > new Date().getFullYear())
                ? "Please enter a valid year."
                : null,
    ],
    employees: [
        (v) => (!v ? "Number of employees is required." : null),
    ],
    description: [
        (v) =>
            v.length < 10 ? "Description must be at least 10 characters." : null,
    ],

    //add more rules 

}

export function useFormValidation<T extends Record<string,any>>(initialState: T){
    const[values, setValues] = useState(initialState);
    const[errors, setErrors] = useState<Record<string, string|null>>({});

    const handleChange = (field:keyof T, value:string) => {
        let sanitizedValue = typeof value === "string" ? sanitize(value) : value;
        setValues((prev) => ({...prev, [field]:sanitizedValue}));

        if (validators[field as string]){
            const error = validators[field as string]
                .map((fn) => fn(sanitizedValue))
                .find((err) => !!err) || null;
            
            setErrors((prev)=> ({...prev, [field]:error}));
        }else{
            setErrors(prev => ({...prev, [field]:null}));
        }
    };

    const validateAll = () =>{
        const newErrors: Record<string, string|null> = {};
        Object.keys(values).forEach((field) => {
            const error = validators[field as string]
                .map((fn) => fn(values[field]))
                .find((err) => !!err) || null;

            newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.values(newErrors).every((err) => !err);
    };

    return {
        values,
        setValues,
        errors,
        handleChange,
        validateAll
    };
}

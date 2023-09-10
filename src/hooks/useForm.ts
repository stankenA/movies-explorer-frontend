import { useState } from "react";

type TUseFormValues = {
  search: string
  shortsCheckbox: boolean
}

export function useForm(inputValues: TUseFormValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (type === 'checkbox') {
      setValues({
        ...values,
        [name]: checked,
      });
    }
  };

  return { values, handleChange, setValues };
}

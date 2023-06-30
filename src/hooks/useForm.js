import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
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

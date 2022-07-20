import { useState } from 'react';

export const useInputValue = (initialValue?: any) => {
  const [value, setValue] = useState(
    initialValue !== undefined ? initialValue : ''
  );
  const onChange = (val: any) => {
    if (val.target !== null && val.target !== undefined) {
      setValue(val.target.value);
    } else {
      setValue(val);
    }
  };

  const reset = () => {
    setValue('');
  }

  return { value, onChange, reset };
};

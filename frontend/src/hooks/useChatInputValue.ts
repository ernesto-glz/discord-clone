import { useState } from 'react';

export const useChatInputValue = (initialValue: any) => {
  const [value, setValue] = useState(
    initialValue !== undefined ? initialValue : null
  );
  const onChange = (val: any) => {
    if (val.target !== null && val.target !== undefined) {
      setValue(val.target.value);
    } else {
      setValue(val);
    }
  };
  return { value, onChange, setValue };
};

import React from 'react';
import { allowedKeys } from 'src/utils/keyboard';
import { actionKeys, numberKeys } from '../../../utils/keyboard';

interface FormProps extends React.ComponentProps<'input'> {
  error?: string;
}

export const AddFriendInput = React.forwardRef<HTMLInputElement, FormProps>(
  (props, ref) => {
    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      const currentVal = ev.currentTarget.value;
      const keyValue = ev.key.toString();
      const [isNumeric, isAllowedKey] = [
        numberKeys.includes(keyValue),
        allowedKeys.includes(keyValue.toLowerCase()) ||
          actionKeys.includes(keyValue),
      ];

      if (!isAllowedKey) ev.preventDefault();
      else if (
        currentVal.includes('#') &&
        !isNumeric &&
        !actionKeys.includes(keyValue)
      )
        ev.preventDefault();
      else if (props.onKeyDown) {
        props.onKeyDown(ev);
      }
    };

    return (
      <div className="input-wrapper">
        <input
          ref={ref}
          {...props}
          onKeyDown={onKeyDown}
          className="add-friend-input"
          autoComplete="off"
        />
      </div>
    );
  }
);

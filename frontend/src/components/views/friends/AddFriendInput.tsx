import React from 'react';
import { allowedKeys } from 'src/utils/keyboard';
import { actionKeys, numberKeys } from 'src/utils/keyboard';

interface FormProps extends React.ComponentProps<'input'> {
  error?: string;
}

export const AddFriendInput = React.forwardRef<HTMLInputElement, FormProps>(
  (props, ref) => {
    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      // TODO: Refactor this code
      const currentVal = ev.target.value;
      const keyValue = ev.key.toString();
      const [isNumeric, isAllowedKey, isActionKey] = [
        numberKeys.includes(keyValue),
        allowedKeys.includes(keyValue.toLowerCase()) || actionKeys.includes(keyValue),
        actionKeys.includes(keyValue)
      ];

      const tagIndex = currentVal.indexOf('#');
      const caretOffset = ev.target.selectionStart!;
      const tagIncluded = tagIndex !== -1;
      const [, discriminator] = currentVal.split('#');

      if (!isAllowedKey) ev.preventDefault();
      else if (tagIncluded && caretOffset -1 < tagIndex && isAllowedKey) return;
      else if (discriminator?.length >= 4 && !isActionKey) ev.preventDefault();
      else if (tagIncluded && !isNumeric && !isActionKey) ev.preventDefault();
    };

    return (
      <input
        ref={ref}
        {...props}
        onKeyDown={onKeyDown}
        className="add-friend-input"
        autoComplete="off"
      />
    );
  }
);

import React, { FC } from 'react';
import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({text, onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;
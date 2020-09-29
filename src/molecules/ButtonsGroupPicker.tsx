import React, { useState } from 'react';
import { ButtonGroupPicker, ButtonOption } from 'react-rainbow-components';
import { ButtonOptionProps } from 'react-rainbow-components/components/ButtonOption';

export type GenericButtonGroupPickerProps = {
    options: ButtonOptionProps[]
    label?: string
    bottomHelpText?: string
    onChange: React.Dispatch<React.SetStateAction<any>>
}

const GenericButtonGroupPicker: React.FC<GenericButtonGroupPickerProps> = (props) => {
    const [value, setValue] = useState<string>('');

    const buttonOptions = props.options.map((option, i) => <ButtonOption key={i} label={option.label} name={option.name} />)

    return (
        <div className="rainbow-p-vertical_large rainbow-align-content_center rainbow-flex_wrap">
            <ButtonGroupPicker
                className="rainbow-m-around_medium"
                label={props.label}
                value={value}
                onChange={(value) => {
                    setValue(value as string)
                    props.onChange(value)
                }}
                name="filter"
                size="medium"
                bottomHelpText={props.bottomHelpText}
            >
                {buttonOptions}
            </ButtonGroupPicker>
        </div>
    )
}

export default GenericButtonGroupPicker;
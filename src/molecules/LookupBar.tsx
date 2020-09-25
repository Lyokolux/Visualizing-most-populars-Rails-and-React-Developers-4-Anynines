import React, { useState } from 'react';
import { Lookup } from 'react-rainbow-components';
import { LookupValue } from 'react-rainbow-components/components/types';

const LOOKUP_INTERNAL_STYLES = {
    maxWidth: 5000,
}

export type LookupBarProps = {
    options: LookupValue[]
}

const LookupBar: React.FC<LookupBarProps> = (props) => {
    const propsOptions = props.options;
    const [value, setValue] = useState<LookupValue | undefined>(undefined)
    const [options, setOptions] = useState<LookupValue[] | undefined>(propsOptions)

    const filter = (query: string, options: LookupValue[]): LookupValue[] => {
        if (query) {
            const regex = new RegExp(query, 'i')
            return options.filter(item => {
                const label = item.label as string
                return regex.test(label)
            });
        }
        return [];
    }

    const search = (input: string) => {
        if (options && value && value.label && input.length > value.label.length) {
            setOptions(filter(input, options))
        } else if (input) {
            setOptions(filter(input, propsOptions))
        } else {
            setValue(undefined)
            setOptions(propsOptions) // reset options to the default list
        }
    }

    const handleLookupChange = (value: LookupValue | null): void => {
        if (value !== null && value.label !== undefined) {
            setValue({ label: value.label })
        }
        else
            setValue(undefined)
    }

    return (
        <Lookup
            id="searchbar"
            placeholder="Search a developer"
            options={options}
            value={value}
            onChange={handleLookupChange}
            onSearch={search}
            style={LOOKUP_INTERNAL_STYLES}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        />
    );
}

export default LookupBar;
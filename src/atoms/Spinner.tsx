import React from 'react';
import { Spinner } from 'react-rainbow-components';

const SpinnerWrapper: React.FC = () => {
    return (
        <div>
            <div className="rainbow-p-vertical_xx-large">
                <div className="rainbow-position_relative rainbow-m-vertical_xx-large rainbow-p-vertical_xx-large">
                    <Spinner size="large" />
                </div>
            </div>
        </div>
    )
}

export default SpinnerWrapper;
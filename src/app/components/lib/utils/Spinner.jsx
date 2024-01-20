import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center ">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
        </div>
    );
};

export default Spinner;

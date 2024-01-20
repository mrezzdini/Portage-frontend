import React from 'react';

import withRouter from './../../common/withRouter';

/**
 * 404 page, when a url is not found
 *
 * @author Peter Mollet
 */
const ErrorView = ({ router: { navigate } }) => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-primary-dark">
            <h1 className="text-9xl font-extrabold tracking-widest text-white">404</h1>
            <div className="absolute rotate-12 rounded bg-secondary px-2 text-sm">
                Page Not Found
            </div>
            <button
                className="group relative mt-5 inline-block text-sm font-medium text-secondary 
                focus:outline-none focus:ring active:text-orange-500"
                onClick={() => navigate(-1)}
            >
                <span
                    className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-secondary 
                    transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                />

                <span className="relative block border border-current bg-primary-dark px-8 py-3">
                    Go Back
                </span>
            </button>
        </div>
    );
};

export default withRouter(ErrorView);

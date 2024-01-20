import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { PropTypes } from 'prop-types';
import React from 'react';

/**
 * Searchbar created for the table component (could be use for other component))
 *
 * @param {Function} onSearch: REQUIRED function to call when the user submit the form
 * @example <Searchbar onSearch={(values) => console.log(values)} />
 * @author Peter Mollet
 */
const Searchbar = ({ onSearch, className }) => {
    return (
        <Formik initialValues={{ search: '' }} onSubmit={onSearch}>
            <Form className="inline-flex w-full flex-1">
                <Field
                    style={{ borderRadius: '5px', with: '1000px', height: '600px' }}
                    name="search"
                    type="text"
                    className={className}
                    component={InputSearch}
                />

                <button
                    type="submit"
                    style={{
                        color: '#6B6D7C',
                        left: '20px',
                        height: '50px',
                        backgroundColor: '#D8D83D',
                        width: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '0 5px 5px 0',
                    }}
                >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
            </Form>
        </Formik>
    );
};

export default Searchbar;

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

const InputSearch = ({ type, field: { name }, field, className }) => {
    return (
        <input
            id={name}
            name={name}
            type={type}
            className={`rounded-none rounded-l-md border border-r-0 border-gray-300 font-light 
                focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-400 lg:w-1/3 
                ${className}`}
            placeholder="Recherche..."
            {...field}
        />
    );
};

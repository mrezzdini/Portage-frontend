import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useMemo } from 'react';

import useDarkMode from '../../hooks/useDarkMode';
import IconButton from '../lib/form/IconButton';

const DarkmodeSlider = () => {
    const [theme, setTheme] = useDarkMode();

    const isDark = useMemo(() => theme === 'dark', [theme]);
    const Icon = useMemo(() => (isDark ? SunIcon : MoonIcon), [isDark]);
    const className = useMemo(
        () =>
            isDark
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-500 hover:text-gray-400',
        [isDark],
    );

    const toggleTheme = useCallback(() => {
        setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
    }, [theme, setTheme]);

    return (
        <IconButton
            onClick={toggleTheme}
            icon={Icon}
            iconClassName={`h-8 w-8 ${className} transition duration-300 ease-in-out`}
        />
    );
};

export default DarkmodeSlider;

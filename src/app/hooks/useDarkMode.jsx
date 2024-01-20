import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAppTheme, toggleDarkMode } from '../store/appSettingsSlice';

const useDarkMode = () => {
    const dispatch = useDispatch();
    const appTheme = useSelector(selectAppTheme);
    const [theme, setTheme] = useState(appTheme);

    useEffect(() => {
        dispatch(toggleDarkMode(theme));
    }, [theme]);

    return [theme, setTheme];
};

export default useDarkMode;

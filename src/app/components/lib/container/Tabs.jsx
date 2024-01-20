import { Tab } from '@headlessui/react';
import { useEffect, useLayoutEffect, useState } from 'react';

import withRouter from '../../../common/withRouter';

/**
 * Tabs component: generic component to display tabs with their content
 *
 * @param {Array} tabs: array of tabs to display (each tab is a string or a component)
 * @param {node} children: children components to display in the tabs.
 * Needs TabPanel components, all other components will be ignored.
 *
 * @example
 * <Tabs tabs={['Tab 1', 'Tab 2']}>
 *  <TabPanel>Tab 1 content</TabPanel>
 *  <TabPanel>Tab 2 content</TabPanel>
 * </Tabs>
 *
 * @author Peter Mollet
 */
const Tabs = ({ tabs, children, router: { navigate, location }, ...rest }) => {
    const [selectedIndex, setSelectedIndex] = useState(false);

    useLayoutEffect(() => {
        const hash = location.hash.split('#')[1];
        const index = tabs.findIndex(
            (tab) => tab.toLowerCase().replace(/ /g, '-') === hash,
        );
        setSelectedIndex(index && index !== -1 ? index : 0);
    }, []);

    useEffect(() => {
        if (typeof selectedIndex == 'number' && selectedIndex > -1) {
            const hash = tabs[selectedIndex]?.toString().toLowerCase().replace(/ /g, '-');
            navigate(`#${hash}`);
        }
    }, [selectedIndex]);

    return (
        <div className="w-full py-2 ">
            <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                {...rest}
            >
                <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow dark:bg-gray-700">
                    {tabs?.map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                                ring-transparent focus:outline-none
                                ${
                                    selected
                                        ? 'cursor-default bg-secondary text-white shadow'
                                        : 'text-secondary-light hover:bg-gray-100 hover:text-secondary-dark'
                                }`
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {children?.filter((child) => child.type.name === 'TabPanel')}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default withRouter(Tabs);

/**
 * TabPanel component: generic component to display the content of a tab.
 * Works in combination with the Tabs component.
 *
 * @param {node} children: children components to display in the tab
 *
 * @example <TabPanel>Tab 1 content</TabPanel>
 *
 * @author Peter Mollet
 */
export const TabPanel = ({ children, ...rest }) => {
    return (
        <Tab.Panel className="rounded-xl bg-white p-3 shadow dark:bg-gray-700" {...rest}>
            {children}
        </Tab.Panel>
    );
};

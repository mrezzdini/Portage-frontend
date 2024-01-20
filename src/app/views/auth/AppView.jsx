import { Field, Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import Accordion from '../../components/lib/container/Accordion';
import Modal from '../../components/lib/container/Modal';
import Tabs, { TabPanel } from '../../components/lib/container/Tabs';
import Input from '../../components/lib/form/Input';
import useConfirm from '../../hooks/useConfirm';
import withAuth from './../../common/withAuth';
import TablePanel from './../../components/lib/container/table/TablePanel';
import Button from './../../components/lib/form/Button';
import InputSelect from './../../components/lib/form/InputSelect';

/**
 * AppView component: view for the app page. with authentication.
 *
 * @author Peter Mollet
 */
const AppView = () => {
    return (
        <div className="flex flex-col text-blue-500">
            <p>APP VIEW</p>
            <TestForm />
            <Faq />
            <Posts />
            <TestModal />
            <Confirm />
            <TestList />
        </div>
    );
};

export default withAuth(AppView);

/*
    EXAMPLES COMPONENTS: TO DELETE
*/

const Posts = () => {
    const categories = {
        Recent: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Trending: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    };

    return (
        <div className="mb-5 border-b pb-5">
            <Tabs tabs={Object.keys(categories)}>
                {Object.values(categories).map((posts, idx) => (
                    <TabPanel key={idx}>
                        <ul>
                            {posts.map((post) => (
                                <li
                                    key={post.id}
                                    className="relative rounded-md p-3 hover:bg-gray-100 hover:dark:bg-gray-750"
                                >
                                    <h3 className="text-sm font-medium leading-5">
                                        {post.title}
                                    </h3>

                                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 dark:text-gray-400">
                                        <li>{post.date}</li>
                                        <li>&middot;</li>
                                        <li>{post.commentCount} comments</li>
                                        <li>&middot;</li>
                                        <li>{post.shareCount} shares</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

const TestModal = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Button
                type="button"
                color="default"
                className="w-40"
                onClick={() => setOpenModal(true)}
            >
                Modal
            </Button>
            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Test Modal"
            >
                <div className="rounded-md">
                    <div className="mt-2">
                        <p className="text-sm leading-5 text-gray-800 dark:text-gray-200">
                            lorem ipsum dolor sit amet
                        </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <span className="ml-3 inline-flex rounded-md shadow-sm">
                            <button
                                type="button"
                                className={`btn btn-green`}
                                onClick={() => setOpenModal(false)}
                            >
                                Ok
                            </button>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const Confirm = () => {
    const confirm = useConfirm();

    const handleConfirm = async () => {
        const result = await confirm({
            title: 'Delete all ?',
            description: 'Are you sure you want to delete everything?',
        });
        console.log(result);
    };

    return (
        <button className="btn btn-red w-40" onClick={handleConfirm}>
            DELETE
        </button>
    );
};

const Faq = () => {
    const faqs = [
        {
            title: 'What is the best coffee?',
            content: (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
                    nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget aliquam nisl
                    nisl sit amet lorem. Donec euismod, nisl nec aliquam aliquam, nunc
                    nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
                    aliquam aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit
                    amet lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget
                    aliquam nisl nisl sit amet lorem.
                </div>
            ),
        },
        {
            title: 'What is the best tea?',
            content: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
                nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget aliquam nisl
                nisl sit amet lorem. Donec euismod, nisl nec aliquam aliquam, nunc
                nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
                aliquam aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit
                amet lorem.. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget
                aliquam nisl nisl sit amet lorem. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam,
                nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem.
            `,
        },
    ];

    return (
        <div className="mb-5 border-b pb-5">
            <Accordion data={faqs} />
        </div>
    );
};

const TestForm = () => {
    const people = useMemo(
        () =>
            [
                { id: 1, name: 'Durward Reynolds', unavailable: false },
                { id: 2, name: 'Kenton Towne', unavailable: false },
                { id: 3, name: 'Therese Wunsch', unavailable: false },
                { id: 4, name: 'Benedict Kessler', unavailable: true },
                { id: 5, name: 'Katelyn Rohan', unavailable: false },
                { id: 6, name: 'Vladimir Keeling', unavailable: false },
                { id: 7, name: 'Kariane Medhurst', unavailable: false },
                { id: 8, name: 'Nathanial Erdman', unavailable: false },
                { id: 9, name: 'Glenna Reichert', unavailable: false },
                { id: 10, name: 'Clementina DuBuque', unavailable: false },
            ].map((person) => ({
                value: person.id,
                label: person.name,
            })),
        [],
    );

    return (
        <div className="mb-5 border-b pb-5">
            <div className="w-full rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                <Formik
                    initialValues={{ person: [], name: '' }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={Yup.object().shape({
                        person: Yup.array().required().min(2),
                        name: Yup.string().required().trim(),
                    })}
                >
                    <Form className="flex flex-col items-end space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                        <Field
                            name="person"
                            component={InputSelect}
                            placeholder="Select a person..."
                            label="Manager:"
                            options={people}
                            multiple
                        />
                        <Field
                            name="name"
                            component={Input}
                            placeholder="Name"
                            label="Name:"
                            type="text"
                        />
                        <Button
                            color="pink"
                            type="submit"
                            className="my-2 w-full sm:my-0 sm:w-min"
                        >
                            Submit
                        </Button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

const TestList = () => {
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);

    useEffect(() => {
        const back = fetchData(page, sort, search);
        setTotalElements(back.page.totalElements);
        setTotalPages(back.page.totalPages);
        setPeople(
            back.users.map((d) => {
                return {
                    name: <Name person={d} />,
                    title: <Title person={d} />,
                    status: <Active isActive={d.isActive} />,
                    role: d.role,
                    edit: <EditBtn />,
                };
            }),
        );
    }, [page, search, sort]);

    return (
        <div className="my-5 border-y py-5">
            <TablePanel
                column={[
                    { name: 'name', label: 'Name', sortable: true },
                    { name: 'title', label: 'Title' },
                    { name: 'status', label: 'Status', sortable: true },
                    { name: 'authorities', label: 'Role' },
                    { name: '', label: '' },
                ]}
                rows={people}
                onSearch={(values) => {
                    setSearch(values.search);
                    setPage(0);
                }}
                onSort={(values) => {
                    setSort(values);
                    setPage(0);
                }}
                totalElements={totalElements}
                pageSize={2}
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </div>
    );
};

const EditBtn = () => {
    return (
        <button type="button" className="btn-link-primary">
            Edit
        </button>
    );
};

const Name = ({ person }) => {
    return (
        <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {person.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {person.email}
                </div>
            </div>
        </div>
    );
};

const Title = ({ person }) => {
    return (
        <>
            <div className="text-sm text-gray-900 dark:text-gray-100">{person.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
                {person.department}
            </div>
        </>
    );
};

const Active = ({ isActive }) => {
    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
			${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
            {isActive ? 'Active' : 'Inactive'}
        </span>
    );
};

// FAKE DATA: only here for the exemple

function fetchData(page, sort, search) {
    var users = dataBackEnd.users;

    if (search) {
        const searchLower = search.toLowerCase();
        users = users.filter((u) => {
            return (
                u.name.toLowerCase().includes(searchLower) ||
                u.email.toLowerCase().includes(searchLower)
            );
        });
    }

    if (sort) {
        const { name, direction } = sort;
        users = users.sort((a, b) => {
            if (a[name] < b[name]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[name] > b[name]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    const pageDef = {
        totalElements: users.length,
        totalPages: Math.ceil(users.length / 2),
    };

    switch (page) {
        case 1:
            users = users.slice(2, 4);
            break;
        default:
            users = users.slice(0, 2);
            break;
    }

    return { users, page: pageDef };
}

const dataBackEnd = {
    page: {
        totalElements: 4,
        pageSize: 2,
        totalPages: 2,
    },
    users: [
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm',
            department: 'Optimization',
            role: 'Admin',
            isActive: false,
            email: 'jane.cooper@example.com',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'John Doe',
            title: 'Happy Manager',
            department: 'Manager',
            role: 'Manager',
            isActive: true,
            email: 'john.doe@example.com',
            edit: 'editBtn',
            image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Henry Dursel',
            title: 'Manager',
            department: 'Management',
            role: 'Manager',
            isActive: true,
            email: 'henry.dursel@example.com',
            edit: 'editBtn',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jack Koon',
            title: 'CEO',
            department: 'Human Resources',
            role: 'Director',
            isActive: false,
            email: 'jack.koon@example.com',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
    ],
};

import {useState} from 'react';
import {Combobox} from '@headlessui/react';
import AnimatedCombobox from '@/components/AnimatedCombobox';


type TagSelectorProps = {
    tags: string[],
    setTags: (tags: string[]) => void
}

const defaultTags = ['Accounting', 'Activism', 'Aerospace', 'Agriculture', 'Animals',
    'Biology', 'Books', 'Business', 'Career Fair', 'Charity', 'Chemical Engineering',
    'Chemistry', 'Civil Engineering', 'Communication', 'Computer Engineering',
    'Computer Graphics', 'Computer Science', 'Conference', 'Convention', 'Drinks',
    'Education', 'Electrical Engineering', 'Family', 'Fashion', 'Festival', 'Film',
    'Finance', 'Food', 'Gaming', 'Health', 'Industrial Engineering', 'Information Technology',
    'Lecture', 'Marketing', 'Mathematics', 'Mechanical Engineering', 'Medical', 'Music',
    'Networking', 'Nursing', 'Party', 'Performing Arts', 'Physics', 'Politics', 'Psychology',
    'Sociology', 'Sports', 'Statistics', 'Study', 'Technology', 'Tournament', 'Visual Arts'];

export default function TagSelector(props: TagSelectorProps) {
    const [selectedTag, setSelectedTag] = useState('');
    const [query, setQuery] = useState('');
    const filteredTags = defaultTags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())
        && tag.toLowerCase() !== query.toLowerCase()
        && !props.tags.includes(tag)).slice(0, 15);

    return (
        <div className="mb-4">
            {props.tags.length !== 0 && (
                <div className="flex gap-1 mb-1.5 flex-wrap">
                    {props.tags.map(tag => (
                        <div className="flex gap-1.5 rounded-full text-xs py-0.5 px-1.5 bg-blue-400/30 text-blue-400 w-max font-semibold">
                            {tag}
                            <button onClick={() => props.setTags(props.tags.filter(t => t !== tag))}>×</button>
                        </div>
                    ))}
                </div>
            )}
            <Combobox
                as="div"
                className="relative flex"
                value={selectedTag}
                onChange={(tag) => {
                    if (!props.tags.includes(tag) && props.tags.length < 10)
                        props.setTags([...props.tags, tag]);
                    setSelectedTag('')
                }}
                disabled={props.tags.length >= 10}
            >
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value.slice(0, 25))}
                    placeholder={props.tags.length >= 10 ? 'Maximum number of tags added!' : 'Add a tag... (max 25 characters)'}
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 w-full disabled:bg-gray-200 transition duration-200"
                />
                <AnimatedCombobox className="absolute left-0 top-full z-50 bg-white shadow-lg py-2 rounded-md w-max">
                    {query.length > 0 && (
                        <Combobox.Option value={query} className="cursor-pointer px-4 hover:bg-gray-100 transition duration-100 py-1">
                            {query}
                        </Combobox.Option>
                    )}
                    {filteredTags.map((tag) => (
                        <Combobox.Option key={tag} value={tag} className="cursor-pointer px-4 hover:bg-gray-100 transition duration-100 py-1">
                            {tag}
                        </Combobox.Option>
                    ))}
                </AnimatedCombobox>
            </Combobox>
        </div>
    );
}

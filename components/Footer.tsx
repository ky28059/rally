import {BsGithub} from 'react-icons/bs';


export default function Footer() {
    return (
        <footer className="mt-24 py-16 border-t border-tertiary dark:border-tertiary-dark">
            <div className="container text-secondary dark:text-secondary-dark text-sm flex justify-between">
                <p>
                    [...]
                    <br />
                    Copyright © 2023. All rights reserved.
                </p>
                <a href="https://github.com/ky28059/events-site" target="_blank" rel="noopener noreferrer" className="text-base">
                    <BsGithub className="my-auto h-full" />
                </a>
            </div>
        </footer>
    )
}

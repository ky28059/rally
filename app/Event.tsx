export default function Event() {
    return (
        <div className="flex flex-col rounded-lg border border-gray-400 hover:border-gray-600 transition duration-200 w-64">
            <img
                src="https://picsum.photos/200/300"
                alt="..."
                className="w-full h-24 object-cover object-center"
            />
            <div className="px-5 pt-3 pb-4">
                <h3>Example event</h3>
                <p>Example description</p>
            </div>
        </div>
    )
}

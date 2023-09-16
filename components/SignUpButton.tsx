'use client'

export default function SignUpButton() {
    return (
        <div className="mb-3">
            <button onClick={handleSignUp} className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign Up {/* Use the text property here */}
            </button>
        </div>
    )
}

const handleSignUp = () => {
    // Implement your sign-in logic here
    console.log('User clicked sign Up');
};

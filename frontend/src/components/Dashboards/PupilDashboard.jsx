import { useSelector } from 'react-redux';

export default function PupilDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id);
    const pupils = useSelector((state) => state.pupils.pupils);

    const pupil = pupils.find((p) => p.userId === currentUserId);

    if (!currentUserId) {
        return <p>Please log in.</p>;
    }

    if (!pupil) {
        return <p>Pupil information not found.</p>;
    }

    return (
        <div>
            <h2>Pupil Information</h2>
            <p><strong>Name:</strong> {pupil.name}</p>
            <p><strong>Preference:</strong> {pupil.preference}</p>
            <p><strong>Advanced Subject:</strong> {pupil.advancedSubject}</p>
            <div>
                <h3>Grades:</h3>
                <ul>
                    {Object.entries(pupil.grades).map(([subject, grade]) => (
                        <li key={subject}>
                            <strong>{subject}:</strong> {grade}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Add more pupil information as needed */}
        </div>
    );
}
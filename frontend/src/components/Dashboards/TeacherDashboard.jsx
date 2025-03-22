import { useSelector } from 'react-redux';

export default function TeacherDashboard() {
    const currentUserId = useSelector((state) => state.auth.currentUser.id); // Adjust to your auth state
    const teachers = useSelector((state) => state.teachers.teachers);
    const subjects = useSelector((state) => state.subjects.subjects); // Assuming you have subjects in Redux

    const teacher = teachers.find((t) => t.userId === currentUserId);

    if (!currentUserId) {
        return <p>Please log in.</p>;
    }

    if (!teacher) {
        return <p>Teacher information not found.</p>;
    }

    // Function to get subject names
    const getSubjectNames = (subjectIds) => {
        if (!subjectIds || subjectIds.length === 0) {
            return 'No subjects assigned';
        }
        return subjectIds.map((id) => {
            const subject = subjects.find((s) => s.id === id);
            return subject ? subject.name : 'Unknown Subject';
        }).join(', ');
    };

    return (
        <div>
            <h2>Teacher Information</h2>
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Subjects:</strong> {getSubjectNames(teacher.subjectIds)}</p>
            {/* Add more teacher information as needed */}
        </div>
    );
}
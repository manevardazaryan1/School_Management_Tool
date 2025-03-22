export function calculateAdvancedSubject(grades, preference, subjectsList) {
  if (!grades || !preference || !subjectsList || subjectsList.length === 0) {
      return null;
  }

  const preferenceGrade = grades[preference];
  console.log(preferenceGrade)

  if (preferenceGrade >= 70) {
      return preference;
  } else {
      let highestGrade = -1;
      let highestGradeSubject = null;

      for (const subject in grades) {
          if (grades.hasOwnProperty(subject)) {
              if (grades[subject] > highestGrade) {
                  highestGrade = grades[subject];
                  highestGradeSubject = subject;
              }
          }
      }

      console.log(highestGradeSubject)
      return highestGradeSubject;
  }
}
//  * helpers
//  *
//  * This file contains helper functions used throughout the application.
//  * Currently, it includes the `calculateAdvancedSubject` function, which determines a pupil's
//  * advanced subject based on their grades and preferences.
//  *

export function calculateAdvancedSubject(grades, preference, subjectsList) {
  if (!grades || !preference || !subjectsList || subjectsList.length === 0) {
      return null
  }

  const preferenceGrade = grades[preference]

  if (preferenceGrade >= 70) {
      return preference
  } else {
      let highestGrade = -1
      let highestGradeSubject = null

      for (const subject in grades) {
          if (grades.hasOwnProperty(subject)) {
              if (grades[subject] > highestGrade) {
                  highestGrade = grades[subject]
                  highestGradeSubject = subject
              }
          }
      }

      return highestGradeSubject
  }
}
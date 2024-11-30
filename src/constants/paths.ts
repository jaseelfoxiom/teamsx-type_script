export const PATHS = {
    BASE_PATH: "/",
    ADD_REQUEST : "request",
    CANDIDATES: "enroll-candidates/candidates",
    CATEGORY: "certification-courses/category",
    CERTIFICATION_COURSE: "certification-courses",
    COURSES: "certification-courses/courses",
    COURSE_TYPE: "university-courses/course-type",
    ENROLL: "enroll-candidates/enroll",
    ENROLL_CANDIDATES: "enroll-candidates",
    LOGIN: "login",
    NOTIFICATIONS: "notifications",
    PROGRAMMES: "university-courses/programmes",
    SETTINGS: "settings",
    STUDENTS: "students",
    UNIVERSITIES: "university-courses/universities",
    UNIVERSITY_COURSE: "university-courses",
    ADD_CERTIFICATION_COURSE: "certification-course-form",
    CERTIFICATION_COURSE_DETAILS: "certification-details",
    ADD_UNIVERSITY_COURSE: "university-courses/create",
    EDIT_UNIVERSITY_COURSE: "university-courses/edit",
    UNIVERSITY_COURSE_DETAILS: "university-course",
    SEMESTER_DETAILS: "semester",
    DASHBOARD: "dashboard",
    ENROLLMENT: "student-enrollment",
    CLASS_DETAILS: "classes",
    SUBJECT_DETAILS: "subject",
    MODULE_DETAILS: "module",
    FAQ: "FAQ",
    UNIVERSITY_COURSE_TYPE: "universities",
  } as const;
  
  // Type for PATHS
  export type PathKeys = keyof typeof PATHS;  // Type that includes all the keys of the PATHS object
  export type PathValues = typeof PATHS[PathKeys];  // Type that includes all the string values of the PATHS object
  
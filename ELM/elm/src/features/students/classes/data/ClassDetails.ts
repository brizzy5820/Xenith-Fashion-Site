export const classData = {
  mathematics: {
    subject: "Mathematics",
    code: "MTH 201",
    teacher: "Mr. Adeyemi",

    ongoing: {
      type: "assignment" as const,
      title: "Quadratic Equations Exercise",
      description:
        "Complete the questions on solving quadratic equations and submit your answers.",
      due: "Due tomorrow",
      actionHref: "/student/assignments/quadratic-equations",
    },

    topics: [
      {
        id: "1",
        title: "Algebraic Expressions",
        completed: true,
      },
      {
        id: "2",
        title: "Simultaneous Equations",
        completed: true,
      },
      {
        id: "3",
        title: "Quadratic Equations",
        completed: false,
        current: true,
      },
      {
        id: "4",
        title: "Trigonometry",
        completed: false,
      },
      {
        id: "5",
        title: "Statistics",
        completed: false,
      },
      {
        id: "6",
        title: "Probability",
        completed: false,
      },
    ],
  },

  biology: {
    subject: "Biology",
    code: "BIO 201",
    teacher: "Mrs. Williams",

    ongoing: {
      type: "lesson" as const,
      title: "Cell Structure",
      description:
        "Continue the current lesson and review the structure and functions of plant and animal cells.",
      actionHref: "/student/classes/biology/lessons/cell-structure",
    },

    topics: [
      {
        id: "1",
        title: "Living Organisms",
        completed: true,
      },
      {
        id: "2",
        title: "Cell Structure",
        completed: false,
        current: true,
      },
      {
        id: "3",
        title: "Nutrition",
        completed: false,
      },
      {
        id: "4",
        title: "Transport Systems",
        completed: false,
      },
      {
        id: "5",
        title: "Respiration",
        completed: false,
      },
    ],
  },

  "english-language": {
    subject: "English Language",
    code: "ENG 201",
    teacher: "Mrs. Okafor",

    ongoing: {
      type: "assignment" as const,
      title: "Essay Writing: Persuasive Techniques",
      description:
        "Write a 500-word persuasive essay using at least three rhetorical devices. Submit as PDF.",
      due: "Due in 3 days",
      actionHref: "/student/assignments/persuasive-essay",
    },

    topics: [
      {
        id: "1",
        title: "Parts of Speech",
        completed: true,
      },
      {
        id: "2",
        title: "Sentence Structure",
        completed: true,
      },
      {
        id: "3",
        title: "Punctuation and Grammar",
        completed: true,
      },
      {
        id: "4",
        title: "Essay Writing",
        completed: false,
        current: true,
      },
      {
        id: "5",
        title: "Comprehension Skills",
        completed: false,
      },
      {
        id: "6",
        title: "Literature Analysis",
        completed: false,
      },
    ],
  },

  physics: {
    subject: "Physics",
    code: "PHY 201",
    teacher: "Mr. Ibrahim",

    ongoing: {
      type: "lesson" as const,
      title: "Newton's Laws of Motion",
      description:
        "Understand the three laws of motion and their applications in real-world scenarios.",
      actionHref: "/student/classes/physics/lessons/newtons-laws",
    },

    topics: [
      {
        id: "1",
        title: "Motion and Speed",
        completed: true,
      },
      {
        id: "2",
        title: "Velocity and Acceleration",
        completed: true,
      },
      {
        id: "3",
        title: "Newton's Laws of Motion",
        completed: false,
        current: true,
      },
      {
        id: "4",
        title: "Force and Energy",
        completed: false,
      },
      {
        id: "5",
        title: "Work and Power",
        completed: false,
      },
      {
        id: "6",
        title: "Waves and Sound",
        completed: false,
      },
    ],
  },

  chemistry: {
    subject: "Chemistry",
    code: "CHE 201",
    teacher: "Mrs. Bello",

    ongoing: {
      type: "assignment" as const,
      title: "Laboratory Report: Titration Experiment",
      description:
        "Complete the laboratory experiment and submit a detailed report with calculations and analysis.",
      due: "Due in 5 days",
      actionHref: "/student/assignments/titration-report",
    },

    topics: [
      {
        id: "1",
        title: "Atomic Structure",
        completed: true,
      },
      {
        id: "2",
        title: "Bonding and Structure",
        completed: true,
      },
      {
        id: "3",
        title: "Stoichiometry",
        completed: false,
        current: true,
      },
      {
        id: "4",
        title: "Acids and Bases",
        completed: false,
      },
      {
        id: "5",
        title: "Redox Reactions",
        completed: false,
      },
      {
        id: "6",
        title: "Organic Chemistry",
        completed: false,
      },
    ],
  },

  "computer-science": {
    subject: "Computer Science",
    code: "CSC 201",
    teacher: "Mr. James",

    ongoing: {
      type: "assignment" as const,
      title: "Programming Project: Build a Todo App",
      description:
        "Create a functional Todo application using HTML, CSS, and JavaScript with local storage.",
      due: "Due in 2 days",
      actionHref: "/student/assignments/todo-app-project",
    },

    topics: [
      {
        id: "1",
        title: "Programming Fundamentals",
        completed: true,
      },
      {
        id: "2",
        title: "Data Structures",
        completed: true,
      },
      {
        id: "3",
        title: "Algorithms",
        completed: false,
        current: true,
      },
      {
        id: "4",
        title: "Object-Oriented Programming",
        completed: false,
      },
      {
        id: "5",
        title: "Web Development",
        completed: false,
      },
      {
        id: "6",
        title: "Databases",
        completed: false,
      },
    ],
  },
};

export type ClassDetails = typeof classData;

import { GradeLevel, Lesson } from '../types';

const lessonSet: Lesson[] = [
  {
    id: 'alphabet-friends',
    title: 'Alphabet Friends',
    grade: 'preschool',
    category: 'Reading',
    difficulty: 'Easy',
    duration: 8,
    description: 'Learn the sounds and letters from A to Z with fun recognition games.',
    points: 10,
    badge: 'Letter Explorer',
    questions: [
      {
        id: 'a1',
        prompt: 'Which letter comes after A?',
        options: ['B', 'C', 'D'],
        answerIndex: 0,
        explanation: 'A is followed by B in the alphabet.'
      },
      {
        id: 'a2',
        prompt: 'Which word starts with the letter M?',
        options: ['Sun', 'Moon', 'Star'],
        answerIndex: 1,
        explanation: 'Moon begins with the letter M.'
      },
      {
        id: 'a3',
        prompt: 'Which letter makes the /s/ sound?',
        options: ['S', 'O', 'K'],
        answerIndex: 0,
        explanation: 'S makes the /s/ sound.'
      }
    ]
  },
  {
    id: 'counting-fun',
    title: 'Counting Fun',
    grade: 'preschool',
    category: 'Math',
    difficulty: 'Easy',
    duration: 10,
    description: 'Count objects, learn numbers, and practice simple ordering.',
    points: 12,
    badge: 'Number Star',
    questions: [
      {
        id: 'c1',
        prompt: 'How many apples are shown if you count 1, 2, 3?',
        options: ['2', '3', '4'],
        answerIndex: 1,
        explanation: '1, 2, 3 means there are 3 apples.'
      },
      {
        id: 'c2',
        prompt: 'Which number comes before 5?',
        options: ['4', '6', '7'],
        answerIndex: 0,
        explanation: '4 comes right before 5.'
      },
      {
        id: 'c3',
        prompt: 'What is 2 + 1?',
        options: ['2', '3', '4'],
        answerIndex: 1,
        explanation: '2 + 1 = 3.'
      }
    ]
  },
  {
    id: 'shape-world',
    title: 'Shape World',
    grade: 'kindergarten',
    category: 'Logic',
    difficulty: 'Easy',
    duration: 9,
    description: 'Identify and compare shapes like circles, squares, and triangles.',
    points: 12,
    badge: 'Shape Detective',
    questions: [
      {
        id: 's1',
        prompt: 'Which shape has 3 sides?',
        options: ['Triangle', 'Circle', 'Square'],
        answerIndex: 0,
        explanation: 'A triangle has 3 sides.'
      },
      {
        id: 's2',
        prompt: 'Which shape is round?',
        options: ['Rectangle', 'Circle', 'Hexagon'],
        answerIndex: 1,
        explanation: 'A circle is round.'
      },
      {
        id: 's3',
        prompt: 'How many sides does a square have?',
        options: ['3', '4', '5'],
        answerIndex: 1,
        explanation: 'A square has 4 equal sides.'
      }
    ]
  },
  {
    id: 'phonics-path',
    title: 'Phonics Path',
    grade: 'kindergarten',
    category: 'Reading',
    difficulty: 'Easy',
    duration: 11,
    description: 'Match beginning sounds and build simple reading confidence.',
    points: 15,
    badge: 'Sound Builder',
    questions: [
      {
        id: 'p1',
        prompt: 'Which word starts with the /b/ sound?',
        options: ['Dog', 'Ball', 'Sun'],
        answerIndex: 1,
        explanation: 'Ball starts with the /b/ sound.'
      },
      {
        id: 'p2',
        prompt: 'Which word ends with the /t/ sound?',
        options: ['Cat', 'Tree', 'Moon'],
        answerIndex: 0,
        explanation: 'Cat ends with the /t/ sound.'
      },
      {
        id: 'p3',
        prompt: 'Which sound does the letter C make in “cat”?',
        options: ['/k/', '/s/', '/m/'],
        answerIndex: 0,
        explanation: 'In “cat”, C makes the /k/ sound.'
      }
    ]
  },
  {
    id: 'addition-adventure',
    title: 'Addition Adventure',
    grade: 'grades1-2',
    category: 'Math',
    difficulty: 'Easy',
    duration: 12,
    description: 'Practice adding numbers up to 20 using colorful number stories.',
    points: 18,
    badge: 'Math Explorer',
    questions: [
      {
        id: 'ad1',
        prompt: 'What is 6 + 3?',
        options: ['8', '9', '10'],
        answerIndex: 1,
        explanation: '6 + 3 = 9.'
      },
      {
        id: 'ad2',
        prompt: 'What is 8 + 2?',
        options: ['10', '11', '12'],
        answerIndex: 0,
        explanation: '8 + 2 = 10.'
      },
      {
        id: 'ad3',
        prompt: 'If you have 4 cookies and get 2 more, how many cookies?',
        options: ['5', '6', '7'],
        answerIndex: 1,
        explanation: '4 + 2 = 6.'
      }
    ]
  },
  {
    id: 'story-clues',
    title: 'Story Clues',
    grade: 'grades1-2',
    category: 'Reading',
    difficulty: 'Medium',
    duration: 14,
    description: 'Read short passages and discover the main idea and details.',
    points: 20,
    badge: 'Reading Detective',
    questions: [
      {
        id: 'sc1',
        prompt: 'What is the main idea of a story?',
        options: ['The topic or message', 'The punctuation', 'The chapter title'],
        answerIndex: 0,
        explanation: 'The main idea is the big message or topic of the story.'
      },
      {
        id: 'sc2',
        prompt: 'Which detail supports the main idea?',
        options: ['A key fact from the story', 'A random question', 'A different book title'],
        answerIndex: 0,
        explanation: 'A supporting detail gives more information about the story idea.'
      },
      {
        id: 'sc3',
        prompt: 'Why do readers look for clues in a story?',
        options: ['To understand the text better', 'To make it longer', 'To avoid reading'],
        answerIndex: 0,
        explanation: 'Clues help us understand what is happening in the story.'
      }
    ]
  },
  {
    id: 'planet-puzzle',
    title: 'Planet Puzzle',
    grade: 'grades3-5',
    category: 'Science',
    difficulty: 'Medium',
    duration: 16,
    description: 'Explore the solar system and learn how planets are different.',
    points: 25,
    badge: 'Space Explorer',
    questions: [
      {
        id: 'pp1',
        prompt: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter'],
        answerIndex: 1,
        explanation: 'Mars is called the Red Planet.'
      },
      {
        id: 'pp2',
        prompt: 'What do plants need to make food?',
        options: ['Light, water, and air', 'Sand and rocks', 'Only shade'],
        answerIndex: 0,
        explanation: 'Plants need sunlight, water, and air to grow.'
      },
      {
        id: 'pp3',
        prompt: 'Which force pulls things toward Earth?',
        options: ['Gravity', 'Sound', 'Magnetism'],
        answerIndex: 0,
        explanation: 'Gravity pulls objects toward Earth.'
      }
    ]
  },
  {
    id: 'fraction-factory',
    title: 'Fraction Factory',
    grade: 'grades3-5',
    category: 'Math',
    difficulty: 'Medium',
    duration: 15,
    description: 'Build intuition about halves, thirds, and quarters with visuals.',
    points: 24,
    badge: 'Fraction Builder',
    questions: [
      {
        id: 'ff1',
        prompt: 'What is 1/2 of 8?',
        options: ['2', '4', '6'],
        answerIndex: 1,
        explanation: 'Half of 8 is 4.'
      },
      {
        id: 'ff2',
        prompt: 'Which fraction is larger: 1/2 or 1/4?',
        options: ['1/2', '1/4', 'They are equal'],
        answerIndex: 0,
        explanation: 'One half is larger than one quarter.'
      },
      {
        id: 'ff3',
        prompt: 'How many quarters make a whole?',
        options: ['2', '3', '4'],
        answerIndex: 2,
        explanation: 'Four quarters make one whole.'
      }
    ]
  },
  {
    id: 'logic-lab',
    title: 'Logic Lab',
    grade: 'grades6-7',
    category: 'Logic',
    difficulty: 'Hard',
    duration: 18,
    description: 'Use reasoning and patterns to solve puzzles and challenges.',
    points: 30,
    badge: 'Puzzle Master',
    questions: [
      {
        id: 'll1',
        prompt: 'If all squares are shapes, and all shapes are objects, then all squares are:',
        options: ['Objects', 'Circles', 'Numbers'],
        answerIndex: 0,
        explanation: 'Squares are shapes, and all shapes are objects.'
      },
      {
        id: 'll2',
        prompt: 'Find the pattern: 2, 4, 8, 16, ?',
        options: ['18', '24', '32'],
        answerIndex: 2,
        explanation: 'Each number doubles: 2, 4, 8, 16, 32.'
      },
      {
        id: 'll3',
        prompt: 'If a triangle has 3 sides, how many sides does a hexagon have?',
        options: ['5', '6', '7'],
        answerIndex: 1,
        explanation: 'A hexagon has 6 sides.'
      }
    ]
  },
  {
    id: 'stem-sprint',
    title: 'STEM Sprint',
    grade: 'grades6-7',
    category: 'Science',
    difficulty: 'Hard',
    duration: 20,
    description: 'Solve mini science challenges about energy, cells, and engineering.',
    points: 32,
    badge: 'Future Scientist',
    questions: [
      {
        id: 'ss1',
        prompt: 'Which type of energy is stored in food?',
        options: ['Chemical energy', 'Sound energy', 'Light energy'],
        answerIndex: 0,
        explanation: 'Food contains chemical energy.'
      },
      {
        id: 'ss2',
        prompt: 'Which part of a plant makes food?',
        options: ['Leaf', 'Root', 'Stem'],
        answerIndex: 0,
        explanation: 'Leaves use sunlight to make food for the plant.'
      },
      {
        id: 'ss3',
        prompt: 'What is an engineer most likely to do?',
        options: ['Design a bridge', 'Paint a picture', 'Write a story'],
        answerIndex: 0,
        explanation: 'Engineers design and build structures and systems.'
      }
    ]
  }
];

export const gradeLabels: Record<GradeLevel, string> = {
  preschool: 'Preschool',
  kindergarten: 'Kindergarten',
  'grades1-2': 'Grades 1-2',
  'grades3-5': 'Grades 3-5',
  'grades6-7': 'Grades 6-7'
};

export const getLessonsByGrade = (grade: GradeLevel): Lesson[] =>
  lessonSet.filter((lesson) => lesson.grade === grade);

export const getLessonById = (lessonId: string): Lesson | undefined =>
  lessonSet.find((lesson) => lesson.id === lessonId);

export const allLessons = lessonSet;

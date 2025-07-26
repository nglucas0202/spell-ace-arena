export interface Word {
  word: string;
  difficulty: number;
  definition?: string;
}

export interface DifficultyLevel {
  id: string;
  name: string;
  level: number;
  description: string;
  color: string;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    id: 'grade1',
    name: '1st Grade',
    level: 1,
    description: 'Simple words for beginners',
    color: 'text-success'
  },
  {
    id: 'grade3',
    name: '3rd Grade',
    level: 2,
    description: 'Elementary level words',
    color: 'text-accent'
  },
  {
    id: 'grade5',
    name: '5th Grade',
    level: 3,
    description: 'Intermediate vocabulary',
    color: 'text-warning'
  },
  {
    id: 'middle',
    name: 'Middle School',
    level: 4,
    description: 'Advanced middle school words',
    color: 'text-primary'
  },
  {
    id: 'high',
    name: 'High School',
    level: 5,
    description: 'Complex high school vocabulary',
    color: 'text-neon-purple'
  },
  {
    id: 'championship',
    name: 'Championship',
    level: 6,
    description: 'Spelling bee champion level',
    color: 'text-neon-cyan'
  }
];

export const WORD_DATABASE: { [key: string]: Word[] } = {
  grade1: [
    { word: 'cat', difficulty: 1 },
    { word: 'dog', difficulty: 1 },
    { word: 'sun', difficulty: 1 },
    { word: 'run', difficulty: 1 },
    { word: 'fun', difficulty: 1 },
    { word: 'big', difficulty: 1 },
    { word: 'red', difficulty: 1 },
    { word: 'yes', difficulty: 1 },
    { word: 'can', difficulty: 1 },
    { word: 'and', difficulty: 1 },
    { word: 'the', difficulty: 1 },
    { word: 'see', difficulty: 1 },
    { word: 'you', difficulty: 1 },
    { word: 'are', difficulty: 1 },
    { word: 'not', difficulty: 1 },
  ],
  grade3: [
    { word: 'because', difficulty: 2 },
    { word: 'friend', difficulty: 2 },
    { word: 'school', difficulty: 2 },
    { word: 'people', difficulty: 2 },
    { word: 'water', difficulty: 2 },
    { word: 'today', difficulty: 2 },
    { word: 'money', difficulty: 2 },
    { word: 'happy', difficulty: 2 },
    { word: 'laugh', difficulty: 2 },
    { word: 'night', difficulty: 2 },
    { word: 'light', difficulty: 2 },
    { word: 'right', difficulty: 2 },
    { word: 'eight', difficulty: 2 },
    { word: 'might', difficulty: 2 },
    { word: 'sight', difficulty: 2 },
  ],
  grade5: [
    { word: 'beautiful', difficulty: 3 },
    { word: 'different', difficulty: 3 },
    { word: 'important', difficulty: 3 },
    { word: 'remember', difficulty: 3 },
    { word: 'chocolate', difficulty: 3 },
    { word: 'sentence', difficulty: 3 },
    { word: 'surprise', difficulty: 3 },
    { word: 'February', difficulty: 3 },
    { word: 'Wednesday', difficulty: 3 },
    { word: 'knowledge', difficulty: 3 },
    { word: 'shoulder', difficulty: 3 },
    { word: 'thought', difficulty: 3 },
    { word: 'caught', difficulty: 3 },
    { word: 'brought', difficulty: 3 },
    { word: 'through', difficulty: 3 },
  ],
  middle: [
    { word: 'embarrass', difficulty: 4 },
    { word: 'definitely', difficulty: 4 },
    { word: 'restaurant', difficulty: 4 },
    { word: 'necessary', difficulty: 4 },
    { word: 'beginning', difficulty: 4 },
    { word: 'suspicious', difficulty: 4 },
    { word: 'privilege', difficulty: 4 },
    { word: 'rhythm', difficulty: 4 },
    { word: 'lieutenant', difficulty: 4 },
    { word: 'conscience', difficulty: 4 },
    { word: 'fluorescent', difficulty: 4 },
    { word: 'questionnaire', difficulty: 4 },
    { word: 'acknowledge', difficulty: 4 },
    { word: 'pronunciation', difficulty: 4 },
    { word: 'miscellaneous', difficulty: 4 },
  ],
  high: [
    { word: 'pneumonia', difficulty: 5 },
    { word: 'psoriasis', difficulty: 5 },
    { word: 'rhythm', difficulty: 5 },
    { word: 'mnemonic', difficulty: 5 },
    { word: 'prestigious', difficulty: 5 },
    { word: 'bureaucracy', difficulty: 5 },
    { word: 'conscientious', difficulty: 5 },
    { word: 'pharmaceutical', difficulty: 5 },
    { word: 'psychedelic', difficulty: 5 },
    { word: 'reconnaissance', difficulty: 5 },
    { word: 'entrepreneur', difficulty: 5 },
    { word: 'millennium', difficulty: 5 },
    { word: 'surveillance', difficulty: 5 },
    { word: 'acquisition', difficulty: 5 },
    { word: 'pronunciation', difficulty: 5 },
  ],
  championship: [
    { word: 'autochthonous', difficulty: 6 },
    { word: 'perspicacious', difficulty: 6 },
    { word: 'sesquipedalian', difficulty: 6 },
    { word: 'pneumonoultramicroscopicsilicovolcanoconious', difficulty: 6 },
    { word: 'floccinaucinihilipilification', difficulty: 6 },
    { word: 'antidisestablishmentarianism', difficulty: 6 },
    { word: 'pseudopseudohypoparathyroidism', difficulty: 6 },
    { word: 'hippopotomonstrosesquippedaliophobia', difficulty: 6 },
    { word: 'supercalifragilisticexpialidocious', difficulty: 6 },
    { word: 'pneumonoultramicroscopicsilicovolcanoconiosis', difficulty: 6 },
    { word: 'otorhinolaryngological', difficulty: 6 },
    { word: 'radioimmunoelectrophoresis', difficulty: 6 },
    { word: 'psychoneuroendocrinological', difficulty: 6 },
    { word: 'thyroparathyroidectomized', difficulty: 6 },
    { word: 'pneumoencephalographically', difficulty: 6 },
  ]
};

export function getRandomWords(difficulty: string, count: number = 10): Word[] {
  const words = WORD_DATABASE[difficulty] || WORD_DATABASE.grade1;
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getDifficultyById(id: string): DifficultyLevel | undefined {
  return DIFFICULTY_LEVELS.find(level => level.id === id);
}
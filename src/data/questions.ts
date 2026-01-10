export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 
  | 'old-testament'
  | 'new-testament'
  | 'jesus-teachings'
  | 'bible-characters'
  | 'miracles'
  | 'psalms-proverbs'
  | 'general';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  reference: string;
  difficulty: Difficulty;
  category: Category;
}

export const categoryLabels: Record<Category, string> = {
  'old-testament': 'Old Testament',
  'new-testament': 'New Testament',
  'jesus-teachings': "Jesus' Teachings",
  'bible-characters': 'Bible Characters',
  'miracles': 'Miracles',
  'psalms-proverbs': 'Psalms & Proverbs',
  'general': 'General Knowledge',
};

export const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const difficultyPoints: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const questions: Question[] = [
  // OLD TESTAMENT - Easy
  {
    id: 'ot-e-1',
    question: 'Who built the ark to save his family and animals from the great flood?',
    options: ['Abraham', 'Moses', 'Noah', 'David'],
    correctAnswer: 2,
    reference: 'Genesis 6:13-14',
    difficulty: 'easy',
    category: 'old-testament',
  },
  {
    id: 'ot-e-2',
    question: 'What was the first thing God created according to Genesis?',
    options: ['The sun', 'Light', 'Water', 'Animals'],
    correctAnswer: 1,
    reference: 'Genesis 1:3',
    difficulty: 'easy',
    category: 'old-testament',
  },
  {
    id: 'ot-e-3',
    question: 'Who was the first man created by God?',
    options: ['Noah', 'Abraham', 'Adam', 'Moses'],
    correctAnswer: 2,
    reference: 'Genesis 2:7',
    difficulty: 'easy',
    category: 'old-testament',
  },
  {
    id: 'ot-e-4',
    question: 'How many days did God take to create the world?',
    options: ['5 days', '6 days', '7 days', '10 days'],
    correctAnswer: 1,
    reference: 'Genesis 1:31-2:1',
    difficulty: 'easy',
    category: 'old-testament',
  },
  {
    id: 'ot-e-5',
    question: 'What fruit did Eve eat in the Garden of Eden?',
    options: ['Apple', 'Fig', 'The forbidden fruit', 'Pomegranate'],
    correctAnswer: 2,
    reference: 'Genesis 3:6',
    difficulty: 'easy',
    category: 'old-testament',
  },
  // OLD TESTAMENT - Medium
  {
    id: 'ot-m-1',
    question: 'How many plagues did God send upon Egypt?',
    options: ['7', '10', '12', '5'],
    correctAnswer: 1,
    reference: 'Exodus 7-12',
    difficulty: 'medium',
    category: 'old-testament',
  },
  {
    id: 'ot-m-2',
    question: 'Who was sold into slavery by his brothers?',
    options: ['Benjamin', 'Joseph', 'Judah', 'Reuben'],
    correctAnswer: 1,
    reference: 'Genesis 37:28',
    difficulty: 'medium',
    category: 'old-testament',
  },
  {
    id: 'ot-m-3',
    question: 'What did Moses receive on Mount Sinai?',
    options: ['A golden calf', 'The Ten Commandments', 'The Ark of the Covenant', 'Manna'],
    correctAnswer: 1,
    reference: 'Exodus 31:18',
    difficulty: 'medium',
    category: 'old-testament',
  },
  {
    id: 'ot-m-4',
    question: 'Who was the wisest king of Israel?',
    options: ['David', 'Solomon', 'Saul', 'Hezekiah'],
    correctAnswer: 1,
    reference: '1 Kings 4:29-30',
    difficulty: 'medium',
    category: 'old-testament',
  },
  {
    id: 'ot-m-5',
    question: 'What weapon did David use to defeat Goliath?',
    options: ['A sword', 'A spear', 'A sling and stone', 'A bow and arrow'],
    correctAnswer: 2,
    reference: '1 Samuel 17:49',
    difficulty: 'medium',
    category: 'old-testament',
  },
  // OLD TESTAMENT - Hard
  {
    id: 'ot-h-1',
    question: 'How old was Methuselah when he died, making him the oldest person in the Bible?',
    options: ['900 years', '950 years', '969 years', '912 years'],
    correctAnswer: 2,
    reference: 'Genesis 5:27',
    difficulty: 'hard',
    category: 'old-testament',
  },
  {
    id: 'ot-h-2',
    question: "What was the name of Abraham's nephew who escaped Sodom?",
    options: ['Ishmael', 'Lot', 'Eliezer', 'Nahor'],
    correctAnswer: 1,
    reference: 'Genesis 19:1-29',
    difficulty: 'hard',
    category: 'old-testament',
  },
  {
    id: 'ot-h-3',
    question: 'Which prophet was taken up to heaven in a chariot of fire?',
    options: ['Elisha', 'Isaiah', 'Elijah', 'Ezekiel'],
    correctAnswer: 2,
    reference: '2 Kings 2:11',
    difficulty: 'hard',
    category: 'old-testament',
  },
  {
    id: 'ot-h-4',
    question: 'What was the name of the valley where Ezekiel saw the vision of dry bones?',
    options: ['Valley of Hinnom', 'Valley of Dry Bones', 'Valley of Jehoshaphat', 'Valley of Achor'],
    correctAnswer: 1,
    reference: 'Ezekiel 37:1-2',
    difficulty: 'hard',
    category: 'old-testament',
  },

  // NEW TESTAMENT - Easy
  {
    id: 'nt-e-1',
    question: 'In what city was Jesus born?',
    options: ['Nazareth', 'Jerusalem', 'Bethlehem', 'Capernaum'],
    correctAnswer: 2,
    reference: 'Matthew 2:1',
    difficulty: 'easy',
    category: 'new-testament',
  },
  {
    id: 'nt-e-2',
    question: 'How many disciples did Jesus have?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    reference: 'Matthew 10:1-4',
    difficulty: 'easy',
    category: 'new-testament',
  },
  {
    id: 'nt-e-3',
    question: "What was Jesus' earthly father's occupation?",
    options: ['Fisherman', 'Carpenter', 'Tax collector', 'Shepherd'],
    correctAnswer: 1,
    reference: 'Matthew 13:55',
    difficulty: 'easy',
    category: 'new-testament',
  },
  {
    id: 'nt-e-4',
    question: 'Who baptized Jesus?',
    options: ['Peter', 'Paul', 'John the Baptist', 'Andrew'],
    correctAnswer: 2,
    reference: 'Matthew 3:13-17',
    difficulty: 'easy',
    category: 'new-testament',
  },
  {
    id: 'nt-e-5',
    question: 'What is the last book of the New Testament?',
    options: ['Jude', 'Revelation', 'Hebrews', 'Acts'],
    correctAnswer: 1,
    reference: 'Revelation 22:21',
    difficulty: 'easy',
    category: 'new-testament',
  },
  // NEW TESTAMENT - Medium
  {
    id: 'nt-m-1',
    question: 'Who denied Jesus three times before the rooster crowed?',
    options: ['John', 'Peter', 'Thomas', 'Judas'],
    correctAnswer: 1,
    reference: 'Matthew 26:69-75',
    difficulty: 'medium',
    category: 'new-testament',
  },
  {
    id: 'nt-m-2',
    question: 'How many books are in the New Testament?',
    options: ['25', '27', '29', '31'],
    correctAnswer: 1,
    reference: 'New Testament Canon',
    difficulty: 'medium',
    category: 'new-testament',
  },
  {
    id: 'nt-m-3',
    question: 'Who wrote most of the epistles in the New Testament?',
    options: ['Peter', 'John', 'Paul', 'James'],
    correctAnswer: 2,
    reference: 'New Testament Epistles',
    difficulty: 'medium',
    category: 'new-testament',
  },
  {
    id: 'nt-m-4',
    question: 'What was Paul\'s name before his conversion?',
    options: ['Simon', 'Saul', 'Samuel', 'Stephen'],
    correctAnswer: 1,
    reference: 'Acts 13:9',
    difficulty: 'medium',
    category: 'new-testament',
  },
  {
    id: 'nt-m-5',
    question: 'On which day of the week did Jesus rise from the dead?',
    options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
    correctAnswer: 2,
    reference: 'Mark 16:9',
    difficulty: 'medium',
    category: 'new-testament',
  },
  // NEW TESTAMENT - Hard
  {
    id: 'nt-h-1',
    question: 'What were the names of the two thieves crucified with Jesus?',
    options: ['They are not named in the Bible', 'Dismas and Gestas', 'Barabbas and Judas', 'Simon and Andrew'],
    correctAnswer: 0,
    reference: 'Luke 23:32-33',
    difficulty: 'hard',
    category: 'new-testament',
  },
  {
    id: 'nt-h-2',
    question: 'In what language was most of the New Testament originally written?',
    options: ['Hebrew', 'Aramaic', 'Greek', 'Latin'],
    correctAnswer: 2,
    reference: 'New Testament Scholarship',
    difficulty: 'hard',
    category: 'new-testament',
  },
  {
    id: 'nt-h-3',
    question: 'How many churches are addressed in the Book of Revelation?',
    options: ['5', '7', '10', '12'],
    correctAnswer: 1,
    reference: 'Revelation 1:11',
    difficulty: 'hard',
    category: 'new-testament',
  },

  // JESUS' TEACHINGS - Easy
  {
    id: 'jt-e-1',
    question: 'What prayer did Jesus teach his disciples?',
    options: ['The Hail Mary', 'The Lord\'s Prayer', 'The Apostles\' Creed', 'The Rosary'],
    correctAnswer: 1,
    reference: 'Matthew 6:9-13',
    difficulty: 'easy',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-e-2',
    question: 'Complete: "Love your neighbor as ___"',
    options: ['Your enemy', 'Yourself', 'Your brother', 'God'],
    correctAnswer: 1,
    reference: 'Matthew 22:39',
    difficulty: 'easy',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-e-3',
    question: 'What famous sermon did Jesus preach on a mountain?',
    options: ['Sermon on the Plain', 'Sermon on the Mount', 'Sermon at the Temple', 'Sermon by the Sea'],
    correctAnswer: 1,
    reference: 'Matthew 5-7',
    difficulty: 'easy',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-e-4',
    question: 'What did Jesus say is the greatest commandment?',
    options: ['Do not steal', 'Love God with all your heart', 'Honor your parents', 'Keep the Sabbath'],
    correctAnswer: 1,
    reference: 'Matthew 22:37-38',
    difficulty: 'easy',
    category: 'jesus-teachings',
  },
  // JESUS' TEACHINGS - Medium
  {
    id: 'jt-m-1',
    question: 'In the Parable of the Sower, what does the seed represent?',
    options: ['Faith', 'The Word of God', 'Good works', 'Prayer'],
    correctAnswer: 1,
    reference: 'Luke 8:11',
    difficulty: 'medium',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-m-2',
    question: 'How many Beatitudes did Jesus teach?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    reference: 'Matthew 5:3-12',
    difficulty: 'medium',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-m-3',
    question: 'In the Parable of the Prodigal Son, what did the father do when his son returned?',
    options: ['Punished him', 'Ignored him', 'Celebrated with a feast', 'Made him a servant'],
    correctAnswer: 2,
    reference: 'Luke 15:22-24',
    difficulty: 'medium',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-m-4',
    question: 'What did Jesus say about judging others?',
    options: ['Judge fairly', 'Do not judge', 'Only judge the wicked', 'Let elders judge'],
    correctAnswer: 1,
    reference: 'Matthew 7:1',
    difficulty: 'medium',
    category: 'jesus-teachings',
  },
  // JESUS' TEACHINGS - Hard
  {
    id: 'jt-h-1',
    question: 'In the Parable of the Talents, how many talents did the master give to the first servant?',
    options: ['1', '2', '5', '10'],
    correctAnswer: 2,
    reference: 'Matthew 25:15',
    difficulty: 'hard',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-h-2',
    question: 'What did Jesus say is the "eye of the needle" in relation to?',
    options: ['Prayer', 'A rich man entering heaven', 'Threading clothes', 'Building temples'],
    correctAnswer: 1,
    reference: 'Matthew 19:24',
    difficulty: 'hard',
    category: 'jesus-teachings',
  },
  {
    id: 'jt-h-3',
    question: 'How many times did Jesus say we should forgive our brother?',
    options: ['7 times', '49 times', '70 times 7', '100 times'],
    correctAnswer: 2,
    reference: 'Matthew 18:22',
    difficulty: 'hard',
    category: 'jesus-teachings',
  },

  // BIBLE CHARACTERS - Easy
  {
    id: 'bc-e-1',
    question: 'Who was swallowed by a great fish?',
    options: ['Jonah', 'Peter', 'Paul', 'Elijah'],
    correctAnswer: 0,
    reference: 'Jonah 1:17',
    difficulty: 'easy',
    category: 'bible-characters',
  },
  {
    id: 'bc-e-2',
    question: 'Who was the mother of Jesus?',
    options: ['Elizabeth', 'Mary', 'Martha', 'Ruth'],
    correctAnswer: 1,
    reference: 'Matthew 1:18',
    difficulty: 'easy',
    category: 'bible-characters',
  },
  {
    id: 'bc-e-3',
    question: 'Who betrayed Jesus for 30 pieces of silver?',
    options: ['Peter', 'Thomas', 'Judas Iscariot', 'Bartholomew'],
    correctAnswer: 2,
    reference: 'Matthew 26:14-16',
    difficulty: 'easy',
    category: 'bible-characters',
  },
  {
    id: 'bc-e-4',
    question: 'Who was the first king of Israel?',
    options: ['David', 'Solomon', 'Saul', 'Samuel'],
    correctAnswer: 2,
    reference: '1 Samuel 10:1',
    difficulty: 'easy',
    category: 'bible-characters',
  },
  {
    id: 'bc-e-5',
    question: 'Who led the Israelites out of Egypt?',
    options: ['Abraham', 'Moses', 'Joshua', 'David'],
    correctAnswer: 1,
    reference: 'Exodus 3:10',
    difficulty: 'easy',
    category: 'bible-characters',
  },
  // BIBLE CHARACTERS - Medium
  {
    id: 'bc-m-1',
    question: 'Who was the strongest man in the Bible?',
    options: ['Goliath', 'Samson', 'David', 'Moses'],
    correctAnswer: 1,
    reference: 'Judges 14-16',
    difficulty: 'medium',
    category: 'bible-characters',
  },
  {
    id: 'bc-m-2',
    question: 'Who was the wife of Abraham?',
    options: ['Rachel', 'Leah', 'Sarah', 'Rebekah'],
    correctAnswer: 2,
    reference: 'Genesis 17:15',
    difficulty: 'medium',
    category: 'bible-characters',
  },
  {
    id: 'bc-m-3',
    question: 'Who was the twin brother of Jacob?',
    options: ['Ishmael', 'Esau', 'Laban', 'Isaac'],
    correctAnswer: 1,
    reference: 'Genesis 25:25-26',
    difficulty: 'medium',
    category: 'bible-characters',
  },
  {
    id: 'bc-m-4',
    question: 'Who was the prophet that anointed David as king?',
    options: ['Elijah', 'Elisha', 'Samuel', 'Nathan'],
    correctAnswer: 2,
    reference: '1 Samuel 16:13',
    difficulty: 'medium',
    category: 'bible-characters',
  },
  // BIBLE CHARACTERS - Hard
  {
    id: 'bc-h-1',
    question: 'Who was the Roman governor who sentenced Jesus to death?',
    options: ['Herod', 'Pilate', 'Caesar', 'Felix'],
    correctAnswer: 1,
    reference: 'Matthew 27:24-26',
    difficulty: 'hard',
    category: 'bible-characters',
  },
  {
    id: 'bc-h-2',
    question: 'Who was the queen that saved the Jewish people from Haman\'s plot?',
    options: ['Jezebel', 'Bathsheba', 'Esther', 'Vashti'],
    correctAnswer: 2,
    reference: 'Esther 7:3-4',
    difficulty: 'hard',
    category: 'bible-characters',
  },
  {
    id: 'bc-h-3',
    question: 'Who was the high priest during Jesus\' trial?',
    options: ['Annas', 'Caiaphas', 'Zechariah', 'Eli'],
    correctAnswer: 1,
    reference: 'Matthew 26:57',
    difficulty: 'hard',
    category: 'bible-characters',
  },

  // MIRACLES - Easy
  {
    id: 'mi-e-1',
    question: 'What was Jesus\' first miracle?',
    options: ['Walking on water', 'Feeding the 5000', 'Turning water into wine', 'Healing a blind man'],
    correctAnswer: 2,
    reference: 'John 2:1-11',
    difficulty: 'easy',
    category: 'miracles',
  },
  {
    id: 'mi-e-2',
    question: 'How many loaves of bread did Jesus use to feed the 5000?',
    options: ['3', '5', '7', '12'],
    correctAnswer: 1,
    reference: 'Matthew 14:17-21',
    difficulty: 'easy',
    category: 'miracles',
  },
  {
    id: 'mi-e-3',
    question: 'Who did Jesus raise from the dead after four days?',
    options: ['Peter', 'Lazarus', 'Jairus\' daughter', 'The widow\'s son'],
    correctAnswer: 1,
    reference: 'John 11:43-44',
    difficulty: 'easy',
    category: 'miracles',
  },
  {
    id: 'mi-e-4',
    question: 'What did Jesus walk on?',
    options: ['Fire', 'Hot coals', 'Water', 'Sand'],
    correctAnswer: 2,
    reference: 'Matthew 14:25',
    difficulty: 'easy',
    category: 'miracles',
  },
  // MIRACLES - Medium
  {
    id: 'mi-m-1',
    question: 'How many fish were caught in the miraculous catch of fish after Jesus\' resurrection?',
    options: ['100', '120', '153', '200'],
    correctAnswer: 2,
    reference: 'John 21:11',
    difficulty: 'medium',
    category: 'miracles',
  },
  {
    id: 'mi-m-2',
    question: 'Who was healed after touching the hem of Jesus\' garment?',
    options: ['A woman with a blood issue', 'A blind man', 'A leper', 'A paralytic'],
    correctAnswer: 0,
    reference: 'Matthew 9:20-22',
    difficulty: 'medium',
    category: 'miracles',
  },
  {
    id: 'mi-m-3',
    question: 'Which disciple walked on water with Jesus?',
    options: ['John', 'James', 'Peter', 'Andrew'],
    correctAnswer: 2,
    reference: 'Matthew 14:29',
    difficulty: 'medium',
    category: 'miracles',
  },
  {
    id: 'mi-m-4',
    question: 'What miracle did Elijah perform on Mount Carmel?',
    options: ['Parted a river', 'Called fire from heaven', 'Raised the dead', 'Multiplied oil'],
    correctAnswer: 1,
    reference: '1 Kings 18:38',
    difficulty: 'medium',
    category: 'miracles',
  },
  // MIRACLES - Hard
  {
    id: 'mi-h-1',
    question: 'How many lepers did Jesus heal who did not return to thank him?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    reference: 'Luke 17:17',
    difficulty: 'hard',
    category: 'miracles',
  },
  {
    id: 'mi-h-2',
    question: 'In which pool was the paralytic man healed by Jesus in Jerusalem?',
    options: ['Pool of Siloam', 'Pool of Bethesda', 'Pool of Gihon', 'Pool of Solomon'],
    correctAnswer: 1,
    reference: 'John 5:2-9',
    difficulty: 'hard',
    category: 'miracles',
  },
  {
    id: 'mi-h-3',
    question: 'What was the name of the man whose ear Peter cut off and Jesus healed?',
    options: ['Malchus', 'Barabbas', 'Nicodemus', 'Lazarus'],
    correctAnswer: 0,
    reference: 'John 18:10, Luke 22:51',
    difficulty: 'hard',
    category: 'miracles',
  },

  // PSALMS & PROVERBS - Easy
  {
    id: 'pp-e-1',
    question: 'Complete: "The Lord is my shepherd, I shall not ___"',
    options: ['Fear', 'Want', 'Worry', 'Fall'],
    correctAnswer: 1,
    reference: 'Psalm 23:1',
    difficulty: 'easy',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-e-2',
    question: 'Which book says "The fear of the Lord is the beginning of wisdom"?',
    options: ['Psalms', 'Proverbs', 'Ecclesiastes', 'Job'],
    correctAnswer: 1,
    reference: 'Proverbs 9:10',
    difficulty: 'easy',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-e-3',
    question: 'Who wrote most of the Psalms?',
    options: ['Solomon', 'Moses', 'David', 'Asaph'],
    correctAnswer: 2,
    reference: 'Book of Psalms',
    difficulty: 'easy',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-e-4',
    question: 'How many Psalms are there in the Bible?',
    options: ['100', '119', '150', '200'],
    correctAnswer: 2,
    reference: 'Book of Psalms',
    difficulty: 'easy',
    category: 'psalms-proverbs',
  },
  // PSALMS & PROVERBS - Medium
  {
    id: 'pp-m-1',
    question: 'Which Psalm is known as the "shepherd\'s psalm"?',
    options: ['Psalm 1', 'Psalm 23', 'Psalm 91', 'Psalm 119'],
    correctAnswer: 1,
    reference: 'Psalm 23',
    difficulty: 'medium',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-m-2',
    question: 'Which is the longest chapter in the Bible?',
    options: ['Psalm 117', 'Psalm 118', 'Psalm 119', 'Psalm 150'],
    correctAnswer: 2,
    reference: 'Psalm 119',
    difficulty: 'medium',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-m-3',
    question: 'Complete: "Train up a child in the way he should go, and when he is old..."',
    options: ['He will prosper', 'He will not depart from it', 'He will teach others', 'He will be blessed'],
    correctAnswer: 1,
    reference: 'Proverbs 22:6',
    difficulty: 'medium',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-m-4',
    question: 'Who is credited with writing most of the Proverbs?',
    options: ['David', 'Solomon', 'Moses', 'Samuel'],
    correctAnswer: 1,
    reference: 'Proverbs 1:1',
    difficulty: 'medium',
    category: 'psalms-proverbs',
  },
  // PSALMS & PROVERBS - Hard
  {
    id: 'pp-h-1',
    question: 'Which Psalm begins with "My God, my God, why have you forsaken me?"',
    options: ['Psalm 22', 'Psalm 51', 'Psalm 69', 'Psalm 88'],
    correctAnswer: 0,
    reference: 'Psalm 22:1',
    difficulty: 'hard',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-h-2',
    question: 'In Proverbs 31, what is described as "more precious than rubies"?',
    options: ['Wisdom', 'A virtuous woman', 'Knowledge', 'Understanding'],
    correctAnswer: 1,
    reference: 'Proverbs 31:10',
    difficulty: 'hard',
    category: 'psalms-proverbs',
  },
  {
    id: 'pp-h-3',
    question: 'Which Psalm was written after David\'s sin with Bathsheba?',
    options: ['Psalm 23', 'Psalm 32', 'Psalm 51', 'Psalm 103'],
    correctAnswer: 2,
    reference: 'Psalm 51 (superscription)',
    difficulty: 'hard',
    category: 'psalms-proverbs',
  },

  // GENERAL KNOWLEDGE - Easy
  {
    id: 'gk-e-1',
    question: 'How many books are in the Bible?',
    options: ['63', '66', '69', '72'],
    correctAnswer: 1,
    reference: 'Biblical Canon',
    difficulty: 'easy',
    category: 'general',
  },
  {
    id: 'gk-e-2',
    question: 'What is the first book of the Bible?',
    options: ['Exodus', 'Genesis', 'Leviticus', 'Numbers'],
    correctAnswer: 1,
    reference: 'Genesis 1:1',
    difficulty: 'easy',
    category: 'general',
  },
  {
    id: 'gk-e-3',
    question: 'What are the first four books of the New Testament called?',
    options: ['Epistles', 'Gospels', 'Prophets', 'Psalms'],
    correctAnswer: 1,
    reference: 'New Testament Structure',
    difficulty: 'easy',
    category: 'general',
  },
  {
    id: 'gk-e-4',
    question: 'What is the shortest verse in the Bible?',
    options: ['Jesus wept', 'God is love', 'Pray always', 'Rejoice always'],
    correctAnswer: 0,
    reference: 'John 11:35',
    difficulty: 'easy',
    category: 'general',
  },
  {
    id: 'gk-e-5',
    question: 'What is the Golden Rule?',
    options: ['Love God above all', 'Do unto others as you would have them do unto you', 'Keep the Sabbath holy', 'Honor your parents'],
    correctAnswer: 1,
    reference: 'Matthew 7:12',
    difficulty: 'easy',
    category: 'general',
  },
  // GENERAL KNOWLEDGE - Medium
  {
    id: 'gk-m-1',
    question: 'What does "Gospel" mean?',
    options: ['Holy book', 'Good news', 'Divine teaching', 'Sacred story'],
    correctAnswer: 1,
    reference: 'Etymology of Gospel',
    difficulty: 'medium',
    category: 'general',
  },
  {
    id: 'gk-m-2',
    question: 'How many books are in the Old Testament?',
    options: ['36', '37', '38', '39'],
    correctAnswer: 3,
    reference: 'Old Testament Canon',
    difficulty: 'medium',
    category: 'general',
  },
  {
    id: 'gk-m-3',
    question: 'What is the longest book of the Bible?',
    options: ['Genesis', 'Isaiah', 'Psalms', 'Jeremiah'],
    correctAnswer: 2,
    reference: 'Book of Psalms',
    difficulty: 'medium',
    category: 'general',
  },
  {
    id: 'gk-m-4',
    question: 'What is the middle book of the Bible?',
    options: ['Psalms', 'Proverbs', 'Micah', 'Nahum'],
    correctAnswer: 0,
    reference: 'Biblical Structure',
    difficulty: 'medium',
    category: 'general',
  },
  // GENERAL KNOWLEDGE - Hard
  {
    id: 'gk-h-1',
    question: 'What is the only book in the Bible that does not mention God?',
    options: ['Ruth', 'Esther', 'Song of Solomon', 'Philemon'],
    correctAnswer: 1,
    reference: 'Book of Esther',
    difficulty: 'hard',
    category: 'general',
  },
  {
    id: 'gk-h-2',
    question: 'Which two Old Testament figures never died according to the Bible?',
    options: ['Moses and Elijah', 'Enoch and Elijah', 'Abraham and Moses', 'David and Solomon'],
    correctAnswer: 1,
    reference: 'Genesis 5:24, 2 Kings 2:11',
    difficulty: 'hard',
    category: 'general',
  },
  {
    id: 'gk-h-3',
    question: 'What is the only sin that cannot be forgiven according to Jesus?',
    options: ['Murder', 'Adultery', 'Blasphemy against the Holy Spirit', 'Idol worship'],
    correctAnswer: 2,
    reference: 'Matthew 12:31-32',
    difficulty: 'hard',
    category: 'general',
  },
];

export function getQuestionsByCategory(category: Category | 'all'): Question[] {
  if (category === 'all') return questions;
  return questions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: Difficulty | 'all'): Question[] {
  if (difficulty === 'all') return questions;
  return questions.filter(q => q.difficulty === difficulty);
}

export function getFilteredQuestions(category: Category | 'all', difficulty: Difficulty | 'all'): Question[] {
  return questions.filter(q => {
    const categoryMatch = category === 'all' || q.category === category;
    const difficultyMatch = difficulty === 'all' || q.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomQuestions(
  count: number,
  category: Category | 'all',
  difficulty: Difficulty | 'all',
  excludeIds: string[] = []
): Question[] {
  const filtered = getFilteredQuestions(category, difficulty)
    .filter(q => !excludeIds.includes(q.id));
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

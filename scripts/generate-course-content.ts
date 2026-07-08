/**
 * Course Content Generator for KidQuest Learning Platform
 * Generates realistic kid-friendly course content with videos, quizzes, and questions
 * 
 * Usage:
 *   npx ts-node scripts/generate-course-content.ts
 * 
 * This script outputs course data as JSON that can be imported into the backend
 */

// Types
interface CourseData {
  title: string;
  description: string;
  instructor: string;
  videos: VideoData[];
}

interface VideoData {
  title: string;
  description: string;
  duration: number;
  orderNumber: number;
  quiz: QuizData;
}

interface QuizData {
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: QuestionData[];
}

interface QuestionData {
  questionText: string;
  questionType: string;
  points: number;
  options: string[];
  correctAnswer: string;
}

interface AnswerData {
  answerText: string;
  isCorrect: boolean;
}

// Course categories with video topics
const courseCategories: Record<string, CourseData> = {
  'Math Adventures': {
    title: 'Math Adventures',
    description: 'Join us on an exciting journey through the world of numbers! Learn addition, subtraction, multiplication, division, fractions, and geometry with fun activities and games.',
    instructor: 'Professor Numbers',
    videos: [
      {
        title: 'Addition Magic',
        description: 'Discover the magic of adding numbers together! Learn how to solve addition problems with fun examples and interactive exercises.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Addition Magic Quiz',
          description: 'Test your addition skills!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🧮 What is 3 + 5?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['6', '7', '8', '9'],
              correctAnswer: '8',
            },
            {
              questionText: '🌟 If you have 2 apples and get 4 more, how many apples do you have?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['5', '6', '7', '8'],
              correctAnswer: '6',
            },
            {
              questionText: '🎈 What is 7 + 2?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['8', '9', '10', '11'],
              correctAnswer: '9',
            },
            {
              questionText: '🍪 Sarah has 5 cookies and buys 3 more. How many cookies does she have?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['6', '7', '8', '9'],
              correctAnswer: '8',
            },
          ],
        },
      },
      {
        title: 'Subtraction Secrets',
        description: 'Unlock the secrets of subtraction! Learn how to take away numbers and find the difference with exciting examples.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Subtraction Secrets Quiz',
          description: 'Show off your subtraction skills!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎁 What is 10 - 4?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['5', '6', '7', '8'],
              correctAnswer: '6',
            },
            {
              questionText: '🍦 If you have 8 ice creams and eat 3, how many are left?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['4', '5', '6', '7'],
              correctAnswer: '5',
            },
            {
              questionText: '🎈 What is 9 - 5?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['3', '4', '5', '6'],
              correctAnswer: '4',
            },
            {
              questionText: '📚 Tom had 7 books and gave 2 to his friend. How many books does Tom have now?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['4', '5', '6', '7'],
              correctAnswer: '5',
            },
          ],
        },
      },
      {
        title: 'Multiplication Heroes',
        description: 'Become a multiplication hero! Learn times tables and discover how multiplication makes math easier and faster.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Multiplication Heroes Quiz',
          description: 'Prove you are a multiplication hero!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '⭐ What is 3 × 4?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['10', '11', '12', '13'],
              correctAnswer: '12',
            },
            {
              questionText: '🎪 If there are 5 rows with 2 chairs each, how many chairs are there?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['8', '9', '10', '11'],
              correctAnswer: '10',
            },
            {
              questionText: '🍕 What is 2 × 6?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['10', '11', '12', '13'],
              correctAnswer: '12',
            },
            {
              questionText: '🎁 Each gift bag has 3 candies. If you have 4 gift bags, how many candies total?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['9', '10', '11', '12'],
              correctAnswer: '12',
            },
          ],
        },
      },
      {
        title: 'Division Detectives',
        description: 'Solve mysteries with division! Learn how to share things equally and become a division detective.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Division Detectives Quiz',
          description: 'Solve these division mysteries!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🍪 What is 12 ÷ 3?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['3', '4', '5', '6'],
              correctAnswer: '4',
            },
            {
              questionText: '🎈 If you share 8 balloons among 4 friends, how many does each friend get?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['1', '2', '3', '4'],
              correctAnswer: '2',
            },
            {
              questionText: '📚 What is 15 ÷ 5?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['2', '3', '4', '5'],
              correctAnswer: '3',
            },
            {
              questionText: '🍕 If 10 pizza slices are shared equally among 2 people, how many slices does each person get?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['4', '5', '6', '7'],
              correctAnswer: '5',
            },
          ],
        },
      },
      {
        title: 'Fraction Fun',
        description: 'Have fun with fractions! Learn about halves, quarters, and more with colorful examples and activities.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Fraction Fun Quiz',
          description: 'Test your fraction knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🍕 What fraction represents one part of two equal parts?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['1/3', '1/2', '1/4', '2/3'],
              correctAnswer: '1/2',
            },
            {
              questionText: '🍫 If you have a chocolate bar divided into 4 equal pieces and eat 1 piece, what fraction did you eat?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['1/2', '1/3', '1/4', '2/4'],
              correctAnswer: '1/4',
            },
            {
              questionText: '🍊 What fraction is one part of three equal parts?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['1/2', '1/3', '1/4', '2/3'],
              correctAnswer: '1/3',
            },
            {
              questionText: '🍕 A pizza is cut into 8 slices. If you eat 2 slices, what fraction of the pizza did you eat?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['1/4', '1/3', '1/2', '2/8'],
              correctAnswer: '1/4',
            },
          ],
        },
      },
      {
        title: 'Geometry Galaxy',
        description: 'Explore the galaxy of shapes! Learn about circles, squares, triangles, and other geometric shapes in space.',
        duration: 600,
        orderNumber: 6,
        quiz: {
          title: 'Geometry Galaxy Quiz',
          description: 'Navigate through shapes!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🔷 How many sides does a triangle have?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['2', '3', '4', '5'],
              correctAnswer: '3',
            },
            {
              questionText: '⬜ What shape has 4 equal sides and 4 right angles?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Triangle', 'Circle', 'Square', 'Rectangle'],
              correctAnswer: 'Square',
            },
            {
              questionText: '⭕ Which shape has no corners and is perfectly round?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
              correctAnswer: 'Circle',
            },
            {
              questionText: '🔺 How many corners does a triangle have?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['2', '3', '4', '5'],
              correctAnswer: '3',
            },
          ],
        },
      },
    ],
  },
  'Science Explorers': {
    title: 'Science Explorers',
    description: 'Embark on amazing scientific adventures! Explore the solar system, dinosaurs, plants, weather, and the human body.',
    instructor: 'Dr. Discovery',
    videos: [
      {
        title: 'Solar System Safari',
        description: 'Take a wild safari through the solar system! Visit planets, moons, and learn about our cosmic neighborhood.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Solar System Safari Quiz',
          description: 'Test your space knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌍 What planet do we live on?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Mars', 'Venus', 'Earth', 'Jupiter'],
              correctAnswer: 'Earth',
            },
            {
              questionText: '☀️ What is the star at the center of our solar system?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['The Moon', 'The Sun', 'Mars', 'Venus'],
              correctAnswer: 'The Sun',
            },
            {
              questionText: '🌕 What is Earth\'s natural satellite?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['The Sun', 'The Moon', 'Mars', 'A Star'],
              correctAnswer: 'The Moon',
            },
            {
              questionText: '🔴 Which planet is known as the Red Planet?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
              correctAnswer: 'Mars',
            },
          ],
        },
      },
      {
        title: 'Dinosaur Discovery',
        description: 'Travel back in time to discover amazing dinosaurs! Learn about T-Rex, Triceratops, and other prehistoric creatures.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Dinosaur Discovery Quiz',
          description: 'How much do you know about dinosaurs?',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🦕 What do we call animals that lived millions of years ago?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Mammals', 'Dinosaurs', 'Birds', 'Fish'],
              correctAnswer: 'Dinosaurs',
            },
            {
              questionText: '🦖 Which dinosaur had tiny arms and sharp teeth?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Triceratops', 'T-Rex', 'Brachiosaurus', 'Stegosaurus'],
              correctAnswer: 'T-Rex',
            },
            {
              questionText: '🥚 How did most dinosaurs have babies?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['They gave live birth', 'They laid eggs', 'They grew from seeds', 'They appeared from mud'],
              correctAnswer: 'They laid eggs',
            },
            {
              questionText: '🌿 What did most herbivore dinosaurs eat?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Meat', 'Plants', 'Other dinosaurs', 'Insects'],
              correctAnswer: 'Plants',
            },
          ],
        },
      },
      {
        title: 'Plant Power',
        description: 'Discover the amazing power of plants! Learn about photosynthesis, how plants grow, and why they are important.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Plant Power Quiz',
          description: 'Test your plant knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌱 What do plants need to grow?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Only water', 'Sunlight, water, and air', 'Only sunlight', 'Only soil'],
              correctAnswer: 'Sunlight, water, and air',
            },
            {
              questionText: '🌿 What process do plants use to make their own food?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Digestion', 'Photosynthesis', 'Respiration', 'Circulation'],
              correctAnswer: 'Photosynthesis',
            },
            {
              questionText: '🌳 What gas do plants take in from the air?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
              correctAnswer: 'Carbon dioxide',
            },
            {
              questionText: '🌻 What gas do plants release into the air?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
              correctAnswer: 'Oxygen',
            },
          ],
        },
      },
      {
        title: 'Water Cycle Wizard',
        description: 'Become a water cycle wizard! Learn how water moves through our world in evaporation, condensation, and precipitation.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Water Cycle Wizard Quiz',
          description: 'Cast your knowledge about the water cycle!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '☀️ What is it called when water turns into vapor from heat?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Condensation', 'Evaporation', 'Precipitation', 'Collection'],
              correctAnswer: 'Evaporation',
            },
            {
              questionText: '☁️ What is it called when water vapor cools and forms clouds?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
              correctAnswer: 'Condensation',
            },
            {
              questionText: '🌧️ What is it called when water falls from clouds as rain or snow?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
              correctAnswer: 'Precipitation',
            },
            {
              questionText: '💧 Where does rainwater collect after falling?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Only in the sky', 'In oceans, lakes, and rivers', 'Only in clouds', 'Only in the ground'],
              correctAnswer: 'In oceans, lakes, and rivers',
            },
          ],
        },
      },
      {
        title: 'Weather Wonders',
        description: 'Explore the wonders of weather! Learn about rain, snow, wind, and how weather changes throughout the seasons.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Weather Wonders Quiz',
          description: 'How much do you know about weather?',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌈 What causes rain?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Clouds get too heavy with water', 'The sun gets too hot', 'Wind blows too hard', 'The ground shakes'],
              correctAnswer: 'Clouds get too heavy with water',
            },
            {
              questionText: '❄️ What type of precipitation falls as frozen crystals?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rain', 'Snow', 'Hail', 'Sleet'],
              correctAnswer: 'Snow',
            },
            {
              questionText: '💨 What is moving air called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rain', 'Wind', 'Clouds', 'Fog'],
              correctAnswer: 'Wind',
            },
            {
              questionText: '🌡️ What do we use to measure temperature?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rain gauge', 'Thermometer', 'Wind vane', 'Barometer'],
              correctAnswer: 'Thermometer',
            },
          ],
        },
      },
      {
        title: 'Body Systems',
        description: 'Journey through the human body! Learn about the heart, lungs, brain, and other amazing body systems.',
        duration: 600,
        orderNumber: 6,
        quiz: {
          title: 'Body Systems Quiz',
          description: 'Test your knowledge of the human body!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '❤️ What organ pumps blood through your body?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Brain', 'Lungs', 'Heart', 'Stomach'],
              correctAnswer: 'Heart',
            },
            {
              questionText: '🫁 What organ helps you breathe?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Heart', 'Lungs', 'Brain', 'Liver'],
              correctAnswer: 'Lungs',
            },
            {
              questionText: '🧠 What is the control center of your body?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Heart', 'Lungs', 'Brain', 'Stomach'],
              correctAnswer: 'Brain',
            },
            {
              questionText: '💪 What do your bones help you do?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Breathe', 'Think', 'Move and support your body', 'Digest food'],
              correctAnswer: 'Move and support your body',
            },
          ],
        },
      },
    ],
  },
  'Language Arts': {
    title: 'Language Arts',
    description: 'Explore the wonderful world of words! Learn grammar, vocabulary, reading comprehension, and creative writing.',
    instructor: 'Ms. Wordsmith',
    videos: [
      {
        title: 'Alphabet Adventure',
        description: 'Go on an adventure through the alphabet! Learn letters, sounds, and how to form words.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Alphabet Adventure Quiz',
          description: 'Test your alphabet knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🔤 What letter comes after A?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['B', 'C', 'D', 'E'],
              correctAnswer: 'B',
            },
            {
              questionText: '📝 How many letters are in the English alphabet?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['24', '25', '26', '27'],
              correctAnswer: '26',
            },
            {
              questionText: '🎵 What sound does the letter B make?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['/a/', '/b/', '/c/', '/d/'],
              correctAnswer: '/b/',
            },
            {
              questionText: '🌟 Which letter comes before D?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A', 'B', 'C', 'E'],
              correctAnswer: 'C',
            },
          ],
        },
      },
      {
        title: 'Storytelling Magic',
        description: 'Learn the magic of storytelling! Discover how to create characters, settings, and exciting plots.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Storytelling Magic Quiz',
          description: 'Test your storytelling knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '📖 What are the people or animals in a story called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Settings', 'Characters', 'Plot', 'Theme'],
              correctAnswer: 'Characters',
            },
            {
              questionText: '🏠 What do you call where and when a story takes place?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Characters', 'Plot', 'Setting', 'Theme'],
              correctAnswer: 'Setting',
            },
            {
              questionText: '📚 What is the beginning of a story called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Ending', 'Middle', 'Beginning/Introduction', 'Climax'],
              correctAnswer: 'Beginning/Introduction',
            },
            {
              questionText: '🎭 What happens in a story is called the?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Characters', 'Setting', 'Plot', 'Theme'],
              correctAnswer: 'Plot',
            },
          ],
        },
      },
      {
        title: 'Grammar Galaxy',
        description: 'Explore the galaxy of grammar! Learn about nouns, verbs, adjectives, and how to build perfect sentences.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Grammar Galaxy Quiz',
          description: 'Navigate through grammar!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🏃 What type of word describes an action?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
              correctAnswer: 'Verb',
            },
            {
              questionText: '🐱 What type of word names a person, place, or thing?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Verb', 'Adjective', 'Noun', 'Adverb'],
              correctAnswer: 'Noun',
            },
            {
              questionText: '🎨 What type of word describes a noun?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Verb', 'Noun', 'Adjective', 'Adverb'],
              correctAnswer: 'Adjective',
            },
            {
              questionText: '🏠 In the sentence "The cat sleeps," what is the verb?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['The', 'Cat', 'Sleeps', 'None'],
              correctAnswer: 'Sleeps',
            },
          ],
        },
      },
      {
        title: 'Reading Comprehension',
        description: 'Improve your reading skills! Learn strategies to understand and enjoy books more deeply.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Reading Comprehension Quiz',
          description: 'Test your reading understanding!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '📚 What is the main idea of a story?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A small detail', 'The most important point', 'The last sentence', 'The first word'],
              correctAnswer: 'The most important point',
            },
            {
              questionText: '🔍 What do you call clues that help you understand a story better?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Guesses', 'Context clues', 'Questions', 'Answers'],
              correctAnswer: 'Context clues',
            },
            {
              questionText: '📖 When you make a guess about what will happen next, you are?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Memorizing', 'Predicting', 'Summarizing', 'Questioning'],
              correctAnswer: 'Predicting',
            },
            {
              questionText: '💭 What do you call thinking about a story and connecting it to your own life?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Summarizing', 'Predicting', 'Making connections', 'Visualizing'],
              correctAnswer: 'Making connections',
            },
          ],
        },
      },
      {
        title: 'Poetry Paradise',
        description: 'Enter a paradise of poetry! Learn about rhymes, rhythms, and how to write beautiful poems.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Poetry Paradise Quiz',
          description: 'Test your poetry knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎵 What is it called when words sound alike at the end of lines?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rhythm', 'Rhyme', 'Verse', 'Stanza'],
              correctAnswer: 'Rhyme',
            },
            {
              questionText: '📝 What is a group of lines in a poem called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rhyme', 'Verse', 'Stanza', 'Line'],
              correctAnswer: 'Stanza',
            },
            {
              questionText: '🎨 What do you call words that create pictures in your mind?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rhymes', 'Imagery', 'Rhythm', 'Metaphors'],
              correctAnswer: 'Imagery',
            },
            {
              questionText: '📖 What is a poem that tells a story?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Limerick', 'Haiku', 'Narrative poem', 'Sonnet'],
              correctAnswer: 'Narrative poem',
            },
          ],
        },
      },
    ],
  },
  'Art & Creativity': {
    title: 'Art & Creativity',
    description: 'Unleash your creativity! Learn about colors, shapes, drawing techniques, and various art forms.',
    instructor: 'Artist Andy',
    videos: [
      {
        title: 'Color Theory',
        description: 'Learn about primary, secondary, and tertiary colors! Discover how colors mix and create beautiful art.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Color Theory Quiz',
          description: 'Test your color knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎨 What are the three primary colors?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Green, purple, orange', 'Red, blue, yellow', 'Pink, brown, black', 'White, gray, black'],
              correctAnswer: 'Red, blue, yellow',
            },
            {
              questionText: '🟡 What color do you get when you mix red and yellow?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Green', 'Orange', 'Purple', 'Blue'],
              correctAnswer: 'Orange',
            },
            {
              questionText: '🔵 What color do you get when you mix blue and yellow?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Green', 'Orange', 'Purple', 'Red'],
              correctAnswer: 'Green',
            },
            {
              questionText: '🟣 What color do you get when you mix red and blue?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Green', 'Orange', 'Purple', 'Brown'],
              correctAnswer: 'Purple',
            },
          ],
        },
      },
      {
        title: 'Drawing Basics',
        description: 'Learn the fundamentals of drawing! Practice shapes, lines, and techniques to create amazing artwork.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Drawing Basics Quiz',
          description: 'Test your drawing knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '✏️ What basic shape can you use to draw a house?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Circle', 'Square with triangle', 'Oval', 'Rectangle only'],
              correctAnswer: 'Square with triangle',
            },
            {
              questionText: '📐 What tool helps you draw straight lines?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Compass', 'Ruler', 'Eraser', 'Pencil'],
              correctAnswer: 'Ruler',
            },
            {
              questionText: '🎨 What do you call the lightness or darkness of a color?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Hue', 'Value', 'Saturation', 'Tint'],
              correctAnswer: 'Value',
            },
            {
              questionText: '🖌️ What do you call the area around and between subjects in art?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Foreground', 'Background', 'Negative space', 'Positive space'],
              correctAnswer: 'Negative space',
            },
          ],
        },
      },
      {
        title: 'Crafting Fun',
        description: 'Get creative with crafts! Learn to make fun projects with paper, glue, scissors, and other materials.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Crafting Fun Quiz',
          description: 'Test your crafting knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '✂️ What tool is used to cut paper in crafting?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Glue', 'Scissors', 'Ruler', 'Pencil'],
              correctAnswer: 'Scissors',
            },
            {
              questionText: '📎 What do you use to stick paper together?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Scissors', 'Glue', 'Ruler', 'Eraser'],
              correctAnswer: 'Glue',
            },
            {
              questionText: '🎨 What material can you use to add color to crafts?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Scissors', 'Crayons and markers', 'Ruler', 'Glue'],
              correctAnswer: 'Crayons and markers',
            },
            {
              questionText: '📄 What paper is good for drawing and crafting?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Construction paper', 'Tissue paper', 'Newspaper', 'Paper towels'],
              correctAnswer: 'Construction paper',
            },
          ],
        },
      },
      {
        title: 'Sculpture & 3D Art',
        description: 'Explore three-dimensional art! Learn about clay, paper mache, and creating sculptures.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Sculpture & 3D Art Quiz',
          description: 'Test your 3D art knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🏺 What material is commonly used for making pottery and sculptures?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Paper', 'Clay', 'Plastic', 'Wood'],
              correctAnswer: 'Clay',
            },
            {
              questionText: '🎨 What is art that has three dimensions (height, width, depth) called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['2D art', '3D art/Sculpture', 'Drawing', 'Painting'],
              correctAnswer: '3D art/Sculpture',
            },
            {
              questionText: '📰 What craft material uses newspaper and glue?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Clay', 'Paper mache', 'Origami', 'Collage'],
              correctAnswer: 'Paper mache',
            },
            {
              questionText: '🗿 What do you call a three-dimensional artwork?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Painting', 'Drawing', 'Sculpture', 'Sketch'],
              correctAnswer: 'Sculpture',
            },
          ],
        },
      },
      {
        title: 'Famous Artists',
        description: 'Learn about famous artists throughout history! Discover Van Gogh, Picasso, Monet, and their amazing works.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Famous Artists Quiz',
          description: 'Test your art history knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎨 Which famous artist painted the Mona Lisa?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Monet'],
              correctAnswer: 'Leonardo da Vinci',
            },
            {
              questionText: '🌻 Which artist is famous for painting sunflowers?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Monet', 'Picasso', 'Van Gogh', 'Da Vinci'],
              correctAnswer: 'Van Gogh',
            },
            {
              questionText: '🖼️ Which artist is known for his cubist style?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Van Gogh', 'Monet', 'Picasso', 'Da Vinci'],
              correctAnswer: 'Picasso',
            },
            {
              questionText: '🎨 Who painted "Starry Night"?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Monet', 'Picasso', 'Van Gogh', 'Da Vinci'],
              correctAnswer: 'Van Gogh',
            },
          ],
        },
      },
    ],
  },
  'Geography & Culture': {
    title: 'Geography & Culture',
    description: 'Travel the world without leaving home! Learn about countries, cultures, landmarks, and geography.',
    instructor: 'Professor Atlas',
    videos: [
      {
        title: 'Continents & Oceans',
        description: 'Explore the seven continents and five oceans! Learn about our amazing planet Earth.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Continents & Oceans Quiz',
          description: 'Test your geography knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌍 How many continents are there on Earth?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['5', '6', '7', '8'],
              correctAnswer: '7',
            },
            {
              questionText: '🌊 How many oceans are there on Earth?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['3', '4', '5', '6'],
              correctAnswer: '5',
            },
            {
              questionText: '🏔️ Which is the largest continent?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Africa', 'Asia', 'North America', 'Europe'],
              correctAnswer: 'Asia',
            },
            {
              questionText: '🌊 Which is the largest ocean?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
              correctAnswer: 'Pacific Ocean',
            },
          ],
        },
      },
      {
        title: 'World Landmarks',
        description: 'Discover famous landmarks around the world! From the Eiffel Tower to the Great Wall of China.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'World Landmarks Quiz',
          description: 'Test your landmark knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🗼 In which city is the Eiffel Tower located?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['London', 'Paris', 'Rome', 'Berlin'],
              correctAnswer: 'Paris',
            },
            {
              questionText: '🏛️ In which country is the Great Wall located?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Japan', 'India', 'China', 'Korea'],
              correctAnswer: 'China',
            },
            {
              questionText: '🗽 What famous statue is in New York City?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Statue of Liberty', 'Washington Monument', 'Lincoln Memorial', 'Mount Rushmore'],
              correctAnswer: 'Statue of Liberty',
            },
            {
              questionText: '🏛️ In which country are the Pyramids of Giza?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Mexico', 'Peru', 'Egypt', 'Greece'],
              correctAnswer: 'Egypt',
            },
          ],
        },
      },
      {
        title: 'Cultural Celebrations',
        description: 'Learn about celebrations around the world! Discover holidays, festivals, and traditions from different cultures.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Cultural Celebrations Quiz',
          description: 'Test your knowledge of world celebrations!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎄 Which holiday is celebrated on December 25th?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Halloween', 'Easter', 'Christmas', 'Thanksgiving'],
              correctAnswer: 'Christmas',
            },
            {
              questionText: '🎃 Which holiday involves costumes and trick-or-treating?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Thanksgiving', 'Halloween', 'Easter', 'Christmas'],
              correctAnswer: 'Halloween',
            },
            {
              questionText: '🥮 Which festival is known for mooncakes and lanterns?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Chinese New Year', 'Mid-Autumn Festival', 'Diwali', 'Hanami'],
              correctAnswer: 'Mid-Autumn Festival',
            },
            {
              questionText: '🪔 Which Indian festival is known as the "Festival of Lights"?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Holi', 'Diwali', 'Navratri', 'Eid'],
              correctAnswer: 'Diwali',
            },
          ],
        },
      },
      {
        title: 'Maps & Directions',
        description: 'Learn to read maps and give directions! Understand compass directions, map symbols, and how to navigate.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Maps & Directions Quiz',
          description: 'Test your navigation skills!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🧭 Which direction does a compass "N" point to?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['South', 'East', 'North', 'West'],
              correctAnswer: 'North',
            },
            {
              questionText: '🗺️ What do we call a drawing that shows places and locations?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Photograph', 'Map', 'Chart', 'Graph'],
              correctAnswer: 'Map',
            },
            {
              questionText: '📍 What do map symbols represent?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Nothing', 'Real places and things', 'Just decorations', 'Only cities'],
              correctAnswer: 'Real places and things',
            },
            {
              questionText: '🧭 If you face North and turn right, which direction are you facing?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['West', 'South', 'East', 'North'],
              correctAnswer: 'East',
            },
          ],
        },
      },
      {
        title: 'Countries & Capitals',
        description: 'Learn about countries and their capitals! Discover interesting facts about nations around the world.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Countries & Capitals Quiz',
          description: 'Test your knowledge of world capitals!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🇺🇸 What is the capital of the United States?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['New York', 'Los Angeles', 'Washington D.C.', 'Chicago'],
              correctAnswer: 'Washington D.C.',
            },
            {
              questionText: '🇬🇧 What is the capital of the United Kingdom?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Manchester', 'London', 'Liverpool', 'Birmingham'],
              correctAnswer: 'London',
            },
            {
              questionText: '🇫🇷 What is the capital of France?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Marseille', 'Lyon', 'Paris', 'Nice'],
              correctAnswer: 'Paris',
            },
            {
              questionText: '🇯🇵 What is the capital of Japan?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Osaka', 'Kyoto', 'Tokyo', 'Yokohama'],
              correctAnswer: 'Tokyo',
            },
          ],
        },
      },
    ],
  },
  'Coding for Kids': {
    title: 'Coding for Kids',
    description: 'Learn to code with fun! Discover programming basics, logic, and create your own simple programs.',
    instructor: 'Code Master Mike',
    videos: [
      {
        title: 'What is Coding?',
        description: 'Discover what coding is and why it\'s important! Learn how computers understand instructions.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'What is Coding? Quiz',
          description: 'Test your understanding of coding!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '💻 What is coding?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Playing games', 'Giving instructions to computers', 'Watching videos', 'Drawing pictures'],
              correctAnswer: 'Giving instructions to computers',
            },
            {
              questionText: '⌨️ What do we call the language computers understand?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['English', 'Code/Programming language', 'Music', 'Math'],
              correctAnswer: 'Code/Programming language',
            },
            {
              questionText: '🤖 Who can learn to code?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Only adults', 'Only experts', 'Anyone!', 'Only teachers'],
              correctAnswer: 'Anyone!',
            },
            {
              questionText: '🎮 What can you create with coding?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Only text documents', 'Games, apps, and websites', 'Only music', 'Only pictures'],
              correctAnswer: 'Games, apps, and websites',
            },
          ],
        },
      },
      {
        title: 'Introduction to Scratch',
        description: 'Learn about Scratch, a visual programming language! Create animations and games by dragging blocks.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Introduction to Scratch Quiz',
          description: 'Test your Scratch knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎨 What is Scratch?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A drawing tool', 'A visual programming language', 'A game console', 'A math app'],
              correctAnswer: 'A visual programming language',
            },
            {
              questionText: '🧩 In Scratch, what do you use to create programs?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Text code', 'Colorful blocks', 'Numbers only', 'Pictures only'],
              correctAnswer: 'Colorful blocks',
            },
            {
              questionText: '🐱 What is the mascot of Scratch?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A dog', 'A cat', 'A bird', 'A fish'],
              correctAnswer: 'A cat',
            },
            {
              questionText: '🎮 What can you create with Scratch?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Only drawings', 'Animations, games, and stories', 'Only music', 'Only text'],
              correctAnswer: 'Animations, games, and stories',
            },
          ],
        },
      },
      {
        title: 'Loops & Sequences',
        description: 'Learn about loops and sequences! Understand how to repeat actions and order instructions.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Loops & Sequences Quiz',
          description: 'Test your knowledge of loops!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🔄 What is a loop in programming?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A type of variable', 'Repeating an action multiple times', 'A single command', 'A type of game'],
              correctAnswer: 'Repeating an action multiple times',
            },
            {
              questionText: '📋 What is a sequence in coding?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A random order', 'Steps in a specific order', 'A type of loop', 'A game'],
              correctAnswer: 'Steps in a specific order',
            },
            {
              questionText: '🔁 Which block would you use to repeat something 10 times?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['If block', 'Repeat block', 'Stop block', 'Start block'],
              correctAnswer: 'Repeat block',
            },
            {
              questionText: '➡️ Why is order important in coding?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['It\'s not important', 'Computers follow instructions in order', 'It makes code look pretty', 'It doesn\'t matter'],
              correctAnswer: 'Computers follow instructions in order',
            },
          ],
        },
      },
      {
        title: 'Conditionals & Logic',
        description: 'Learn about if-then statements! Understand how computers make decisions based on conditions.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Conditionals & Logic Quiz',
          description: 'Test your logic skills!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🤔 What is a conditional statement?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A loop', 'An if-then statement that makes decisions', 'A variable', 'A function'],
              correctAnswer: 'An if-then statement that makes decisions',
            },
            {
              questionText: '✅ What does "if" mean in coding?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Always do this', 'Do this only if a condition is true', 'Never do this', 'Stop here'],
              correctAnswer: 'Do this only if a condition is true',
            },
            {
              questionText: '🔄 What does "else" mean in an if-then statement?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Do the same thing', 'Do something different if the condition is false', 'Stop the program', 'Repeat the action'],
              correctAnswer: 'Do something different if the condition is false',
            },
            {
              questionText: '🎮 In a game, what might an "if" statement check?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['The color of the screen', 'If the player pressed a key', 'The time of day', 'The weather'],
              correctAnswer: 'If the player pressed a key',
            },
          ],
        },
      },
      {
        title: 'Variables & Data',
        description: 'Learn about variables! Discover how to store and use information in your programs.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Variables & Data Quiz',
          description: 'Test your variable knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '📦 What is a variable?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A fixed number', 'A container that stores information', 'A type of loop', 'A game'],
              correctAnswer: 'A container that stores information',
            },
            {
              questionText: '🔢 What type of data would you store in a variable for a score?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Text', 'Number', 'Picture', 'Sound'],
              correctAnswer: 'Number',
            },
            {
              questionText: '📝 What type of data would you store for a player\'s name?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Number', 'Text/String', 'Boolean', 'List'],
              correctAnswer: 'Text/String',
            },
            {
              questionText: '✏️ How do you give a variable a value?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['You can\'t', 'Using an assignment operator (=)', 'Using a question mark', 'Using a loop'],
              correctAnswer: 'Using an assignment operator (=)',
            },
          ],
        },
      },
    ],
  },
  'Music & Rhythm': {
    title: 'Music & Rhythm',
    description: 'Discover the joy of music! Learn about notes, rhythms, instruments, and how to create your own music.',
    instructor: 'Maestro Melody',
    videos: [
      {
        title: 'Musical Notes',
        description: 'Learn about musical notes! Discover do-re-mi and how to read basic music notation.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Musical Notes Quiz',
          description: 'Test your music knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎵 What are the first three notes in "do-re-mi"?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['La, ti, do', 'Do, re, mi', 'Mi, fa, sol', 'Sol, la, ti'],
              correctAnswer: 'Do, re, mi',
            },
            {
              questionText: '🎼 What do we call the written language of music?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Music notes', 'Musical notation', 'Music symbols', 'Music code'],
              correctAnswer: 'Musical notation',
            },
            {
              questionText: '🎹 How many white keys are on a standard piano octave?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['5', '6', '7', '8'],
              correctAnswer: '7',
            },
            {
              questionText: '🎵 What comes after "mi" in do-re-mi?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Re', 'Fa', 'Sol', 'La'],
              correctAnswer: 'Fa',
            },
          ],
        },
      },
      {
        title: 'Rhythm & Beat',
        description: 'Feel the rhythm! Learn about beats, tempo, and how to keep time with music.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Rhythm & Beat Quiz',
          description: 'Test your rhythm knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🥁 What is the steady pulse in music called?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rhythm', 'Beat', 'Tempo', 'Pitch'],
              correctAnswer: 'Beat',
            },
            {
              questionText: '⏱️ What do we call the speed of music?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Rhythm', 'Beat', 'Tempo', 'Volume'],
              correctAnswer: 'Tempo',
            },
            {
              questionText: '👏 What do you call the pattern of long and short sounds?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Tempo', 'Pitch', 'Rhythm', 'Melody'],
              correctAnswer: 'Rhythm',
            },
            {
              questionText: '🎵 Fast music has a ___ tempo.',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Slow', 'Fast', 'Medium', 'No'],
              correctAnswer: 'Fast',
            },
          ],
        },
      },
      {
        title: 'Musical Instruments',
        description: 'Explore different musical instruments! Learn about strings, percussion, wind, and keyboard instruments.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Musical Instruments Quiz',
          description: 'Test your instrument knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎸 What family does a guitar belong to?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Percussion', 'Wind', 'Strings', 'Keyboard'],
              correctAnswer: 'Strings',
            },
            {
              questionText: '🥁 What family does a drum belong to?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Percussion', 'Wind', 'Strings', 'Keyboard'],
              correctAnswer: 'Percussion',
            },
            {
              questionText: '🎺 What family does a trumpet belong to?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Percussion', 'Wind', 'Strings', 'Keyboard'],
              correctAnswer: 'Wind',
            },
            {
              questionText: '🎹 What family does a piano belong to?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Percussion', 'Wind', 'Strings', 'Keyboard'],
              correctAnswer: 'Keyboard',
            },
          ],
        },
      },
      {
        title: 'Singing & Voice',
        description: 'Discover your singing voice! Learn about pitch, volume, and how to sing beautifully.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Singing & Voice Quiz',
          description: 'Test your singing knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎤 What do we call how high or low a sound is?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Volume', 'Pitch', 'Tempo', 'Rhythm'],
              correctAnswer: 'Pitch',
            },
            {
              questionText: '🔊 What do we call how loud or soft a sound is?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Pitch', 'Volume', 'Tempo', 'Rhythm'],
              correctAnswer: 'Volume',
            },
            {
              questionText: '🎵 What do you call a group of people singing together?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Solo', 'Choir', 'Band', 'Orchestra'],
              correctAnswer: 'Choir',
            },
            {
              questionText: '🎤 What do you call singing alone?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Choir', 'Solo', 'Duet', 'Ensemble'],
              correctAnswer: 'Solo',
            },
          ],
        },
      },
      {
        title: 'Famous Composers',
        description: 'Learn about famous composers! Discover Mozart, Beethoven, Bach, and their incredible music.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Famous Composers Quiz',
          description: 'Test your composer knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🎼 Which famous composer was deaf but still created beautiful music?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
              correctAnswer: 'Beethoven',
            },
            {
              questionText: '🎹 Which composer was a child prodigy from Austria?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Beethoven', 'Bach', 'Mozart', 'Brahms'],
              correctAnswer: 'Mozart',
            },
            {
              questionText: '🎻 Which composer wrote "The Four Seasons"?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Bach', 'Beethoven', 'Vivaldi', 'Mozart'],
              correctAnswer: 'Vivaldi',
            },
            {
              questionText: '🎼 Which German composer wrote over 1000 musical works?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
              correctAnswer: 'Bach',
            },
          ],
        },
      },
    ],
  },
  'Nature & Environment': {
    title: 'Nature & Environment',
    description: 'Explore the wonders of nature! Learn about animals, plants, ecosystems, and how to protect our environment.',
    instructor: 'Ranger Rachel',
    videos: [
      {
        title: 'Animal Habitats',
        description: 'Discover where animals live! Learn about forests, oceans, deserts, and other animal habitats.',
        duration: 600,
        orderNumber: 1,
        quiz: {
          title: 'Animal Habitats Quiz',
          description: 'Test your habitat knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🦁 What habitat do lions live in?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Arctic', 'Savanna', 'Ocean', 'Forest'],
              correctAnswer: 'Savanna',
            },
            {
              questionText: '🐧 What habitat do penguins live in?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Desert', 'Jungle', 'Arctic/Antarctic', 'Mountains'],
              correctAnswer: 'Arctic/Antarctic',
            },
            {
              questionText: '🐸 What habitat do frogs live in?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Desert only', 'Forests and wetlands', 'Only in trees', 'Only in oceans'],
              correctAnswer: 'Forests and wetlands',
            },
            {
              questionText: '🐟 What habitat do fish live in?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Deserts', 'Oceans and rivers', 'Mountains', 'Forests'],
              correctAnswer: 'Oceans and rivers',
            },
          ],
        },
      },
      {
        title: 'Ecosystems',
        description: 'Learn about ecosystems! Discover how living things interact with each other and their environment.',
        duration: 600,
        orderNumber: 2,
        quiz: {
          title: 'Ecosystems Quiz',
          description: 'Test your ecosystem knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌿 What is an ecosystem?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['A single animal', 'A community of living things and their environment', 'A type of plant', 'A weather pattern'],
              correctAnswer: 'A community of living things and their environment',
            },
            {
              questionText: '🌳 What do we call animals that eat only plants?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Carnivores', 'Herbivores', 'Omnivores', 'Predators'],
              correctAnswer: 'Herbivores',
            },
            {
              questionText: '🦁 What do we call animals that eat only other animals?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Herbivores', 'Carnivores', 'Omnivores', 'Prey'],
              correctAnswer: 'Carnivores',
            },
            {
              questionText: '🐻 What do we call animals that eat both plants and animals?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Herbivores', 'Carnivores', 'Omnivores', 'Producers'],
              correctAnswer: 'Omnivores',
            },
          ],
        },
      },
      {
        title: 'Endangered Species',
        description: 'Learn about endangered animals! Discover why some animals are at risk and how we can help protect them.',
        duration: 600,
        orderNumber: 3,
        quiz: {
          title: 'Endangered Species Quiz',
          description: 'Test your knowledge of endangered animals!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🐼 What does "endangered" mean?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Very common', 'At risk of disappearing', 'Extinct', 'Not real'],
              correctAnswer: 'At risk of disappearing',
            },
            {
              questionText: '🌍 What is one reason animals become endangered?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['They have too many babies', 'Habitat loss', 'They eat too much', 'They sleep too much'],
              correctAnswer: 'Habitat loss',
            },
            {
              questionText: '🐘 What can we do to help endangered animals?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Ignore them', 'Protect their habitats and reduce pollution', 'Hunt them more', 'Take their homes'],
              correctAnswer: 'Protect their habitats and reduce pollution',
            },
            {
              questionText: '🦏 Name an endangered animal.',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Pigeon', 'House cat', 'Rhinoceros', 'Rabbit'],
              correctAnswer: 'Rhinoceros',
            },
          ],
        },
      },
      {
        title: 'Recycling & Conservation',
        description: 'Learn about recycling and conservation! Discover how to reduce, reuse, and recycle to protect our planet.',
        duration: 600,
        orderNumber: 4,
        quiz: {
          title: 'Recycling & Conservation Quiz',
          description: 'Test your environmental knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '♻️ What does recycling mean?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Throwing things away', 'Turning used materials into new things', 'Buying new things', 'Hiding things'],
              correctAnswer: 'Turning used materials into new things',
            },
            {
              questionText: '📦 Which of these can be recycled?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Food waste', 'Paper and cardboard', 'Broken toys', 'All trash'],
              correctAnswer: 'Paper and cardboard',
            },
            {
              questionText: '💧 What does "conservation" mean?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Wasting resources', 'Protecting and wisely using natural resources', 'Using more resources', 'Ignoring the environment'],
              correctAnswer: 'Protecting and wisely using natural resources',
            },
            {
              questionText: '🌱 What does "reduce" mean in "reduce, reuse, recycle"?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Buy more things', 'Use less of something', 'Throw things away', 'Hide things'],
              correctAnswer: 'Use less of something',
            },
          ],
        },
      },
      {
        title: 'Weather & Seasons',
        description: 'Learn about weather patterns and seasons! Discover why we have spring, summer, fall, and winter.',
        duration: 600,
        orderNumber: 5,
        quiz: {
          title: 'Weather & Seasons Quiz',
          description: 'Test your weather and seasons knowledge!',
          timeLimit: 15,
          passingScore: 6,
          questions: [
            {
              questionText: '🌞 Which season is usually the warmest?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Winter', 'Spring', 'Summer', 'Fall'],
              correctAnswer: 'Summer',
            },
            {
              questionText: '🍂 Which season do leaves change color and fall from trees?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Spring', 'Summer', 'Fall/Autumn', 'Winter'],
              correctAnswer: 'Fall/Autumn',
            },
            {
              questionText: '❄️ Which season is usually the coldest?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Spring', 'Summer', 'Fall', 'Winter'],
              correctAnswer: 'Winter',
            },
            {
              questionText: '🌱 In which season do flowers start to bloom?',
              questionType: 'multiple_choice',
              points: 2,
              options: ['Winter', 'Spring', 'Summer', 'Fall'],
              correctAnswer: 'Spring',
            },
          ],
        },
      },
    ],
  },
};

// Generate course content and output as JSON
function generateCourseContent() {
  console.log('========================================');
  console.log('Course Content Generator');
  console.log('========================================\n');

  const totalCourses = Object.keys(courseCategories).length;
  const totalVideos = Object.values(courseCategories).reduce((sum, cat) => sum + cat.videos.length, 0);
  const totalQuizzes = totalVideos;
  const totalQuestions = Object.values(courseCategories).reduce(
    (sum, cat) => sum + cat.videos.reduce((vSum, vid) => vSum + vid.quiz.questions.length, 0),
    0
  );

  console.log('Course Content Summary:');
  console.log(`  Total courses: ${totalCourses}`);
  console.log(`  Total videos: ${totalVideos}`);
  console.log(`  Total quizzes: ${totalQuizzes}`);
  console.log(`  Total questions: ${totalQuestions}\n`);

  console.log('Courses to be created:');
  Object.entries(courseCategories).forEach(([categoryName, courseData], index) => {
    console.log(`  ${index + 1}. ${courseData.title}`);
    console.log(`     Instructor: ${courseData.instructor}`);
    console.log(`     Videos: ${courseData.videos.length}`);
    console.log(`     Description: ${courseData.description.substring(0, 60)}...\n`);
  });

  console.log('========================================');
  console.log('Course content data generated successfully!');
  console.log('========================================\n');

  // Output the data as JSON
  console.log('JSON Output (for backend import):');
  console.log('========================================');
  console.log(JSON.stringify(courseCategories, null, 2));
}

// Run the generator
generateCourseContent();
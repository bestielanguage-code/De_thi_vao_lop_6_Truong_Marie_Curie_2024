import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  CheckCircle,
  Trophy,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Play,
  Info,
  Eye,
  Move,
  Maximize2,
  RotateCcw,
  Trash2,
} from "lucide-react";

// FULL 60 QUESTIONS DATA
const QUESTIONS = [
  // STRESS (1-5)
  {
    id: 1,
    type: "stress",
    question:
      "Choose the word whose main stress is placed differently from the others.",
    options: ["cupboard", "schedule", "mistake", "palace"],
    answer: "mistake",
    hint: "mistake (2), others (1)",
  },
  {
    id: 2,
    type: "stress",
    question:
      "Choose the word whose main stress is placed differently from the others.",
    options: ["accent", "invite", "design", "attend"],
    answer: "accent",
    hint: "accent (1), others (2)",
  },
  {
    id: 3,
    type: "stress",
    question:
      "Choose the word whose main stress is placed differently from the others.",
    options: ["restaurant", "disaster", "continent", "industry"],
    answer: "disaster",
    hint: "disaster (2), others (1)",
  },
  {
    id: 4,
    type: "stress",
    question:
      "Choose the word whose main stress is placed differently from the others.",
    options: ["volcanic", "financial", "responsive", "poisonous"],
    answer: "poisonous",
    hint: "poisonous (1), others (2)",
  },
  {
    id: 5,
    type: "stress",
    question:
      "Choose the word whose main stress is placed differently from the others.",
    options: ["community", "inhabitant", "exhibition", "material"],
    answer: "exhibition",
    hint: "exhibition (3), others (2)",
  },

  // PRONUNCIATION (6-10)
  {
    id: 6,
    type: "pronunciation",
    question:
      "Choose the word whose underlined part is different from the rest in pronunciation.",
    options: [
      "p<u>ur</u>chase",
      "n<u>ur</u>sery",
      "<u>ur</u>ban",
      "c<u>u</u>rious",
    ],
    answer: "c<u>u</u>rious",
    hint: "curious /juː/",
  },
  {
    id: 7,
    type: "pronunciation",
    question:
      "Choose the word whose underlined part is different from the rest in pronunciation.",
    options: [
      "explain<u>ed</u>",
      "punish<u>ed</u>",
      "cover<u>ed</u>",
      "follow<u>ed</u>",
    ],
    answer: "punish<u>ed</u>",
    hint: "punished /t/, others /d/",
  },
  {
    id: 8,
    type: "pronunciation",
    question:
      "Choose the word whose underlined part is different from the rest in pronunciation.",
    options: [
      "ve<u>h</u>icle",
      "<u>h</u>onest",
      "<u>h</u>umour",
      "g<u>h</u>ost",
    ],
    answer: "<u>h</u>umour",
    hint: "humour /h/, others silent",
  },
  {
    id: 9,
    type: "pronunciation",
    question:
      "Choose the word whose underlined part is different from the rest in pronunciation.",
    options: [
      "f<u>ea</u>ture",
      "pl<u>ea</u>sure",
      "thr<u>ea</u>ten",
      "m<u>ea</u>sure",
    ],
    answer: "f<u>ea</u>ture",
    hint: "feature /i:/, others /e/",
  },
  {
    id: 10,
    type: "pronunciation",
    question:
      "Choose the word whose underlined part is different from the rest in pronunciation.",
    options: [
      "pa<u>th</u>way",
      "<u>th</u>under",
      "clo<u>th</u>ing",
      "weal<u>th</u>y",
    ],
    answer: "clo<u>th</u>ing",
    hint: "clothing /ð/, others /θ/",
  },

  // REORDERING (11-20)
  {
    id: 11,
    type: "reorder",
    scrambled:
      "to / the / lunchtime / like / playground / at / boys / The / around / run / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "The boys like the playground to run around at lunchtime.",
      "The boys run at the playground to like around lunchtime.",
      "The boys like to run at the lunchtime around playground.",
      "The boys like to run around the playground at lunchtime.",
    ],
    answer: "The boys like to run around the playground at lunchtime.",
  },
  {
    id: 12,
    type: "reorder",
    scrambled:
      "know / do / who / in / works / school / you / the / dining room / man / the / ?",
    question: "Reorder the words to make correct sentences.",
    options: [
      "Do the man who works in the school dining room know you?",
      "Do you know the man who works in the school dining room?",
      "Who do you know the man works in the school dining room?",
      "Who works in the school dining room do the man you know?",
    ],
    answer: "Do you know the man who works in the school dining room?",
  },
  {
    id: 13,
    type: "reorder",
    scrambled:
      "my / plenty / children / in / areas / for / of / There / are / play / city / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "There are plenty of play areas for children in my city",
      "There are plenty of areas in my city for children play.",
      "There are plenty areas of play for my children in city,",
      "There are areas in my city play for plenty of children,",
    ],
    answer: "There are plenty of play areas for children in my city",
  },
  {
    id: 14,
    type: "reorder",
    scrambled:
      "we / don't / think / have / today / shopping / enough / go / I / time / go / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "I think today we don't have to go enough shopping time.",
      "I think we don't have to go shopping enough time today.",
      "I don't think we have enough time to go shopping today",
      "I don't think we have time enough today to go shopping.",
    ],
    answer: "I don't think we have enough time to go shopping today",
  },
  {
    id: 15,
    type: "reorder",
    scrambled: "her / yet / sister / your / hair / had / coloured / ?",
    question: "Reorder the words to make correct sentences.",
    options: [
      "Has her sister had coloured your hair yet?",
      "Has your sister had her hair coloured yet?",
      "Had your sister has yet coloured her hair?",
      "Has her sister had your hair yet coloured?",
    ],
    answer: "Has your sister had her hair coloured yet?",
  },
  {
    id: 16,
    type: "reorder",
    scrambled:
      "hiking / weekend / go / to / in / next / the / planning / mountains / We're / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "We're planning to go hiking in the mountains next weekend.",
      "We're planning go to hiking the mountains in next weekend.",
      "We're go hiking in mountains the next weekend to planning.",
      "We're hiking next mountains to go planning in the weekend.",
    ],
    answer: "We're planning to go hiking in the mountains next weekend.",
  },
  {
    id: 17,
    type: "reorder",
    scrambled:
      "all / passed / did / in / we / that / so / well / the / class / test / My / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "My class did the test so that we all in passed well.",
      "My class did the test well in that so we all passed.",
      "My class did so well that we passed in all the test.",
      "My class did so well in the test that we all passed.",
    ],
    answer: "My class did so well in the test that we all passed.",
  },
  {
    id: 18,
    type: "reorder",
    scrambled:
      "the / because / in / match / didn't / take / ill / part / football / Karl / he / was / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "Karl didn't take the football in match because he was part ill.",
      "Karl was in ill because he didn't take part the football match.",
      "Karl didn't take part in the football match because he was ill.",
      "Karl was ill in the football match because he didn't take part.",
    ],
    answer: "Karl didn't take part in the football match because he was ill.",
  },
  {
    id: 19,
    type: "reorder",
    scrambled:
      "and / from / the / market / pick / up / some / vegetables / fruit / you / ?",
    question: "Reorder the words to make correct sentences.",
    options: [
      "Can the market pick up some vegetables and fruit from you?",
      "Can you pick up some fruit and vegetables from the market?",
      "Can you pick the fruit and vegetables up from some market?",
      "Can the vegetables and fruit from some market pick you up?",
    ],
    answer: "Can you pick up some fruit and vegetables from the market?",
  },
  {
    id: 20,
    type: "reorder",
    scrambled:
      "will / of / song / weeks / announced / The / on / show / the / next / winner / contest / be / .",
    question: "Reorder the words to make correct sentences.",
    options: [
      "The winner of the song contest will be announced on next week's show.",
      "The winner of the show will be announced on song contest next week's.",
      "The next week's winner of song contest will be on the show announced.",
      "The contest of song will be announced the winner on next week's show.",
    ],
    answer:
      "The winner of the song contest will be announced on next week's show.",
  },

  // MULTIPLE CHOICE (21-55)
  {
    id: 21,
    type: "choice",
    question:
      "Collum is _______. He goes surfing and also plays on his school basketball team.",
    options: ["lazy", "clever", "sporty", "creative"],
    answer: "sporty",
  },
  {
    id: 22,
    type: "choice",
    question:
      "I like _______ places where there is not much noise and not many bars and discos.",
    options: ["peaceful", "busy", "crowded", "relaxed"],
    answer: "peaceful",
  },
  {
    id: 23,
    type: "choice",
    question: "I only have _______ sweets, so I don't want to share them.",
    options: ["any", "much", "a little", "a few"],
    answer: "a few",
  },
  {
    id: 24,
    type: "choice",
    question: "_______ don't we get the bus into town?",
    options: ["How", "Why", "Shall", "Let's"],
    answer: "Why",
  },
  {
    id: 25,
    type: "choice",
    question:
      "My cousins _______ three or four hours a day playing video games.",
    options: ["spend", "spends", "is spending", "are spending"],
    answer: "spend",
  },
  {
    id: 26,
    type: "choice",
    question:
      "The Serbian tennis player Novak Djokovic _______ 24 Grand Slam men's singles titles so far.",
    options: ["won", "wins", "is winning", "has won"],
    answer: "has won",
  },
  {
    id: 27,
    type: "choice",
    question:
      "Penny _______ a bath at the moment so it's better if you call back later.",
    options: ["have", "has", "is having", "are having"],
    answer: "is having",
  },
  {
    id: 28,
    type: "choice",
    question: "My sister is really interested _______ mystery books and films.",
    options: ["on", "in", "with", "for"],
    answer: "in",
  },
  {
    id: 29,
    type: "choice",
    question:
      "The weather is really bad in the mountains so we _______ cancel the excursion.",
    options: ["won't", "will be", "are going to", "aren't going to"],
    answer: "are going to",
  },
  {
    id: 30,
    type: "choice",
    question:
      "In Cancún, Mexico, you can go swimming, fishing or diving in the _______.",
    options: ["sea", "hill", "desert", "forest"],
    answer: "sea",
  },
  {
    id: 31,
    type: "choice",
    question:
      "The water isn't _______ to make tea at the moment. Wait a few more minutes.",
    options: ["too hot", "as hot", "enough hot", "hot enough"],
    answer: "hot enough",
  },
  {
    id: 32,
    type: "choice",
    question:
      "Is there _______ special in this dish? I can't believe the taste!",
    options: ["something", "anything", "everything", "nothing"],
    answer: "anything",
  },
  {
    id: 33,
    type: "choice",
    question:
      "He is the _______ speaker I have ever heard. Half of the audience fell asleep.",
    options: ["boring", "very boring", "more boring", "most boring"],
    answer: "most boring",
  },
  {
    id: 34,
    type: "choice",
    question:
      "The store is having a great sale today. Most televisions are 25% _______ than yesterday.",
    options: ["cheap", "the cheapest", "cheaper", "more cheaper"],
    answer: "cheaper",
  },
  {
    id: 35,
    type: "choice",
    question: "I think we'll be late for the meeting unless we _______ now.",
    options: ["will get", "had got", "got", "get"],
    answer: "get",
  },
  {
    id: 36,
    type: "choice",
    question:
      "My grandmother has just got a smartphone, but she doesn't know how _______ it.",
    options: ["use", "to use", "using", "used"],
    answer: "to use",
  },
  {
    id: 37,
    type: "choice",
    question:
      "I wanted to have a barbecue this afternoon, but we had to _______ because of the weather.",
    options: ["get it across", "give it away", "put it off", "try it out"],
    answer: "put it off",
  },
  {
    id: 38,
    type: "choice",
    question:
      "She's fiercely _______ and gets very upset if she loses at anything.",
    options: ["complete", "competition", "uncompetitive", "competitive"],
    answer: "competitive",
  },
  {
    id: 39,
    type: "choice",
    question:
      "If Diana _______ her favourite musician, she'd ask his advice about becoming a better guitarist.",
    options: ["met", "meets", "will meet", "had met"],
    answer: "met",
  },
  {
    id: 40,
    type: "choice",
    question:
      "The staff _______ helped us carry the bags into the hotel were very kind.",
    options: ["which", "who", "whose", "where"],
    answer: "who",
  },
  {
    id: 41,
    type: "choice",
    question:
      "Many new products which help the environment _______ in my country.",
    options: ["make", "made", "are made", "have made"],
    answer: "are made",
  },
  {
    id: 42,
    type: "choice",
    question:
      "Passengers _______ walk across the railway - it's very dangerous!",
    options: ["should", "don't have to", "mustn't", "ought to"],
    answer: "mustn't",
  },
  {
    id: 43,
    type: "choice",
    question: "Do you know how much _______ for her new bicycle?",
    options: ["she did pay", "did she pay", "paid she", "she paid"],
    answer: "she paid",
  },
  {
    id: 44,
    type: "choice",
    question: "It was lovely to see Joana because we _______ her for ages.",
    options: ["hadn't seen", "haven't seen", "didn't see", "weren't seeing"],
    answer: "hadn't seen",
  },
  {
    id: 45,
    type: "choice",
    question: "They put all the food for the party on the _______ table.",
    options: [
      "brown long wooden",
      "long brown wooden",
      "wooden long brown",
      "long wooden brown",
    ],
    answer: "long brown wooden",
  },
  {
    id: 46,
    type: "choice",
    question:
      "_______ to play hide and seek with friends when you were a child?",
    options: ["Did you used", "Were you used", "Did you uses", "Did you use"],
    answer: "Did you use",
  },
  {
    id: 47,
    type: "choice",
    question: "I'm bored. It _______ for hours so I can't go out for a walk.",
    options: ["rained", "has been raining", "was raining", "have rained"],
    answer: "has been raining",
  },
  {
    id: 48,
    type: "choice",
    question:
      "I _______ at school for the rehearsal this evening so I'll be home late.",
    options: ["won't stay", "will have stay", "will be staying", "was staying"],
    answer: "will be staying",
  },
  {
    id: 49,
    type: "choice",
    question:
      "Eric _______ go skateboarding when he was younger. His dad thought it was too dangerous.",
    options: ["wasn't allowed to", "shouldn't", "could", "needn't"],
    answer: "wasn't allowed to",
  },
  {
    id: 50,
    type: "choice",
    question:
      "There are two theatres in the old town and they're _______ very beautiful.",
    options: ["each", "every", "all", "both"],
    answer: "both",
  },
  {
    id: 51,
    type: "choice",
    question:
      "Her friends advised her _______ in the exam because she would fail if she got caught.",
    options: ["to cheat", "not to cheat", "not cheating", "cheating"],
    answer: "not to cheat",
  },
  {
    id: 52,
    type: "choice",
    question:
      "Keira _______ to see the movie if she'd known it was a science fiction film.",
    options: ["won't go", "wouldn't go", "hadn't gone", "wouldn't have gone"],
    answer: "wouldn't have gone",
  },
  {
    id: 53,
    type: "choice",
    question:
      "Can you imagine _______ in a laboratory with some of the world's top scientists?",
    options: ["work", "to work", "working", "worked"],
    answer: "working",
  },
  {
    id: 54,
    type: "choice",
    question:
      "Tom sent me _______ photo of _______ Trafalgar Square. It's amazing!",
    options: ["a - the", "the - a", "Ø - the", "a - Ø"],
    answer: "a - Ø",
  },
  {
    id: 55,
    type: "choice",
    question:
      "Victor _______ on his computer when his mother _______ him down for lunch.",
    options: [
      "played - had called",
      "played - was calling",
      "was playing - called",
      "was playing - calling",
    ],
    answer: "was playing - called",
  },

  // READING (56-60)
  {
    id: 56,
    type: "reading",
    passage: `Some people work for years to become a celebrity, only to find that fame wasn't as great as they expected. It's not that they dislike it exactly, they just realize that there is more to life than being famous.
    Formed in 2005, The Jonas Brothers quickly became world-famous. Their albums sold in millions and they played to thousands of fans. But Kevin decided he'd had enough. He felt the group were no longer making music he wanted to listen to, so he left. He created a restaurant-searching app called Yood shortly after quitting, and he's a dad too these days.
    Freddie Prinze Junior became famous after appearing in Hollywood films such as I Know What You Did Last Summer. Recently, he decided to stop acting to follow another of his passions: cooking. He's written a book containing seventy-five of his favourite recipes.
    When rapper Vanilla Ice released Ice Ice Baby in 1990, it became a huge hit. Although he still makes music, he's never been able to repeat this success. He realized he could make money by buying and selling property. That's what he did after his musical success disappeared. He also started racing jet-skis.`,
    question: "In the first paragraph, the writer says that...",
    options: [
      "it always takes a long time to become a celebrity",
      "some celebrities think fame will be better than it is",
      "some celebrities hate being famous",
      "there are too many celebrities những ngày này",
    ],
    answer: "some celebrities think fame will be better than it is",
  },
  {
    id: 57,
    type: "reading",
    passage: `Some people work for years to become a celebrity, only to find that fame wasn't as great as they expected. It's not that they dislike it exactly, they just realize that there is more to life than being famous.
    Formed in 2005, The Jonas Brothers quickly became world-famous. Their albums sold in millions and they played to thousands of fans. But Kevin decided he'd had enough. He felt the group were no longer making music he wanted to listen to, so he left. He created a restaurant-searching app called Yood shortly after quitting, and he's a dad too these days.
    Freddie Prinze Junior became famous after appearing in Hollywood films such as I Know What You Did Last Summer. Recently, he decided to stop acting to follow another of his passions: cooking. He's written a book containing seventy-five of his favourite recipes.
    When rapper Vanilla Ice released Ice Ice Baby in 1990, it became a huge hit. Although he still makes music, he's never been able to repeat this success. He realized he could make money by buying and selling property. That's what he did after his musical success disappeared. He also started racing jet-skis.`,
    question: "Why did Kevin Jonas decide to leave his band?",
    options: [
      "He wanted to have children.",
      "He wanted to try a different career.",
      "He argued with the other members.",
      "He disliked the music they were playing.",
    ],
    answer: "He disliked the music they were playing.",
  },
  {
    id: 58,
    type: "reading",
    passage: `Some people work for years to become a celebrity, only to find that fame wasn't as great as they expected. It's not that they dislike it exactly, they just realize that there is more to life than being famous.
    Formed in 2005, The Jonas Brothers quickly became world-famous. Their albums sold in millions and they played to thousands of fans. But Kevin decided he'd had enough. He felt the group were no longer making music he wanted to listen to, so he left. He created a restaurant-searching app called Yood shortly after quitting, and he's a dad too these days.
    Freddie Prinze Junior became famous after appearing in Hollywood films such as I Know What You Did Last Summer. Recently, he decided to stop acting to follow another of his passions: cooking. He's written a book containing seventy-five of his favourite recipes.
    When rapper Vanilla Ice released Ice Ice Baby in 1990, it became a huge hit. Although he still makes music, he's never been able to repeat this success. He realized he could make money by buying and selling property. That's what he did after his musical success disappeared. He also started racing jet-skis.`,
    question: "Why did Freddie Prinze Junior stop acting?",
    options: [
      "He wanted to cook.",
      "He wanted to write a book.",
      "He failed to get roles.",
      "He moved away from Hollywood.",
    ],
    answer: "He wanted to cook.",
  },
  {
    id: 59,
    type: "reading",
    passage: `Some people work for years to become a celebrity, only to find that fame wasn't as great as they expected. It's not that they dislike it exactly, they just realize that there is more to life than being famous.
    Formed in 2005, The Jonas Brothers quickly became world-famous. Their albums sold in millions and they played to thousands of fans. But Kevin decided he'd had enough. He felt the group were no longer making music he wanted to listen to, so he left. He created a restaurant-searching app called Yood shortly after quitting, and he's a dad too these days.
    Freddie Prinze Junior became famous after appearing in Hollywood films such as I Know What You Did Last Summer. Recently, he decided to stop acting to follow another of his passions: cooking. He's written a book containing seventy-five of his favourite recipes.
    When rapper Vanilla Ice released Ice Ice Baby in 1990, it became a huge hit. Although he still makes music, he's never been able to repeat this success. He realized he could make money by buying and selling property. That's what he did after his musical success disappeared. He also started racing jet-skis.`,
    question:
      "In the final paragraph, the writer says that the wish to be famous...",
    options: [
      "is more powerful than the wish to be normal",
      "comes from wanting to be popular",
      "never makes you happy",
      "doesn't affect all people in the same way",
    ],
    answer: "comes from wanting to be popular",
  },
  {
    id: 60,
    type: "reading",
    passage: `Some people work for years to become a celebrity, only to find that fame wasn't as great as they expected. It's not that they dislike it exactly, they just realize that there is more to life than being famous.
    Formed in 2005, The Jonas Brothers quickly became world-famous. Their albums sold in millions and they played to thousands of fans. But Kevin decided he'd had enough. He felt the group were no longer making music he wanted to listen to, so he left. He created a restaurant-searching app called Yood shortly after quitting, and he's a dad too these days.
    Freddie Prinze Junior became famous after appearing in Hollywood films such as I Know What You Did Last Summer. Recently, he decided to stop acting to follow another of his passions: cooking. He's written a book containing seventy-five of his favourite recipes.
    When rapper Vanilla Ice released Ice Ice Baby in 1990, it became a huge hit. Although he still makes music, he's never been able to repeat this success. He realized he could make money by buying and selling property. That's what he did after his musical success disappeared. He also started racing jet-skis.`,
    question: "What is the author of the article focusing on?",
    options: [
      "The stars who turn their backs on fame.",
      "The negative side of being famous.",
      "The road to becoming a celebrity.",
      "The people who end up being famous by accident.",
    ],
    answer: "The stars who turn their backs on fame.",
  },
];

const FURNITURE_ITEMS = [
  { id: "plant", name: "Cây cảnh", price: 100, icon: "🌱" },
  { id: "lamp", name: "Đèn bàn", price: 200, icon: "💡" },
  { id: "chair", name: "Ghế bành", price: 400, icon: "🪑" },
  { id: "painting", name: "Tranh treo tường", price: 500, icon: "🖼️" },
  { id: "bookshelf", name: "Kệ sách", price: 800, icon: "📚" },
  { id: "table", name: "Bàn trà", price: 1000, icon: "☕" },
  { id: "sofa", name: "Ghế Sofa", price: 1500, icon: "🛋️" },
  { id: "tv", name: "Tivi 4K", price: 2500, icon: "📺" },
  { id: "bed", name: "Giường ngủ", price: 4000, icon: "🛏️" },
  { id: "cat", name: "Mèo con", price: 500, icon: "🐱" },
  { id: "window", name: "Cửa sổ", price: 1200, icon: "🪟" },
  { id: "carpet", name: "Thảm trải sàn", price: 600, icon: "🧶" },
];

export default function App() {
  const [gameState, setGameState] = useState("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [placedItems, setPlacedItems] = useState([]); // [{ instanceId, itemId, x, y, scale }]
  const [answeredMap, setAnsweredMap] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [selectedInstanceId, setSelectedInstanceId] = useState(null);

  const houseRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const currentQuestion = QUESTIONS[currentIdx];
  const userSelected = answeredMap[currentIdx];

  // Logic for Draggable House
  const handleMouseDown = (e, instanceId) => {
    setSelectedInstanceId(instanceId);
    isDragging.current = true;
    const item = placedItems.find((i) => i.instanceId === instanceId);
    const rect = houseRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - item.x,
      y: e.clientY - rect.top - item.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || selectedInstanceId === null) return;
    const rect = houseRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === selectedInstanceId
          ? { ...item, x: newX, y: newY }
          : item
      )
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updateScale = (instanceId, delta) => {
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, scale: Math.max(0.5, Math.min(3, item.scale + delta)) }
          : item
      )
    );
  };

  const deleteItem = (instanceId) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId));
    setSelectedInstanceId(null);
  };

  const handleAnswer = (selectedOption) => {
    if (userSelected) return;
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setMoney((m) => m + 100);
    }
    setAnsweredMap({ ...answeredMap, [currentIdx]: selectedOption });
  };

  const buyItem = (itemTemplate) => {
    if (money >= itemTemplate.price) {
      setMoney((m) => m - itemTemplate.price);
      const newItem = {
        instanceId: Date.now(),
        itemId: itemTemplate.id,
        icon: itemTemplate.icon,
        name: itemTemplate.name,
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        scale: 1,
      };
      setPlacedItems([...placedItems, newItem]);
      setInventory([...inventory, itemTemplate]);
      setGameState("house");
      setSelectedInstanceId(newItem.instanceId);
    }
  };

  const renderText = (text) => (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  );

  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-md w-full text-center border-b-8 border-pink-200">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="text-pink-500 w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-pink-600 mb-2 italic">
            MARIE CURIE 2024
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            Luyện đề Tiếng Anh vào lớp 6 & Xây dựng căn phòng Soft Manhwa của
            riêng bạn!
          </p>
          <button
            onClick={() => setGameState("quiz")}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Bắt đầu ngay ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col text-gray-800 select-none">
      {/* HEADER STATS */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 border-b border-indigo-100">
        <div className="flex gap-4">
          <div className="bg-indigo-100 px-4 py-2 rounded-2xl flex items-center gap-2 border border-indigo-200 shadow-sm">
            <CheckCircle className="text-green-500" size={18} />
            <span className="font-bold text-indigo-700">
              {score}/{QUESTIONS.length}
            </span>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-2xl flex items-center gap-2 border border-yellow-200 shadow-sm">
            <Wallet className="text-yellow-600" size={18} />
            <span className="font-bold text-yellow-700">{money}$</span>
          </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl gap-1 shadow-inner">
          <button
            onClick={() => setGameState("shop")}
            className={`p-3 rounded-xl transition-all ${
              gameState === "shop"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => setGameState("house")}
            className={`p-3 rounded-xl transition-all ${
              gameState === "house"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            <Home size={20} />
          </button>
          <button
            onClick={() => setGameState("quiz")}
            className={`p-3 rounded-xl transition-all ${
              gameState === "quiz"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            <Play size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
        {gameState === "quiz" && (
          <div className="max-w-3xl w-full animate-fade-in">
            <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-white">
              {/* READING CONTEXT */}
              {currentQuestion.type === "reading" && (
                <div className="bg-blue-50/50 p-6 border-b border-blue-100/50 italic text-sm text-gray-600 leading-relaxed max-h-64 overflow-y-auto">
                  <div className="font-bold mb-2 flex items-center gap-2 text-blue-600 uppercase tracking-wider">
                    <Eye size={16} /> Reading Passage:
                  </div>
                  {currentQuestion.passage}
                </div>
              )}

              <div className="p-8">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-xs font-bold mb-2 uppercase tracking-widest">
                      Question {currentIdx + 1}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">
                      {currentQuestion.question}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    <Info size={24} />
                  </button>
                </div>

                {/* SCRAMBLED WORDS FOR REORDER */}
                {currentQuestion.type === "reorder" && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-wrap gap-2 items-center">
                    {currentQuestion.scrambled.split(" / ").map((word, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white rounded-lg shadow-sm border border-gray-100 font-medium text-gray-600"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}

                {showHint && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl text-yellow-800 text-sm italic">
                    💡 Hint: {currentQuestion.hint || "Try your best!"}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((opt, i) => {
                    let btnClass =
                      "group relative p-5 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ";
                    if (userSelected) {
                      if (opt === currentQuestion.answer)
                        btnClass +=
                          "bg-green-50 border-green-500 text-green-700 shadow-sm";
                      else if (opt === userSelected)
                        btnClass += "bg-red-50 border-red-500 text-red-700";
                      else
                        btnClass +=
                          "bg-white border-gray-100 text-gray-400 opacity-60";
                    } else {
                      btnClass +=
                        "bg-white border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:translate-x-1";
                    }
                    return (
                      <button
                        key={i}
                        disabled={!!userSelected}
                        onClick={() => handleAnswer(opt)}
                        className={btnClass}
                      >
                        <span className="font-medium pr-8 leading-snug">
                          {renderText(opt)}
                        </span>
                        {userSelected && opt === currentQuestion.answer && (
                          <CheckCircle
                            className="text-green-500 shrink-0"
                            size={20}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* NAVIGATION */}
              <div className="px-8 py-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
                <button
                  onClick={() => {
                    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
                    setShowHint(false);
                  }}
                  disabled={currentIdx === 0}
                  className={`flex items-center gap-2 font-bold transition-all ${
                    currentIdx === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-indigo-500 hover:text-indigo-700"
                  }`}
                >
                  <ArrowLeft size={20} /> Previous
                </button>
                <div className="text-xs font-black text-gray-300 uppercase tracking-widest">
                  Marie Curie Exam
                </div>
                <button
                  onClick={() => {
                    if (currentIdx < QUESTIONS.length - 1)
                      setCurrentIdx(currentIdx + 1);
                    else setGameState("finished");
                    setShowHint(false);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  {currentIdx === QUESTIONS.length - 1 ? "Finish" : "Next"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "shop" && (
          <div className="max-w-4xl w-full animate-fade-in">
            <h2 className="text-3xl font-black text-indigo-900 mb-8 flex items-center gap-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <ShoppingCart className="text-indigo-600" />
              </div>
              Soft Furniture Shop
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {FURNITURE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-[32px] shadow-sm border border-white hover:shadow-xl transition-all group flex flex-col items-center"
                >
                  <div className="text-6xl mb-4 p-4 bg-gray-50 w-full aspect-square flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-yellow-600 font-black text-sm mb-4">
                    {item.price}$
                  </p>
                  <button
                    disabled={money < item.price}
                    onClick={() => buyItem(item)}
                    className={`w-full py-2.5 rounded-xl font-bold transition-all ${
                      money >= item.price
                        ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-md"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === "house" && (
          <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 animate-fade-in h-[calc(100vh-160px)]">
            {/* HOUSE CANVAS */}
            <div
              className="flex-1 relative bg-white rounded-[40px] shadow-2xl border-[12px] border-white overflow-hidden"
              ref={houseRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Wallpaper & Floor */}
              <div className="absolute inset-0 bg-[#fdf2f8] flex flex-col">
                <div className="flex-1 border-b-2 border-white/20"></div>
                <div
                  className="h-1/4 w-full bg-[#e7d1b3] shadow-inner"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(0,0,0,0.03) 40px)",
                  }}
                ></div>
              </div>

              {/* Items */}
              {placedItems.map((item) => (
                <div
                  key={item.instanceId}
                  onMouseDown={(e) => handleMouseDown(e, item.instanceId)}
                  className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${
                    selectedInstanceId === item.instanceId
                      ? "ring-4 ring-indigo-400/50 rounded-2xl"
                      : ""
                  }`}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    transform: `scale(${item.scale}) translate(-50%, -50%)`,
                    fontSize: "60px",
                    zIndex: selectedInstanceId === item.instanceId ? 40 : 10,
                  }}
                >
                  {item.icon}
                </div>
              ))}

              {placedItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 italic font-medium p-12 text-center">
                  Your room is empty. Go to the shop and buy some cute stuff! 🎀
                </div>
              )}
            </div>

            {/* CONTROL PANEL */}
            <div className="w-full md:w-64 flex flex-col gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-indigo-50">
                <h3 className="font-black text-indigo-900 mb-4 flex items-center gap-2">
                  <Maximize2 size={18} /> Decoration
                </h3>
                {selectedInstanceId ? (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase block mb-2 tracking-widest">
                        Size Scale
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={
                          placedItems.find(
                            (i) => i.instanceId === selectedInstanceId
                          )?.scale || 1
                        }
                        onChange={(e) =>
                          updateScale(
                            selectedInstanceId,
                            parseFloat(e.target.value) -
                              (placedItems.find(
                                (i) => i.instanceId === selectedInstanceId
                              )?.scale || 1)
                          )
                        }
                        className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteItem(selectedInstanceId)}
                        className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 font-bold"
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Click on an item in the room to edit its size or remove it.
                  </p>
                )}
              </div>
              <button
                onClick={() => setGameState("quiz")}
                className="bg-indigo-600 text-white font-bold py-4 rounded-3xl shadow-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Play size={20} /> Back to Quiz
              </button>
            </div>
          </div>
        )}

        {gameState === "finished" && (
          <div className="max-w-md w-full bg-white p-12 rounded-[48px] shadow-2xl text-center border-b-8 border-indigo-100 animate-fade-in">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Trophy className="text-yellow-500 w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-2">
              Well Done!
            </h2>
            <p className="text-gray-500 mb-8 font-medium italic">
              You've completed the challenge.
            </p>
            <div className="bg-indigo-50 p-8 rounded-3xl mb-10 shadow-inner">
              <div className="text-xs text-indigo-400 font-black uppercase tracking-widest mb-2">
                Final Score
              </div>
              <div className="text-6xl font-black text-indigo-700">
                {score}/{QUESTIONS.length}
              </div>
            </div>
            <button
              onClick={() => setGameState("house")}
              className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-indigo-700 mb-4 transition-transform active:scale-95"
            >
              Go to your house 🏠
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-gray-400 font-bold hover:text-indigo-500 flex items-center justify-center gap-2 w-full"
            >
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        )}
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #6366f1;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `,
        }}
      />
    </div>
  );
}

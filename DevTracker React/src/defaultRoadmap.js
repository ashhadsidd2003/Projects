const defaultRoadmap = [
  {
    title: "Data Structures", 
    expanded: false,
    subtopics: [
      {
        title: "Arrays",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation", done: false },
          { name: "Related Concepts & Problems (Sliding Window, Two Pointers, Classic Problem)", done: false },
        ],
      },
      {
        title: "Strings",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation", done: false },
          { name: "Related Concepts & Problems (Anagrams, Frequency Map, Pattern Matching)", done: false },
        ],
      },
      {
        title: "Linked List",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Insertion, Deletion, Reversal, Cycle Detection)", done: false },
          { name: "Related Concepts & Problems (Merge Two Lists, Detect Cycle, Middle Node)", done: false }, // ORIGINAL CONTENT PRESERVED
        ],
      },
      {
        title: "Stacks & Queues",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Stack using Array/LinkedList, Queue using 2 Stacks)", done: false },
          { name: "Related Concepts & Problems (Valid Parentheses, Next Greater Element, Min Stack)", done: false },
        ],
      },
      {
        title: "Trees",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Tree Traversals, BST Insert/Delete)", done: false },
          { name: "Related Concepts & Problems (Height, Diameter, Lowest Common Ancestor)", done: false },
        ],
      },
      {
        title: "Heaps / Priority Queues",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Build Heap, SiftUp, SiftDown)", done: false },
          { name: "Related Concepts & Problems (Heapify, Kth Largest Element, Top K Elements)", done: false },
        ],
      },
      {
        title: "Graphs",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Adjacency List, Adjacency Matrix)", done: false },
          { name: "Related Concepts & Problems (BFS, DFS, Shortest Path, Connected Components)", done: false },
        ],
      },
    ],
  },
  {
    title: "Algorithms",
    expanded: false,
    subtopics: [
      {
        title: "Merge Sort",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (recursion)", done: false },
          { name: "Related Concepts & Problems (Divide & Conquer, Time/Space Complexity, Sort an Array)", done: false },
        ],
      },
      {
        title: "Quick Sort",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (In-place Partitioning)", done: false },
          { name: "Related Concepts & Problems (Pivot Selection, Worst Case Analysis, Kth Largest Element)", done: false },
        ],
      },
      {
        title: "Insertion Sort",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation", done: false },
          { name: "Related Concepts & Problems (Adaptive Sorting, Time Complexity, Good for Small Data)", done: false },
        ],
      },
      {
        title: "Bubble Sort",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation", done: false },
          { name: "Related Concepts & Problems (Stability, Time Complexity, Largest Number at Least Twice of Others)", done: false },
        ],
      },
      {
        title: "Selection Sort",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation", done: false },
          { name: "Related Concepts & Problems (In-place Sorting, Time Complexity, Finding Min/Max)", done: false },
        ],
      },
      {
        title: "Binary Search",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Implementation (Iterative and Recursive)", done: false },
          { name: "Related Concepts & Problems (Sorted Arrays, Binary Search, First Bad Version)", done: false },
        ],
      },
      {
        title: "Recursion",
        expanded: false,
        items: [
          { name: "Basics (Base Case, Recursive Step)", done: false },
          { name: "Implementation (Stack Overflow Handling)", done: false },
          { name: "Related Concepts & Problems (Backtracking, Memoization, Fibonacci Number, Permutations)", done: false },
        ],
      },
      {
        title: "Dynamic Programming",
        expanded: false,
        items: [
          { name: "Basics (Overlapping Subproblems, Optimal Substructure)", done: false },
          { name: "Implementation (Top-down Memoization and Bottom-up Tabulation)", done: false },
          { name: "Related Concepts & Problems (State Transition Equation, Maximum Subarray, Coin Change)", done: false },
        ],
      },
    ],
  },
  {
    title: "OOP",
    expanded: false,
    subtopics: [
      {
        title: "Pillars",
        expanded: false,
        items: [
          { name: "Encapsulation", done: false },
          { name: "Inheritance", done: false },
          { name: "Polymorphism", done: false },
          { name: "Abstraction", done: false },
        ],
      },
      {
        title: "Concepts",
        expanded: false,
        items: [
          { name: "Class & Object", done: false },
          { name: "Constructor", done: false },
          { name: "Method Overriding / Overloading", done: false },
          { name: "Access Modifiers (private, public, protected)", done: false },
        ],
      },
      {
        title: "Implementation",
        expanded: false,
        items: [
          { name: "Writing Classes", done: false },
          { name: "Creating Objects", done: false },
          { name: "Using Constructors", done: false },
          { name: "Applying Inheritance in Code", done: false },
        ],
      },
    ],
  },
  {
    title: "Web Development",
    expanded: false,
    subtopics: [
      {
        title: "Frontend",
        expanded: false,
        items: [
          { name: "HTML & CSS Basics", done: false },
          { name: "Flexbox & Grid", done: false },
          { name: "Responsive Design Practice", done: false },
          { name: "Bootstrap Layout", done: false },
          { name: "Tailwind Basics", done: false },
        ],
      },
      {
        title: "JavaScript",
        expanded: false,
        items: [
          { name: "JS Syntax & Variables", done: false },
          { name: "DOM Manipulation", done: false },
          { name: "Events & Listeners", done: false },
          { name: "Promises & Async/Await", done: false },
          { name: "Fetch API", done: false },
        ],
      },
      {
        title: "Backend",
        expanded: false,
        items: [
          { name: "Node.js Basics", done: false },
          { name: "Express Routing", done: false },
          { name: "REST API Creation", done: false },
          { name: "MongoDB Basics", done: false },
          { name: "Error Handling", done: false },
        ],
      },
    ],
  },
  {
    title: "Languages",
    expanded: false,
    subtopics: [
      {
        title: "C",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Syntax", done: false },
          { name: "Data Types", done: false },
          { name: "Functions", done: false },
          { name: "Pointers & Structures", done: false },
        ],
      },
      {
        title: "Java",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Syntax", done: false },
          { name: "OOP Integration", done: false },
          { name: "Collections Framework", done: false },
        ],
      },
      {
        title: "JavaScript",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Syntax", done: false },
          { name: "Functions & Objects", done: false },
          { name: "ES6+ Concepts (let, const, arrow functions, promises)", done: false },
        ],
      },
      {
        title: "Python",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Syntax", done: false },
          { name: "Functions", done: false },
          { name: "Lists & Dictionaries", done: false },
          { name: "Modules & Libraries (NumPy, Pandas)", done: false },
        ],
      },
      {
        title: "C++",
        expanded: false,
        items: [
          { name: "Basics", done: false },
          { name: "Syntax", done: false },
          { name: "STL Overview", done: false },
          { name: "OOP Concepts", done: false },
          { name: "File Handling", done: false },
        ],
      },
    ],
  },
];

export default defaultRoadmap;
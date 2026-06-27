// src/data/interviewQuestions.js

export const technicalCategories = [
  {
    id: "dsa",
    label: "Data Structures & Algorithms",
    questions: [
      {
        q: "What is the difference between an array and a linked list?",
        a: "Arrays store elements in contiguous memory with O(1) index access but costly insertion/deletion in the middle. Linked lists store nodes with pointers, giving O(1) insertion/deletion at known positions but O(n) access since you must traverse from the head.",
      },
      {
        q: "Explain time complexity of binary search and why it requires a sorted array.",
        a: "Binary search runs in O(log n) because it halves the search space each step. It needs a sorted array so that comparing the middle element to the target reliably tells you which half to discard.",
      },
      {
        q: "What's the difference between BFS and DFS, and when would you use each?",
        a: "BFS explores level by level using a queue — good for finding the shortest path in unweighted graphs. DFS explores as deep as possible using a stack or recursion — good for cycle detection, topological sort, and exhaustive search like backtracking.",
      },
      {
        q: "How does a hash map achieve O(1) average lookup time?",
        a: "A hash function maps a key to a bucket index. If the hash function distributes keys evenly and collisions are handled well (chaining or open addressing), most lookups touch a small, near-constant number of entries.",
      },
      {
        q: "What is dynamic programming, and how do you identify a DP problem?",
        a: "DP solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Look for optimal substructure (the answer can be built from answers to smaller versions) and overlapping subproblems (naive recursion repeats the same calls).",
      },
    ],
  },
  {
    id: "os",
    label: "Operating Systems",
    questions: [
      {
        q: "What is the difference between a process and a thread?",
        a: "A process is an independent program with its own memory space; threads are lightweight units of execution within a process that share its memory but have their own stack and registers, making context switching between threads cheaper.",
      },
      {
        q: "Explain deadlock and the four conditions required for it to occur.",
        a: "Deadlock is when processes wait on each other indefinitely. It requires mutual exclusion, hold-and-wait, no preemption, and circular wait — all four must hold simultaneously.",
      },
      {
        q: "What is virtual memory and why is it useful?",
        a: "Virtual memory gives each process the illusion of a large, contiguous address space backed by RAM and disk. It enables process isolation, allows programs larger than physical RAM to run, and simplifies memory management via paging.",
      },
    ],
  },
  {
    id: "dbms",
    label: "DBMS & SQL",
    questions: [
      {
        q: "What is normalization, and what problem does it solve?",
        a: "Normalization organizes tables to reduce data redundancy and avoid update/insert/delete anomalies, typically by progressively enforcing 1NF, 2NF, and 3NF rules around functional dependencies.",
      },
      {
        q: "Difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?",
        a: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matches from the right (NULLs where there's no match). RIGHT JOIN does the mirror image for the right table.",
      },
      {
        q: "What is an index, and what's the trade-off of adding one?",
        a: "An index is a data structure (often a B-tree) that speeds up lookups on a column. The trade-off is extra storage and slower writes, since every insert/update/delete must also update the index.",
      },
    ],
  },
  {
    id: "webdev",
    label: "Web Development",
    questions: [
      {
        q: "What is the virtual DOM and why does React use it?",
        a: "The virtual DOM is an in-memory representation of the UI. React diffs the new virtual DOM tree against the previous one and applies only the minimal real DOM updates needed, which is faster than re-rendering the whole page.",
      },
      {
        q: "Explain the difference between REST and GraphQL.",
        a: "REST exposes fixed endpoints that return fixed shapes of data, often requiring multiple round trips. GraphQL exposes a single endpoint where clients specify exactly the fields they need in one query, reducing over-fetching and under-fetching.",
      },
      {
        q: "What is CORS and why does it exist?",
        a: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks a webpage from making requests to a different origin unless that server explicitly allows it via response headers — it exists to prevent malicious sites from silently calling APIs on a user's behalf.",
      },
    ],
  },
];

export const hrQuestions = [
  {
    q: "Tell me about yourself.",
    tip: "Structure it as Present → Past → Future: what you currently study/do, one or two relevant achievements, and what you're looking for next. Keep it under 90 seconds and tie it to the role.",
  },
  {
    q: "Why do you want to work here?",
    tip: "Reference something specific about the company (a product, a value, a recent move) rather than generic praise, and connect it to what you want to learn or contribute.",
  },
  {
    q: "What is your biggest weakness?",
    tip: "Pick something real but not disqualifying for the role, then describe the concrete action you're taking to improve it. Avoid 'I'm a perfectionist' — it reads as rehearsed.",
  },
  {
    q: "Describe a time you faced conflict in a team.",
    tip: "Use the STAR method (Situation, Task, Action, Result). Focus most of your answer on the Action you personally took and end with a measurable or observable Result.",
  },
  {
    q: "Where do you see yourself in five years?",
    tip: "Show ambition that's plausible and aligned with the company's growth paths — avoid naming a completely unrelated career or an executive title that sounds presumptuous.",
  },
  {
    q: "Why should we hire you over other candidates?",
    tip: "Don't compare yourself to imaginary competitors — instead, state two or three concrete things from your projects/experience that map directly to what the job description asks for.",
  },
  {
    q: "Do you have any questions for us?",
    tip: "Always have at least two ready — about team structure, what success looks like in the first 90 days, or how the team measures impact. Never say 'no, I think you covered everything.'",
  },
];

export const companies = [
  {
    id: "tcs",
    name: "TCS",
    focus: "Aptitude-heavy first round, communication skills, and core CS fundamentals at the technical round.",
    rounds: ["Online aptitude + coding test", "Technical interview", "HR interview"],
    sampleQuestions: [
      "Explain OOP concepts with real examples from a project you built.",
      "Write a function to check if a string is a palindrome.",
      "Why TCS, and are you open to relocation?",
    ],
  },
  {
    id: "infosys",
    name: "Infosys",
    focus: "Strong emphasis on logical reasoning, pseudocode, and verbal communication in the HR round.",
    rounds: ["Online test (quant, logical, verbal, coding)", "Technical interview", "HR interview"],
    sampleQuestions: [
      "Explain normalization in DBMS with an example.",
      "What is the difference between stack and queue?",
      "Tell me about a challenging project and your specific role in it.",
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    focus: "DSA-heavy rounds with a strong bar on optimal time complexity, plus a dedicated Leadership Principles round.",
    rounds: ["Online assessment (DSA + debugging)", "2-3 technical interviews", "Bar raiser / Leadership Principles round"],
    sampleQuestions: [
      "Given an array, find two numbers that add up to a target (and discuss the optimal approach).",
      "Tell me about a time you disobeyed a process because you believed it was the right thing to do.",
      "Design a basic rate limiter — what data structure would you use and why?",
    ],
  },
  {
    id: "google",
    name: "Google",
    focus: "Deep DSA and problem-solving, clear communication of thought process, and clean, testable code.",
    rounds: ["Phone screen (coding)", "2-4 onsite/virtual technical rounds", "Googleyness & Leadership round"],
    sampleQuestions: [
      "Find the longest substring without repeating characters — talk through your approach before coding.",
      "How would you design a URL shortening service at a high level?",
      "Describe a time you had to convince a team to change direction on a technical decision.",
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    focus: "Balanced DSA + system design awareness, with attention to how you communicate trade-offs.",
    rounds: ["Online coding round", "2-3 technical interviews", "HR / culture-fit round"],
    sampleQuestions: [
      "Reverse a linked list iteratively and recursively — what are the trade-offs?",
      "How would you detect a cycle in a graph?",
      "Tell me about a time you received critical feedback. How did you respond?",
    ],
  },
  {
    id: "startup",
    name: "Early-Stage Startups",
    focus: "Less emphasis on textbook DSA, more on what you've actually shipped, ownership, and adaptability.",
    rounds: ["Take-home assignment or pair-programming session", "Founder/team culture-fit call"],
    sampleQuestions: [
      "Walk me through a project end-to-end — what broke, and how did you debug it?",
      "How comfortable are you with ambiguity and shifting priorities?",
      "What would you build in your first 30 days if you joined us?",
    ],
  },
];

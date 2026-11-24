/* M1 Software Development: practice questions and drills (original TOPCIT-style items) */
TC.questions.push(
{ id: 'm1q01', l: 'm1-1', t: 'mc',
  q: "Which software development life-cycle model repeats cycles of planning, **risk analysis**, engineering and customer evaluation, and is suited to large, high-risk projects?",
  c: ["Waterfall model", "Prototyping model", "Spiral model", "RAD model"], a: 2,
  ex: ["Waterfall runs phases once in sequence and has no risk-analysis step.",
       "Prototyping builds a quick model to clarify requirements; risk analysis is not its core activity.",
       "Correct. Boehm's Spiral model puts risk analysis in every cycle.",
       "RAD shortens development with reusable components; it is weak for high-risk systems."] },
{ id: 'm1q02', l: 'm1-1', t: 'mc',
  q: "Which statement about Scrum is **incorrect**?",
  c: ["The Product Owner manages and orders the Product Backlog.",
      "The Daily Scrum is a 15-minute event where developers inspect progress toward the Sprint Goal.",
      "In the Sprint Retrospective, the team demonstrates the Increment to stakeholders to get feedback on the product.",
      "The Scrum Master coaches the team on Scrum and helps remove impediments."], a: 2,
  ex: ["Correct statement: the Product Owner owns and orders the backlog.",
       "Correct statement: the Daily Scrum is time-boxed to 15 minutes.",
       "Incorrect, so this is the answer. Showing the Increment to stakeholders is the **Sprint Review**. The Retrospective is about improving the team's own process.",
       "Correct statement: the Scrum Master is a servant-leader, not a manager."] },
{ id: 'm1q03', l: 'm1-1', t: 'mc',
  q: "In the V-model, which test level is paired with (verifies) the **architecture / high-level design**?",
  c: ["Unit test", "Integration test", "System test", "Acceptance test"], a: 1,
  ex: ["Unit test is paired with detailed module design.",
       "Correct. Architecture design defines how modules connect, which integration testing verifies.",
       "System test is paired with system (requirements) design.",
       "Acceptance test is paired with user requirements analysis."] },
{ id: 'm1q04', l: 'm1-1', t: 'mc',
  q: "A team analyzes the source code of a 15-year-old payroll system to recover its design documents. They do not change the code. What is this activity?",
  c: ["Forward engineering", "Reverse engineering", "Refactoring", "Reengineering"], a: 1,
  ex: ["Forward engineering goes from requirements to design to code.",
       "Correct. Reverse engineering extracts design and specifications from existing code without changing it.",
       "Refactoring changes the code's structure; here the code is not changed.",
       "Reengineering includes reverse engineering plus restructuring and forward engineering, so it changes the system."] },
{ id: 'm1q05', l: 'm1-2', t: 'mc',
  q: "Starting with an empty stack, these operations run in order: push A, push B, pop, push C, push D, pop, pop. In what order are elements popped?",
  c: ["B, D, C", "B, C, D", "A, B, C", "D, C, B"], a: 0,
  ex: ["Correct. After push A, B: pop → B. Push C, D: pop → D, pop → C.",
       "C is below D, so D comes out first (LIFO).",
       "A is never popped, and the stack is LIFO, not FIFO.",
       "B was popped first, before C and D were pushed."] },
{ id: 'm1q06', l: 'm1-2', t: 'mc',
  q: "What is the **post-order** traversal of the binary tree in the [Example]?",
  code: String.raw`        A
      /   \
     B     C
    / \     \
   D   E     F`, lang: 'text',
  c: ["D E B F C A", "A B D E C F", "D B E A C F", "D E F B C A"], a: 0,
  ex: ["Correct. Post-order is left, right, root: D E B, then F C, then A.",
       "This is pre-order (root, left, right).",
       "This is in-order (left, root, right).",
       "F belongs to C's subtree, so C must come right after F and before A; B must come right after D and E."] },
{ id: 'm1q07', l: 'm1-2', t: 'mc',
  q: "A binary tree has 10 nodes with two children each. How many leaf nodes does it have?",
  c: ["9", "10", "11", "20"], a: 2,
  ex: ["Off by two. Use n0 = n2 + 1.",
       "Off by one. Use n0 = n2 + 1.",
       "Correct. In any binary tree, leaves = (nodes of degree 2) + 1 = 11.",
       "Each degree-2 node does not create two leaves; the formula is n0 = n2 + 1."] },
{ id: 'm1q08', l: 'm1-2', t: 'mc',
  q: "Convert the infix expression {{A * (B + C) - D}} to postfix.",
  c: ["A B C + * D -", "A B + C * D -", "* A + B C - D", "A B C D + * -"], a: 0,
  ex: ["Correct. Parentheses first: B C +, then multiply by A: A B C + *, then subtract D.",
       "This computes (A + B) * C, ignoring the parentheses.",
       "This is a (malformed) prefix form, not postfix.",
       "This adds C and D, which is not in the expression."] },
{ id: 'm1q09', l: 'm1-3', t: 'mc',
  q: "Which sorting algorithm is **stable** and still O(n log n) in the **worst** case?",
  c: ["Quick sort", "Heap sort", "Merge sort", "Selection sort"], a: 2,
  ex: ["Quick sort's worst case is O(n²) and it is not stable.",
       "Heap sort is O(n log n) in the worst case but not stable.",
       "Correct. Merge sort is O(n log n) in all cases and stable (it needs O(n) extra memory).",
       "Selection sort is O(n²) and not stable."] },
{ id: 'm1q10', l: 'm1-3', t: 'mc',
  q: "Binary search is used on 1,000 sorted records. What is the maximum number of comparisons needed?",
  c: ["10", "100", "500", "1,000"], a: 0,
  ex: ["Correct. ⌊log₂ 1000⌋ + 1 = 9 + 1 = 10, since 2^10 = 1024 ≥ 1000.",
       "Binary search halves the range each time; 100 would be far too many.",
       "500 is the average for linear search.",
       "1,000 is the worst case for linear search."] },
{ id: 'm1q11', l: 'm1-3', t: 'mc',
  q: "Which algorithm is **not** a greedy algorithm?",
  c: ["Kruskal's minimum spanning tree", "Prim's minimum spanning tree", "Dijkstra's shortest path", "Floyd-Warshall all-pairs shortest path"], a: 3,
  ex: ["Kruskal greedily adds the cheapest edge that forms no cycle.",
       "Prim greedily adds the cheapest edge leaving the current tree.",
       "Dijkstra greedily picks the closest unvisited vertex.",
       "Correct. Floyd-Warshall is dynamic programming over intermediate vertices, O(n³)."] },
{ id: 'm1q12', l: 'm1-4', t: 'mc',
  q: "Which task is an example of **unsupervised** learning?",
  c: ["Predicting house prices from labeled past sales", "Classifying emails as spam using labeled examples", "Grouping customers into segments by purchase behavior without labels", "Training a robot to walk using rewards"], a: 2,
  ex: ["Regression with labels is supervised learning.",
       "Classification with labels is supervised learning.",
       "Correct. Clustering unlabeled data (e.g., K-means) is unsupervised.",
       "Learning from rewards is reinforcement learning."] },
{ id: 'm1q13', l: 'm1-4', t: 'mc',
  q: "A fraud model flags 50 transactions; 40 of them are real fraud. There are 80 real fraud cases in total. What are its precision and recall?",
  c: ["Precision 0.8, Recall 0.5", "Precision 0.5, Recall 0.8", "Precision 0.8, Recall 0.8", "Precision 0.4, Recall 0.5"], a: 0,
  ex: ["Correct. Precision = TP/(TP+FP) = 40/50 = 0.8. Recall = TP/(TP+FN) = 40/80 = 0.5.",
       "Precision and recall are swapped.",
       "Recall uses all 80 real cases, so it is 40/80.",
       "Precision is 40 out of the 50 flagged, not 40 out of 100."] },
{ id: 'm1q14', l: 'm1-4', t: 'mc',
  q: "Which technique retrieves relevant company documents at question time and adds them to an LLM's prompt, so answers use current data and hallucinate less without retraining the model?",
  c: ["Fine-tuning", "Retrieval-Augmented Generation (RAG)", "Generative Adversarial Network (GAN)", "Data augmentation"], a: 1,
  ex: ["Fine-tuning retrains the model's weights on new data.",
       "Correct. RAG retrieves documents (often from a vector database) and puts them in the prompt.",
       "A GAN generates synthetic data with a generator and a discriminator.",
       "Data augmentation creates extra training samples; it does not happen at question time."] },
{ id: 'm1q15', l: 'm1-4', t: 'mc',
  q: "Which statement about deep learning architectures is **incorrect**?",
  c: ["A CNN extracts spatial features with convolution and pooling and is widely used for images.",
      "LSTM was designed to reduce the vanishing-gradient problem of basic RNNs.",
      "A Transformer processes tokens strictly one at a time like an RNN, which makes it slow to train in parallel.",
      "In a GAN, a generator and a discriminator are trained in competition with each other."], a: 2,
  ex: ["Correct statement.",
       "Correct statement: gates in LSTM keep long-term information.",
       "Incorrect, so this is the answer. Self-attention lets a Transformer process all tokens in parallel, which is why it trains efficiently.",
       "Correct statement."] },
{ id: 'm1q16', l: 'm1-5', t: 'mc',
  q: "Which is a **non-functional** requirement for a library system?",
  c: ["Members can search books by title or author.", "The system calculates late fees when a book is returned.", "95% of searches must return results within 2 seconds with 500 concurrent users.", "Librarians can register new members."], a: 2,
  ex: ["A feature the system performs: functional.",
       "A calculation the system performs: functional.",
       "Correct. Performance is a quality attribute, so it is non-functional.",
       "A feature: functional."] },
{ id: 'm1q17', l: 'm1-5', t: 'mc',
  q: "In an ATM use case diagram, every cash withdrawal must authenticate the user, and printing a receipt happens only if the customer asks. Which relationships are correct?",
  c: ["Withdraw cash «include» Authenticate user; Print receipt «extend» Withdraw cash",
      "Withdraw cash «extend» Authenticate user; Print receipt «include» Withdraw cash",
      "Authenticate user generalizes Withdraw cash; Print receipt «include» Withdraw cash",
      "Both are «include» relationships"], a: 0,
  ex: ["Correct. Mandatory reused behavior is «include»; optional, conditional behavior is «extend».",
       "This reverses the two relationships.",
       "Authentication is not a parent type of withdrawal, and an optional step is not «include».",
       "Printing is optional, so it must be «extend»."] },
{ id: 'm1q18', l: 'm1-5', t: 'mc',
  q: "In a structured-analysis data dictionary, which symbol means **repetition** (iteration)?",
  c: ["=", "+", "{ }", "( )"], a: 2,
  ex: ["= means 'is composed of'.",
       "+ means 'and' (sequence).",
       "Correct. { } means the item repeats.",
       "( ) means optional."] },
{ id: 'm1q19', l: 'm1-6', t: 'mc',
  q: "In a module, the output of each step is the input of the next step (read record → validate → compute). Which cohesion is this?",
  c: ["Functional cohesion", "Sequential cohesion", "Communicational cohesion", "Procedural cohesion"], a: 1,
  ex: ["Functional cohesion means all parts contribute to a single function; the clue here is output→input chaining.",
       "Correct. Output of one element feeding the next is sequential cohesion.",
       "Communicational cohesion means the elements use the same input or output data, not a chain.",
       "Procedural cohesion follows an order of steps but data need not pass from one to the next."] },
{ id: 'm1q20', l: 'm1-6', t: 'mc',
  q: "Which lists coupling types from **weakest (best)** to **strongest (worst)**?",
  c: ["Data → Stamp → Control → External → Common → Content",
      "Content → Common → External → Control → Stamp → Data",
      "Data → Control → Stamp → Common → External → Content",
      "Stamp → Data → Control → External → Content → Common"], a: 0,
  ex: ["Correct.",
       "This is the order from strongest to weakest, the reverse of what was asked.",
       "Stamp (passing a structure) is weaker than control (passing a flag).",
       "Data coupling is the weakest of all; content is the strongest."] },
{ id: 'm1q21', l: 'm1-6', t: 'mc',
  q: "A {{ReportService}} class builds reports, sends them by email, and saves them to the database. A change to the mail server forces edits to this class. Which SOLID principle is violated most directly?",
  c: ["Single Responsibility Principle", "Open/Closed Principle", "Liskov Substitution Principle", "Interface Segregation Principle"], a: 0,
  ex: ["Correct. The class has several reasons to change (reporting, mailing, persistence).",
       "OCP is about extending without modifying; the core problem here is too many responsibilities.",
       "LSP concerns subtypes replacing base types; no inheritance is involved.",
       "ISP concerns fat interfaces forcing clients to depend on methods they do not use."] },
{ id: 'm1q22', l: 'm1-7', t: 'mc',
  q: "An Order consists of OrderLines. When an Order is deleted, its OrderLines are deleted too. Which UML relationship fits best?",
  c: ["Association", "Aggregation (hollow diamond)", "Composition (filled diamond)", "Dependency (dashed arrow)"], a: 2,
  ex: ["Plain association has no whole-part meaning.",
       "Aggregation is whole-part where the parts can live on their own.",
       "Correct. Parts that cannot exist without the whole means composition.",
       "Dependency is a temporary 'uses' relationship."] },
{ id: 'm1q23', l: 'm1-7', t: 'mc',
  q: "Which UML diagram is a **structural** (static) diagram?",
  c: ["Sequence diagram", "Activity diagram", "State machine diagram", "Component diagram"], a: 3,
  ex: ["Sequence diagrams show behavior over time.",
       "Activity diagrams show workflow behavior.",
       "State machine diagrams show behavior of an object across states.",
       "Correct. Component diagrams show the static organization of components and interfaces."] },
{ id: 'm1q24', l: 'm1-7', t: 'mc', multi: true,
  q: "Select **all** UML interaction diagrams.",
  c: ["Sequence diagram", "Communication diagram", "Deployment diagram", "Timing diagram"], a: [0, 1, 3],
  ex: ["Interaction diagram.", "Interaction diagram (messages along object links).",
       "Deployment is a structural diagram of nodes and artifacts.", "Interaction diagram (state changes over time)."] },
{ id: 'm1q25', l: 'm1-8', t: 'mc',
  q: "A weather station must automatically notify every registered display (phone app, LED board, website) when the temperature changes. Which design pattern fits?",
  c: ["Singleton", "Observer", "Adapter", "Decorator"], a: 1,
  ex: ["Singleton only guarantees a single instance.",
       "Correct. Observer defines a one-to-many dependency with automatic notification.",
       "Adapter converts one interface into another.",
       "Decorator adds responsibilities by wrapping an object."] },
{ id: 'm1q26', l: 'm1-8', t: 'mc',
  q: "A checkout lets the cashier choose among interchangeable discount algorithms (senior, student, promo) at run time without changing the checkout code. Which pattern fits?",
  c: ["Template Method", "Strategy", "Facade", "Proxy"], a: 1,
  ex: ["Template Method fixes the algorithm skeleton in a superclass; it is chosen by subclassing, not at run time.",
       "Correct. Strategy encapsulates interchangeable algorithms selected by the client.",
       "Facade simplifies a subsystem's interface.",
       "Proxy controls access to another object."] },
{ id: 'm1q27', l: 'm1-8', t: 'mc',
  q: "Which design pattern belongs to the **structural** group?",
  c: ["Builder", "Adapter", "Iterator", "Observer"], a: 1,
  ex: ["Builder is creational.", "Correct. Adapter is structural.", "Iterator is behavioral.", "Observer is behavioral."] },
{ id: 'm1q28', l: 'm1-9', t: 'mc',
  q: "After {{chmod 750 report.sh}}, what does {{ls -l}} show for the permissions?",
  c: ["-rwxr-x---", "-rwxrw----", "-rw-r-x---", "-rwxr-xr--"], a: 0,
  ex: ["Correct. 7 = rwx (owner), 5 = r-x (group), 0 = --- (others).",
       "rw- is 6, not 5.",
       "rw- is 6; the owner has 7.",
       "Others would be 4 (r--); here others get 0."] },
{ id: 'm1q29', l: 'm1-9', t: 'mc',
  q: "Which statement is **incorrect**?",
  c: ["Continuous Integration merges code frequently and runs an automated build and tests on each merge.",
      "Continuous Deployment automatically releases every change that passes the pipeline to production.",
      "MLOps manages data and model versions, training pipelines, deployment and monitoring for model drift.",
      "AIOps means writing AI model code in an IDE that is connected to Git."], a: 3,
  ex: ["Correct statement.", "Correct statement.", "Correct statement.",
       "Incorrect, so this is the answer. AIOps applies AI/ML to IT operations data (logs, metrics, events) to detect anomalies and automate operations."] },
{ id: 'm1q30', l: 'm1-10', t: 'mc',
  q: "What does this Java code print?",
  code: String.raw`int[] a = {1, 2, 3, 4};
for (int n : a) n = n * 10;
int sum = 0;
for (int i = 0; i < a.length; i++) sum += a[i];
System.out.println(sum);`, lang: 'java',
  c: ["10", "100", "0", "Compile error"], a: 0,
  ex: ["Correct. The for-each variable n is a copy, so the array is unchanged and the sum is 1+2+3+4 = 10.",
       "This assumes the for-each loop changed the array; it does not.",
       "The array still holds 1–4.",
       "Assigning to the loop variable compiles fine; it just has no effect on the array."] },
{ id: 'm1q31', l: 'm1-10', t: 'mc',
  q: "What does this Java code print?",
  code: String.raw`class Animal {
    String name = "animal";
    String sound() { return "..."; }
}
class Dog extends Animal {
    String name = "dog";
    String sound() { return "woof"; }
}
// in main:
Animal a = new Dog();
System.out.println(a.name + " " + a.sound());`, lang: 'java',
  c: ["animal woof", "dog woof", "animal ...", "dog ..."], a: 0,
  ex: ["Correct. Fields use the declared type (Animal), methods use the actual object (Dog) through dynamic binding.",
       "Fields are not overridden; a.name uses the declared type Animal.",
       "sound() is overridden, so Dog's version runs.",
       "Both parts are reversed."] },
{ id: 'm1q32', l: 'm1-10', t: 'mc',
  q: "What does this Python code print?",
  code: String.raw`nums = [3, 8, 1, 9, 4]
print(nums[1:4], nums[::-2], sum(x for x in nums if x % 2))`, lang: 'python',
  c: ["[8, 1, 9] [4, 1, 3] 13", "[3, 8, 1, 9] [4, 1, 3] 13", "[8, 1, 9] [9, 8] 13", "[8, 1, 9] [4, 1, 3] 12"], a: 0,
  ex: ["Correct. [1:4] takes indexes 1–3; [::-2] steps backward by 2 from the end; odd numbers 3+1+9 = 13.",
       "Slicing starts at index 1, not 0.",
       "[::-2] starts from the last element (4).",
       "The odd numbers are 3, 1, 9, which sum to 13."] },
{ id: 'm1q33', l: 'm1-10', t: 'mc',
  q: "What does this C code print?",
  code: String.raw`int a[] = {10, 20, 30, 40};
int *p = a + 1;
printf("%d %d", *p + 1, *(p + 2));`, lang: 'c',
  c: ["21 40", "30 40", "21 30", "11 30"], a: 0,
  ex: ["Correct. p points to a[1] = 20, so *p + 1 = 21; *(p + 2) is a[3] = 40.",
       "*p + 1 adds 1 to the value (20), it does not move the pointer.",
       "p + 2 from a[1] is a[3], not a[2].",
       "p starts at a[1], not a[0]."] },
{ id: 'm1q34', l: 'm1-10', t: 'mc',
  q: "What does this Python code print?",
  code: String.raw`def f(n):
    if n <= 1:
        return 1
    return f(n - 1) + f(n - 2)

print(f(5))`, lang: 'python',
  c: ["5", "8", "13", "15"], a: 1,
  ex: ["f(4) is 5; f(5) is one step further.",
       "Correct. f(0)=1, f(1)=1, f(2)=2, f(3)=3, f(4)=5, f(5)=8.",
       "13 is f(6).",
       "Values are added, not multiplied or summed over all calls."] },
{ id: 'm1q35', l: 'm1-11', t: 'mc',
  q: "In **top-down** integration testing, what replaces lower-level modules that are not finished yet?",
  c: ["Drivers", "Stubs", "Test oracles", "Mock users"], a: 1,
  ex: ["Drivers replace higher-level calling modules in bottom-up integration.",
       "Correct. Stubs stand in for called lower modules.",
       "A test oracle provides expected results.",
       "Not a standard integration term."] },
{ id: 'm1q36', l: 'm1-11', t: 'mc',
  q: "A program's control-flow graph has 9 edges and 7 nodes. What is its cyclomatic complexity?",
  c: ["2", "3", "4", "5"], a: 2,
  ex: ["Use V(G) = E − N + 2.", "Use V(G) = E − N + 2.",
       "Correct. V(G) = 9 − 7 + 2 = 4, so at least 4 test cases for basis path coverage.",
       "Use V(G) = E − N + 2."] },
{ id: 'm1q37', l: 'm1-11', t: 'mc',
  q: "A form accepts ages from 18 to 60 inclusive. Which set of test inputs best represents **boundary value analysis**?",
  c: ["10, 40, 70", "17, 18, 19, 59, 60, 61", "18, 60", "0, 100, -1"], a: 1,
  ex: ["One value per equivalence class: that is equivalence partitioning.",
       "Correct. Values just below, on, and just above each boundary.",
       "Only the boundaries themselves; misses just-outside values.",
       "These are arbitrary extreme values, not the specified boundaries."] },
{ id: 'm1q38', l: 'm1-11', t: 'mc',
  q: "Real users test a near-final app on their own phones at home, without developers present, and report problems. What kind of testing is this?",
  c: ["Alpha test", "Beta test", "Regression test", "Smoke test"], a: 1,
  ex: ["Alpha tests happen at the developer's site under supervision.",
       "Correct. Beta tests run in the users' own environment.",
       "Regression testing re-runs tests after changes.",
       "A smoke test is a quick build sanity check."] },
{ id: 'm1q39', l: 'm1-12', t: 'mc',
  q: "The government changes the income tax rules, so the payroll software must be modified. Which maintenance type is this?",
  c: ["Corrective", "Adaptive", "Perfective", "Preventive"], a: 1,
  ex: ["Corrective fixes defects; the software was not wrong.",
       "Correct. The external environment (law) changed, so the software adapts.",
       "Perfective adds features users ask for or improves performance.",
       "Preventive improves maintainability to avoid future problems."] },
{ id: 'm1q40', l: 'm1-12', t: 'mc',
  q: "A company will ship a closed-source commercial product and does not want to release its own source code. Which open-source license is safe for a library it bundles?",
  c: ["GPL v3", "AGPL v3", "Apache License 2.0", "Any license, because open source is free to use"], a: 2,
  ex: ["GPL is strong copyleft: distributing a combined work requires releasing its source under GPL.",
       "AGPL is even stronger: network use also triggers source release.",
       "Correct. Apache 2.0 is permissive; keep the license and notices (it also grants patent rights).",
       "Open-source licenses carry conditions; 'free' does not mean 'no obligations'."] },
{ id: 'm1q41', l: 'm1-12', t: 'mc',
  q: "Which Git command downloads changes from the remote repository **and merges** them into the current branch?",
  c: ["git fetch", "git pull", "git push", "git clone"], a: 1,
  ex: ["fetch downloads but does not merge.",
       "Correct. pull = fetch + merge.",
       "push uploads local commits.",
       "clone copies a whole repository for the first time."] },
{ id: 'm1q42', l: 'm1-12', t: 'mc',
  q: "In a microservices system, the payment service is timing out, and calls to it are piling up and slowing every other service. Which pattern stops calling the failing service for a while and fails fast?",
  c: ["API gateway", "Service discovery", "Circuit breaker", "Database per service"], a: 2,
  ex: ["An API gateway is the single entry point for clients.",
       "Service discovery lets services find each other's addresses.",
       "Correct. A circuit breaker opens after repeated failures and prevents cascading failure.",
       "Database per service is about data ownership."] },

/* Short answer */
{ id: 'm1s01', l: 'm1-6', t: 'sa',
  q: "The [Example] describes UI design principles. Write the term for Ⓐ, Ⓑ and Ⓒ. Choose from: Intuitiveness, Effectiveness, Learnability, Flexibility, Portability.",
  code: String.raw`Ⓐ  Users can understand and use the screen easily without explanation.
Ⓑ  Users can achieve their goals accurately and completely.
Ⓒ  New users can learn how to use the system in a short time.`, lang: 'text',
  blanks: [ { label: 'Ⓐ', a: ['intuitiveness', 'intuitive'] }, { label: 'Ⓑ', a: ['effectiveness', 'effective'] }, { label: 'Ⓒ', a: ['learnability'] } ],
  ex: "Ⓐ Intuitiveness, Ⓑ Effectiveness, Ⓒ Learnability. Flexibility means the UI tolerates user errors and different ways of working." },
{ id: 'm1s02', l: 'm1-11', t: 'sa',
  q: "What is the cyclomatic complexity of this method (the minimum number of basis-path test cases)?",
  code: String.raw`String classify(int n) {
    String r;
    if (n < 0) r = "negative";
    else if (n == 0) r = "zero";
    else r = "positive";
    for (int i = 0; i < 3; i++) r += "!";
    return r;
}`, lang: 'java',
  blanks: [ { label: 'V(G)', a: ['4', 'four'] } ],
  ex: "There are 3 decision points (if, else if, for), so V(G) = P + 1 = 4." },
{ id: 'm1s03', l: 'm1-2', t: 'sa',
  q: "Evaluate the postfix expression {{6 2 3 + * 4 -}}.",
  blanks: [ { label: 'Result', a: ['26'] } ],
  ex: "Push 6, 2, 3. '+' → 2+3 = 5. '*' → 6×5 = 30. Push 4. '−' → 30 − 4 = 26." },
{ id: 'm1s04', l: 'm1-1', t: 'sa',
  q: "In Scrum, what is the ordered list of everything that might be needed in the product, owned by the Product Owner?",
  blanks: [ { label: 'Artifact', a: ['product backlog'] } ],
  ex: "The Product Backlog. The Sprint Backlog is the subset (plus a plan) chosen for one Sprint." },
{ id: 'm1s05', l: 'm1-8', t: 'sa',
  q: "Which design pattern provides one simplified interface to a set of interfaces in a complex subsystem?",
  blanks: [ { label: 'Pattern', a: ['facade', 'façade', 'facade pattern'] } ],
  ex: "Facade. Adapter also wraps, but its goal is to convert an interface into a different expected one." },
{ id: 'm1s06', l: 'm1-12', t: 'sa',
  q: "Write the maintenance type: Ⓐ fixing defects found after delivery; Ⓑ restructuring code and updating documents so future changes are easier.",
  blanks: [ { label: 'Ⓐ', a: ['corrective', 'corrective maintenance'] }, { label: 'Ⓑ', a: ['preventive', 'preventative', 'preventive maintenance'] } ],
  ex: "Ⓐ Corrective maintenance, Ⓑ Preventive maintenance." },
{ id: 'm1s07', l: 'm1-3', t: 'sa',
  q: "Which algorithm design technique solves overlapping subproblems once and stores their results (memoization or a table) to avoid recomputation?",
  blanks: [ { label: 'Technique', a: ['dynamic programming', 'dp'] } ],
  ex: "Dynamic programming. Divide and conquer also splits problems, but its subproblems do not overlap." },
{ id: 'm1s08', l: 'm1-10', t: 'sa',
  q: "What does {{print(17 // 5, 17 % 5, 2 ** 4)}} output in Python? (Write it exactly as printed.)",
  blanks: [ { label: 'Output', a: ['3 2 16'] } ],
  ex: "17 // 5 = 3 (floor division), 17 % 5 = 2, 2 ** 4 = 16. print separates values with spaces." }
);

TC.drills.push(
{ id: 'm1d01', m: 'm1', l: 'm1-2', kind: 'Performance', pts: 40,
  title: 'Circular doubly linked list: playlist delete and insert',
  scenario: String.raw`A music app keeps the current playlist as a **circular doubly linked list**. Each node {{x}} has {{x.data}} (song title), {{x.llink}} (previous song) and {{x.rlink}} (next song). The last song's rlink points to the first song.

Helper functions already exist:
- {{getNode()}} returns a new empty node.
- {{returnNode(x)}} frees node x.`,
  parts: [
    { q: 'Write pseudocode for {{deleteNode(x)}} that removes song node x while keeping the circle intact. Assume the list has at least 2 nodes.', pts: 20,
      model: String.raw`~~~text
deleteNode(x):
    x.llink.rlink = x.rlink     // previous now skips x
    x.rlink.llink = x.llink     // next now points back past x
    returnNode(x)               // free the node
~~~
If x can be the only node or the head pointer, also handle: if x.rlink == x then head = NULL; else if head == x then head = x.rlink.`,
      rubric: ['Previous node\'s rlink set to x.rlink', 'Next node\'s llink set to x.llink', 'Calls returnNode(x) after unlinking (not before)', 'Mentions or handles the head / single-node case (bonus)'] },
    { q: 'Write pseudocode for {{insertNode(p, title)}} that inserts a new song immediately to the right of node p.', pts: 20,
      model: String.raw`~~~text
insertNode(p, title):
    n = getNode()
    n.data  = title
    n.llink = p
    n.rlink = p.rlink
    p.rlink.llink = n           // old next points back to n
    p.rlink = n                 // must be last
~~~`,
      rubric: ['Gets a new node and sets its data', 'Sets n.llink = p and n.rlink = p.rlink', 'Updates p.rlink.llink = n BEFORE changing p.rlink', 'Sets p.rlink = n'] }
  ] },
{ id: 'm1d02', m: 'm1', l: 'm1-3', kind: 'Performance', pts: 30,
  title: 'Binary search: write it and explain it',
  scenario: String.raw`Student IDs are stored in an integer array sorted in ascending order. You must find the index of a given ID, or return −1.`,
  parts: [
    { q: 'Write the function in C, Java or Python using **iterative** binary search.', pts: 20,
      model: String.raw`~~~python
def binary_search(a, key):
    low, high = 0, len(a) - 1
    while low <= high:
        mid = (low + high) // 2
        if a[mid] == key:
            return mid
        elif a[mid] < key:
            low = mid + 1
        else:
            high = mid - 1
    return -1
~~~`,
      rubric: ['Initializes low = 0 and high = n − 1', 'Loop condition low <= high', 'Computes mid and compares a[mid] with key', 'Moves low = mid + 1 or high = mid − 1 correctly', 'Returns −1 when not found'] },
    { q: 'State the time complexity and the precondition, and explain why the precondition is needed.', pts: 10,
      model: String.raw`Time complexity is **O(log n)** because each comparison halves the remaining range (1,000,000 items need at most about 20 comparisons).
The data must be **sorted**. Discarding half the range is only valid if every element left of mid is smaller and every element right of mid is larger.`,
      rubric: ['O(log n)', 'Array must be sorted', 'Explains halving / why order lets you discard half'] }
  ] },
{ id: 'm1d03', m: 'm1', l: 'm1-7', kind: 'Descriptive', pts: 30,
  title: 'Explain a class diagram',
  scenario: String.raw`The [Example] is part of a library system's UML class diagram, written in text form.
~~~text
Member  1 ───────── 0..5  Loan  0..* ───────── 1  Book
                                                   △
                                        ┌──────────┴──────────┐
                                      EBook               PrintedBook

Library ◆───────── 1..*  Shelf
~~~
(△ = generalization arrowhead pointing to Book; ◆ = filled diamond on the Library side)`,
  parts: [
    { q: 'Explain the multiplicity between Member and Loan, and between Loan and Book.', pts: 15,
      model: String.raw`- **Member–Loan**: one Member can have **0 to 5** Loans at a time (a member may borrow nothing, and at most five). Each Loan belongs to **exactly one** Member.
- **Loan–Book**: each Loan is for **exactly one** Book. A Book can appear in **zero or more** Loans over time (it may never have been borrowed).`,
      rubric: ['Member has 0..5 loans (reads multiplicity at the far end)', 'Each loan has exactly one member', 'Each loan is for exactly one book', 'A book has zero or more loans'] },
    { q: 'Explain the relationship between Book, EBook and PrintedBook, and the relationship between Library and Shelf.', pts: 15,
      model: String.raw`- **Generalization (inheritance)**: EBook and PrintedBook are subclasses of the superclass Book (is-a). They inherit Book's attributes and operations (title, author) and add their own (fileSize for EBook, shelfLocation for PrintedBook). Book can be treated polymorphically.
- **Composition** (filled diamond): a Library is composed of one or more Shelves. Shelves are parts that cannot exist without their Library; if the Library is deleted, its Shelves are deleted too. (With a hollow diamond it would be aggregation, where parts can exist independently.)`,
      rubric: ['Names generalization / inheritance (is-a)', 'States EBook and PrintedBook inherit from Book', 'Names composition (strong whole-part)', 'Explains lifecycle dependency: shelves deleted with the library', 'Mentions multiplicity 1..* shelves'] }
  ] },
{ id: 'm1d04', m: 'm1', l: 'm1-6', kind: 'Descriptive', pts: 30,
  title: 'Diagnose cohesion and coupling',
  scenario: String.raw`A legacy module {{processAll(int mode, Customer c)}} does this:
- If {{mode == 1}} it prints a customer label, if {{mode == 2}} it computes a discount, if {{mode == 3}} it sends a marketing email.
- It reads and writes a global variable {{g_lastCustomerId}} that three other modules also use.
- The whole {{Customer}} object (40 fields) is passed although only {{id}} and {{grade}} are used.`,
  parts: [
    { q: 'Identify the cohesion type of processAll and the coupling types present. Justify each.', pts: 15,
      model: String.raw`- **Logical cohesion**: it groups logically similar but unrelated operations and selects one with a flag (mode).
- **Control coupling**: callers pass {{mode}}, a flag that controls the module's internal logic.
- **Common coupling**: it shares the global variable {{g_lastCustomerId}} with other modules.
- **Stamp coupling**: the whole Customer structure is passed when only two fields are needed.`,
      rubric: ['Logical cohesion with reason (flag-selected unrelated tasks)', 'Control coupling (mode flag)', 'Common coupling (global variable)', 'Stamp coupling (whole structure passed)'] },
    { q: 'Propose a redesign that achieves high cohesion and low coupling.', pts: 15,
      model: String.raw`- Split into three **functionally cohesive** modules: {{printLabel(id)}}, {{calcDiscount(grade)}}, {{sendMarketingEmail(id)}}. The caller invokes the one it needs, so the control flag disappears.
- Pass only the needed elementary values as parameters (**data coupling**) instead of the whole Customer.
- Remove the global variable: return values or keep the state inside a class with getters (information hiding/encapsulation).
- Result: each module has one reason to change, can be tested alone, and is easier to reuse.`,
      rubric: ['Split into single-purpose (functional) modules', 'Removes the control flag', 'Passes only needed data (data coupling)', 'Removes global variable / encapsulates state', 'States the benefit (maintainability, testability, reuse)'] }
  ] },
{ id: 'm1d05', m: 'm1', l: 'm1-11', kind: 'Performance', pts: 40,
  title: 'Design test cases for a shipping fee function',
  scenario: String.raw`Specification of {{fee(w)}} where w is the parcel weight in kg (integer):
| Weight w | Fee |
|---|---|
| 1 ≤ w ≤ 5 | 3,000 |
| 6 ≤ w ≤ 20 | 5,000 |
| 21 ≤ w ≤ 30 | 8,000 |
| otherwise | error |

~~~java
int fee(int w) {
    if (w < 1 || w > 30) return -1;
    if (w <= 5) return 3000;
    if (w <= 20) return 5000;
    return 8000;
}
~~~`,
  parts: [
    { q: 'List the equivalence classes and one representative test input with its expected output for each.', pts: 15,
      model: String.raw`| Class | Range | Input | Expected |
|---|---|---|---|
| Invalid low | w ≤ 0 | −3 | error (−1) |
| Valid 1 | 1–5 | 3 | 3,000 |
| Valid 2 | 6–20 | 12 | 5,000 |
| Valid 3 | 21–30 | 25 | 8,000 |
| Invalid high | w ≥ 31 | 40 | error (−1) |`,
      rubric: ['Three valid classes identified', 'Two invalid classes (below 1, above 30)', 'One representative input per class', 'Correct expected output for each'] },
    { q: 'List the boundary value test inputs with expected outputs.', pts: 15,
      model: String.raw`0 → error, 1 → 3,000, 5 → 3,000, 6 → 5,000, 20 → 5,000, 21 → 8,000, 30 → 8,000, 31 → error.
(Some answers also add 2, 4, 19, 29: just inside each edge.)`,
      rubric: ['Tests 0 and 1 (lower edge)', 'Tests 5 and 6', 'Tests 20 and 21', 'Tests 30 and 31', 'Expected outputs correct'] },
    { q: 'Compute the cyclomatic complexity of fee(w) and state what it means.', pts: 10,
      model: String.raw`Decision points: the compound condition {{w < 1 || w > 30}} counts as **2** conditions, plus {{w <= 5}} and {{w <= 20}} → P = 4, so **V(G) = 5**.
(If the compound condition is counted as one decision, V(G) = 4; state which convention you use.)
It is the number of linearly independent paths, so at least that many test cases are needed for basis path coverage.`,
      rubric: ['Counts decision points correctly', 'V(G) = P + 1 (5, or 4 with stated convention)', 'Explains it equals the minimum number of basis path tests'] }
  ] },
{ id: 'm1d06', m: 'm1', l: 'm1-8', kind: 'Performance', pts: 40,
  title: 'Choose and code design patterns',
  scenario: String.raw`An online shop supports card, e-wallet and bank transfer payments, and new methods will be added often. The checkout code must not change when a new method is added. All parts of the shop must write to **one** shared audit logger.`,
  parts: [
    { q: 'Name the pattern for the payment methods and write a Java skeleton (interface, two implementations, and how checkout uses it).', pts: 25,
      model: String.raw`**Strategy pattern**: each payment method is an interchangeable algorithm behind one interface.
~~~java
interface PaymentStrategy { boolean pay(int amount); }

class CardPayment implements PaymentStrategy {
    public boolean pay(int amount) { /* call card gateway */ return true; }
}
class EWalletPayment implements PaymentStrategy {
    public boolean pay(int amount) { /* call e-wallet API */ return true; }
}

class Checkout {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy s) { this.strategy = s; }
    boolean complete(int amount) { return strategy.pay(amount); }
}
// usage
Checkout c = new Checkout();
c.setStrategy(new EWalletPayment());
c.complete(1500);
~~~
A new method only needs a new class implementing PaymentStrategy (Open/Closed Principle).`,
      rubric: ['Names Strategy pattern', 'Defines a common interface', 'At least two concrete implementations', 'Context (Checkout) holds the interface and delegates', 'Mentions adding a method without changing checkout (OCP)'] },
    { q: 'Name the pattern for the audit logger and write its Java code.', pts: 15,
      model: String.raw`**Singleton pattern**.
~~~java
public class AuditLogger {
    private static AuditLogger instance;
    private AuditLogger() { }
    public static synchronized AuditLogger getInstance() {
        if (instance == null) instance = new AuditLogger();
        return instance;
    }
    public void log(String msg) { System.out.println(msg); }
}
~~~`,
      rubric: ['Names Singleton', 'Private constructor', 'Private static instance field', 'Public static getInstance() creating the instance once', 'Thread safety mentioned (synchronized) (bonus)'] }
  ] },
{ id: 'm1d07', m: 'm1', l: 'm1-5', kind: 'Descriptive', pts: 30,
  title: 'Use cases and an activity diagram for course enrollment',
  scenario: String.raw`An online course system: students browse courses and enroll. Enrolling always requires logging in. If a course is paid, the student pays through an external payment gateway. Instructors publish courses. Students may optionally apply a discount coupon while paying.`,
  parts: [
    { q: 'List the actors and use cases, and identify the «include» and «extend» relationships.', pts: 15,
      model: String.raw`- **Actors**: Student, Instructor, Payment Gateway (external system actor).
- **Use cases**: Browse courses, Enroll in course, Log in, Pay for course, Apply coupon, Publish course.
- **Enroll in course «include» Log in**: login always happens.
- **Pay for course «extend» Enroll in course**: only when the course is paid (condition: paid course).
- **Apply coupon «extend» Pay for course**: optional.
- Payment Gateway is associated with Pay for course; Instructor with Publish course.`,
      rubric: ['Three actors including the external payment gateway', 'Main use cases listed', 'Log in as «include»', 'Coupon (and/or payment) as «extend» with condition', 'Correct arrow direction or wording'] },
    { q: 'Describe an activity diagram (with swimlanes) for "Enroll in a paid course".', pts: 15,
      model: String.raw`Swimlanes: **Student | Course System | Payment Gateway**
1. (Student) start ● → Select course → Click Enroll.
2. (System) Check login ◇ [not logged in] → (Student) Log in → back to check; [logged in] → continue.
3. (System) Check seat availability ◇ [full] → Show "course full" → end ◉.
4. (System) Calculate fee → (Student) optionally Apply coupon.
5. (Payment Gateway) Process payment ◇ [declined] → (Student) Retry or cancel; [approved] → continue.
6. Fork ═ (System) Create enrollment record ‖ (System) Send confirmation email → Join ═ → end ◉.`,
      rubric: ['Swimlanes for each participant', 'Initial and final nodes', 'Decision nodes with guards (login, seats, payment)', 'Actions placed in the correct lane', 'Fork/join for parallel actions (bonus)'] }
  ] },
{ id: 'm1d08', m: 'm1', l: 'm1-9', kind: 'Performance', pts: 30,
  title: 'Linux and Git tasks on a build server',
  scenario: String.raw`You are logged in to a Linux build server in {{/home/dev/shop}}, a Git repository.`,
  parts: [
    { q: 'Write one command for each: (1) show the last 50 lines of app.log and keep following it; (2) make deploy.sh executable by the owner only, readable by the group, nothing for others; (3) count how many lines in app.log contain "ERROR".', pts: 15,
      model: String.raw`1. {{tail -n 50 -f app.log}}
2. {{chmod 740 deploy.sh}} (owner rwx = 7, group r-- = 4, others --- = 0)
3. {{grep -c "ERROR" app.log}} (or {{grep "ERROR" app.log | wc -l}})`,
      rubric: ['tail -f (with -n 50)', 'chmod 740', 'grep -c or grep | wc -l'] },
    { q: 'Write the Git commands to: create and switch to a branch {{fix-login}}, stage and commit all changes with a message, push it to origin, then merge it into {{main}}.', pts: 15,
      model: String.raw`~~~text
git checkout -b fix-login        # or: git switch -c fix-login
git add .
git commit -m "Fix login timeout"
git push -u origin fix-login
git checkout main                # or: git switch main
git pull
git merge fix-login
git push
~~~`,
      rubric: ['Creates and switches to the branch', 'git add and git commit -m', 'git push to origin', 'Switches to main and merges fix-login', 'Pulls/pushes main (bonus)'] }
  ] }
);

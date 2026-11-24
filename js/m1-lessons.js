/* M1 Software Development: lessons (syllabus V4.0E, area 1) */
TC.lessons.push(
{
  id: 'm1-1', m: 'm1', syl: '1.1', title: 'Software engineering, SDLC and methodologies',
  summary: 'Why software engineering exists, the life-cycle models, Agile/Scrum, and reverse engineering vs reengineering.',
  body: String.raw`
### Why software engineering
The **software crisis** (late 1960s): projects ran over budget and schedule, and the software was unreliable and hard to maintain. Software engineering applies systematic, disciplined, measurable methods to build quality software on time and within budget.

### SDLC phases
Requirements analysis → Design → Implementation (coding) → Testing → Deployment → Maintenance. Maintenance is usually the most expensive phase over a product's life.

### Life-cycle models
| Model | Key idea | Best when | Weakness |
|---|---|---|---|
| Waterfall | Sequential phases, each signed off before the next | Requirements are clear and stable | Late feedback, costly changes |
| V-model | Each development phase is paired with a test level | Safety-critical systems | Still rigid |
| Prototyping | Build a quick model to clarify requirements | Users are unsure what they want | Prototype may be mistaken for the product |
| Spiral (Boehm) | Repeated cycles of Planning → **Risk analysis** → Engineering → Customer evaluation | Large, high-risk projects | Needs risk expertise, costly |
| Incremental / Iterative | Deliver in pieces, refine each cycle | Early partial delivery is valuable | Needs good architecture up front |
| RAD | Very short cycle using reusable components and CASE tools | Business apps with clear scope | Not for high-performance or high-risk systems |
| Unified Process (RUP) | Use-case driven, architecture-centric, iterative; phases **Inception → Elaboration → Construction → Transition** | Object-oriented projects | Heavy process |

V-model pairs: requirements ↔ acceptance test, system design ↔ system test, architecture design ↔ integration test, module design ↔ unit test.

!> The model whose defining step is **risk analysis** is the Spiral model. The model with the four phases Inception/Elaboration/Construction/Transition is RUP.

### Agile
Agile Manifesto values: **individuals and interactions** over processes and tools, **working software** over comprehensive documentation, **customer collaboration** over contract negotiation, **responding to change** over following a plan.

- **Scrum**: framework with fixed-length Sprints (1–4 weeks), three roles (Product Owner, Scrum Master, Developers), three artifacts (Product Backlog, Sprint Backlog, Increment) and five events (Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective).
- **Product Owner**: owns and orders the Product Backlog and maximizes product value.
- **Scrum Master**: coaches the team on Scrum and removes impediments; not a project manager.
- **Daily Scrum**: 15-minute daily event where developers inspect progress toward the Sprint Goal.
- **Sprint Review**: shows the Increment to stakeholders for feedback (the product).
- **Sprint Retrospective**: the team improves its own way of working (the process).
- **XP (Extreme Programming)**: practices such as pair programming, test-driven development, continuous integration, refactoring, small releases, collective code ownership, planning game.
- **Kanban**: visualize work on a board and limit work in progress (WIP); pull-based flow.

### Development methodologies
- **Structured methodology**: process-oriented, top-down functional decomposition using DFD, data dictionary and mini-specs.
- **Information engineering**: data-centered, enterprise-wide planning (ISP) of information systems.
- **Object-oriented methodology**: models the system as interacting objects (UML, RUP).
- **CBD (Component-Based Development)**: builds systems by assembling reusable components with defined interfaces.

### Software reuse (1.1.2)
Reuse code, designs, components, frameworks or patterns to cut cost and defects. Reuse targets: code, design, analysis specs, test cases, documents.

- **Reverse engineering**: analyzing existing code to recover its design and specifications (code → design). Nothing is changed.
- **Restructuring**: changing code form at the same abstraction level without changing behavior.
- **Reengineering**: reverse engineering + restructuring + forward engineering, to improve a legacy system while keeping its function.
- **Forward engineering**: the normal direction: requirements → design → code.
`},
{
  id: 'm1-2', m: 'm1', syl: '1.2.1', title: 'Data structures',
  summary: 'Linear vs non-linear structures, linked lists, stacks, queues, trees, graphs and hashing.',
  body: String.raw`
### Classification
| Linear | Non-linear |
|---|---|
| Array, linked list, stack, queue, deque | Tree, graph |

- **Array**: contiguous memory, O(1) access by index, costly insert/delete in the middle (shifting).
- **Linked list**: nodes connected by pointers; O(1) insert/delete once the position is known, O(n) access.
- **Doubly linked list**: each node has llink (previous) and rlink (next), so it can be traversed both ways.
- **Circular linked list**: the last node points back to the first; no NULL at the end.
- **Stack**: LIFO (last in, first out); push/pop at the top. Uses: function calls, recursion, undo, expression evaluation, DFS.
- **Queue**: FIFO (first in, first out); enqueue at rear, dequeue at front. Uses: scheduling, buffering, BFS.
- **Deque**: insert and delete at both ends.

### Doubly (circular) linked list: delete and insert
Delete node x:
~~~text
x.llink.rlink = x.rlink
x.rlink.llink = x.llink
returnNode(x)        // free the node
~~~
Insert new node n to the right of node p:
~~~text
n.llink = p
n.rlink = p.rlink
p.rlink.llink = n
p.rlink = n
~~~
!> Order matters in insertion: set the new node's links and fix p.rlink.llink **before** overwriting p.rlink.

### Trees
- **Degree of a node**: number of children. Degree of a tree = max node degree.
- **Leaf (terminal node)**: node with no children.
- **Binary tree**: each node has at most 2 children. Max nodes at level i = 2^(i−1); max nodes in a tree of depth k = 2^k − 1; for any binary tree n0 = n2 + 1 (leaves = nodes with two children + 1).
- **Full / complete binary tree**: full = every level completely filled; complete = filled left to right with no gaps (heaps use this).
- **BST (Binary Search Tree)**: left subtree < node < right subtree; in-order traversal gives sorted order.
- **Heap**: complete binary tree where each parent ≥ children (max-heap) or ≤ (min-heap); used for priority queues and heap sort.
- **AVL tree**: self-balancing BST; heights of the two subtrees differ by at most 1.

Traversals (for tree with root A, left B, right C): **Pre-order** = root-left-right (A B C), **In-order** = left-root-right (B A C), **Post-order** = left-right-root (B C A). Level-order uses a queue.

### Expression notation
Infix {{A + B * C}} → postfix {{A B C * +}} → prefix {{+ A * B C}}. Postfix is evaluated with a stack: push operands, on an operator pop two, compute, push the result.

### Graphs
- **Adjacency matrix**: n×n array, O(1) edge check, O(n²) space; good for dense graphs.
- **Adjacency list**: list of neighbors per vertex, O(V+E) space; good for sparse graphs.
- **BFS (Breadth-First Search)**: visits neighbors level by level using a queue; finds shortest path in unweighted graphs.
- **DFS (Depth-First Search)**: goes as deep as possible first using a stack or recursion.
- Undirected complete graph with n vertices has n(n−1)/2 edges; directed has n(n−1).

### Hashing
- **Hash function**: maps a key to a bucket address; ideal search is O(1).
- **Collision**: two keys hash to the same address. Resolved by **chaining** (linked list per bucket) or **open addressing** (linear probing, quadratic probing, double hashing).
- Common hash functions: division (key mod m, m usually prime), mid-square, folding.
`},
{
  id: 'm1-3', m: 'm1', syl: '1.2.2', title: 'Algorithms: sorting, searching, paradigms',
  summary: 'Big-O, the sorting table you must memorize, binary search, and greedy vs dynamic programming vs divide and conquer.',
  body: String.raw`
### Complexity (Big-O) from fastest to slowest
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!)

### Sorting algorithms
| Algorithm | Best | Average | Worst | Stable | Idea |
|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | Yes | Swap adjacent pairs; the largest bubbles to the end each pass |
| Selection | O(n²) | O(n²) | O(n²) | No | Find the minimum, swap it to the front |
| Insertion | O(n) | O(n²) | O(n²) | Yes | Insert each item into the sorted left part; fast on nearly sorted data |
| Shell | O(n log n) | ~O(n^1.3) | O(n²) | No | Insertion sort on gapped sublists |
| Quick | O(n log n) | O(n log n) | O(n²) | No | Partition around a pivot; worst case on already-sorted data with a bad pivot |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes | Divide in half, sort, merge; needs O(n) extra memory |
| Heap | O(n log n) | O(n log n) | O(n log n) | No | Build a heap, repeatedly remove the max |
| Radix | O(dn) | O(dn) | O(dn) | Yes | Distribute by digit; no comparisons |

!> Quick sort is fastest on average but O(n²) in the worst case. Merge sort and heap sort are O(n log n) even in the worst case.

Example, one pass each on {{5 3 8 1}}:
- Selection pass 1: min is 1, swap with 5 → {{1 3 8 5}}
- Bubble pass 1: (5,3) swap → 3 5 8 1, (5,8) ok, (8,1) swap → {{3 5 1 8}}
- Insertion after step 1 (insert 3): {{3 5 8 1}}

### Searching
- **Linear (sequential) search**: checks every element; O(n); works on unsorted data.
- **Binary search**: requires **sorted** data; compare with the middle, discard half each step; O(log n). At most ⌊log₂ n⌋ + 1 comparisons.
- **Hash search**: O(1) on average.

~~~java
int binarySearch(int[] a, int key) {
    int low = 0, high = a.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == key) return mid;
        else if (a[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;   // not found
}
~~~

### Problem-solving paradigms
- **Divide and conquer**: split into independent subproblems, solve recursively, combine (merge sort, quick sort, binary search).
- **Dynamic programming**: solves overlapping subproblems once and stores results (memoization/tabulation); needs optimal substructure (Fibonacci, knapsack, Floyd-Warshall, LCS).
- **Greedy algorithm**: takes the locally best choice at each step; fast but not always optimal (Kruskal, Prim, Dijkstra, coin change with standard coins, Huffman coding).
- **Backtracking**: builds candidates step by step and abandons a path as soon as it cannot lead to a solution (N-Queens, maze, sudoku).
- **Branch and bound**: like backtracking but prunes using bounds on the best possible value (optimization problems).
- **Brute force**: tries every possibility.

### Graph algorithms
- **Dijkstra**: single-source shortest path, greedy, no negative edge weights.
- **Bellman-Ford**: single-source shortest path, allows negative weights.
- **Floyd-Warshall**: all-pairs shortest path, dynamic programming, O(n³).
- **Kruskal**: minimum spanning tree by adding the cheapest edges that do not form a cycle.
- **Prim**: minimum spanning tree grown from a start vertex by adding the cheapest adjacent edge.
- **Topological sort**: orders vertices of a DAG so every edge goes forward.

Recursion needs a **base case**; each call uses stack memory. Fibonacci by plain recursion is O(2^n); with memoization O(n).
`},
{
  id: 'm1-4', m: 'm1', syl: '1.3', title: 'AI, machine learning and generative AI',
  summary: 'AI ⊃ ML ⊃ DL, learning types, CNN/RNN/Transformer/GAN, generative AI, and model evaluation metrics.',
  body: String.raw`
### The big picture
AI ⊃ Machine Learning ⊃ Deep Learning ⊃ (most) Generative AI.

- **Artificial Intelligence (AI)**: systems that perform tasks needing human-like intelligence (reasoning, perception, language).
- **Machine Learning (ML)**: systems that learn patterns from data instead of being explicitly programmed.
- **Deep Learning (DL)**: ML using multi-layer artificial neural networks that learn features automatically.

### Learning types
| Type | Data | Typical tasks | Examples |
|---|---|---|---|
| Supervised | Labeled (input + correct answer) | Classification, regression | Spam filter, price prediction, decision tree, SVM, linear/logistic regression, k-NN |
| Unsupervised | Unlabeled | Clustering, dimensionality reduction, association | K-means, PCA, customer segmentation |
| Reinforcement | Rewards from an environment | Sequential decisions | Game AI, robotics, agent/state/action/reward/policy |
| Semi-/self-supervised | Few labels / labels made from the data | Pre-training | LLM pre-training (predict next token) |

- **Classification**: predicts a category (spam / not spam).
- **Regression**: predicts a continuous number (house price).
- **Clustering**: groups similar items without labels (K-means).
- **Overfitting**: model memorizes training data and performs poorly on new data. Fixes: more data, regularization, dropout, early stopping, simpler model, cross-validation.
- **Underfitting**: model too simple to capture the pattern; poor on training data too.
- **Train/validation/test split**: train fits the model, validation tunes hyperparameters, test gives the final unbiased score.
- **Hyperparameter**: setting chosen before training (learning rate, number of layers, k in k-NN), not learned from data.

### Deep learning architectures
- **ANN / MLP**: input, hidden and output layers; trained by backpropagation and gradient descent; activation functions such as ReLU, sigmoid, softmax.
- **CNN (Convolutional Neural Network)**: convolution and pooling layers extract spatial features; used for images and vision.
- **RNN (Recurrent Neural Network)**: loops carry state across time steps; used for sequences. **LSTM/GRU** fix the vanishing-gradient problem for long sequences.
- **Transformer**: uses self-attention to process all tokens in parallel; the basis of LLMs (BERT encoder, GPT decoder).
- **GAN (Generative Adversarial Network)**: a generator creates fake data and a discriminator tries to tell real from fake; they train against each other.
- **Autoencoder**: compresses input to a latent code and reconstructs it; used for denoising and anomaly detection.
- **Diffusion model**: generates images by learning to reverse a gradual noising process.

### Generative AI
- **LLM (Large Language Model)**: Transformer trained on huge text corpora to predict the next token; generates text and code.
- **Prompt engineering**: designing inputs (instructions, examples/few-shot, context, chain-of-thought) to get better outputs.
- **RAG (Retrieval-Augmented Generation)**: retrieves relevant documents (often from a vector database) and adds them to the prompt so the LLM answers from current, specific knowledge and hallucinates less.
- **Fine-tuning**: further training a pre-trained model on domain data to specialize it.
- **Hallucination**: the model produces fluent but false or unsupported content.
- **Embedding**: a numeric vector that represents the meaning of text or images; similar meanings are close together.
- **Multimodal AI**: handles several input types (text, image, audio).
- **AI agent**: an LLM that plans and calls tools or APIs to complete multi-step tasks.

### Evaluating a classifier
Confusion matrix: TP, FP (false alarm), FN (miss), TN.
| Metric | Formula | Answers |
|---|---|---|
| Accuracy | (TP+TN) / all | How often is it right overall? |
| Precision | TP / (TP+FP) | Of predicted positives, how many are real? |
| Recall (sensitivity) | TP / (TP+FN) | Of real positives, how many did we catch? |
| F1 score | 2·P·R / (P+R) | Balance of precision and recall |

!> On imbalanced data (e.g., 1% fraud), accuracy is misleading; use precision, recall or F1. Disease screening favors **recall** (do not miss cases); spam filters favor **precision** (do not block real mail).
`},
{
  id: 'm1-5', m: 'm1', syl: '1.4.1', title: 'Requirements analysis and specification',
  summary: 'Functional vs non-functional requirements, elicitation, SRS, validation, traceability, DFD and data dictionary.',
  body: String.raw`
### Types of requirements
- **Functional requirement**: what the system must do (features, inputs, outputs, behavior). "The system shall let users reset their password."
- **Non-functional requirement**: how well the system does it: performance, security, availability, usability, reliability, maintainability, portability. "Pages load within 2 seconds for 500 users."
- **Constraint**: limits on the solution (must use Oracle DB, must run on Android 12+).

### Requirements engineering process
Elicitation → Analysis → Specification → Validation, with Requirements management running throughout.

- **Elicitation techniques**: interview, questionnaire/survey, observation, workshop/JAD (Joint Application Development), brainstorming, prototyping, document analysis, use case scenarios.
- **SRS (Software Requirements Specification)**: the document that defines the requirements. A good SRS is correct, unambiguous, complete, consistent, ranked, verifiable, modifiable and traceable (IEEE 830 / ISO/IEC/IEEE 29148).
- **Requirements validation**: checking that requirements reflect what stakeholders really need, using reviews, inspections, walkthroughs, prototyping, and test-case generation.
- **Verification vs validation**: verification asks "are we building the product right?" (meets spec); validation asks "are we building the right product?" (meets user needs).
- **Requirements traceability**: linking each requirement forward to design, code and tests, and backward to its source; recorded in a traceability matrix.
- **Requirements management**: controlling changes to requirements through baselines, change control and impact analysis.

### Structured analysis tools
- **DFD (Data Flow Diagram)**: shows how data moves through processes. Elements: process (circle/bubble), data flow (arrow), data store (two parallel lines), external entity/terminator (rectangle). No control flow.
- **Data dictionary**: defines every data item in the DFD using notation: {{=}} is composed of, {{+}} and, {{[ | ]}} choose one, {{{ }}} repetition, {{( )}} optional, {{** **}} comment.
- **Mini-spec (process specification)**: describes the logic of a bottom-level process with structured English, decision tables or decision trees.
- **STD (State Transition Diagram)**: models how the system changes state in response to events.

### Object-oriented analysis
- **Use case diagram**: shows actors (users or external systems) and the use cases (goals) they perform with the system boundary.
- **Actor**: a role outside the system that interacts with it (person, external system, timer).
- **«include»**: the base use case always uses the included one (Withdraw cash includes Authenticate user). Arrow points to the included use case.
- **«extend»**: optional behavior added to a base use case under a condition (Print receipt extends Withdraw cash). Arrow points to the base use case.
- **Generalization (use case/actor)**: a specialized actor or use case inherits from a general one.

OO analysis methods you may see named: Rumbaugh's OMT (object, dynamic and functional models), Booch, Jacobson's OOSE (use-case driven), Coad-Yourdon, Wirfs-Brock.

!> Rumbaugh's OMT order is **Object modeling → Dynamic modeling → Functional modeling**. Object model = class diagram, dynamic model = state diagram, functional model = DFD.
`},
{
  id: 'm1-6', m: 'm1', syl: '1.4.2', title: 'Software design: principles, cohesion, coupling, architecture',
  summary: 'Design principles, the cohesion and coupling ladders, OO concepts, SOLID, architecture styles and UI/UX.',
  body: String.raw`
### Design principles
- **Abstraction**: focus on essential characteristics and hide details (procedural, data, control abstraction).
- **Modularity**: divide the system into separately named, addressable modules.
- **Information hiding**: a module hides its internal data and design decisions; others use only its interface.
- **Stepwise refinement**: top-down decomposition from a high-level description into detail (Wirth).
- **Separation of concerns**: each part handles one concern.

Good design = **high cohesion, low coupling**.

### Cohesion (inside one module): weakest → strongest
Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < **Functional**
- **Coincidental cohesion**: unrelated tasks grouped by chance (a "utils" module).
- **Logical cohesion**: similar kinds of tasks chosen by a flag (one module handles all input types).
- **Temporal cohesion**: tasks that happen at the same time (initialization routine).
- **Procedural cohesion**: tasks executed in a specific order of steps.
- **Communicational cohesion**: tasks that use the same input or output data.
- **Sequential cohesion**: output of one task is the input of the next.
- **Functional cohesion**: everything contributes to one single well-defined function. Best.

### Coupling (between modules): strongest (worst) → weakest (best)
Content > Common > External > Control > Stamp > **Data**
- **Content coupling**: one module directly modifies or jumps into another's internals. Worst.
- **Common coupling**: modules share global data.
- **External coupling**: modules share an externally imposed format, protocol or device.
- **Control coupling**: one module passes a flag that controls the other's logic.
- **Stamp coupling**: a whole data structure is passed when only part is needed.
- **Data coupling**: only the needed elementary data is passed as parameters. Best.

Mnemonic for coupling: "**C**an **C**ats **E**at **C**heese **S**andwiches **D**aily" (Content, Common, External, Control, Stamp, Data).

- **Fan-in**: number of modules that call a given module (high fan-in = good reuse).
- **Fan-out**: number of modules a given module calls (keep it moderate).

### Object-oriented concepts
- **Class / object**: a class is the blueprint; an object is an instance with state and behavior.
- **Encapsulation**: bundles data and methods and restricts direct access to the data.
- **Inheritance**: a subclass reuses and extends a superclass (is-a).
- **Polymorphism**: the same message triggers different behavior depending on the object; implemented by overriding and dynamic binding.
- **Overloading**: same method name, different parameter lists, in the same class (compile time).
- **Overriding**: subclass redefines a superclass method with the same signature (run time).
- **Abstract class / interface**: cannot be instantiated; defines methods that subclasses must implement.

### SOLID principles
- **SRP (Single Responsibility)**: a class has one reason to change.
- **OCP (Open/Closed)**: open for extension, closed for modification.
- **LSP (Liskov Substitution)**: subtypes must be usable wherever the base type is expected.
- **ISP (Interface Segregation)**: many small client-specific interfaces beat one fat interface.
- **DIP (Dependency Inversion)**: depend on abstractions, not on concrete classes.

### Software architecture
Software architecture is the high-level structure of the system: its components, their relationships, and the principles guiding its design. It addresses quality attributes such as performance, availability, security, modifiability.

| Style | Description | Example |
|---|---|---|
| Layered | Each layer serves the layer above (presentation, business, persistence, database) | OSI model, enterprise apps |
| Client-server | Clients request, server provides services | Web, email |
| MVC | Model (data/logic), View (display), Controller (input) separated | Web frameworks |
| Pipe and filter | Data flows through independent processing steps | Compilers, Unix pipes |
| Repository / blackboard | Components share a central data store | IDEs, DBMS-centric systems |
| Broker | Middleware routes requests between distributed components | CORBA, message brokers |
| Event-driven / publish-subscribe | Components react to events via an event bus | Notifications, IoT |
| Master-slave | Master splits work among slaves and merges results | DB replication |
| Peer-to-peer | Each node is both client and server | File sharing, blockchain |
| Microservices | Small independently deployable services with their own data | Netflix, e-commerce |

!> If a scenario says "separate the user view, data processing and business logic, and control their flow", the answer is **MVC**.

### UI/UX design
- **UI (User Interface)**: what the user sees and touches (layout, controls).
- **UX (User Experience)**: the user's overall experience and feelings when using the product.
- UI design principles: **intuitiveness** (easy to understand), **effectiveness** (achieve goals accurately), **learnability** (easy to learn), **flexibility** (tolerates user errors and different ways of working). Also consistency, feedback, visibility of system status, error prevention.
- **Nielsen's heuristics** include visibility of system status, match with the real world, user control and freedom, consistency, error prevention, recognition rather than recall, flexibility, minimalist design, help with errors, help and documentation.
- **UX honeycomb (Morville)**: useful, usable, desirable, findable, accessible, credible, valuable.
- **Wireframe**: low-fidelity layout. **Storyboard**: screens plus flow and descriptions. **Prototype**: interactive model for testing.
`},
{
  id: 'm1-7', m: 'm1', syl: '1.4.2.6', title: 'UML: class, sequence, activity, state diagrams',
  summary: 'The 14 UML diagrams, class relationships and multiplicity, and how to read sequence and activity diagrams.',
  body: String.raw`
### Diagram types
| Structural (static) | Behavioral (dynamic) |
|---|---|
| Class, Object, Component, Deployment, Package, Composite structure, Profile | Use case, Activity, State machine, Sequence, Communication, Timing, Interaction overview |
Sequence, Communication, Timing and Interaction overview are the **interaction diagrams**.

### Class diagram
A class box has three parts: name, attributes, operations. Visibility: {{+}} public, {{-}} private, {{#}} protected, {{~}} package.

| Relationship | Notation | Meaning |
|---|---|---|
| Association | Solid line | Objects are linked ("uses / knows") |
| Aggregation | Solid line + **hollow** diamond at the whole | Whole-part; parts can exist alone (Team ◇— Player) |
| Composition | Solid line + **filled** diamond at the whole | Strong whole-part; parts die with the whole (House ◆— Room) |
| Generalization | Solid line + hollow triangle at the parent | Inheritance, is-a (Coffee ▷ Beverage) |
| Realization | Dashed line + hollow triangle | A class implements an interface |
| Dependency | Dashed arrow | One class temporarily uses another (parameter, local variable) |

Multiplicity: {{1}} exactly one, {{0..1}} zero or one, {{*}} or {{0..*}} zero or more, {{1..*}} one or more, {{2..5}} range.

Read multiplicity at the **far end**: in Person {{1}} ——— {{0..*}} Beverage, one Person has zero or more Beverages, and each Beverage belongs to exactly one Person.

> When you explain a class diagram in a written answer, state the relationship type, the direction ("Tea and Coffee are subclasses of Beverage"), the multiplicity in both directions, and what it means in the business ("a person may order no beverages or many").

### Sequence diagram
Shows objects exchanging messages over time (top to bottom).
- **Lifeline**: dashed vertical line under each participant.
- **Activation bar**: thin rectangle showing when the object is executing.
- **Synchronous message**: solid line, filled arrowhead; sender waits.
- **Asynchronous message**: solid line, open arrowhead; sender continues.
- **Return message**: dashed line.
- **Combined fragments**: {{alt}} (if/else), {{opt}} (if), {{loop}}, {{par}} (parallel), {{ref}} (reference another diagram).

### Activity diagram
Models workflow or business process (like a flowchart with concurrency).
- Initial node (filled circle), action (rounded rectangle), decision and merge (diamond), **fork and join** (thick bar, parallel flows), final node (bullseye), **swimlanes/partitions** (who does each action).

> For a "draw an activity diagram between customer, reservation desk and accounting" question: make one swimlane per role, start node in the customer lane, put each action in the lane of whoever performs it, use a diamond for every decision with labeled guards like [room available] / [no room], and end with a final node.

### State machine diagram
Shows the states of one object and the transitions triggered by events: {{event [guard] / action}}. E.g., Order: Created → Paid → Shipped → Delivered, with Cancelled reachable from Created or Paid.

### Other diagrams
- **Component diagram**: software components and their provided/required interfaces.
- **Deployment diagram**: physical nodes (servers, devices) and the artifacts deployed on them.
- **Package diagram**: groups model elements and shows dependencies between packages.
- **Communication diagram**: same information as a sequence diagram but organized by object links with numbered messages.
`},
{
  id: 'm1-8', m: 'm1', syl: '1.4.2.7', title: 'Design patterns (GoF)',
  summary: 'The 23 GoF patterns by group, the ones most often tested, and a Singleton you can write from memory.',
  body: String.raw`
### What a design pattern is
A **design pattern** is a reusable, named solution to a common design problem in a given context. GoF (Gang of Four) catalogued 23 patterns in three groups.

| Creational (object creation) | Structural (composition) | Behavioral (interaction, responsibility) |
|---|---|---|
| Singleton, Factory Method, Abstract Factory, Builder, Prototype | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy | Observer, Strategy, Command, Iterator, Template Method, State, Mediator, Chain of Responsibility, Visitor, Memento, Interpreter |

### Most tested patterns
- **Singleton**: guarantees exactly one instance of a class with a global access point (configuration, connection pool, logger).
- **Factory Method**: a superclass defines the creation interface and subclasses decide which class to instantiate.
- **Abstract Factory**: creates families of related objects without naming concrete classes (Windows vs Mac UI widgets).
- **Builder**: constructs a complex object step by step; the same process can create different representations.
- **Prototype**: creates new objects by cloning an existing one.
- **Adapter**: converts one interface into another that clients expect (wrapper for incompatible interfaces).
- **Bridge**: separates abstraction from implementation so both can vary independently.
- **Composite**: treats individual objects and groups uniformly in a tree (files and folders).
- **Decorator**: attaches extra responsibilities to an object dynamically by wrapping it (Java I/O streams).
- **Facade**: provides one simple interface to a complex subsystem.
- **Flyweight**: shares fine-grained objects to save memory.
- **Proxy**: a placeholder that controls access to another object (lazy loading, access control, remote proxy).
- **Observer**: when one object (subject) changes state, all its dependents (observers) are notified automatically; one-to-many; publish-subscribe.
- **Strategy**: defines a family of interchangeable algorithms and lets the client choose one at run time.
- **Command**: wraps a request as an object (supports undo, queues, logging).
- **Iterator**: accesses elements of a collection sequentially without exposing its structure.
- **Template Method**: the superclass defines an algorithm's skeleton; subclasses override some steps.
- **State**: an object changes its behavior when its internal state changes (state classes).
- **Mediator**: centralizes complex communication between objects.
- **Chain of Responsibility**: passes a request along a chain of handlers until one handles it.
- **Visitor**: adds new operations to an object structure without changing its classes.
- **Memento**: captures and restores an object's internal state (undo) without breaking encapsulation.

!> Strategy vs State: both swap behavior objects. Strategy is chosen by the **client**; State changes **itself** as the object's internal state changes.

### Singleton in Java
~~~java
public class Config {
    private static Config instance;          // the single instance
    private Config() { }                     // private constructor blocks "new"
    public static synchronized Config getInstance() {
        if (instance == null) instance = new Config();
        return instance;
    }
}
~~~

### Observer in Java (skeleton)
~~~java
interface Observer { void update(String event); }

class Subject {
    private List<Observer> observers = new ArrayList<>();
    void attach(Observer o) { observers.add(o); }
    void detach(Observer o) { observers.remove(o); }
    void notifyAll(String e) { for (Observer o : observers) o.update(e); }
}
~~~
`},
{
  id: 'm1-9', m: 'm1', syl: '1.5.1', title: 'Languages, frameworks, DevOps and Linux',
  summary: 'Compilers vs interpreters, frameworks, CI/CD, DevOps/MLOps/AIOps, JDBC, and the Linux commands you must know.',
  body: String.raw`
### Programming language concepts
- **Compiler**: translates the whole source program into machine code before running (C, C++). Fast execution.
- **Interpreter**: translates and executes line by line at run time (Python, JavaScript). Easier debugging, slower.
- **Java** compiles to **bytecode** ({{.class}}), which the **JVM** interprets/JIT-compiles: "write once, run anywhere".
- **Static typing**: types checked at compile time (C, Java). **Dynamic typing**: checked at run time (Python).
- Paradigms: **procedural** (C), **object-oriented** (Java, C++, Python), **functional** (Haskell, Lisp; pure functions, immutability), **logic** (Prolog), **scripting** (Python, JavaScript, shell).
- Translation steps: source → preprocessor → compiler → assembler → **linker** (joins object files and libraries) → **loader** (places the program in memory).

### Frameworks and libraries
- **Framework**: a reusable skeleton that calls your code (inversion of control): Spring (Java), Django/Flask/FastAPI (Python), Express (Node.js), React/Angular/Vue (front end).
- **Library**: code your program calls when it needs it.
- **API**: a defined interface through which software components communicate.

### IDE, CI/CD and Ops
- **IDE (Integrated Development Environment)**: editor + compiler/interpreter + debugger + build tools in one (Eclipse, IntelliJ, VS Code, Visual Studio).
- **Build tools**: Maven, Gradle (Java), npm (JavaScript), make.
- **CI (Continuous Integration)**: developers merge code often; each merge triggers an automatic build and tests (Jenkins, GitHub Actions, GitLab CI).
- **CD (Continuous Delivery/Deployment)**: every passing build is automatically prepared for release (delivery) or released to production (deployment).
- **DevOps**: culture and practices joining development and operations through automation, CI/CD, monitoring and fast feedback.
- **MLOps**: DevOps for machine learning: versioning data and models, automated training pipelines, deployment, and monitoring for model drift.
- **AIOps**: using AI/ML on operations data (logs, metrics) to detect anomalies, find root causes and automate IT operations.
- **Infrastructure as Code (IaC)**: managing servers and networks with versioned code (Terraform, Ansible).

### Database connectivity
- **JDBC**: Java API for connecting to relational databases (DriverManager → Connection → Statement/PreparedStatement → ResultSet).
- **ODBC**: language-independent standard database access API.
- **ORM (Object-Relational Mapping)**: maps classes to tables so code works with objects (JPA/Hibernate, Django ORM, SQLAlchemy).
- **Connection pool**: reuses open DB connections to avoid the cost of opening new ones.

~~~java
Connection con = DriverManager.getConnection(url, user, pw);
PreparedStatement ps = con.prepareStatement("SELECT name FROM emp WHERE id = ?");
ps.setInt(1, 101);
ResultSet rs = ps.executeQuery();
while (rs.next()) System.out.println(rs.getString("name"));
rs.close(); ps.close(); con.close();
~~~

### Linux commands
| Command | Purpose |
|---|---|
| {{pwd}}, {{cd}}, {{ls -al}} | Current directory, change directory, list all files with details |
| {{mkdir}}, {{rmdir}}, {{rm -r}} | Make dir, remove empty dir, remove recursively |
| {{cp}}, {{mv}}, {{touch}} | Copy, move/rename, create empty file or update timestamp |
| {{cat}}, {{more}}, {{less}}, {{head}}, {{tail -f}} | Show file contents; tail -f follows a growing log |
| {{grep}} | Search text with patterns |
| {{find / -name "*.log"}} | Find files |
| {{chmod 754 file}} | Change permissions |
| {{chown user:group file}} | Change owner |
| {{ps -ef}}, {{top}}, {{kill -9 PID}} | Processes, live monitor, force kill |
| {{df -h}}, {{du -sh}} | Disk free space, directory size |
| {{tar -cvf}}, {{tar -xvf}}, {{gzip}} | Archive, extract, compress |
| {{ssh}}, {{scp}} | Remote login, secure copy |
| {{sudo}}, {{su}} | Run as superuser, switch user |
| {{crontab -e}} | Schedule periodic jobs |
| {{wc -l}} | Count lines |

### Permissions
{{rwx}} = 4+2+1. {{chmod 754 file}} → owner rwx (7), group r-x (5), others r-- (4). {{ls -l}} shows {{-rwxr-xr--}}.
- **SUID**: the program runs with the file owner's privileges (e.g., passwd); shown as {{s}} in the owner execute position; numeric 4000.
- **SGID**: runs with the group's privileges; on a directory, new files inherit the group; 2000.
- **Sticky bit**: in a shared directory like /tmp, only a file's owner can delete it; shown as {{t}}; 1000.
- **umask**: default permission mask; with umask 022 new files get 644 and directories 755.

### Shell
Pipes and redirection: {{cmd1 | cmd2}} (output of 1 becomes input of 2), {{>}} overwrite to file, {{>>}} append, {{<}} input from file, {{2>}} redirect errors. Example: {{ps -ef | grep java | wc -l}} counts java processes.
Variables: {{NAME=value}}, used as {{$NAME}}; {{export}} makes it an environment variable; {{$PATH}} lists where commands are searched.
`},
{
  id: 'm1-10', m: 'm1', syl: '1.5.2', title: 'Coding in C, Java and Python: what the exam tests',
  summary: 'Output-tracing traps in each language, recursion, and implementing stacks, queues and sorts. Performance questions are coded in these.',
  body: String.raw`
> Performance questions are almost half the exam's points and often ask you to complete or write code. The exam's compiler tool supports C, C++, Java and Python. Pick the language you are strongest in and practice writing small functions by hand.

### C essentials
- {{int a = 7 / 2;}} → 3 (integer division). {{7 % 2}} → 1. {{7 / 2.0}} → 3.5.
- {{i++}} uses then increments; {{++i}} increments then uses.
- Pointers: {{&x}} is the address of x, {{*p}} is the value at address p. {{int a[5]; int *p = a;}} then {{*(p+2)}} equals {{a[2]}}.
- Strings are char arrays ending with {{'\0'}}. {{strlen("abc")}} is 3 but {{sizeof("abc")}} is 4.
- {{switch}} falls through without {{break}}.
- Call by value copies the argument; to change the caller's variable, pass a pointer ({{swap(&a, &b)}}).

~~~c
void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }
~~~

### Java essentials
- {{String}} is immutable. {{==}} compares references; {{equals()}} compares content.
- Arrays: {{arr.length}} (field); Strings: {{s.length()}} (method); ArrayList: {{list.size()}}.
- {{static}} members belong to the class, not to objects. A static method cannot use instance fields directly.
- {{final}} variable = constant; final method = cannot override; final class = cannot extend.
- Dynamic binding: with {{Parent p = new Child();}}, {{p.method()}} runs the **Child's** overridden method, but fields and static methods use the declared type (Parent).
- Exceptions: {{try}} → {{catch}} → {{finally}} (always runs). Checked exceptions (IOException) must be caught or declared with {{throws}}.
- For-each cannot modify primitive array elements: {{for (int n : arr) n = 10;}} leaves arr unchanged. Use an index loop: {{for (int i = 0; i < arr.length; i++) arr[i] = 10;}}

~~~java
class A { int x = 1; void show() { System.out.print("A"); } }
class B extends A { int x = 2; void show() { System.out.print("B"); } }
A obj = new B();
obj.show();                  // prints B (method: actual object)
System.out.print(obj.x);     // prints 1 (field: declared type)
~~~

### Python essentials
- {{7 // 2}} → 3 (floor division), {{7 / 2}} → 3.5, {{2 ** 3}} → 8, {{-7 // 2}} → -4.
- Slicing {{s[start:stop:step]}}: {{"abcdef"[1:4]}} → 'bcd'; {{[1,2,3,4][::-1]}} → [4, 3, 2, 1].
- {{range(1, 10, 3)}} → 1, 4, 7.
- Lists are mutable and passed by reference; tuples and strings are immutable.
- List comprehension: {{[x*x for x in range(5) if x % 2 == 0]}} → [0, 4, 16].
- Dictionary: {{d.get(k, 0)}} returns 0 when the key is missing.
- Trap: a mutable default argument ({{def f(a=[])}}) is shared across calls.

### Recursion
~~~python
def fact(n):
    if n <= 1:          # base case
        return 1
    return n * fact(n - 1)

def fib(n):             # 0 1 1 2 3 5 8 ...
    return n if n < 2 else fib(n - 1) + fib(n - 2)
~~~

### Implementing data structures
Stack with an array (Java):
~~~java
int[] stack = new int[100]; int top = -1;
void push(int v) { if (top == 99) throw new RuntimeException("overflow"); stack[++top] = v; }
int pop()       { if (top == -1) throw new RuntimeException("underflow"); return stack[top--]; }
~~~
Circular queue: {{rear = (rear + 1) % N}} on enqueue, {{front = (front + 1) % N}} on dequeue; it is empty when {{front == rear}} and full when {{(rear + 1) % N == front}} (one slot left empty).

Bubble sort (Python):
~~~python
def bubble(a):
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a
~~~

### How to trace output under exam pressure
1. Write a table: one column per variable, one row per loop iteration.
2. Watch for integer division, off-by-one loop bounds ({{<}} vs {{<=}}), and missing {{break}}.
3. For recursion, draw the call tree and resolve from the bottom.
`},
{
  id: 'm1-11', m: 'm1', syl: '1.5.3', title: 'Software testing',
  summary: 'Test levels, stubs vs drivers, white-box coverage, cyclomatic complexity, and black-box techniques with examples.',
  body: String.raw`
### Testing principles
Testing shows the presence of defects, not their absence; exhaustive testing is impossible; test early; defects cluster (**Pareto**: 80% of defects in 20% of modules); the **pesticide paradox** (repeating the same tests stops finding new bugs); testing is context dependent; **absence-of-errors fallacy** (a bug-free system that does not meet user needs is still useless).

### Test levels
- **Unit test**: tests individual modules/functions, usually white-box, by developers.
- **Integration test**: tests interfaces between combined modules.
- **System test**: tests the whole integrated system against functional and non-functional requirements.
- **Acceptance test**: the customer/user checks the system meets their needs before accepting it.
- **Alpha test**: acceptance test by users at the **developer's** site under supervision.
- **Beta test**: test by real users in **their own** environment, without the developer present.

### Integration approaches
- **Top-down integration**: starts from the main module down; uses **stubs** to stand in for lower modules not yet built.
- **Bottom-up integration**: starts from the lowest modules up; uses **drivers** to call the modules under test.
- **Big bang integration**: integrate everything at once; hard to locate faults.
- **Sandwich (hybrid) integration**: top-down and bottom-up together.

!> Stub = called **by** the module under test (fake lower module, top-down). Driver = **calls** the module under test (fake upper module, bottom-up).

### White-box (structural) testing
Tests internal logic and paths. Coverage criteria from weaker to stronger:
- **Statement coverage**: every statement executes at least once.
- **Decision (branch) coverage**: every decision takes both true and false outcomes.
- **Condition coverage**: every individual condition in a decision is both true and false.
- **Condition/decision coverage**: both of the above.
- **MC/DC (Modified Condition/Decision Coverage)**: each condition is shown to independently affect the decision's outcome (aviation standard).
- **Multiple condition coverage**: every combination of conditions.
- **Basis path testing (McCabe)**: tests every linearly independent path.

**Cyclomatic complexity** V(G) = E − N + 2 (edges − nodes + 2) = P + 1 (P = number of decision points) = number of enclosed regions + 1. It equals the number of independent paths, so the minimum number of test cases for basis path coverage.

### Black-box (functional) testing
Tests behavior against the specification without looking at code.
- **Equivalence partitioning**: divide inputs into classes that behave the same and test one value per class (valid and invalid).
- **Boundary value analysis**: test at and around the edges of each class, where errors cluster.
- **Decision table testing**: test each combination of conditions and resulting actions.
- **Cause-effect graphing**: model input causes and output effects as a logic graph, then derive a decision table.
- **State transition testing**: test valid and invalid transitions between states.
- **Pairwise (all-pairs) testing**: cover every pair of parameter values with far fewer tests.
- **Error guessing**: use experience to guess likely errors.
- **Comparison (back-to-back) testing**: run several versions with the same input and compare outputs.

Example: valid score is 0–100. Equivalence classes: < 0 (invalid), 0–100 (valid), > 100 (invalid) → test −5, 50, 150. Boundary values: −1, 0, 1, 99, 100, 101.

### Other test types
- **Regression testing**: re-running tests after a change to ensure nothing that worked is now broken.
- **Smoke test**: quick check that the build's main functions work before deeper testing.
- **Static testing**: examining code or documents without running them (reviews, inspections, static analysis).
- **Dynamic testing**: testing by executing the software.
- **Test oracle**: the source of expected results used to judge whether a test passed.
- **Performance testing**: **load test** (expected load), **stress test** (beyond limits until failure), **spike test** (sudden bursts), **endurance/soak test** (long duration).
- **TDD (Test-Driven Development)**: write a failing test first, then code to pass it, then refactor (Red → Green → Refactor).
- **Test case**: identifier, preconditions, input data, steps, expected result (and actual result).
- **Test harness**: drivers, stubs and tools needed to run tests automatically.
`},
{
  id: 'm1-12', m: 'm1', syl: '1.6–1.7', title: 'Configuration management, maintenance, refactoring, OSS and MSA',
  summary: 'SCM activities and Git, the four maintenance types, code smells and refactoring, open-source licenses, microservices.',
  body: String.raw`
### Software configuration management (SCM)
SCM controls changes to software artifacts throughout the life cycle.
- **Configuration identification**: decide which items are controlled (configuration items, CIs) and name/version them.
- **Version control**: track and manage versions of each CI.
- **Change control**: evaluate, approve or reject change requests, usually through a **CCB (Change Control Board)**.
- **Configuration status accounting**: record and report the status of CIs and changes.
- **Configuration audit**: verify the CIs match their specifications and the recorded state.
- **Baseline**: a formally reviewed and agreed version of a CI that serves as the basis for further work and can only change through change control.

Tools: **Git** (distributed), **SVN/Subversion** (centralized), CVS (old, centralized).

| Git command | What it does |
|---|---|
| {{git init}} / {{git clone URL}} | Create a repo / copy a remote repo |
| {{git add file}} | Stage changes |
| {{git commit -m "msg"}} | Save staged changes to local history |
| {{git push}} / {{git pull}} | Send to / get from the remote ({{pull}} = {{fetch}} + {{merge}}) |
| {{git branch name}} / {{git checkout -b name}} / {{git switch}} | Create / create and switch / switch branches |
| {{git merge branch}} | Merge another branch into the current one |
| {{git rebase}} | Replay commits onto another base for a linear history |
| {{git status}}, {{git log}}, {{git diff}} | Inspect state, history, changes |
| {{git revert}} / {{git reset}} | Undo with a new commit / move the branch pointer back |
| {{git stash}} | Shelve uncommitted changes temporarily |

### Change management and traceability
Change request → impact analysis (which requirements, designs, code and tests are affected, using traceability) → CCB approval → implement → verify → update baseline.

### Maintenance types
- **Corrective maintenance**: fixes defects found after delivery.
- **Adaptive maintenance**: adapts the software to a changed environment (new OS, new law, new hardware).
- **Perfective maintenance**: adds or improves features and performance requested by users. Usually the largest share (about 50%).
- **Preventive maintenance**: improves maintainability to prevent future problems (refactoring, documentation).

Lehman's laws: a system in use must change continually or become less useful, and its complexity grows unless work is done to reduce it.

### Refactoring
- **Refactoring**: improving the internal structure of code without changing its external behavior.
- **Code smell**: a surface sign of a deeper design problem.
Common smells: duplicated code, long method, large class, long parameter list, feature envy (a method uses another class's data more than its own), data clumps, switch statements, shotgun surgery (one change touches many classes), divergent change, dead code, magic numbers.
Common techniques: **Extract Method**, Rename, Move Method/Field, Extract Class, Inline Method, Replace Magic Number with Constant, Replace Conditional with Polymorphism, Introduce Parameter Object, Pull Up / Push Down Method.

### Open-source licenses (1.7.1.1)
| License | Type | Must release your source? | Notes |
|---|---|---|---|
| GPL v2/v3 | Strong copyleft | Yes, the whole derived work if distributed | v3 adds patent and anti-tivoization terms |
| AGPL | Strongest copyleft | Yes, even if only offered as a network service | Closes the "SaaS loophole" |
| LGPL | Weak copyleft | Only changes to the library itself | Dynamic linking from proprietary code is allowed |
| MPL 2.0 | Weak copyleft (file-level) | Only modified MPL files | |
| Apache 2.0 | Permissive | No | Keep notices; includes an express **patent grant** |
| MIT, BSD | Permissive | No | Keep the copyright notice |

- **Copyleft**: derivative works must be distributed under the same license terms.
- **Permissive license**: allows use in proprietary software with minimal conditions (attribution).

### Microservices and modernization (1.7.1.2)
- **Monolithic architecture**: one deployable unit; simple at first, hard to scale and change as it grows.
- **MSA (Microservices Architecture)**: small, independently deployable services, each owning its data, communicating via APIs or events.
- **API gateway**: single entry point that routes requests, handles authentication and rate limiting.
- **Service discovery**: services register and find each other dynamically.
- **Circuit breaker**: stops calling a failing service to prevent cascading failures.
- **Container**: packages an app with its dependencies, sharing the host OS kernel (Docker). **Kubernetes** orchestrates containers.
- **Application modernization**: moving legacy apps to modern platforms. The cloud "6 Rs": rehost (lift and shift), replatform, refactor/re-architect, repurchase (move to SaaS), retire, retain.
- **Serverless (FaaS)**: run functions on demand without managing servers (AWS Lambda).
- **Low-code/no-code**: build apps with visual tools and little hand coding.
`}
);

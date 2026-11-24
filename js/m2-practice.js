/* M2 Data Management: practice questions and drills (original TOPCIT-style items) */
TC.questions.push(
{ id: 'm2q01', l: 'm2-1', t: 'mc',
  q: "Which statement describes **physical** data independence?",
  c: ["Changing the conceptual schema does not require changing external schemas or applications.",
      "Changing the internal schema (storage structure, indexes, file location) does not require changing the conceptual schema.",
      "Applications can read data without using SQL.",
      "Each database is stored on a physically separate server."], a: 1,
  ex: ["This is logical data independence (external ↔ conceptual).",
       "Correct. Physical independence is between the conceptual and internal levels.",
       "Unrelated to data independence.",
       "Unrelated; that describes distribution, not independence."] },
{ id: 'm2q02', l: 'm2-1', t: 'mc',
  q: "In the ANSI/SPARC architecture, which schema defines the logical structure of the **entire** database for the whole organization, including entities, relationships and integrity constraints?",
  c: ["External schema", "Conceptual schema", "Internal schema", "Subschema"], a: 1,
  ex: ["External schemas are individual users' views.",
       "Correct. There is one conceptual schema per database.",
       "The internal schema describes physical storage.",
       "Subschema is another name for an external schema."] },
{ id: 'm2q03', l: 'm2-1', t: 'mc',
  q: "A relation has 5 attributes and 120 tuples. What are its degree and cardinality?",
  c: ["Degree 5, cardinality 120", "Degree 120, cardinality 5", "Degree 600, cardinality 5", "Degree 5, cardinality 600"], a: 0,
  ex: ["Correct. Degree = number of attributes; cardinality = number of tuples.",
       "Reversed.", "Degree is not a product.", "Cardinality is the row count, 120."] },
{ id: 'm2q04', l: 'm2-1', t: 'mc',
  q: "Which statement about database models is **incorrect**?",
  c: ["The hierarchical model organizes records in a tree with parent–child (1:N) links.",
      "The network model can represent M:N relationships using owner–member sets.",
      "The relational model stores data in tables and uses SQL as its standard language.",
      "The object-relational model drops tables entirely, so SQL can no longer be used."], a: 3,
  ex: ["Correct statement.", "Correct statement.", "Correct statement.",
       "Incorrect, so this is the answer. Object-relational DBMSs keep tables and SQL and add user-defined types, inheritance and methods."] },
{ id: 'm2q05', l: 'm2-2', t: 'mc',
  q: "Which key satisfies **both** uniqueness and minimality?",
  c: ["Super key", "Candidate key", "Foreign key", "Any composite key"], a: 1,
  ex: ["A super key only guarantees uniqueness; it may contain extra attributes.",
       "Correct. A candidate key is a minimal super key.",
       "A foreign key references another table and need not be unique.",
       "A composite key may or may not be minimal."] },
{ id: 'm2q06', l: 'm2-2', t: 'mc',
  q: "Students take many courses and courses have many students. How should this M:N relationship be implemented in a relational database?",
  c: ["Add course_id as a foreign key in STUDENT", "Add student_id as a foreign key in COURSE",
      "Create an ENROLLMENT table with foreign keys to both STUDENT and COURSE", "Merge STUDENT and COURSE into one table"], a: 2,
  ex: ["A student could then take only one course.", "A course could then have only one student.",
       "Correct. An associative (intersection) table resolves M:N into two 1:N relationships and can hold grade, date, etc.",
       "Merging causes massive redundancy and anomalies."] },
{ id: 'm2q07', l: 'm2-2', t: 'mc',
  q: "DEPT has dept_id values D1, D2, D3. EMP.dept_id is a nullable foreign key to DEPT. Which operation violates **referential integrity**?",
  c: ["Insert an employee with dept_id NULL", "Insert an employee with dept_id 'D9'", "Insert department D4 with no employees", "Raise an employee's salary"], a: 1,
  ex: ["A nullable FK may be NULL.", "Correct. D9 does not exist in DEPT.",
       "A parent row without children is fine.", "Salary is not part of any FK."] },
{ id: 'm2q08', l: 'm2-2', t: 'mc',
  q: "In Chen's ER notation, what does a **double oval** represent?",
  c: ["Weak entity", "Multi-valued attribute", "Derived attribute", "Key attribute"], a: 1,
  ex: ["A weak entity is a double rectangle.", "Correct.",
       "A derived attribute is a dashed oval.", "A key attribute is an oval with its name underlined."] },
{ id: 'm2q09', l: 'm2-2', t: 'mc',
  q: "Supertype EMPLOYEE(emp_id, name, hire_date) has subtypes FULLTIME(salary) and PARTTIME(hourly_rate, hours). Using the **one table per type** conversion, which columns does the PARTTIME table have?",
  c: ["emp_id (PK and FK), hourly_rate, hours", "emp_id, name, hire_date, hourly_rate, hours",
      "hourly_rate, hours", "emp_id, name, hire_date, salary, hourly_rate, hours, emp_type"], a: 0,
  ex: ["Correct. The subtype table keeps the supertype's key as PK and FK plus its own attributes.",
       "This is the 'subtype tables only' (roll-down) option, which copies common columns.",
       "A table needs a key; without emp_id rows cannot be linked to EMPLOYEE.",
       "This is the single-table (roll-up) option."] },
{ id: 'm2q10', l: 'm2-3', t: 'mc',
  q: "In ENROLL(student_id, course_id, course_title, grade) with key (student_id, course_id), a new course cannot be recorded until some student enrolls in it. Which anomaly is this?",
  c: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Cascading rollback"], a: 0,
  ex: ["Correct. Unrelated data (a student) is required to insert a fact (a course).",
       "A deletion anomaly loses facts when rows are deleted.",
       "An update anomaly requires changing the same fact in many rows.",
       "Cascading rollback is a concurrency issue."] },
{ id: 'm2q11', l: 'm2-3', t: 'mc',
  q: "R(A, B, C, D) has key (A, B) and dependencies A → C and (A, B) → D. What is the highest normal form R satisfies?",
  c: ["1NF", "2NF", "3NF", "BCNF"], a: 0,
  ex: ["Correct. C depends on only part of the key (A), a partial dependency, so R is not in 2NF.",
       "2NF forbids partial dependencies such as A → C.", "3NF requires 2NF first.", "BCNF requires 3NF first."] },
{ id: 'm2q12', l: 'm2-3', t: 'mc',
  q: "EMP(emp_id, name, dept_id, dept_name) has key emp_id, and dept_id → dept_name. Which normal form does it violate, and why?",
  c: ["1NF, because dept_name is not atomic", "2NF, because of a partial dependency on the key",
      "3NF, because dept_name depends on emp_id transitively through dept_id", "4NF, because of a multi-valued dependency"], a: 2,
  ex: ["All values are atomic.", "The key is a single attribute, so partial dependency is impossible.",
       "Correct. emp_id → dept_id → dept_name is a transitive dependency; split out DEPT(dept_id, dept_name).",
       "No multi-valued dependency exists here."] },
{ id: 'm2q13', l: 'm2-3', t: 'mc',
  q: "Which Armstrong axiom says: if X → Y and Y → Z, then X → Z?",
  c: ["Reflexivity", "Augmentation", "Transitivity", "Decomposition"], a: 2,
  ex: ["Reflexivity: if Y ⊆ X then X → Y.", "Augmentation: X → Y implies XZ → YZ.", "Correct.", "Decomposition: X → YZ implies X → Y and X → Z."] },
{ id: 'm2q14', l: 'm2-3', t: 'mc',
  q: "Which is **not** a denormalization technique?",
  c: ["Adding a derived order_total column to ORDERS", "Merging two 1:1 tables that are always joined",
      "Creating a monthly sales summary table", "Splitting a table to remove a transitive dependency"], a: 3,
  ex: ["Derived columns are denormalization.", "Table merging is denormalization.", "Summary tables are denormalization.",
       "Correct. Removing a transitive dependency is normalization (to 3NF)."] },
{ id: 'm2q15', l: 'm2-4', t: 'mc',
  q: "A data warehouse table has 50 million rows and a {{status}} column with only 4 distinct values, used often in read-only report filters. Which index type fits best?",
  c: ["B-tree index", "Bitmap index", "Hash index", "No index ever helps"], a: 1,
  ex: ["A B-tree on a low-cardinality column has poor selectivity.",
       "Correct. Bitmap indexes suit low-cardinality columns in read-mostly analytics.",
       "Hash indexes help exact matches on high-cardinality keys.",
       "Bitmap indexes, often combined across columns, help here."] },
{ id: 'm2q16', l: 'm2-4', t: 'mc',
  q: "There is a B-tree index on {{customer.name}}. Which condition **cannot** use the index efficiently?",
  c: ["WHERE name = 'Santos'", "WHERE name LIKE 'San%'", "WHERE name LIKE '%tos'", "WHERE name BETWEEN 'A' AND 'C'"], a: 2,
  ex: ["Equality uses the index.", "A fixed prefix gives a range scan.",
       "Correct. A leading wildcard means no starting point in the sorted index, so a full scan is needed.",
       "Range conditions use B-tree indexes."] },
{ id: 'm2q17', l: 'm2-4', t: 'mc',
  q: "Which statement about (non-materialized) views is **incorrect**?",
  c: ["A view can hide sensitive columns, which helps security.", "A view provides logical data independence.",
      "A view stores a full copy of the base table's data, so it uses as much space as the table.", "A view that uses GROUP BY is generally not updatable."], a: 2,
  ex: ["Correct statement.", "Correct statement.",
       "Incorrect, so this is the answer. A view stores only its query definition; only a materialized view stores data.",
       "Correct statement."] },
{ id: 'm2q18', l: 'm2-4', t: 'mc',
  q: "In a distributed database, users query the CUSTOMER table without knowing whether it is stored in Manila or Singapore. Which transparency is this?",
  c: ["Location transparency", "Replication transparency", "Failure transparency", "Concurrency transparency"], a: 0,
  ex: ["Correct.", "Replication transparency hides that copies exist.", "Failure transparency keeps transactions atomic despite failures.", "Concurrency transparency makes concurrent transactions behave serially."] },
{ id: 'm2q19', l: 'm2-5', t: 'mc',
  q: "SQL's **WHERE** clause corresponds to which relational algebra operation?",
  c: ["Projection (π)", "Selection (σ)", "Division (÷)", "Cartesian product (×)"], a: 1,
  ex: ["Projection picks columns; that is SQL's SELECT list.", "Correct. Selection picks rows that meet a condition.",
       "Division finds tuples related to all tuples of another relation.", "Cartesian product combines every pair of rows (FROM a, b)."] },
{ id: 'm2q20', l: 'm2-5', t: 'mc',
  q: "Which statement removes rows and **can be rolled back** before COMMIT?",
  c: ["DELETE", "TRUNCATE", "DROP", "ALTER"], a: 0,
  ex: ["Correct. DELETE is DML and is logged row by row.",
       "TRUNCATE is DDL and auto-commits in most DBMSs.",
       "DROP removes the table itself and cannot be rolled back.",
       "ALTER changes structure, not rows."] },
{ id: 'm2q21', l: 'm2-5', t: 'mc',
  q: "Which SQL statement is DCL?",
  c: ["COMMIT", "GRANT", "ALTER", "MERGE"], a: 1,
  ex: ["COMMIT is TCL.", "Correct. GRANT and REVOKE are DCL.", "ALTER is DDL.", "MERGE is DML."] },
{ id: 'm2q22', l: 'm2-5', t: 'mc',
  q: "Admin runs {{GRANT SELECT ON emp TO kim WITH GRANT OPTION;}}. Kim then grants SELECT on emp to Lee. Later Admin runs {{REVOKE SELECT ON emp FROM kim CASCADE;}}. What happens?",
  c: ["Only Kim loses the privilege", "Kim and Lee both lose the privilege", "Nobody loses it, because Kim already passed it on", "The REVOKE fails"], a: 1,
  ex: ["Without CASCADE behavior Lee's grant would remain; CASCADE removes dependent grants.",
       "Correct. CASCADE also revokes privileges that Kim granted to others.",
       "Privileges granted through Kim depend on Kim's privilege.", "The statement is valid."] },
{ id: 'm2q23', l: 'm2-6', t: 'mc',
  q: "Table PAY has a column {{amt}} with values 100, 200, NULL, 300. What does {{SELECT COUNT(*), COUNT(amt), AVG(amt) FROM pay;}} return?",
  c: ["4, 3, 200", "4, 4, 150", "3, 3, 200", "4, 3, 150"], a: 0,
  ex: ["Correct. COUNT(*) counts rows; COUNT(amt) skips NULL; AVG = 600 / 3 = 200.",
       "COUNT(amt) skips the NULL, and AVG does not treat NULL as 0.",
       "COUNT(*) counts all 4 rows including the one with NULL.",
       "AVG divides by 3 non-NULL values, not 4."] },
{ id: 'm2q24', l: 'm2-6', t: 'mc',
  q: "Which query lists departments whose **average** salary exceeds 40,000?",
  c: ["SELECT dept_id FROM emp WHERE AVG(salary) > 40000 GROUP BY dept_id;",
      "SELECT dept_id FROM emp GROUP BY dept_id HAVING AVG(salary) > 40000;",
      "SELECT dept_id, AVG(salary) FROM emp HAVING salary > 40000;",
      "SELECT dept_id FROM emp WHERE salary > 40000 GROUP BY dept_id;"], a: 1,
  ex: ["Aggregates cannot be used in WHERE; this is an error.",
       "Correct. HAVING filters groups after GROUP BY.",
       "No GROUP BY, and HAVING compares a non-aggregated column.",
       "This finds departments with at least one employee earning over 40,000, not the average."] },
{ id: 'm2q25', l: 'm2-6', t: 'mc',
  q: "Using the [Example], how many rows does {{SELECT * FROM emp e FULL OUTER JOIN dept d ON e.dept_id = d.dept_id;}} return?",
  code: String.raw`EMP (name, dept_id)          DEPT (dept_id, dept_name)
 Ana   D1                      D1  Dev
 Ben   D1                      D2  Sales
 Carl  D2                      D3  HR
 Dina  D2
 Eli   NULL`, lang: 'text',
  c: ["4", "5", "6", "15"], a: 2,
  ex: ["4 is the inner join (matching rows only).",
       "5 is a left or right outer join.",
       "Correct. 4 matches + Eli (no dept) + HR (no employees) = 6.",
       "15 is the cross join (5 × 3)."] },
{ id: 'm2q26', l: 'm2-6', t: 'mc',
  q: "{{WHERE salary > ALL (SELECT salary FROM emp WHERE dept_id = 'D2')}} is equivalent to which condition?",
  c: ["salary > the minimum D2 salary", "salary > the maximum D2 salary", "salary equals some D2 salary", "salary < the minimum D2 salary"], a: 1,
  ex: ["That is '> ANY'.", "Correct. Greater than every value means greater than the largest.", "That is '= ANY' or IN.", "That is '< ALL'."] },
{ id: 'm2q27', l: 'm2-6', t: 'mc',
  q: "DEPT has D1, D2, D3. EMP.dept_id contains D1, D1, D2, D2 and one NULL. What does {{SELECT dept_id FROM dept WHERE dept_id NOT IN (SELECT dept_id FROM emp);}} return?",
  c: ["D3", "D3 and NULL", "No rows", "An error"], a: 2,
  ex: ["You would expect D3, but NOT IN against a list containing NULL evaluates to UNKNOWN for every row.",
       "NULL is not a DEPT row.",
       "Correct. 'D3' <> NULL is UNKNOWN, so no row passes. Use NOT EXISTS or filter out NULLs.",
       "The query is valid."] },
{ id: 'm2q28', l: 'm2-6', t: 'mc',
  q: "Table A has x = 1, 2, 3 and table B has x = 2, 3, 4. How many rows does {{SELECT x FROM a UNION ALL SELECT x FROM b;}} return?",
  c: ["3", "4", "6", "2"], a: 2,
  ex: ["3 rows would be one table alone.", "4 is the result of UNION (duplicates removed).",
       "Correct. UNION ALL keeps duplicates: 3 + 3 = 6.", "2 is INTERSECT."] },
{ id: 'm2q29', l: 'm2-7', t: 'mc',
  q: "Which statement about query optimizers is correct?",
  c: ["A rule-based optimizer chooses plans using table statistics such as row counts and histograms.",
      "A cost-based optimizer estimates the cost of candidate plans using statistics and picks the cheapest.",
      "A cost-based optimizer always produces the same plan regardless of data volume.",
      "Optimizers are only used for INSERT statements."], a: 1,
  ex: ["That describes CBO. RBO uses a fixed ranking of access paths.",
       "Correct.", "Plans change as statistics change.", "Optimizers plan queries and DML of all kinds."] },
{ id: 'm2q30', l: 'm2-7', t: 'mc',
  q: "A data warehouse query joins two large tables (tens of millions of rows) on an equality condition, with no useful index. Which join method is usually best?",
  c: ["Nested loop join", "Hash join", "Cartesian join", "Index-only nested loop"], a: 1,
  ex: ["Nested loops are best for small driving sets with indexed inner tables.",
       "Correct. Hash joins handle large equi-joins efficiently.", "A Cartesian join has no join condition.", "There is no useful index."] },
{ id: 'm2q31', l: 'm2-8', t: 'mc',
  q: "Which isolation level prevents dirty reads and non-repeatable reads but still allows **phantom reads**?",
  c: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"], a: 2,
  ex: ["Allows all three anomalies.", "Prevents only dirty reads.", "Correct.", "Prevents all three, including phantoms."] },
{ id: 'm2q32', l: 'm2-8', t: 'mc',
  q: "T1 reads an account balance of 1,000. T2 updates it to 500 and commits. T1 reads the same row again and gets 500. Which problem occurred?",
  c: ["Dirty read", "Non-repeatable read", "Phantom read", "Lost update"], a: 1,
  ex: ["T2 had committed, so the value read was not dirty.",
       "Correct. The same row returned different values within one transaction.",
       "Phantoms are new or missing rows in a range query.", "No update was overwritten."] },
{ id: 'm2q33', l: 'm2-8', t: 'mc',
  q: "Which statement about Two-Phase Locking (2PL) is **incorrect**?",
  c: ["A transaction acquires locks in the growing phase and releases them in the shrinking phase.",
      "After releasing any lock, a transaction cannot acquire a new lock.",
      "2PL guarantees conflict serializability.",
      "2PL guarantees that deadlocks cannot occur."], a: 3,
  ex: ["Correct statement.", "Correct statement.", "Correct statement.",
       "Incorrect, so this is the answer. Deadlocks can still occur under 2PL; they need prevention, detection or timeouts."] },
{ id: 'm2q34', l: 'm2-8', t: 'mc',
  q: "T1 holds a **shared** lock on row R. T2 requests a shared lock on R, and then T3 requests an **exclusive** lock on R. What happens?",
  c: ["T2 waits, T3 is granted", "T2 is granted, T3 waits", "Both are granted", "Both wait"], a: 1,
  ex: ["Shared locks are compatible with each other.", "Correct. S–S is compatible; X conflicts with any existing lock.",
       "An exclusive lock cannot coexist with shared locks.", "T2's shared lock is compatible."] },
{ id: 'm2q35', l: 'm2-9', t: 'mc',
  q: "The system crashed. The log shows: T1 started and committed **before** the last checkpoint; T2 started before the checkpoint and committed **after** it; T3 started after the checkpoint and had **not** committed. What does recovery (immediate update) do?",
  c: ["T1: REDO, T2: REDO, T3: UNDO", "T1: nothing, T2: REDO, T3: UNDO", "T1: nothing, T2: UNDO, T3: REDO", "T1: UNDO, T2: nothing, T3: UNDO"], a: 1,
  ex: ["T1's changes were already flushed at the checkpoint.",
       "Correct. Committed after the checkpoint → REDO; not committed → UNDO; committed before → nothing.",
       "REDO is for committed work and UNDO for uncommitted work, not the other way round.",
       "T1 is committed and safely on disk."] },
{ id: 'm2q36', l: 'm2-9', t: 'mc',
  q: "A full backup runs every Sunday and an **incremental** backup every other night. The disk fails on Thursday morning. Which backups are needed to restore to Wednesday night?",
  c: ["Sunday full only", "Sunday full + Wednesday incremental", "Sunday full + Monday, Tuesday and Wednesday incrementals", "Wednesday incremental only"], a: 2,
  ex: ["That loses Monday–Wednesday changes.",
       "That would be the rule for a differential backup.",
       "Correct. Each incremental holds only changes since the previous backup, so all are applied in order.",
       "An incremental alone has only one day's changes."] },
{ id: 'm2q37', l: 'm2-9', t: 'mc',
  q: "Which statement about the Two-Phase Commit (2PC) protocol is **incorrect**?",
  c: ["In the first phase, the coordinator asks every participant to prepare and vote.",
      "A participant that votes YES must be able to commit even if it crashes afterwards.",
      "If one participant votes NO, the coordinator still commits on the participants that voted YES.",
      "If the coordinator fails after participants vote YES, they may be blocked waiting for the decision."], a: 2,
  ex: ["Correct statement.", "Correct statement: it has logged its changes.",
       "Incorrect, so this is the answer. Any NO vote means the coordinator aborts the transaction everywhere.",
       "Correct statement: this is 2PC's blocking problem."] },
{ id: 'm2q38', l: 'm2-10', t: 'mc',
  q: "Which is **not** one of Inmon's characteristics of a data warehouse?",
  c: ["Subject-oriented", "Integrated", "Time-variant", "Volatile (rows are updated in place in real time)"], a: 3,
  ex: ["It is a DW characteristic.", "It is a DW characteristic.", "It is a DW characteristic.",
       "Correct. A DW is non-volatile: data is loaded and read, not updated in place."] },
{ id: 'm2q39', l: 'm2-10', t: 'mc',
  q: "An analyst looking at yearly sales opens 2026 to see sales by quarter, then by month. Which OLAP operation is this?",
  c: ["Roll-up", "Drill-down", "Slice", "Pivot"], a: 1,
  ex: ["Roll-up goes to a coarser level (month → year).", "Correct. Moving to finer detail is drill-down.",
       "Slice fixes one dimension to a single value.", "Pivot rotates the axes."] },
{ id: 'm2q40', l: 'm2-10', t: 'mc',
  q: "Of 200 transactions, 50 contain A, 40 contain B, and 20 contain both. For the rule A → B, what are the confidence and lift?",
  c: ["Confidence 0.40, lift 2.0", "Confidence 0.10, lift 0.5", "Confidence 0.50, lift 2.5", "Confidence 0.40, lift 0.8"], a: 0,
  ex: ["Correct. Confidence = 20/50 = 0.40. Lift = 0.40 / (40/200 = 0.20) = 2.0.",
       "0.10 is the support (20/200).",
       "Confidence divides by transactions containing A (50), not B (40).",
       "Lift divides confidence by P(B) = 0.20, giving 2.0."] },
{ id: 'm2q41', l: 'm2-10', t: 'mc',
  q: "Which statement about dimensional models is **incorrect**?",
  c: ["A fact table holds numeric measures and foreign keys to dimensions.",
      "A star schema connects denormalized dimension tables directly to the fact table.",
      "A snowflake schema denormalizes dimension tables further to reduce the number of joins.",
      "Several fact tables sharing dimensions form a fact constellation."], a: 2,
  ex: ["Correct statement.", "Correct statement.",
       "Incorrect, so this is the answer. A snowflake schema **normalizes** dimensions into sub-dimensions, which adds joins.",
       "Correct statement."] },
{ id: 'm2q42', l: 'm2-11', t: 'mc',
  q: "Which is **not** one of the three properties in the CAP theorem?",
  c: ["Consistency", "Availability", "Partition tolerance", "Durability"], a: 3,
  ex: ["C is in CAP.", "A is in CAP.", "P is in CAP.", "Correct. Durability is part of ACID, not CAP."] },
{ id: 'm2q43', l: 'm2-11', t: 'mc',
  q: "A social app needs fast 'friends of friends' and 'people you may know' queries over billions of connections. Which NoSQL type fits best?",
  c: ["Key-value store", "Document store", "Column-family store", "Graph database"], a: 3,
  ex: ["Key-value stores look up single keys; traversing relationships is slow.",
       "Documents suit varied records, not multi-hop relationships.",
       "Wide-column stores suit huge write-heavy data, not traversals.",
       "Correct. Graph databases store nodes and edges and traverse them efficiently."] },
{ id: 'm2q44', l: 'm2-11', t: 'mc',
  q: "Which statement about a data lake is correct?",
  c: ["It stores only cleaned, structured data in a fixed schema defined before loading.",
      "It stores raw data of any type, and a schema is applied when the data is read (schema-on-read).",
      "It is the same as a data mart.",
      "It cannot store images or logs."], a: 1,
  ex: ["That is a data warehouse (schema-on-write).", "Correct.",
       "A data mart is a subject-specific subset of a DW.", "Data lakes store unstructured data such as images and logs."] },
{ id: 'm2q45', l: 'm2-11', t: 'mc',
  q: "Using **min-max normalization**, what is the scaled value of 70 when the feature's minimum is 50 and maximum is 100?",
  c: ["0.2", "0.4", "0.7", "2.0"], a: 1,
  ex: ["Check the formula (x − min)/(max − min).", "Correct. (70 − 50)/(100 − 50) = 20/50 = 0.4.",
       "70/100 ignores the minimum.", "2.0 looks like a z-score, a different method."] },
{ id: 'm2q46', l: 'm2-11', t: 'mc',
  q: "In a RAG chatbot, which component stores document embeddings and quickly finds the passages most similar to the user's question?",
  c: ["Vector database", "OLAP cube", "Bitmap index", "Data mart"], a: 0,
  ex: ["Correct. Vector databases run approximate nearest-neighbor search by cosine similarity or distance.",
       "OLAP cubes aggregate numeric measures.", "Bitmap indexes suit low-cardinality columns.", "Data marts are subject-area subsets of a DW."] },

/* Short answer */
{ id: 'm2s01', l: 'm2-6', t: 'sa',
  q: "Which SQL clause filters **groups** after GROUP BY (and may use aggregate functions)?",
  blanks: [ { label: 'Clause', a: ['having'] } ],
  ex: "HAVING. WHERE filters individual rows before grouping and cannot use aggregates." },
{ id: 'm2s02', l: 'm2-1', t: 'sa',
  q: "Ⓐ is the independence between the external and conceptual levels; Ⓑ is the independence between the conceptual and internal levels. Write their names.",
  blanks: [ { label: 'Ⓐ', a: ['logical data independence', 'logical independence', 'logical'] }, { label: 'Ⓑ', a: ['physical data independence', 'physical independence', 'physical'] } ],
  ex: "Ⓐ Logical data independence, Ⓑ Physical data independence." },
{ id: 'm2s03', l: 'm2-5', t: 'sa',
  q: "Table A has 3 columns and 4 rows; table B has 2 columns and 5 rows. What are the degree and cardinality of A × B (Cartesian product)?",
  blanks: [ { label: 'Degree', a: ['5'] }, { label: 'Cardinality', a: ['20'] } ],
  ex: "Degree adds (3 + 2 = 5); cardinality multiplies (4 × 5 = 20)." },
{ id: 'm2s04', l: 'm2-3', t: 'sa',
  q: "Which normal form requires that **every determinant is a candidate key**?",
  blanks: [ { label: 'Normal form', a: ['bcnf', 'boyce-codd normal form', 'boyce codd normal form', 'boyce-codd'] } ],
  ex: "BCNF (Boyce-Codd Normal Form), a stricter version of 3NF." },
{ id: 'm2s05', l: 'm2-8', t: 'sa',
  q: "Which ACID property is mainly guaranteed by **concurrency control** (locking, MVCC)?",
  blanks: [ { label: 'Property', a: ['isolation'] } ],
  ex: "Isolation. Atomicity and durability are guaranteed by recovery (logs); consistency by constraints plus the others." },
{ id: 'm2s06', l: 'm2-10', t: 'sa',
  q: "Which OLAP operation fixes **one** dimension to a single value (for example, year = 2026) to produce a sub-cube?",
  blanks: [ { label: 'Operation', a: ['slice', 'slicing'] } ],
  ex: "Slice. Dice selects ranges on two or more dimensions." },
{ id: 'm2s07', l: 'm2-9', t: 'sa',
  q: "Which protocol ensures that a transaction updating databases at several sites either commits at all sites or aborts at all sites, using a prepare (vote) phase and a decision phase?",
  blanks: [ { label: 'Protocol', a: ['two-phase commit', '2pc', 'two phase commit', '2-phase commit'] } ],
  ex: "Two-Phase Commit (2PC). Do not confuse it with Two-Phase Locking (2PL), which is for concurrency control." },
{ id: 'm2s08', l: 'm2-6', t: 'sa',
  q: "EMP salaries are 50000, 40000, 30000, NULL and 25000. What does {{SELECT COUNT(*) FROM emp WHERE salary > (SELECT AVG(salary) FROM emp);}} return?",
  blanks: [ { label: 'Result', a: ['2'] } ],
  ex: "AVG ignores NULL: 145000 / 4 = 36250. Salaries above it: 50000 and 40000, so 2. The NULL row is never > anything." }
);

TC.drills.push(
{ id: 'm2d01', m: 'm2', l: 'm2-2', kind: 'Performance', pts: 50,
  title: 'Clinic appointments: ERD to relational tables',
  scenario: String.raw`A clinic needs a database:
- Each **patient** has a patient number, name, birth date and one or more phone numbers.
- Each **doctor** has an ID, name and one specialty.
- A patient books **appointments** with a doctor for a date and time. A patient can have many appointments; a doctor has many appointments.
- An appointment may produce **at most one prescription**. A prescription lists one or more **medicines** (code, name), each with a dosage. A medicine can appear in many prescriptions.`,
  parts: [
    { q: 'List the entities and relationships with their cardinality and optionality.', pts: 20,
      model: String.raw`- **PATIENT** 1 : N **APPOINTMENT** (a patient may have zero or more appointments; each appointment has exactly one patient).
- **DOCTOR** 1 : N **APPOINTMENT** (same pattern).
- **APPOINTMENT** 1 : 0..1 **PRESCRIPTION** (optional on the prescription side).
- **PRESCRIPTION** M : N **MEDICINE**, resolved by the associative entity **PRESCRIPTION_ITEM** (holds dosage).
- Multi-valued phone → separate entity **PATIENT_PHONE** (1:N from PATIENT).`,
      rubric: ['Patient–Appointment 1:N and Doctor–Appointment 1:N', 'Appointment–Prescription 1:0..1', 'Prescription–Medicine M:N resolved with an associative entity', 'Dosage placed on the associative entity', 'Multi-valued phone handled with a separate entity/table'] },
    { q: 'Write the relational schema: every table with its columns, primary key and foreign keys.', pts: 30,
      model: String.raw`~~~text
PATIENT(patient_no PK, name, birth_date)
PATIENT_PHONE(patient_no PK/FK→PATIENT, phone_no PK)
DOCTOR(doctor_id PK, name, specialty)
APPOINTMENT(appt_id PK, patient_no FK→PATIENT, doctor_id FK→DOCTOR, appt_datetime)
PRESCRIPTION(rx_id PK, appt_id FK→APPOINTMENT UNIQUE, issued_date)
MEDICINE(med_code PK, med_name)
PRESCRIPTION_ITEM(rx_id PK/FK→PRESCRIPTION, med_code PK/FK→MEDICINE, dosage)
~~~
Notes: UNIQUE on PRESCRIPTION.appt_id enforces "at most one prescription per appointment". APPOINTMENT could instead use (doctor_id, appt_datetime) as a unique candidate key so a doctor is not double-booked.`,
      rubric: ['PATIENT, DOCTOR, MEDICINE with correct PKs', 'APPOINTMENT with FKs to PATIENT and DOCTOR', 'PRESCRIPTION with FK to APPOINTMENT (UNIQUE for 1:0..1)', 'PRESCRIPTION_ITEM with composite PK (rx_id, med_code) and dosage', 'PATIENT_PHONE table for multiple phones', 'Every FK named with the table it references'] }
  ] },
{ id: 'm2d02', m: 'm2', l: 'm2-3', kind: 'Performance', pts: 40,
  title: 'Normalize an order sheet to 3NF',
  scenario: String.raw`ORDER_SHEET(order_no, order_date, cust_id, cust_name, cust_city, prod_id, prod_name, unit_price, qty)

One order has many products. Functional dependencies:
- order_no → order_date, cust_id
- cust_id → cust_name, cust_city
- prod_id → prod_name, unit_price
- (order_no, prod_id) → qty`,
  parts: [
    { q: 'What is the primary key, and which anomalies does this table suffer? Give one concrete example of each.', pts: 10,
      model: String.raw`PK = **(order_no, prod_id)**.
- **Insertion**: a new product cannot be stored until someone orders it.
- **Deletion**: deleting the only order line for a product loses the product's name and price.
- **Update**: changing a customer's city must be repeated on every order line of that customer; missing one leaves inconsistent data.`,
      rubric: ['Composite PK (order_no, prod_id)', 'Insertion anomaly example', 'Deletion anomaly example', 'Update anomaly example'] },
    { q: 'Normalize to 2NF and then 3NF. Show the resulting tables with keys, and name the dependency removed at each step.', pts: 30,
      model: String.raw`**2NF** (remove partial dependencies on part of the key):
- ORDERS(**order_no**, order_date, cust_id, cust_name, cust_city)
- PRODUCT(**prod_id**, prod_name, unit_price)
- ORDER_LINE(**order_no, prod_id**, qty)

**3NF** (remove the transitive dependency order_no → cust_id → cust_name, cust_city):
- ORDERS(**order_no**, order_date, cust_id FK)
- CUSTOMER(**cust_id**, cust_name, cust_city)
- PRODUCT(**prod_id**, prod_name, unit_price)
- ORDER_LINE(**order_no** FK, **prod_id** FK, qty)

Note: if the price at order time must be kept, store sale_price in ORDER_LINE as a historical fact (not a redundancy).`,
      rubric: ['2NF: separates PRODUCT and order header from ORDER_LINE', 'Names partial dependency as the reason', '3NF: separates CUSTOMER from ORDERS', 'Names transitive dependency as the reason', 'Final 4 tables with correct PKs/FKs'] }
  ] },
{ id: 'm2d03', m: 'm2', l: 'm2-6', kind: 'Performance', pts: 50,
  title: 'Library SQL: aggregates, outer joins, subqueries',
  scenario: String.raw`~~~text
MEMBER(member_id PK, name, member_type)          -- 'STUDENT', 'FACULTY'
BOOK(book_id PK, title, category, price)
LOAN(loan_id PK, member_id FK, book_id FK, loan_date, return_date)  -- return_date NULL = not returned
~~~`,
  parts: [
    { q: 'List each member (id, name) who borrowed **more than 3** books with loan_date in October 2026, with the number of loans, most loans first.', pts: 20,
      model: String.raw`~~~sql
SELECT m.member_id, m.name, COUNT(*) AS loan_cnt
FROM member m
JOIN loan l ON l.member_id = m.member_id
WHERE l.loan_date >= DATE '2026-10-01'
  AND l.loan_date <  DATE '2026-11-01'
GROUP BY m.member_id, m.name
HAVING COUNT(*) > 3
ORDER BY loan_cnt DESC;
~~~`,
      rubric: ['Joins MEMBER and LOAN on member_id', 'Date range for October in WHERE', 'GROUP BY member_id and name', 'HAVING COUNT(*) > 3', 'ORDER BY count DESC'] },
    { q: 'List the titles of books that have **never** been borrowed.', pts: 15,
      model: String.raw`~~~sql
SELECT b.title
FROM book b
WHERE NOT EXISTS (SELECT 1 FROM loan l WHERE l.book_id = b.book_id);

-- or
SELECT b.title
FROM book b LEFT JOIN loan l ON l.book_id = b.book_id
WHERE l.loan_id IS NULL;
~~~`,
      rubric: ['Uses NOT EXISTS or LEFT JOIN … IS NULL (or NOT IN with care)', 'Correlates on book_id', 'Returns title'] },
    { q: 'For each category, show the total value (sum of price) of books currently on loan (not yet returned). Include only categories with a total of at least 5,000.', pts: 15,
      model: String.raw`~~~sql
SELECT b.category, SUM(b.price) AS on_loan_value
FROM loan l JOIN book b ON b.book_id = l.book_id
WHERE l.return_date IS NULL
GROUP BY b.category
HAVING SUM(b.price) >= 5000;
~~~`,
      rubric: ['Filters return_date IS NULL (not "= NULL")', 'Joins LOAN to BOOK', 'GROUP BY category with SUM(price)', 'HAVING SUM(price) >= 5000'] }
  ] },
{ id: 'm2d04', m: 'm2', l: 'm2-5', kind: 'Performance', pts: 30,
  title: 'DDL with constraints and privileges',
  scenario: String.raw`Create tables for COURSE and SECTION and set access rights:
- COURSE: course_code (6 fixed characters, key), title (up to 100 characters, required), units (1 to 5).
- SECTION: section_id (integer key), course_code (must exist in COURSE; if a course is deleted, delete its sections), room (up to 10 characters), capacity (default 40).
- A role {{registrar}} may read and insert sections but not delete them. User {{maria}} gets the role.`,
  parts: [
    { q: 'Write the CREATE TABLE statements.', pts: 20,
      model: String.raw`~~~sql
CREATE TABLE course (
  course_code CHAR(6)       PRIMARY KEY,
  title       VARCHAR(100)  NOT NULL,
  units       INT           CHECK (units BETWEEN 1 AND 5)
);

CREATE TABLE section (
  section_id  INT           PRIMARY KEY,
  course_code CHAR(6)       NOT NULL,
  room        VARCHAR(10),
  capacity    INT           DEFAULT 40,
  CONSTRAINT fk_section_course FOREIGN KEY (course_code)
     REFERENCES course(course_code) ON DELETE CASCADE
);
~~~`,
      rubric: ['CHAR(6) PRIMARY KEY for course_code', 'NOT NULL on title', 'CHECK units 1–5', 'DEFAULT 40 on capacity', 'FOREIGN KEY … REFERENCES course ON DELETE CASCADE'] },
    { q: 'Write the statements to create the role, grant it, and give maria the role.', pts: 10,
      model: String.raw`~~~sql
CREATE ROLE registrar;
GRANT SELECT, INSERT ON section TO registrar;
GRANT registrar TO maria;
~~~
(To take it back: {{REVOKE INSERT ON section FROM registrar;}})`,
      rubric: ['CREATE ROLE', 'GRANT SELECT, INSERT ON section TO role (no DELETE)', 'GRANT role TO maria'] }
  ] },
{ id: 'm2d05', m: 'm2', l: 'm2-9', kind: 'Performance', pts: 60,
  title: 'Fix a customer database backup policy',
  scenario: String.raw`**Current state of Company K's customer DB**
- Every Sunday 02:00–05:00 the DB is shut down and a full backup is copied to another folder **on the same disk array**.
- Archive logging is **off**. No other backups are taken.
- Restores have never been tested.

**Interview with the person in charge**
- "Online orders run 24 hours a day, 7 days a week. The 3-hour Sunday outage now costs real sales."
- "Last month an operator deleted 2,000 rows by mistake on Thursday. We lost everything since Sunday."
- "Management wants at most 5 minutes of data loss and service back within 1 hour."
- "Data changes about 3% per day; the DB is 2 TB."`,
  parts: [
    { q: 'Analyze the problems of the current backup policy.', pts: 30,
      model: String.raw`1. **Cold (offline) backup** causes a 3-hour outage every week, which conflicts with 24×7 service.
2. **Only weekly full backups**: a failure on Saturday loses almost a week of data (RPO up to 7 days vs the 5-minute target).
3. **Archive logging disabled**: committed transactions after the backup cannot be replayed, so no point-in-time recovery (e.g., to just before the wrong DELETE).
4. **Backup on the same disk array**: a disk/array failure, ransomware or site disaster destroys both the DB and its backup (no separation, no off-site copy).
5. **No restore testing**: no evidence that backups are usable or that the 1-hour RTO can be met.
6. Restoring a full 2 TB backup plus nothing else cannot meet RTO 1 hour / RPO 5 minutes.`,
      rubric: ['Cold backup → downtime conflicts with 24×7', 'Weekly-only backup → large data loss (RPO)', 'No archive logs → no point-in-time recovery', 'Backup on the same storage → single point of failure / no off-site copy', 'No restore tests → RTO unknown'] },
    { q: 'Propose a new backup and recovery operation in terms of full, differential (or incremental) backups and archive logs, and explain how it meets the targets.', pts: 30,
      model: String.raw`- **Turn on archive log mode** and use **hot (online) backups**, so backups run without stopping the service.
- **Full backup weekly** (e.g., Sunday at the quietest hour), **differential backup daily** (changes since the last full: about 3%×days, so restore needs only full + latest differential). Incremental is also acceptable but needs every incremental in sequence.
- **Archive log backup every 5 minutes** (or continuous log shipping) to separate storage → RPO ≤ 5 minutes.
- **Point-in-time recovery**: restore full + latest differential, then apply archive logs up to just before an error such as the accidental DELETE.
- Store backups on **separate storage and off-site / cloud** (3-2-1 rule: 3 copies, 2 media, 1 off-site), encrypted.
- To meet **RTO 1 hour** for a 2 TB DB, add a **standby database** (log shipping / replication, e.g., Data Guard) that can be activated in minutes; backups remain for logical errors and disasters.
- **Test restores** regularly and document the procedure; monitor backup jobs.`,
      rubric: ['Archive log mode on + hot backups (no downtime)', 'Weekly full + daily differential (or incremental) with restore order explained', 'Frequent archive log backups → RPO ≤ 5 min / point-in-time recovery', 'Off-site / separate storage copy', 'Standby/replication or other means to meet RTO 1 hour', 'Regular restore testing'] }
  ] },
{ id: 'm2d06', m: 'm2', l: 'm2-8', kind: 'Descriptive', pts: 30,
  title: 'Two customers booked the same seat',
  scenario: String.raw`A bus ticketing system runs this logic for each booking:
~~~text
1. SELECT status FROM seat WHERE seat_no = 12 AND trip_id = 77;   -- 'FREE'
2. (customer fills in details for 30 seconds)
3. UPDATE seat SET status = 'BOOKED', customer_id = :cid WHERE seat_no = 12 AND trip_id = 77;
4. COMMIT;
~~~
Customers A and B both read 'FREE' at the same time and both received a ticket for seat 12.`,
  parts: [
    { q: 'Name the concurrency problem and explain step by step how it happened.', pts: 15,
      model: String.raw`**Lost update.**
1. A reads seat 12 = FREE. 2. B reads seat 12 = FREE (no lock stops it).
3. A updates the seat to BOOKED for A and commits.
4. B updates the same row to BOOKED for B and commits, **overwriting A's update**.
Both transactions acted on a value that was stale by the time they wrote, so A's booking was lost (but A still received a ticket).`,
      rubric: ['Names lost update', 'Both read FREE before either writes', 'Second write overwrites the first', 'Explains why: no lock between read and write'] },
    { q: 'Propose two different solutions and compare them.', pts: 15,
      model: String.raw`1. **Pessimistic locking**: read with {{SELECT … FOR UPDATE}} (exclusive row lock) at step 1, so B waits until A commits and then sees BOOKED. Simple and safe, but holding a lock while a user types 30 s hurts concurrency; set a lock timeout.
2. **Conditional (atomic) update / optimistic control**: {{UPDATE seat SET status='BOOKED', customer_id=:cid WHERE seat_no=12 AND trip_id=77 AND status='FREE'}} and check the affected row count; 0 rows → tell the customer the seat is taken. Or add a **version** column and update only if the version is unchanged. No long locks; best when conflicts are rare.
(Also acceptable: SERIALIZABLE isolation, or a short "hold" status with expiry.)`,
      rubric: ['Pessimistic: SELECT … FOR UPDATE / exclusive lock', 'Optimistic: version column or conditional UPDATE with row-count check', 'Compares concurrency vs safety trade-off', 'Mentions handling the user waiting time (timeout or hold)'] }
  ] },
{ id: 'm2d07', m: 'm2', l: 'm2-10', kind: 'Performance', pts: 40,
  title: 'Star schema for a convenience store chain',
  scenario: String.raw`A chain of 300 stores wants to analyze sales: amount and quantity by product, product category, store, region, day, month and year, and by payment method.`,
  parts: [
    { q: 'Design a star schema: the fact table (grain, measures, keys) and the dimension tables with key attributes.', pts: 25,
      model: String.raw`**Grain**: one row per product per receipt line (or per product per store per day for a summary).
~~~text
FACT_SALES(date_key FK, store_key FK, product_key FK, payment_key FK,
           quantity, sales_amount, discount_amount)
DIM_DATE(date_key PK, full_date, day, month, quarter, year, weekday, holiday_flag)
DIM_STORE(store_key PK, store_code, store_name, city, region)
DIM_PRODUCT(product_key PK, sku, product_name, brand, category, department)
DIM_PAYMENT(payment_key PK, method)      -- cash, card, e-wallet
~~~
Dimensions are denormalized (category and department inside DIM_PRODUCT; region inside DIM_STORE). Surrogate keys allow slowly changing dimensions.`,
      rubric: ['States the grain', 'Fact table with numeric measures and FKs to each dimension', 'Date dimension with day/month/year hierarchy', 'Store dimension with region; product dimension with category', 'Payment dimension (or degenerate attribute)'] },
    { q: 'Explain how the design would change as a snowflake schema, and write an SQL query that rolls sales up to region and year.', pts: 15,
      model: String.raw`**Snowflake**: normalize hierarchies into separate tables, e.g. DIM_PRODUCT → DIM_CATEGORY → DIM_DEPARTMENT and DIM_STORE → DIM_REGION. Less redundancy and easier maintenance, but more joins and slower queries.
~~~sql
SELECT s.region, d.year, SUM(f.sales_amount) AS total_sales
FROM fact_sales f
JOIN dim_store s ON s.store_key = f.store_key
JOIN dim_date  d ON d.date_key  = f.date_key
GROUP BY s.region, d.year
ORDER BY s.region, d.year;
~~~`,
      rubric: ['Snowflake = normalized dimensions into sub-dimension tables', 'Trade-off: less redundancy vs more joins', 'Query joins fact to store and date dimensions', 'GROUP BY region, year with SUM'] }
  ] },
{ id: 'm2d08', m: 'm2', l: 'm2-10', kind: 'Performance', pts: 30,
  title: 'Market basket analysis by hand',
  scenario: String.raw`Ten receipts from a mini-mart:
| ID | Items |
|---|---|
| T1 | diapers, beer, chips |
| T2 | diapers, beer |
| T3 | diapers, milk |
| T4 | beer, chips |
| T5 | diapers, beer, milk |
| T6 | milk, chips |
| T7 | diapers, beer, chips |
| T8 | milk |
| T9 | chips |
| T10 | diapers, milk |`,
  parts: [
    { q: 'Compute support, confidence and lift for {diapers} → {beer} and for {diapers} → {milk}. Show the formulas.', pts: 20,
      model: String.raw`Counts: diapers 6, beer 5, milk 5, diapers∧beer 4, diapers∧milk 3. N = 10.

| Rule | Support = P(A∧B) | Confidence = P(A∧B)/P(A) | Lift = Conf / P(B) |
|---|---|---|---|
| diapers → beer | 4/10 = 0.40 | 4/6 ≈ 0.67 | 0.67 / 0.5 ≈ 1.33 |
| diapers → milk | 3/10 = 0.30 | 3/6 = 0.50 | 0.50 / 0.5 = 1.00 |`,
      rubric: ['Correct item counts', 'Support formula and values (0.40, 0.30)', 'Confidence values (0.67, 0.50)', 'Lift values (1.33, 1.00)'] },
    { q: 'Interpret the two lift values and recommend one business action.', pts: 10,
      model: String.raw`- **Lift 1.33 > 1**: buying diapers makes beer 33% more likely than average, a positive association worth acting on.
- **Lift 1.0**: diapers and milk are **independent**; the confidence of 0.5 is just milk's base rate, so a cross-promotion would not add sales.
- Action: place beer near diapers or bundle them (e.g., weekend promo), and measure the result.`,
      rubric: ['Lift > 1 = positive association', 'Lift = 1 = independence (confidence alone can mislead)', 'Concrete action based on the 1.33 rule'] }
  ] }
);

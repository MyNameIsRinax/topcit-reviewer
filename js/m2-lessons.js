/* M2 Data Management: lessons (syllabus V4.0E, area 2) */
TC.lessons.push(
{
  id: 'm2-1', m: 'm2', syl: '2.1', title: 'Data, databases and the three-schema architecture',
  summary: 'DIKW, file systems vs databases, DBMS functions, ANSI/SPARC levels, data independence and database types.',
  body: String.raw`
### Data, information, knowledge
- **Data**: raw facts and figures with no context (35, "Cebu").
- **Information**: data processed and organized so it has meaning ("35 orders from Cebu this week").
- **Knowledge**: understanding gained from information that guides action ("Cebu orders rise before fiestas, so stock up").
- **Wisdom** (DIKW pyramid top): applying knowledge to make good judgments.

Data processing types:
- **Batch processing**: collects data and processes it all at once later (payroll, month-end billing).
- **Online / real-time processing**: processes each transaction immediately (ATM, ticket booking).
- **Distributed processing**: processing spread across networked computers.

### File systems vs databases
File-processing problems: **data redundancy**, **inconsistency**, **data dependency** (programs tied to file formats), poor sharing, weak security and integrity, no concurrency control.

A **database** is an integrated, stored, operational and shared collection of data. Its characteristics: real-time accessibility, continuous evolution (insert/update/delete), concurrent sharing, and reference by content (not by address).

### Database system components
- **DBMS (Database Management System)**: software that defines, manipulates and controls the database between users/applications and the data.
- **DBMS functions**: **definition** (DDL: structure, types, constraints), **manipulation** (DML: retrieve, insert, update, delete), **control** (DCL: integrity, security, concurrency, recovery).
- **DBA (Database Administrator)**: designs schemas, manages security, backup/recovery, performance tuning.
- **Data dictionary / system catalog**: metadata about all database objects, maintained by the DBMS itself; users can query it but not change it directly.

DBMS advantages: less redundancy, consistency, sharing, security, integrity, standards, data independence. Disadvantages: cost, complexity, single point of failure, backup/recovery overhead.

### ANSI/SPARC three-level architecture
| Level | Schema | Viewpoint |
|---|---|---|
| External | External schema (subschema, view) | Each user or application's view |
| Conceptual | Conceptual schema | The whole organization's logical structure: entities, relationships, constraints (one per database) |
| Internal | Internal schema | Physical storage: records, indexes, access paths |

- **Logical data independence**: changing the conceptual schema does not affect external schemas/applications (mapping external ↔ conceptual).
- **Physical data independence**: changing the internal (storage) schema does not affect the conceptual schema (mapping conceptual ↔ internal).

!> Logical independence sits between the external and conceptual levels; physical independence between the conceptual and internal levels.

### Relational terms
| Formal | Common |
|---|---|
| Relation | Table |
| Tuple | Row / record |
| Attribute | Column / field |
| Domain | Set of allowed values for an attribute |
| Degree | Number of attributes (columns) |
| Cardinality | Number of tuples (rows) |

Relation properties: tuples are unordered and unique; attributes are unordered; values are atomic.

### Database types
| Model | Structure | Notes |
|---|---|---|
| Hierarchical | Tree (parent–child, 1:N) | Fast for fixed paths; hard to restructure (IMS) |
| Network | Graph (owner–member sets, M:N) | Complex links (CODASYL/IDMS) |
| Relational | Tables, SQL | Simple, standardized, most common (Oracle, MySQL, PostgreSQL, SQL Server) |
| Object-oriented | Objects with methods | Complex data (CAD, multimedia) |
| Object-relational | Relational + user-defined types, inheritance | PostgreSQL, Oracle |
| NoSQL | Key-value, document, column-family, graph | Scale-out, flexible schema |
| In-memory | Data in RAM | Very fast (SAP HANA, Redis) |
| Time-series / vector | Specialized | Sensor data; AI embeddings |
`},
{
  id: 'm2-2', m: 'm2', syl: '2.2.1–2.2.2', title: 'Data modeling and ERD',
  summary: 'Design process, entities, attributes, identifiers, relationships, notations, supertype/subtype and integrity.',
  body: String.raw`
### Database design process
Requirements analysis → **Conceptual design** (ERD, DBMS-independent) → **Logical design** (map to relations, normalize; DBMS-model dependent) → **Physical design** (tables, data types, indexes, partitioning, storage; DBMS-product dependent) → Implementation.

Design considerations: integrity, consistency, recovery, security, efficiency, scalability.

### Building blocks
- **Entity**: a thing the business needs to keep data about (Customer, Order). Each entity has instances (rows) and attributes.
- **Kinds of entity**: **key/basic** entity exists independently (Customer, Product); **main** entity comes from basic ones (Order); **action/transaction** entity records events (Order Line, Payment History).
- **Attribute**: a property of an entity. Kinds: simple vs **composite** (address = street + city), single-valued vs **multi-valued** (phone numbers), **derived** (age from birthdate, total from lines), stored.
- **Identifier**: attribute(s) that uniquely identify each instance.
- **Relationship**: a meaningful association between entities, described by degree, cardinality and optionality.
- **Cardinality**: how many instances relate: 1:1, 1:N, M:N.
- **Optionality (participation)**: whether participation is mandatory (total) or optional (partial).
- **Identifying relationship**: the child's PK includes the parent's PK (solid line in IE notation); the child is a weak entity.
- **Non-identifying relationship**: the parent's PK is only a regular FK in the child (dashed line).

### Keys
- **Super key**: any set of attributes that uniquely identifies tuples (uniqueness only).
- **Candidate key**: a minimal super key (**uniqueness + minimality**).
- **Primary key (PK)**: the candidate key chosen as the main identifier; unique and NOT NULL.
- **Alternate key**: a candidate key not chosen as PK.
- **Foreign key (FK)**: attribute that references another table's PK.
- **Composite key**: a key made of two or more attributes.
- **Surrogate (artificial) key**: a system-generated identifier (sequence, UUID) with no business meaning; used when the natural key is long, composite or unstable.
- **Natural key**: an identifier that exists in the business (ISBN, TIN).

### Notations
- **Chen notation**: entity = rectangle, relationship = diamond, attribute = oval (key underlined), multi-valued = double oval, derived = dashed oval, weak entity = double rectangle.
- **IE / Crow's foot notation**: lines with symbols at the ends: | = one, ○ = zero (optional), crow's foot = many.
- **Barker notation**: dashed line half = optional, solid = mandatory, crow's foot = many.

### Resolving M:N
A relational table cannot hold M:N directly. Create an **associative (intersection) entity**: Student M:N Course → Student 1:N Enrollment N:1 Course. Enrollment's PK = (student_id, course_id) or a surrogate key, and it can carry attributes like grade and enroll_date.

### Extended ER: supertype and subtype
- **Generalization / specialization**: common attributes in a supertype (Student), specific ones in subtypes (Undergraduate, Graduate).
- **Disjoint (exclusive)**: an instance belongs to only one subtype. **Overlapping (inclusive)**: it can belong to several.
- **Total (complete)**: every supertype instance is in some subtype. **Partial**: some may belong to none.

Converting supertype/subtype to tables:
| Option | Tables | Pros | Cons |
|---|---|---|---|
| One table (roll-up) | Student with all columns + a type column | Simple, no joins | Many NULLs |
| Subtype tables only (roll-down) | Undergraduate, Graduate, each with all common columns | No joins per subtype | Common columns duplicated; union for all students |
| One table per type | Student + Undergraduate + Graduate; subtypes share the supertype's PK as PK and FK | No redundancy, clean | Joins needed |

!> In the "one table per type" option, the Undergraduate table has the supertype's key (student_id as PK + FK) plus only the undergraduate-specific attributes.

### Integrity constraints
- **Entity integrity**: PK values must be unique and never NULL.
- **Referential integrity**: an FK value must match an existing PK value in the referenced table, or be NULL.
- **Domain integrity**: values must come from the attribute's domain (type, range, format, CHECK).
- **Key (uniqueness) integrity**: no two tuples have the same key value.
- **User-defined (business) integrity**: business rules (salary > 0).

Referential actions on delete/update of a parent: RESTRICT/NO ACTION (refuse), CASCADE (delete/update children too), SET NULL, SET DEFAULT.
`},
{
  id: 'm2-3', m: 'm2', syl: '2.2.3', title: 'Functional dependency, normalization and denormalization',
  summary: 'Anomalies, FDs and Armstrong axioms, 1NF through 5NF with a worked example, and when to denormalize.',
  body: String.raw`
### Anomalies (why normalize)
- **Insertion anomaly**: cannot insert data without unrelated data (cannot add a new course until a student enrolls).
- **Deletion anomaly**: deleting a row loses other facts (deleting the last enrollment deletes the course's instructor info).
- **Update anomaly**: the same fact stored in many rows must be updated everywhere, or data becomes inconsistent.

### Functional dependency
- **Functional dependency (X → Y)**: each X value determines exactly one Y value (student_id → name). X is the determinant.
- **Full functional dependency**: Y depends on the whole composite key, not part of it.
- **Partial dependency**: a non-key attribute depends on only part of a composite key.
- **Transitive dependency**: X → Y and Y → Z, so Z depends on X through Y (emp_id → dept_id → dept_name).

Armstrong's axioms: **reflexivity** (if Y ⊆ X then X → Y), **augmentation** (X → Y ⇒ XZ → YZ), **transitivity** (X → Y, Y → Z ⇒ X → Z). Derived rules: **union** (X → Y, X → Z ⇒ X → YZ), **decomposition** (X → YZ ⇒ X → Y), **pseudotransitivity** (X → Y, WY → Z ⇒ WX → Z).

### Normal forms
| NF | Rule | Removes |
|---|---|---|
| 1NF | All values atomic; no repeating groups | Multi-valued / repeating attributes |
| 2NF | 1NF + no partial dependency on a composite key | Partial dependencies |
| 3NF | 2NF + no transitive dependency | Transitive dependencies |
| BCNF | Every determinant is a candidate key | Remaining anomalies from non-key determinants |
| 4NF | BCNF + no multi-valued dependency | Independent multi-valued facts |
| 5NF | 4NF + no join dependency | Join dependencies |

Memory aid for the order of what you remove: **atomic → partial → transitive → determinant → multi-valued → join**.

### Worked example
ENROLL(student_id, course_id, student_name, dept_id, dept_name, course_title, grade)
FDs: student_id → student_name, dept_id; dept_id → dept_name; course_id → course_title; (student_id, course_id) → grade.

- Key: (student_id, course_id). It is in 1NF.
- **2NF**: student_name, dept_id, dept_name depend only on student_id; course_title only on course_id (partial). Split:
  - STUDENT(**student_id**, student_name, dept_id, dept_name)
  - COURSE(**course_id**, course_title)
  - ENROLL(**student_id, course_id**, grade)
- **3NF**: in STUDENT, student_id → dept_id → dept_name (transitive). Split:
  - STUDENT(**student_id**, student_name, dept_id)
  - DEPT(**dept_id**, dept_name)

Result: STUDENT, DEPT, COURSE, ENROLL, all in 3NF (and BCNF).

### BCNF example
CLASS(student, subject, professor) with professor → subject (each professor teaches one subject) and key (student, subject). Professor is a determinant but not a candidate key, so not BCNF. Decompose into (student, professor) and (professor, subject).

### Denormalization
- **Denormalization (reverse normalization)**: intentionally adding redundancy to a normalized design to improve read performance, at the cost of integrity effort and slower writes.
Techniques: merge tables (1:1 or 1:N often joined), split tables (**horizontal partitioning** by rows such as year, **vertical** by columns such as rarely used large columns), add redundant columns (copy dept_name into EMP), add **derived columns** (order_total), create **summary/history tables**.
When: frequent heavy joins, large aggregations, reports with slow response, and data that rarely changes. Check first whether indexes, views, clustering or partitioning solve the problem.

### Performance-oriented design
Consider access paths and frequency, partitioning large tables, index design, choice of data types, primary key order, and separating hot/cold data.
`},
{
  id: 'm2-4', m: 'm2', syl: '2.2.4–2.2.5', title: 'Physical design: tables, indexes, views, distribution, data quality',
  summary: 'Mapping rules, data types, index types and when to index, views, distributed DB transparency, data quality and standards.',
  body: String.raw`
### Logical → physical mapping
| Logical | Physical |
|---|---|
| Entity | Table |
| Attribute | Column |
| Identifier (UID) | Primary key |
| Relationship | Foreign key |
| Subtype | Table(s) per chosen conversion |

1:N → put the PK of the "1" side as an FK in the "N" side. 1:1 → FK on either side (usually the optional side) with UNIQUE. M:N → a new associative table.

### Data types
- {{CHAR(n)}}: fixed length, padded with spaces (codes like country 'PH').
- {{VARCHAR(n)}} / {{VARCHAR2}}: variable length (names, emails).
- {{NUMBER(p,s)}} / {{DECIMAL(p,s)}}: exact numerics; use for money. {{FLOAT}} is approximate.
- {{DATE}}, {{TIMESTAMP}}; {{CLOB}}/{{BLOB}} for large text/binary.

### Indexes
- **Index**: a separate structure (usually a B+ tree) that speeds up searching on columns, like a book's index.
- **B-tree / B+ tree index**: balanced tree; good for equality and range searches; the default in most DBMSs.
- **Bitmap index**: a bit array per distinct value; good for **low-cardinality** columns (gender, status) in read-heavy DW; bad for frequent updates.
- **Hash index**: fast exact-match lookups, no range searches.
- **Clustered index**: table rows are physically stored in the index order; only one per table.
- **Non-clustered (secondary) index**: separate structure with pointers to rows; many allowed.
- **Composite index**: on several columns; column order matters (leading column must be used in the condition).
- **Function-based index**: on an expression such as UPPER(name).

Index when: columns used often in WHERE, JOIN, ORDER BY; high selectivity (few rows match); large tables. Avoid when: small tables, columns updated very often, low selectivity with B-tree, or queries that apply functions/LIKE '%x' to the column (the index cannot be used).

!> Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE and use storage.

### Views
- **View**: a virtual table defined by a stored SELECT; it stores no data itself (except a materialized view).
- Advantages: simplifies complex queries, **security** (show only some columns/rows), **logical data independence**.
- Limitations: cannot usually be indexed; updates through views are restricted (views with joins, GROUP BY, DISTINCT or aggregates are generally not updatable); dropping the base table invalidates the view.
- **Materialized view**: stores the query result physically and refreshes it; used for reports and DW.

~~~sql
CREATE VIEW v_dev_staff AS
SELECT emp_id, name, email FROM emp WHERE dept_id = 'DEV';
~~~

### Distributed databases
A logically single database spread over sites on a network. Goals are the **transparencies**:
- **Location transparency**: users need not know where data is stored.
- **Fragmentation transparency**: users need not know how a table is split.
- **Replication transparency**: users need not know copies exist.
- **Failure transparency**: transactions stay atomic despite site or network failures.
- **Concurrency transparency**: concurrent transactions behave as if run serially.
Fragmentation: **horizontal** (rows by condition, e.g., by region), **vertical** (columns, each fragment keeps the PK), mixed. Pros: local autonomy, availability, performance near users. Cons: complexity, cost, harder security and integrity.

### Data quality and standardization
- **Data quality**: fitness of data for its intended use. Dimensions: **accuracy**, **completeness**, **consistency**, **timeliness**, **validity** (follows format/rules), **uniqueness** (no duplicates).
- **Data standardization**: defining standard words, terms, domains and codes (naming rules, formats) so data is consistent across systems.
- **Metadata**: data about data (definitions, types, owners, lineage).
- **Master data**: core shared business entities (customer, product, supplier). **MDM** keeps one trusted version.
- **Data governance**: policies, roles (data owner, steward) and processes for managing data as an asset.
`},
{
  id: 'm2-5', m: 'm2', syl: '2.3.1–2.3.2', title: 'Relational algebra and SQL basics (DDL, DCL, DML)',
  summary: 'Relational operators, SQL statement categories, constraints, GRANT/REVOKE, transactions, and SQL execution order.',
  body: String.raw`
### Relational algebra (procedural: says how) vs relational calculus (non-procedural: says what)
| Operator | Symbol | Meaning |
|---|---|---|
| Select | σ | Rows that meet a condition (horizontal subset) |
| Project | π | Chosen columns, duplicates removed (vertical subset) |
| Join | ⋈ | Combine related tuples from two relations |
| Division | ÷ | Tuples related to **all** tuples of another relation |
| Union | ∪ | Tuples in either (union-compatible relations) |
| Difference | − | Tuples in the first but not the second |
| Intersection | ∩ | Tuples in both |
| Cartesian product | × | Every combination; degree = sum, cardinality = product |
| Rename | ρ | Rename a relation or attribute |

Example: π name (σ dept = 'DEV' (EMP)) ⇔ {{SELECT name FROM emp WHERE dept = 'DEV'}}.

!> SQL's SELECT clause corresponds to **projection** (π), and SQL's WHERE clause to **selection** (σ). Don't mix them up.

### SQL categories
| Category | Statements |
|---|---|
| DDL (definition) | CREATE, ALTER, DROP, TRUNCATE, RENAME |
| DML (manipulation) | SELECT, INSERT, UPDATE, DELETE (MERGE) |
| DCL (control) | GRANT, REVOKE |
| TCL (transaction control) | COMMIT, ROLLBACK, SAVEPOINT |

### DDL with constraints
~~~sql
CREATE TABLE dept (
  dept_id   CHAR(3)      PRIMARY KEY,
  dept_name VARCHAR(50)  NOT NULL UNIQUE
);
CREATE TABLE emp (
  emp_id    INT          PRIMARY KEY,
  name      VARCHAR(50)  NOT NULL,
  salary    DECIMAL(10,2) CHECK (salary > 0),
  hired     DATE         DEFAULT CURRENT_DATE,
  dept_id   CHAR(3),
  CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id)
      REFERENCES dept(dept_id) ON DELETE SET NULL
);
ALTER TABLE emp ADD email VARCHAR(100);
ALTER TABLE emp MODIFY name VARCHAR(80);      -- Oracle/MySQL syntax
ALTER TABLE emp DROP COLUMN email;
DROP TABLE emp;                               -- removes structure + data
~~~

| | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Type | DML | DDL | DDL |
| Removes | Selected rows (WHERE) | All rows | Table structure and data |
| Rollback | Yes (before COMMIT) | No (auto-commit in most DBMSs) | No |
| Speed | Slow (logs each row) | Fast | Fast |

### DCL
~~~sql
GRANT SELECT, INSERT ON emp TO kim;
GRANT SELECT ON emp TO lee WITH GRANT OPTION;   -- lee may grant it to others
REVOKE INSERT ON emp FROM kim;
REVOKE SELECT ON emp FROM lee CASCADE;          -- also from users lee granted to
CREATE ROLE hr_clerk; GRANT SELECT ON emp TO hr_clerk; GRANT hr_clerk TO kim;
~~~

### DML
~~~sql
INSERT INTO emp (emp_id, name, salary, dept_id) VALUES (101, 'Ana', 35000, 'DEV');
UPDATE emp SET salary = salary * 1.10 WHERE dept_id = 'DEV';
DELETE FROM emp WHERE emp_id = 101;
SELECT name, salary FROM emp WHERE salary BETWEEN 30000 AND 50000
  AND name LIKE 'A%' AND dept_id IN ('DEV','QA') AND email IS NOT NULL
  ORDER BY salary DESC, name ASC;
~~~
- {{LIKE 'A%'}}: starts with A; {{'_a%'}}: second letter a. {{%}} = any string, {{_}} = one character.
- NULL needs {{IS NULL}} / {{IS NOT NULL}}; {{= NULL}} is never true.
- {{DISTINCT}} removes duplicate rows from the result.

### Writing order vs logical execution order
Written: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY
Executed: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**

!> That is why a column alias defined in SELECT cannot be used in WHERE, but can be used in ORDER BY.

### TCL
~~~sql
UPDATE account SET bal = bal - 500 WHERE id = 1;
SAVEPOINT s1;
UPDATE account SET bal = bal + 500 WHERE id = 2;
ROLLBACK TO s1;     -- undo only the second update
COMMIT;             -- make the first update permanent
~~~
`},
{
  id: 'm2-6', m: 'm2', syl: '2.3.2.4–2.3.2.6', title: 'SQL: aggregates, joins and subqueries',
  summary: 'GROUP BY/HAVING, NULL handling in aggregates, every join type, subqueries, set operators and window functions, with worked examples.',
  body: String.raw`
Sample tables used below:
~~~text
EMP(emp_id, name, dept_id, salary, mgr_id)       DEPT(dept_id, dept_name, location)
 1 Ana   D1 50000 NULL                             D1 Dev    Manila
 2 Ben   D1 40000 1                                D2 Sales  Cebu
 3 Carl  D2 30000 1                                D3 HR     Davao
 4 Dina  D2 NULL  3
 5 Eli   NULL 25000 1
~~~

### Aggregate functions
COUNT, SUM, AVG, MIN, MAX. They **ignore NULLs**, except {{COUNT(*)}} which counts rows.
- {{COUNT(*)}} = 5, {{COUNT(salary)}} = 4, {{COUNT(DISTINCT dept_id)}} = 2.
- {{AVG(salary)}} = (50000+40000+30000+25000) / 4 = 36250 (Dina's NULL is skipped, not counted as 0).

### GROUP BY and HAVING
~~~sql
SELECT dept_id, COUNT(*) AS cnt, AVG(salary) AS avg_sal
FROM emp
WHERE dept_id IS NOT NULL
GROUP BY dept_id
HAVING COUNT(*) >= 2
ORDER BY avg_sal DESC;
~~~
- **WHERE** filters rows **before** grouping; cannot use aggregates.
- **HAVING** filters groups **after** grouping; uses aggregates.
- Every non-aggregated column in SELECT must appear in GROUP BY.

### Joins
~~~sql
-- INNER JOIN: only matching rows (Eli has no dept, HR has no emp → both excluded)
SELECT e.name, d.dept_name FROM emp e JOIN dept d ON e.dept_id = d.dept_id;

-- LEFT OUTER JOIN: all employees, dept columns NULL when no match (Eli appears)
SELECT e.name, d.dept_name FROM emp e LEFT JOIN dept d ON e.dept_id = d.dept_id;

-- RIGHT OUTER JOIN: all departments (HR appears with NULL name)
-- FULL OUTER JOIN: both sides (Eli and HR both appear)

-- SELF JOIN: employee with manager name
SELECT e.name, m.name AS manager FROM emp e LEFT JOIN emp m ON e.mgr_id = m.emp_id;

-- Departments with no employees (anti-join)
SELECT d.dept_name FROM dept d LEFT JOIN emp e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;      -- HR
~~~
- **Equi-join**: join with =. **Non-equi join**: with <, BETWEEN (e.g., salary grade ranges).
- **Natural join**: joins automatically on same-named columns and shows that column once.
- **Cross join**: Cartesian product (5 × 3 = 15 rows).

### Subqueries
~~~sql
-- Single-row: earns more than the average
SELECT name FROM emp WHERE salary > (SELECT AVG(salary) FROM emp);

-- Multi-row: IN / ANY / ALL / EXISTS
SELECT name FROM emp WHERE dept_id IN (SELECT dept_id FROM dept WHERE location = 'Cebu');
SELECT name FROM emp WHERE salary > ALL (SELECT salary FROM emp WHERE dept_id = 'D2');  -- > max
SELECT name FROM emp WHERE salary > ANY (SELECT salary FROM emp WHERE dept_id = 'D2');  -- > min

-- Correlated: runs once per outer row; earns more than own dept's average
SELECT e.name FROM emp e
WHERE e.salary > (SELECT AVG(salary) FROM emp x WHERE x.dept_id = e.dept_id);

-- EXISTS: departments that have at least one employee
SELECT d.dept_name FROM dept d WHERE EXISTS (SELECT 1 FROM emp e WHERE e.dept_id = d.dept_id);

-- Inline view (subquery in FROM) and scalar subquery (in SELECT)
SELECT t.dept_id, t.total FROM (SELECT dept_id, SUM(salary) total FROM emp GROUP BY dept_id) t;
SELECT name, (SELECT dept_name FROM dept d WHERE d.dept_id = e.dept_id) AS dept FROM emp e;
~~~
!> {{NOT IN}} with a subquery that returns a NULL returns **no rows**. Prefer {{NOT EXISTS}}.

### Set operators
{{UNION}} (removes duplicates, sorts), {{UNION ALL}} (keeps duplicates, faster), {{INTERSECT}}, {{EXCEPT}}/{{MINUS}}. Both queries need the same number of columns with compatible types.

### Window (analytic) functions
~~~sql
SELECT name, salary,
       RANK()       OVER (ORDER BY salary DESC) AS rnk,    -- ties share a rank, then a gap: 1,2,2,4
       DENSE_RANK() OVER (ORDER BY salary DESC) AS drnk,   -- ties share a rank, no gap: 1,2,2,3
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn,     -- always unique: 1,2,3,4
       SUM(salary)  OVER (PARTITION BY dept_id) AS dept_total
FROM emp;
~~~

### Exam pattern: "rooms whose total in July exceeded X"
~~~sql
SELECT r.room_no, SUM(b.amount) AS total
FROM reservation b JOIN room r ON b.room_no = r.room_no
WHERE b.checkin_date >= DATE '2026-07-01' AND b.checkin_date < DATE '2026-08-01'
GROUP BY r.room_no
HAVING SUM(b.amount) > 3000000;
~~~
`},
{
  id: 'm2-7', m: 'm2', syl: '2.3.3', title: 'Dynamic SQL and query optimization',
  summary: 'Static vs dynamic SQL, embedded SQL and cursors, query processing stages, RBO vs CBO, and join methods.',
  body: String.raw`
### Static vs dynamic SQL
| | Static SQL | Dynamic SQL |
|---|---|---|
| SQL text | Fixed in the program source | Built as a string at run time |
| Parsed/bound | At compile/precompile time | At run time |
| Flexibility | Low | High (search screens with optional conditions) |
| Performance | Plan can be reused | Parsing at run time; plan reuse depends on bind variables |
| Risk | Low | **SQL injection** if user input is concatenated |

- **Dynamic SQL**: SQL statements whose text is constructed and executed at run time.
- **Bind variable (placeholder)**: a {{?}} or {{:name}} parameter whose value is supplied separately, so the plan can be reused and input cannot change the SQL's structure.
- **Embedded SQL**: SQL written inside a host language program (C, COBOL, Java via SQLJ) and processed by a precompiler.
- **Cursor**: a pointer to a result set, processed row by row: DECLARE → OPEN → FETCH (loop) → CLOSE. Implicit cursors are created automatically for single statements; explicit cursors are declared by the programmer.

~~~java
// Unsafe dynamic SQL
String sql = "SELECT * FROM users WHERE id = '" + userId + "'";
// Safe: parameterized
PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE id = ?");
ps.setString(1, userId);
~~~

### Query processing stages
1. **Parsing**: check syntax and semantics (do tables/columns exist, privileges) and build a parse tree.
2. **Optimization**: generate candidate execution plans and choose the best.
3. **Row-source / code generation**: build the executable plan.
4. **Execution**: run it and fetch rows.

A **soft parse** reuses a cached plan from the shared pool/library cache; a **hard parse** builds a new plan (costly). Bind variables increase soft parses.

### Optimizers
- **RBO (Rule-Based Optimizer)**: chooses the plan using a fixed priority of access paths (e.g., ROWID access > unique index > range index > full scan). Predictable, ignores data distribution.
- **CBO (Cost-Based Optimizer)**: estimates the cost (I/O, CPU, memory) of each plan using **statistics** (row counts, distinct values, histograms) and picks the cheapest. Default in modern DBMSs; needs up-to-date statistics.
- **Execution plan**: the sequence of operations the DBMS will use; viewed with {{EXPLAIN PLAN}} / {{EXPLAIN}}.
- **Hint**: a comment instructing the optimizer to use a specific path, e.g. {{/*+ INDEX(e idx_emp_dept) */}}.

### Join methods
- **Nested loop join**: for each row of the outer (driving) table, look up matching rows in the inner table (ideally via an index). Best for small result sets and OLTP.
- **Sort-merge join**: sort both inputs on the join key, then merge. Good for large data without indexes or non-equi joins.
- **Hash join**: build a hash table on the smaller input, probe with the larger. Best for large equi-joins (DW); needs memory.

### Tuning tips
Use indexes that match WHERE/JOIN columns, avoid functions on indexed columns, select only needed columns, avoid {{SELECT *}}, filter early, prefer EXISTS over IN for large correlated sets, keep statistics current.
`},
{
  id: 'm2-8', m: 'm2', syl: '2.4.1', title: 'Transactions, concurrency control and isolation levels',
  summary: 'ACID, transaction states, concurrency anomalies, locking and 2PL, deadlock, timestamp/MVCC, and isolation levels.',
  body: String.raw`
### Transactions
- **Transaction**: a logical unit of work made of one or more operations that must all succeed or all fail (transfer = debit + credit).
- **Atomicity**: all or nothing; ensured by rollback/recovery (undo).
- **Consistency**: a transaction moves the DB from one valid state to another (constraints hold).
- **Isolation**: concurrent transactions do not see each other's intermediate results; ensured by concurrency control.
- **Durability**: committed results survive failures; ensured by logs and recovery (redo).

States: **Active** → Partially committed (last statement done) → **Committed**; or Active → **Failed** → **Aborted** (rolled back, then restart or kill).
- **COMMIT**: ends the transaction and makes its changes permanent.
- **ROLLBACK**: ends the transaction and undoes all its changes.

### Concurrency problems
- **Lost update**: two transactions update the same data and one overwrites the other's change.
- **Dirty read**: reading data written by another transaction that has not committed (and may roll back).
- **Non-repeatable read**: reading the same row twice gives different values because another transaction updated and committed it in between.
- **Phantom read**: running the same range query twice returns new rows inserted (or rows deleted) by another committed transaction.
- **Inconsistent analysis**: a summary reads some values before and some after another transaction's update.
- **Cascading rollback**: one transaction's rollback forces others that read its uncommitted data to roll back too.

### Isolation levels (ANSI)
| Level | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible |
| SERIALIZABLE | Prevented | Prevented | Prevented |
Higher isolation = more consistency but less concurrency. Defaults: Oracle and SQL Server use READ COMMITTED; MySQL InnoDB uses REPEATABLE READ.

### Concurrency control techniques
- **Locking**: a transaction must hold a lock before accessing data. **Shared (S, read) lock**: many readers allowed. **Exclusive (X, write) lock**: only one, blocks all others.

| Held / Requested | S | X |
|---|---|---|
| S | Compatible | Conflict |
| X | Conflict | Conflict |

- **Two-Phase Locking (2PL)**: a transaction has a **growing phase** (only acquires locks) then a **shrinking phase** (only releases locks); once it releases any lock it can acquire no more. Guarantees **conflict serializability** but **not** freedom from deadlock.
- **Strict 2PL**: holds all exclusive locks until commit/abort; prevents cascading rollbacks. **Rigorous 2PL**: holds all locks until commit.
- **Locking granularity**: database, table, page, row. Smaller granularity = more concurrency, more overhead.
- **Timestamp ordering**: each transaction gets a timestamp; conflicting operations execute in timestamp order, otherwise the transaction is rolled back. No deadlock.
- **Optimistic (validation) control**: execute without locks, then validate at commit (read → validation → write phases). Good when conflicts are rare.
- **MVCC (Multi-Version Concurrency Control)**: keeps old versions so readers see a consistent snapshot and never block writers (Oracle, PostgreSQL, InnoDB).

### Deadlock
Two or more transactions wait forever for locks held by each other. Four necessary conditions: **mutual exclusion, hold and wait, no preemption, circular wait**.
- **Prevention**: break a condition, e.g., lock all at once, or order resources. Timestamp schemes: **wait-die** (older waits, younger dies) and **wound-wait** (older wounds/aborts the younger, younger waits).
- **Avoidance**: grant a request only if the state stays safe (Banker's algorithm).
- **Detection and recovery**: build a **wait-for graph**; a cycle means deadlock; abort a victim (usually the cheapest to roll back).
- **Timeout**: abort a transaction that waits too long.
`},
{
  id: 'm2-9', m: 'm2', syl: '2.4.2', title: 'Database recovery, 2PC and backup strategies',
  summary: 'Failure types, logs, undo/redo, checkpoints, deferred vs immediate update, two-phase commit, and full/differential/incremental backups.',
  body: String.raw`
### Failure types
- **Transaction failure**: logical error or deadlock abort in one transaction; fix by rolling it back.
- **System failure**: crash (power, OS) that loses main memory; disk is intact; fix with undo/redo from the log.
- **Media failure**: disk damage; fix by restoring a backup and applying archived logs.

### Log-based recovery
- **Log (journal)**: sequential record of every change: <T, item, old value, new value>, plus start/commit/abort records.
- **WAL (Write-Ahead Logging)**: the log record must be written to stable storage **before** the changed data page is written.
- **REDO**: re-apply changes of **committed** transactions (log has start and commit).
- **UNDO**: reverse changes of **uncommitted** transactions (log has start but no commit).
- **Checkpoint**: periodically flush buffers and write a checkpoint record, so recovery only scans the log from the last checkpoint.

| Method | Writes to DB | Needs UNDO? | Needs REDO? |
|---|---|---|---|
| Deferred update | Only after commit | No | Yes |
| Immediate update | Before commit | Yes | Yes |
| Shadow paging | Copy pages; switch the page table at commit | No log needed | No |

Checkpoint example: T1 committed before the checkpoint → nothing to do. T2 started before and committed after the checkpoint → REDO. T3 started after the checkpoint and committed before the crash → REDO. T4 not committed at the crash → UNDO.

### Two-Phase Commit (2PC)
Guarantees atomic commit of a distributed transaction across several sites.
1. **Prepare (voting) phase**: the coordinator sends PREPARE; each participant writes its changes to its log and votes **YES (ready)** or **NO**.
2. **Commit (decision) phase**: if all vote YES, the coordinator sends COMMIT; if any votes NO (or times out), it sends ABORT/ROLLBACK. Participants acknowledge.
Weakness: **blocking**: if the coordinator fails after participants voted YES, they must wait holding locks. **3PC** adds a pre-commit phase to reduce blocking.

### Backup types
| Type | What it copies | Backup speed/size | Restore needs |
|---|---|---|---|
| Full | All data | Slowest, largest | The full backup only |
| Differential | Changes since the **last full** backup | Grows each day | Last full + **latest** differential |
| Incremental | Changes since the **last backup of any type** | Fastest, smallest | Last full + **every** incremental since, in order |
| Archive (transaction) log | All committed transactions since the last log backup | Continuous | Backups + logs to roll forward to a point in time |

- **Hot (online) backup**: taken while the DB is running and in use (needs archive log mode).
- **Cold (offline) backup**: taken after shutting the DB down; consistent but causes downtime.
- **Logical backup**: exports objects/data as SQL or dump (mysqldump, expdp). **Physical backup**: copies data files.
- **Point-in-time recovery (PITR)**: restore a backup and replay archive logs up to a chosen moment (e.g., just before a wrong DELETE).

> Typical exam answer for a 24×7 system with "no data loss": weekly **full** backup + daily **differential** (or incremental) backup + **archive logs** kept continuously (copied to separate storage) for point-in-time recovery; use **hot** backups so the service never stops; test restores regularly and store copies off-site.

- **RPO (Recovery Point Objective)**: how much data loss (time) is acceptable.
- **RTO (Recovery Time Objective)**: how long recovery may take.
`},
{
  id: 'm2-10', m: 'm2', syl: '2.5.1', title: 'Data warehouse, OLAP and data mining',
  summary: 'DW characteristics, OLTP vs OLAP, star vs snowflake schemas, ETL, data marts, OLAP operations, and association-rule math.',
  body: String.raw`
### Data warehouse (DW)
- **Data warehouse**: an integrated store of historical data from many sources, organized for analysis and decision support.
Inmon's four characteristics: **subject-oriented** (organized by subject like sales, customer), **integrated** (consistent formats and codes from many sources), **time-variant** (keeps history with time stamps), **non-volatile** (loaded and read, not updated in place).

| | OLTP | OLAP / DW |
|---|---|---|
| Purpose | Run daily operations | Analysis, decision support |
| Data | Current, detailed | Historical, summarized |
| Operations | Many short inserts/updates | Complex read-only queries |
| Design | Normalized (3NF) | Denormalized (star schema) |
| Users | Clerks, apps | Analysts, managers |

### Dimensional modeling
- **Fact table**: numeric, measurable business events (sales_amount, quantity) plus foreign keys to dimensions. Large.
- **Dimension table**: descriptive context for facts (time, product, store, customer). Used for filtering and grouping.
- **Star schema**: one fact table joined directly to denormalized dimension tables. Simple and fast queries.
- **Snowflake schema**: dimensions are normalized into sub-dimensions (product → category → department). Less redundancy, more joins.
- **Fact constellation (galaxy)**: several fact tables share dimension tables.
- **Granularity (grain)**: the level of detail of one fact row (per transaction line, per day per store).
- **Slowly Changing Dimension (SCD)**: how to keep history when a dimension value changes: Type 1 overwrite, Type 2 add a new row with validity dates, Type 3 add a "previous value" column.

### ETL and data marts
- **ETL (Extract, Transform, Load)**: **extract** data from sources, **transform** it (cleanse, standardize, integrate, aggregate, derive), **load** it into the DW. **ELT** loads raw data first and transforms inside the target (common with data lakes and cloud DWs).
- **ODS (Operational Data Store)**: integrated, current, near-real-time data for operational reporting.
- **Data mart**: a smaller, subject- or department-specific subset of the DW (sales mart). **Dependent** marts are fed from the DW; **independent** marts are fed directly from sources.

### OLAP
- **OLAP (Online Analytical Processing)**: interactive multidimensional analysis of data in cubes.
- **Roll-up**: aggregate to a higher level (day → month → year) or drop a dimension.
- **Drill-down**: go to finer detail (year → quarter → month).
- **Slice**: fix one dimension to a single value (year = 2026), giving a sub-cube.
- **Dice**: select ranges on two or more dimensions (year 2025–2026, region Luzon/Visayas).
- **Pivot (rotate)**: swap the axes to view data from another angle.
- **Drill-across**: compare across fact tables; **drill-through**: go to the underlying detail rows.
- OLAP types: **ROLAP** (on relational tables, scalable), **MOLAP** (pre-computed multidimensional cubes, fast), **HOLAP** (hybrid).

### Data mining
- **Data mining**: discovering hidden, useful patterns in large data sets.
Tasks: **classification** (decision tree, naive Bayes; predict labeled classes), **clustering** (K-means; group similar records), **association rules** (market basket), **sequential patterns** (A then later B), **regression** (predict numbers), **anomaly detection** (fraud).
Process: **CRISP-DM**: business understanding → data understanding → data preparation → modeling → evaluation → deployment. (KDD: selection → preprocessing → transformation → data mining → interpretation/evaluation.)

### Association rule measures (A → B)
- **Support** = P(A and B) = transactions with both / all transactions.
- **Confidence** = P(B | A) = transactions with both / transactions with A.
- **Lift** = confidence / P(B). Lift > 1: positive association; = 1: independent; < 1: negative.

Example: 100 baskets; 20 contain bread, 25 contain milk, 10 contain both. Bread → Milk: support = 10/100 = 0.10, confidence = 10/20 = 0.50, lift = 0.50 / 0.25 = 2.0 (buying bread doubles the chance of milk).
**Apriori algorithm**: if an itemset is infrequent, all its supersets are infrequent, so they are pruned.
`},
{
  id: 'm2-11', m: 'm2', syl: '2.5.2–2.5.3', title: 'Big data, NoSQL, data lakes and data for AI',
  summary: 'The Vs of big data, Hadoop/Spark/Kafka, data lake vs DW, NoSQL types, CAP and BASE, and preparing data for AI models.',
  body: String.raw`
### Big data
- **Big data**: data too large, fast or varied for traditional tools. **3V**: **Volume, Velocity, Variety**; extended with **Veracity** (trustworthiness) and **Value** (5V).
- Data types: **structured** (tables), **semi-structured** (JSON, XML, logs; self-describing tags), **unstructured** (text, images, video).
- **Hadoop**: open-source framework for distributed storage and processing on commodity clusters.
- **HDFS**: Hadoop's distributed file system. A **NameNode** keeps metadata; **DataNodes** store blocks (default 128 MB), each block replicated **3** times for fault tolerance.
- **MapReduce**: batch processing model: **Map** emits key-value pairs, shuffle/sort groups by key, **Reduce** aggregates.
- **YARN**: Hadoop's resource manager / job scheduler.
- **Spark**: in-memory distributed processing engine; much faster than MapReduce for iterative jobs; supports SQL, streaming, ML (MLlib), graphs.
- **Kafka**: distributed publish-subscribe message/event streaming platform (topics, partitions, producers, consumers).
- Others: Hive (SQL on Hadoop), HBase (column store on HDFS), Sqoop (RDB ↔ Hadoop), Flume (log collection), ZooKeeper (coordination).

### Data lake
- **Data lake**: a central repository storing raw data of all types (structured to unstructured) in native format at low cost.
| | Data warehouse | Data lake |
|---|---|---|
| Data | Structured, processed | Raw, all types |
| Schema | **Schema-on-write** (defined before loading) | **Schema-on-read** (applied when used) |
| Users | Business analysts | Data scientists, engineers |
| Risk | Rigid | Can become a "data swamp" without governance/metadata |
**Lakehouse**: combines lake storage with DW features (ACID tables, schema enforcement).

### NoSQL
- **NoSQL**: "Not only SQL" databases with flexible schemas that scale out horizontally across servers.
| Type | Model | Example | Good for |
|---|---|---|---|
| Key-value | Key → value | Redis, DynamoDB | Caching, sessions, shopping carts |
| Document | JSON/BSON documents | MongoDB, Couchbase | Content, catalogs, varied fields |
| Column-family (wide-column) | Rows with dynamic column families | Cassandra, HBase | Huge write-heavy time-series, logs |
| Graph | Nodes and edges | Neo4j | Social networks, recommendations, fraud rings |

- **CAP theorem**: a distributed system can guarantee at most two of **Consistency** (all nodes see the same data), **Availability** (every request gets a response), **Partition tolerance** (works despite network splits). Since partitions happen, systems choose CP (e.g., HBase, MongoDB default) or AP (Cassandra, DynamoDB).
- **BASE**: **Basically Available, Soft state, Eventually consistent**: NoSQL's relaxed alternative to ACID.
- **Sharding**: splitting data horizontally across servers by a shard key.

### Preparing data for AI (2.5.3.1)
1. **Collect and label** data (annotation; quality labels matter more than quantity).
2. **Clean**: handle **missing values** (delete rows/columns, or impute with mean/median/mode or a model), remove duplicates, fix inconsistent formats.
3. **Outliers**: detect with IQR (below Q1 − 1.5·IQR or above Q3 + 1.5·IQR) or z-score (|z| > 3); remove, cap, or keep if meaningful.
4. **Scale features**: **normalization** (min-max to 0–1: (x − min)/(max − min)) or **standardization** (z-score: (x − mean)/std, mean 0, std 1).
5. **Encode categories**: **one-hot encoding** (one binary column per category, for nominal data) or **label encoding** (integers, for ordinal data).
6. **Feature engineering/selection**: create useful features, drop irrelevant or highly correlated ones; reduce dimensions (PCA).
7. **Balance classes** for imbalanced data: oversampling (SMOTE), undersampling, class weights.
8. **Split** into training, validation and test sets (e.g., 70/15/15); avoid **data leakage** (test data influencing training).
9. **Augment** (images: flip, rotate, crop) to enlarge training data.

### Databases for AI (2.5.3.2)
- **Vector database**: stores **embeddings** (high-dimensional vectors) and finds the most similar ones quickly using approximate nearest-neighbor indexes (HNSW, IVF) and similarity measures (cosine similarity, Euclidean distance). Core of RAG systems (Pinecone, Milvus, Chroma, pgvector).
- **Feature store**: central place to store, share and serve ML features consistently for training and inference.
- Time-series DBs for sensor/IoT data; graph DBs for knowledge graphs; data lakes for training data at scale.
`}
);

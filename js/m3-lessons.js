/* M3 System Architecture and Information Security: lessons (syllabus V4.0E, area 3) */
TC.lessons.push(
{
  id: 'm3-1', m: 'm3', syl: '3.2.1', title: 'Computer architecture and memory',
  summary: 'CPU registers and the instruction cycle, buses, memory hierarchy and caches, RISC vs CISC, pipelining, RAID.',
  body: String.raw`
### CPU
- **ALU (Arithmetic Logic Unit)**: performs arithmetic and logical operations.
- **Control unit (CU)**: decodes instructions and directs the other components.
- **PC (Program Counter)**: holds the address of the **next** instruction.
- **IR (Instruction Register)**: holds the instruction currently being executed.
- **MAR (Memory Address Register)**: holds the memory address to read or write.
- **MBR / MDR (Memory Buffer/Data Register)**: holds the data read from or written to memory.
- **Accumulator (AC)**: holds intermediate arithmetic results.

Instruction cycle: **Fetch** (PC → MAR, memory → MBR → IR, PC + 1) → **Decode** → **Execute** → (Interrupt check). Some texts add an **indirect** cycle to fetch an operand address.

Buses: **address bus** (one-way, CPU → memory; its width sets the addressable memory: 32 bits → 4 GB), **data bus** (two-way), **control bus** (read/write, interrupt signals).

### Interrupts
External (I/O, timer, power failure), internal (divide by zero, overflow, illegal instruction; also called traps/exceptions), software (system calls/SVC). Handling: save state (PC, registers) → run the interrupt service routine → restore state.

### Memory hierarchy (fast/small/expensive → slow/large/cheap)
Registers → Cache (SRAM, L1/L2/L3) → Main memory (DRAM) → SSD → HDD → Tape/archive.
- **SRAM**: fast, no refresh, expensive; used for caches.
- **DRAM**: needs periodic refresh, dense, cheaper; used for main memory.
- **ROM types**: mask ROM, PROM (write once), EPROM (UV erase), EEPROM / flash (electrical erase).
- **Locality of reference**: programs reuse recently accessed data (**temporal locality**, loops) and nearby addresses (**spatial locality**, arrays). Caches work because of locality.
- **Hit ratio**: fraction of accesses found in the cache.
- **Effective access time**: EAT = h × Tc + (1 − h) × Tm. Example: h = 0.9, Tc = 10 ns, Tm = 100 ns → 0.9×10 + 0.1×100 = 19 ns. (If a miss checks the cache first, use (1 − h)(Tc + Tm) = 20 ns.)
- Cache mapping: **direct** (each block has one possible line; simple, more conflicts), **fully associative** (any line; flexible, costly search), **set-associative** (compromise).
- Cache write policies: **write-through** (write cache and memory together) vs **write-back** (write memory only when the line is replaced; uses a dirty bit).
- **Virtual memory**: uses disk to give programs a larger address space than physical RAM; addresses are translated by the MMU using page tables (and the TLB cache).

### CPU design
| RISC | CISC |
|---|---|
| Few, simple, fixed-length instructions | Many, complex, variable-length instructions |
| Mostly 1 cycle per instruction, easy pipelining | Multi-cycle instructions, microprogrammed |
| Many registers, load/store architecture | Fewer registers, memory operands |
| ARM, RISC-V, MIPS | x86 |

- **Pipelining**: overlaps stages of several instructions (fetch, decode, execute, write-back) to raise throughput. **Hazards**: structural (resource conflict), data (needs a result not yet ready), control (branches).
- **Flynn's taxonomy**: SISD (classic single core), **SIMD** (one instruction on many data: GPU, vector), MISD (rare), **MIMD** (multicore, clusters).
- **Multicore / multiprocessing**: SMP shares memory; GPU has thousands of simple cores for parallel math (AI training).

### RAID
| Level | Method | Min disks | Usable capacity | Survives |
|---|---|---|---|---|
| RAID 0 | Striping, no redundancy | 2 | 100% | No disk failure |
| RAID 1 | Mirroring | 2 | 50% | 1 disk (per mirror) |
| RAID 5 | Striping + distributed parity | 3 | (n − 1)/n | 1 disk |
| RAID 6 | Striping + double distributed parity | 4 | (n − 2)/n | 2 disks |
| RAID 10 (1+0) | Mirror pairs, then stripe | 4 | 50% | 1 per mirror pair |

!> RAID 0 improves performance but has **no** fault tolerance. RAID is not a backup: deletions and ransomware are mirrored too.

### Storage connectivity
- **DAS**: storage attached directly to one server.
- **NAS**: file-level storage shared over the LAN (NFS, SMB).
- **SAN**: block-level storage network (Fibre Channel, iSCSI) shared by servers; high performance.
`},
{
  id: 'm3-2', m: 'm3', syl: '3.2.2', title: 'Operating systems: processes, scheduling, concurrency, memory',
  summary: 'Process states and PCB, threads, CPU scheduling with calculations, semaphores, deadlock, paging and page replacement.',
  body: String.raw`
### OS roles
Manages processes, memory, files, I/O devices and security, and provides a user interface and system calls. Goals: throughput, turnaround time, response time, reliability, resource utilization.
- **Kernel**: the core of the OS that runs in privileged mode and manages resources.
- **System call**: the interface a program uses to request OS services (open, read, fork).
- **Shell**: command interpreter between the user and the kernel.

### Processes and threads
- **Process**: a program in execution with its own address space (code, data, heap, stack).
- **PCB (Process Control Block)**: OS data for each process: PID, state, PC, registers, priority, memory info, open files.
- **Thread**: a lightweight unit of execution inside a process; threads share the process's code, data and files but each has its own stack and registers.
- **Context switch**: saving one process's state in its PCB and loading another's; pure overhead.

Process states: **New → Ready → Running → Terminated**, with Running → **Waiting/Blocked** (I/O request) → Ready (I/O done, **wake-up**), and Running → Ready (**timeout**/preemption). Ready → Running is **dispatch**.

### CPU scheduling
| Algorithm | Preemptive? | Notes |
|---|---|---|
| FCFS (First Come First Served) | No | Simple; **convoy effect** (short jobs stuck behind long ones) |
| SJF (Shortest Job First) | No | Minimum average waiting time; long jobs may **starve** |
| SRT (Shortest Remaining Time) | Yes | Preemptive SJF |
| Priority | Either | Starvation fixed by **aging** (raise priority as a job waits) |
| Round Robin (RR) | Yes | Time quantum; fair, good response time; too small a quantum = many context switches |
| HRN (Highest Response ratio Next) | No | Priority = (waiting time + service time) / service time; reduces SJF starvation |
| Multilevel queue / MLFQ | Yes | Separate queues; MLFQ moves processes between queues by behavior |

Worked example (all arrive at 0 in order P1, P2, P3; bursts 24, 3, 3):
- FCFS: waits 0, 24, 27 → average **17**.
- SJF: order P2, P3, P1 → waits 0, 3, 6 → average **3**.
- RR (quantum 4): P1 0–4, P2 4–7, P3 7–10, P1 10–30 → waits P1 = 10 − 4 = 6, P2 = 4, P3 = 7 → average **5.67**.
Turnaround time = completion − arrival; waiting time = turnaround − burst.

### Concurrency
- **Race condition**: the result depends on the timing of concurrent accesses to shared data.
- **Critical section**: code that accesses shared resources and must not be executed by more than one process at a time. Requirements: mutual exclusion, progress, bounded waiting.
- **Semaphore**: integer variable changed only by atomic **P (wait)**: S−−, block if negative, and **V (signal)**: S++, wake a waiter. **Binary semaphore** (0/1) acts like a mutex; **counting semaphore** controls a pool of N resources.
- **Mutex**: lock owned by the thread that acquired it; only it can release.
- **Monitor**: high-level construct where only one process is active inside at a time (Java {{synchronized}}).
- Classic problems: producer–consumer (bounded buffer), readers–writers, dining philosophers.

### Deadlock (OS view)
Four conditions must all hold: **mutual exclusion, hold and wait, no preemption, circular wait**.
- Prevention: deny one condition (request all resources at once; allow preemption; impose a resource order).
- **Avoidance: Banker's algorithm**: grant a request only if the system stays in a **safe state**.
- Detection (resource-allocation/wait-for graph) and recovery (kill processes, preempt resources).

### Memory management
- **Paging**: memory split into fixed-size frames, programs into pages of the same size; no external fragmentation, some **internal fragmentation**.
- **Segmentation**: variable-size logical segments (code, data, stack); causes **external fragmentation**.
- Placement for variable partitions: **first fit**, **best fit** (smallest hole that fits), **worst fit** (largest hole).
- **Page fault**: the referenced page is not in memory and must be loaded from disk.
- **Thrashing**: the system spends more time paging than executing because processes lack enough frames. Fix with the **working set** model or page-fault-frequency control.

Page replacement (3 frames, reference string 1 2 3 4 1 2 5 1 2 3 4 5):
- **FIFO**: replace the oldest page → **9** faults. With 4 frames FIFO gives 10 faults: **Belady's anomaly** (more frames, more faults).
- **LRU (Least Recently Used)**: replace the page unused for the longest time → **10** faults.
- **OPT (optimal)**: replace the page not needed for the longest time in the future → **7** faults (theoretical best).
- **LFU**: replace the least frequently used page. **NUR/Clock**: uses reference (and modify) bits.

### OS types
Batch, time-sharing (multi-user, RR), **real-time** (hard: deadlines must be met, e.g., airbag; soft: video), distributed, embedded, mobile (Android on Linux kernel, iOS).
`},
{
  id: 'm3-3', m: 'm3', syl: '3.1.1, 3.3.1', title: 'System architecture: tiers, virtualization, high availability, DR',
  summary: 'Client/server and web tiers, load balancing, hypervisors vs containers, availability math, DR site types, RPO/RTO, TPS and Little\'s law.',
  body: String.raw`
### System architecture
- **System architecture**: the structure of hardware, software, network and data components and how they interact to meet functional and quality requirements (performance, availability, scalability, security).
- **2-tier client/server**: client (UI + logic) talks directly to the DB server. Simple but hard to scale and to update clients.
- **3-tier**: presentation (web server) → application/business logic (**WAS**, e.g., Tomcat) → data (DB server). Easier to scale and secure.
- **Web server**: serves static content (HTML, images) and forwards dynamic requests (Apache, Nginx).
- **WAS (Web Application Server)**: runs business logic and dynamic content, manages DB connections and transactions.
- **Load balancer (L4/L7 switch)**: spreads requests across servers. Algorithms: round robin, weighted round robin, least connections, IP hash (session stickiness), least response time.
- **CDN (Content Delivery Network)**: caches content on edge servers near users.
- **Scale-up (vertical)**: a bigger server (more CPU/RAM). **Scale-out (horizontal)**: more servers.

### Virtualization
- **Virtualization**: abstracts physical resources so several isolated virtual machines run on one host.
- **Hypervisor (VMM)**: software that creates and runs VMs. **Type 1 (bare-metal)** runs directly on hardware: VMware ESXi, Microsoft Hyper-V, Xen, KVM. **Type 2 (hosted)** runs on a host OS: VirtualBox, VMware Workstation.
- **Full virtualization**: guest OS runs unmodified (binary translation / hardware assist). **Para-virtualization**: guest OS is modified to call the hypervisor (hypercalls) for better performance.
- **Container**: OS-level virtualization; containers share the host kernel and isolate processes (namespaces, cgroups). Lighter and faster to start than VMs, but weaker isolation. Docker builds/runs them; Kubernetes orchestrates them.
- Other kinds: storage virtualization, network virtualization (VLAN, SDN), desktop virtualization (VDI).

### High availability (HA)
- **High availability**: designing systems to minimize downtime by removing single points of failure (SPOF) through redundancy and fast failover.
- **Active-standby**: the standby node takes over when the active node fails (heartbeat detects failure). **Active-active**: all nodes serve traffic and share load.
- **Failover**: automatic switch to a redundant component; **failback**: return to the original after repair.
- **Clustering**: a group of servers acting as one system (HA cluster, load-balancing cluster, HPC cluster).
- **MTBF**: mean time between failures. **MTTR**: mean time to repair.
- **Availability** = MTBF / (MTBF + MTTR). Example: MTBF 100,000 h, MTTR 1 h → 100,000 / 100,001 ≈ **99.999%**.
- Series (all needed): A = A1 × A2. Parallel (any one enough): A = 1 − (1 − A1)(1 − A2). Two 99% servers in parallel → 99.99%.

| Availability | Downtime per year |
|---|---|
| 99% | 3.65 days |
| 99.9% | 8.76 hours |
| 99.99% | 52.6 minutes |
| 99.999% ("five nines") | 5.26 minutes |

### Disaster recovery (DR)
- **BCP (Business Continuity Plan)**: plan to keep critical business functions running during and after a disaster. **DRP** focuses on restoring IT systems.
- **BIA (Business Impact Analysis)**: identifies critical processes and the impact of downtime, to set RTO/RPO.
- **RTO (Recovery Time Objective)**: maximum acceptable time to restore service.
- **RPO (Recovery Point Objective)**: maximum acceptable data loss, measured in time.

| DR site | Setup | RTO | Cost |
|---|---|---|---|
| **Mirror site** | Full duplicate system, real-time synchronous replication, active-active | ≈ 0 (RPO ≈ 0) | Highest |
| **Hot site** | Same equipment ready, data replicated (near) real time | Within hours (often ≤ 4 h) | High |
| **Warm site** | Some equipment, periodic backups | Days | Medium |
| **Cold site** | Space, power, network only | Weeks to months | Lowest |

!> If the requirement is "RTO = 0 and RPO = 0", the answer is a **mirror site** (with synchronous replication).

### Performance terms
- **Response time**: time from request to response.
- **Throughput / TPS (transactions per second)**: work completed per unit time.
- **Think time**: time a user waits between receiving a response and sending the next request.
- **Little's law (for load testing)**: concurrent users N = TPS × (response time R + think time Z). So the **request interval** per user R + Z = N / TPS, and think time Z = N / TPS − R.

Example: 300 concurrent users, target 60 TPS, response time 3 s → request interval = 300 / 60 = 5 s, think time = 5 − 3 = 2 s.
Relationship: as TPS approaches the system's capacity, queues build and response time rises sharply; up to that point TPS grows almost linearly with users while response time stays flat.

- **Capacity planning**: estimating needed CPU/memory/disk/network from expected load (e.g., tpmC benchmarks, peak factor, headroom of 30% CPU).
`},
{
  id: 'm3-4', m: 'm3', syl: '3.3.2–3.3.3', title: 'Cloud and big data architecture',
  summary: 'NIST cloud characteristics, IaaS/PaaS/SaaS, deployment models, cloud-native, Kubernetes, lambda vs kappa architecture.',
  body: String.raw`
### Cloud computing (NIST)
Five essential characteristics: **on-demand self-service**, **broad network access**, **resource pooling** (multi-tenancy), **rapid elasticity**, **measured service** (pay per use).

| Model | Provider manages | You manage | Examples |
|---|---|---|---|
| **IaaS** | Hardware, network, virtualization | OS, middleware, runtime, apps, data | AWS EC2, Azure VMs, GCE |
| **PaaS** | + OS, middleware, runtime | Apps and data | Heroku, Google App Engine, Azure App Service |
| **SaaS** | Everything | Your data and user settings | Gmail, Microsoft 365, Salesforce |
| **FaaS / serverless** | Servers and scaling; runs functions on events | Function code | AWS Lambda, Azure Functions |

Deployment models: **public** (shared provider infrastructure), **private** (one organization), **hybrid** (public + private connected), **community** (organizations with shared concerns), **multi-cloud** (several public providers).

Pros: no upfront capex (opex instead), elasticity, global reach, managed services. Cons: vendor lock-in, data sovereignty and privacy, dependence on the network, cost surprises, shared-responsibility security.

### Cloud-native
- **Cloud-native**: building apps to exploit the cloud: microservices, containers, dynamic orchestration, CI/CD, declarative APIs.
- **Kubernetes (K8s)**: container orchestration platform: schedules containers, scales, self-heals, rolls out updates. Objects: **Pod** (smallest unit, one or more containers), **Node** (worker machine), **Deployment** (desired replicas and rollout), **Service** (stable network endpoint/load balancing), **Ingress**, **ConfigMap/Secret**.
- **Auto-scaling**: adds or removes instances automatically based on load (horizontal pod autoscaling, auto-scaling groups).
- **Service mesh**: infrastructure layer for service-to-service traffic, security and observability (Istio).
- **Observability**: logs, metrics and traces.
- **Edge computing**: processing data near its source (devices, gateways) to cut latency and bandwidth. **Fog computing**: a layer between edge devices and the cloud.

### Big data system architecture
Layers: **collection** (Flume, Kafka, crawlers, Sqoop) → **storage** (HDFS, data lake on object storage, NoSQL) → **processing** (batch: MapReduce/Spark; stream: Spark Streaming, Flink, Kafka Streams) → **analysis** (Hive, Spark SQL, ML) → **visualization** (dashboards).

- **Lambda architecture**: a **batch layer** (accurate, recomputed over all data), a **speed layer** (real-time, approximate, recent data), and a **serving layer** that merges both for queries. Accurate and fast, but two code paths to maintain.
- **Kappa architecture**: only a **stream processing** layer; reprocessing is done by replaying the event log (Kafka). Simpler, one code path.
- **Batch processing**: high throughput on large stored data, high latency. **Stream processing**: low latency, continuous data.
`},
{
  id: 'm3-5', m: 'm3', syl: '3.1.1.2, 3.4', title: 'Networks: OSI/TCP-IP, devices, error control, IP, TCP vs UDP',
  summary: 'The 7 layers with PDUs and devices, error detection/correction and ARQ, IPv4 subnetting, routing protocols, TCP handshakes, SCTP.',
  body: String.raw`
### OSI 7 layers
| # | Layer | PDU | Role | Protocols / devices |
|---|---|---|---|---|
| 7 | Application | Data/message | Services to applications | HTTP, FTP, SMTP, DNS; L7 switch, WAF |
| 6 | Presentation | Data | Format, encryption, compression | TLS (often placed here), JPEG, ASCII |
| 5 | Session | Data | Dialog control, synchronization | RPC, NetBIOS |
| 4 | Transport | **Segment** (UDP: datagram) | End-to-end delivery, ports, flow/error control | TCP, UDP, SCTP; L4 switch |
| 3 | Network | **Packet** | Logical addressing, routing | IP, ICMP, ARP*, routing protocols; **router**, L3 switch |
| 2 | Data link | **Frame** | MAC addressing, error detection, access control | Ethernet, PPP, HDLC; **switch**, bridge |
| 1 | Physical | **Bit** | Signals over the medium | Cables, **hub**, **repeater** |

*ARP maps IP → MAC; it is often placed between layers 2 and 3.
TCP/IP model: **Network access (link)** ↔ OSI 1–2, **Internet** ↔ 3, **Transport** ↔ 4, **Application** ↔ 5–7.
Mnemonic (bottom up): "**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way."

- **Hub / repeater**: L1; regenerates signals; one collision domain.
- **Switch / bridge**: L2; forwards frames by MAC address table; separates collision domains; VLANs split broadcast domains.
- **Router**: L3; forwards packets between networks by IP routing table; separates broadcast domains.
- **Gateway**: connects networks with different protocols (up to L7).

Topologies: star (central switch; common), bus, ring, mesh (full mesh links = n(n−1)/2), tree. LAN < MAN < WAN by area.
Media access: **CSMA/CD** (wired Ethernet: detect collisions), **CSMA/CA** (Wi-Fi: avoid collisions).

### Error control
- **Parity check**: adds 1 bit to make the count of 1s even/odd; detects single-bit errors only.
- **Checksum**: sum of data words; used in IP/TCP/UDP headers.
- **CRC (Cyclic Redundancy Check)**: polynomial division; strong burst-error detection; used in Ethernet frames.
- **Hamming code**: adds parity bits so a single-bit error can be **corrected** (forward error correction, FEC).
- **ARQ (Automatic Repeat reQuest)**: detect then retransmit. **Stop-and-wait** (send one, wait for ACK), **Go-Back-N** (resend the errored frame and all after it), **Selective Repeat** (resend only the errored frame; needs buffering).
- **Flow control**: sliding window lets the sender send several frames before an ACK, limited by the receiver's window.

### IPv4 addressing
32 bits, dotted decimal. Classes: A 1–126 (/8), B 128–191 (/16), C 192–223 (/24), D 224–239 (multicast), E 240–255 (reserved). 127.x = loopback.
Private ranges: **10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16** (need NAT to reach the internet).
- **CIDR**: prefix notation (/26) instead of classes. Usable hosts = 2^(host bits) − 2 (network and broadcast addresses).
- **Subnetting example**: split 192.168.10.0/24 into 4 subnets → borrow 2 bits → /26 (mask 255.255.255.192), 64 addresses, **62 hosts** each.

| Subnet | Network | First host | Last host | Broadcast |
|---|---|---|---|---|
| 1 | .0 | .1 | .62 | .63 |
| 2 | .64 | .65 | .126 | .127 |
| 3 | .128 | .129 | .190 | .191 |
| 4 | .192 | .193 | .254 | .255 |

- **NAT**: translates private addresses to a public one at the router; **PAT** also uses ports so many hosts share one public IP.
- **IPv6**: 128 bits, hexadecimal, e.g., 2001:db8::1; no broadcast (multicast/anycast instead); built-in IPsec support; simplified fixed header; auto-configuration. Transition: **dual stack**, **tunneling** (6to4), **translation** (NAT64).
- **ARP**: finds the MAC address for an IP on the local network (broadcast request, unicast reply). **RARP**: MAC → IP (obsolete; replaced by DHCP).
- **ICMP**: error and diagnostic messages (ping uses echo request/reply; traceroute uses TTL exceeded).
- **IGMP**: manages multicast group membership.

### Routing protocols
| Protocol | Type | Metric / algorithm | Scope |
|---|---|---|---|
| RIP | Distance vector | Hop count (max 15; 16 = unreachable); Bellman-Ford | Small interior networks |
| OSPF | Link state | Cost (bandwidth); **Dijkstra** SPF; areas | Large interior networks |
| BGP | Path vector | Policies, AS path | Between autonomous systems (internet) |
**IGP** = interior gateway protocols (RIP, OSPF); **EGP** = exterior (BGP).

### TCP vs UDP
| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Ordered, reliable: ACKs, retransmission, sequence numbers | Best effort, no ACKs |
| Control | Flow control (window) and congestion control | None |
| Header | 20+ bytes | 8 bytes |
| Uses | Web, email, file transfer, SSH | DNS queries, streaming, VoIP, games, DHCP, SNMP |

- **TCP 3-way handshake** (connect): client **SYN** → server **SYN+ACK** → client **ACK**.
- **TCP 4-way termination** (close): FIN → ACK → FIN → ACK (then TIME_WAIT).
- **Congestion control**: slow start (window doubles), congestion avoidance (linear growth), fast retransmit (3 duplicate ACKs), fast recovery.
- **SCTP (Stream Control Transmission Protocol)**: transport protocol with a **4-way handshake** (INIT, INIT-ACK, COOKIE-ECHO, COOKIE-ACK; resists SYN flooding) and a **3-way shutdown**; supports **multi-homing** and **multi-streaming**; used in telecom signaling.
- **Port numbers**: well-known 0–1023, registered 1024–49151, dynamic/ephemeral 49152–65535. A **socket** = IP address + port (+ protocol).
`},
{
  id: 'm3-6', m: 'm3', syl: '3.5', title: 'Application protocols, web, sockets, convergence and IoT',
  summary: 'Ports to memorize, DNS/DHCP, HTTP methods and status codes, REST, socket programming in Java, SDN/NFV, 5G and IoT protocols.',
  body: String.raw`
### Application-layer protocols and ports
| Port | Protocol | | Port | Protocol |
|---|---|---|---|---|
| 20/21 | FTP (data/control) | | 110 | POP3 |
| 22 | SSH, SFTP, SCP | | 143 | IMAP |
| 23 | Telnet (plaintext) | | 161/162 | SNMP / SNMP trap (UDP) |
| 25 | SMTP (send mail) | | 389 / 636 | LDAP / LDAPS |
| 53 | DNS (UDP; TCP for zone transfer) | | 443 | HTTPS |
| 67/68 | DHCP server/client (UDP) | | 3306 / 1521 / 1433 | MySQL / Oracle / SQL Server |
| 69 | TFTP (UDP) | | 3389 | RDP |
| 80 | HTTP | | 123 | NTP |

- **DNS**: resolves domain names to IP addresses. Records: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail server), **NS** (name server), **PTR** (reverse lookup), TXT.
- **DHCP**: assigns IP settings automatically: **DORA** = Discover, Offer, Request, Ack.
- **SMTP** sends mail; **POP3** downloads (and usually deletes from server); **IMAP** keeps mail on the server and syncs folders.
- **SNMP**: network device monitoring (manager, agent, MIB).

### HTTP and the web
- **HTTP**: stateless request/response protocol. State is kept with **cookies** (client side) and **sessions** (server side, identified by a session ID cookie).
- Methods: **GET** (read; parameters in URL), **POST** (create/submit; data in body), **PUT** (replace), **PATCH** (partial update), **DELETE**, HEAD (headers only), OPTIONS (allowed methods; CORS preflight). GET, PUT, DELETE are **idempotent**; POST is not.
- Status codes: **1xx** informational, **2xx** success (200 OK, 201 Created, 204 No Content), **3xx** redirection (301 Moved Permanently, 302 Found, 304 Not Modified), **4xx** client error (400 Bad Request, **401 Unauthorized** = not authenticated, **403 Forbidden** = authenticated but not allowed, 404 Not Found, 405 Method Not Allowed, 429 Too Many Requests), **5xx** server error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout).
- **HTTPS**: HTTP over TLS: encryption, server authentication by certificate, integrity.
- **HTTP/2**: binary framing, multiplexing many streams on one connection, header compression, server push. **HTTP/3**: runs over **QUIC** (UDP) to avoid TCP head-of-line blocking and to connect faster.
- **REST**: architectural style using resources identified by URIs, standard HTTP methods, stateless interactions, representations such as JSON. Example: {{GET /students/17}}, {{POST /students}}, {{DELETE /students/17}}.
- **JSON** (lightweight key-value text) vs **XML** (tag-based, verbose, schema support).
- **WebSocket**: full-duplex persistent connection over one TCP connection (chat, live updates).
- **Ajax**: asynchronous requests from the browser without reloading the page.

### Socket programming
Server: {{socket()}} → {{bind()}} → {{listen()}} → {{accept()}} → {{recv()/send()}} → {{close()}}.
Client: {{socket()}} → {{connect()}} → {{send()/recv()}} → {{close()}}.

Java TCP client (the exam has asked students to fill in blanks like these):
~~~java
import java.io.*;
import java.net.*;

public class MsgClient {
    public static void main(String[] args) {
        Socket socket = null;
        try {
            socket = new Socket("210.183.8.56", 9090);        // (a) connect to server IP and port
            socket.setSoTimeout(60000);                         // (b) read timeout: 60 s
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) System.out.println(line);
        } catch (SocketTimeoutException e) {
            System.out.println("No message for 60 seconds");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try { if (socket != null) socket.close(); }         // (c) release the socket
            catch (IOException e) { }
        }
    }
}
~~~
Java server side: {{ServerSocket server = new ServerSocket(9090); Socket client = server.accept();}}. Output uses {{new PrintWriter(socket.getOutputStream(), true)}}. UDP uses {{DatagramSocket}} and {{DatagramPacket}}.

Python equivalent:
~~~python
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # SOCK_DGRAM for UDP
s.settimeout(60)
s.connect(("210.183.8.56", 9090))
data = s.recv(1024)
s.close()
~~~

### Network convergence
- **VoIP**: voice over IP networks. **SIP** sets up/tears down sessions (signaling); **RTP** carries the media; **RTCP** reports quality.
- **SDN (Software-Defined Networking)**: separates the **control plane** (centralized SDN controller) from the **data plane** (switches); programmable via **OpenFlow** and APIs.
- **NFV (Network Functions Virtualization)**: runs network functions (firewall, load balancer, router) as software on commodity servers instead of dedicated appliances.
- **5G** use cases: **eMBB** (enhanced mobile broadband), **URLLC** (ultra-reliable low-latency: remote surgery, autonomous cars), **mMTC** (massive machine-type communication: IoT). **Network slicing** creates virtual networks with different characteristics on shared infrastructure.
- **MPLS**: forwards packets by short labels instead of IP lookups; used for carrier VPNs and traffic engineering.

### IoT network technologies
- **MQTT**: lightweight **publish/subscribe** messaging over TCP via a **broker**; topics; QoS 0 (at most once), 1 (at least once), 2 (exactly once). Ideal for constrained devices and unreliable networks.
- **CoAP**: REST-like protocol over **UDP** for constrained devices (GET/PUT/POST/DELETE).
- **Zigbee**: low-power mesh networking (IEEE 802.15.4), home automation.
- **BLE (Bluetooth Low Energy)**: short-range, very low power (wearables, beacons).
- **LPWAN**: long range, low power, low data rate: **LoRa/LoRaWAN**, **NB-IoT**, Sigfox.
- **RFID / NFC**: tag identification; NFC is short-range (~10 cm), used for payments.
IoT layers: device/perception → network → platform → application.
`},
{
  id: 'm3-7', m: 'm3', syl: '3.1.1.3, 3.6.1.1', title: 'Security concepts and cryptography',
  summary: 'CIA and friends, symmetric vs asymmetric algorithms, key-count formulas, hashes, MACs, digital signatures, PKI and TLS.',
  body: String.raw`
### Security goals
- **Confidentiality**: only authorized parties can read the information (encryption, access control).
- **Integrity**: information is not altered without authorization, or alteration is detected (hashes, MACs, signatures).
- **Availability**: authorized users can access information and systems when needed (redundancy, DDoS protection, backups).
- **Authentication**: verifying the identity of a user or system.
- **Non-repudiation**: a sender cannot deny having sent a message (digital signatures, logs).
- **Accountability**: actions can be traced to the responsible entity (logging, audit).

Risk vocabulary: an **asset** has a **vulnerability** (weakness) that a **threat** (potential cause of harm) can exploit; **risk** = likelihood × impact. **Countermeasures/controls** reduce risk. Controls by function: preventive, detective, corrective, deterrent, recovery, compensating.

### Symmetric (secret-key) encryption
One shared key encrypts and decrypts. Fast, suitable for bulk data; problem: **key distribution**.
- **DES**: 56-bit key, 64-bit block; broken by brute force. **3DES**: three DES passes; legacy.
- **AES**: 128-bit block; 128/192/256-bit keys; the current standard (Rijndael).
- **SEED, ARIA**: Korean national block ciphers (128-bit block). Others: IDEA, Blowfish.
- Stream ciphers: RC4 (broken), ChaCha20.
- Block modes: **ECB** (identical blocks → identical ciphertext; insecure for images), **CBC** (chains with an IV), **CTR** (turns a block cipher into a stream; parallel), **GCM** (CTR + authentication; AEAD; used in TLS 1.3).

### Asymmetric (public-key) encryption
A key pair: public key (shared) and private key (secret). Slower; solves key distribution; enables signatures.
- **RSA**: security based on the difficulty of **factoring** large numbers.
- **ECC**: elliptic curves; same strength with much shorter keys (256-bit ECC ≈ 3072-bit RSA).
- **Diffie-Hellman**: **key exchange** (agree on a shared secret over an insecure channel) based on discrete logarithms; vulnerable to man-in-the-middle without authentication.
- **ElGamal, DSA**: discrete-logarithm based encryption/signatures.

Key counts for n users communicating pairwise: symmetric **n(n − 1)/2** keys; asymmetric **2n** keys (n pairs). For 100 users: 4,950 vs 200.

### Which key for what
| Goal | Sender uses | Receiver uses |
|---|---|---|
| Confidentiality | **Receiver's public key** to encrypt | Own private key to decrypt |
| Digital signature (integrity, authentication, non-repudiation) | **Sender's private key** to sign (the hash) | Sender's public key to verify |

**Digital signature process**: sender hashes the message → encrypts the hash with the sender's **private key** = signature → sends message + signature. Receiver decrypts the signature with the sender's **public key**, hashes the received message, and compares the two hashes. Match = integrity + authenticity + non-repudiation. (A signature alone does not give confidentiality.)

**Hybrid encryption** (used by TLS, PGP): encrypt data with a random symmetric session key (fast), and encrypt that session key with the receiver's public key (secure distribution).

### Hash functions and MACs
- **Cryptographic hash**: one-way function producing a fixed-length digest. Properties: **pre-image resistance** (one-way), **second pre-image resistance**, **collision resistance**.
- Algorithms: MD5 (128-bit, broken), SHA-1 (160-bit, deprecated), **SHA-256/SHA-3** (current).
- **MAC / HMAC**: a hash computed with a shared secret key; provides integrity and message authentication, but **not** non-repudiation (both sides know the key).
- **Password storage**: never store plaintext or plain hashes; use a **salt** (random value per user, defeats rainbow tables) and a slow **key-stretching** algorithm (bcrypt, scrypt, PBKDF2, Argon2).

### PKI (Public Key Infrastructure)
- **CA (Certificate Authority)**: trusted party that issues and signs digital certificates binding a public key to an identity.
- **RA (Registration Authority)**: verifies the requester's identity for the CA.
- **Digital certificate (X.509)**: contains subject, public key, issuer, validity period, serial number and the CA's signature.
- **CRL (Certificate Revocation List)** / **OCSP** (real-time status check): ways to check whether a certificate was revoked.
- Chain of trust: root CA → intermediate CA → server certificate.

### TLS (HTTPS) handshake, simplified
1. Client Hello (supported versions, cipher suites, random). 2. Server Hello + **server certificate**. 3. Client verifies the certificate chain. 4. Key exchange (ECDHE) to derive the session key. 5. Both switch to symmetric encryption (AES-GCM) with integrity checks. TLS 1.3 removes old ciphers and needs fewer round trips.
`},
{
  id: 'm3-8', m: 'm3', syl: '3.6.1.2–3.6.1.3', title: 'Authentication and access control',
  summary: 'Authentication factors and MFA, biometrics FAR/FRR, SSO, Kerberos, OAuth 2.0 vs OpenID Connect vs SAML, DAC/MAC/RBAC/ABAC.',
  body: String.raw`
### Authentication
Process: **Identification** (claim an identity: user ID) → **Authentication** (prove it) → **Authorization** (grant permissions) → **Accountability** (log actions). AAA = Authentication, Authorization, Accounting (RADIUS, TACACS+, Diameter).

Factors:
- **Knowledge (something you know)**: password, PIN, security question.
- **Possession (something you have)**: smart card, OTP token, phone, security key.
- **Inherence (something you are)**: fingerprint, face, iris, voice.
- Also location (somewhere you are) and behavior (keystroke dynamics).
- **MFA (multi-factor authentication)**: uses factors of **different** types. A password + PIN is two knowledge factors, so it is **not** MFA.
- **OTP (One-Time Password)**: valid once; **HOTP** (counter-based), **TOTP** (time-based, e.g., 30-second codes).
- **FIDO2 / passkeys**: passwordless authentication with public-key cryptography; the private key stays on the device; phishing-resistant.

Biometric accuracy:
- **FAR (False Acceptance Rate)**: impostors wrongly accepted (security risk; Type II error).
- **FRR (False Rejection Rate)**: legitimate users wrongly rejected (inconvenience; Type I error).
- **CER / EER (Crossover/Equal Error Rate)**: where FAR = FRR; **lower CER = more accurate** system.

### Single sign-on and federation
- **SSO (Single Sign-On)**: log in once and access many systems without re-entering credentials.
- **Kerberos**: ticket-based network authentication using symmetric keys and a trusted **KDC** (Key Distribution Center) made of the **AS** (Authentication Server, issues the **TGT**) and the **TGS** (Ticket Granting Server, issues **service tickets**). Needs synchronized clocks; the KDC is a single point of failure.
- **SAML**: XML-based standard for exchanging authentication assertions between an identity provider (IdP) and a service provider (SP); common for enterprise web SSO.
- **OAuth 2.0**: **authorization** framework: a user lets a client app access resources on their behalf with an **access token**, without sharing the password. Roles: resource owner, client, authorization server, resource server. Flows: authorization code (+PKCE), client credentials, device code. Refresh tokens get new access tokens.
- **OpenID Connect (OIDC)**: **authentication** layer on top of OAuth 2.0; returns an **ID token (JWT)** describing the user ("Sign in with Google").
- **JWT (JSON Web Token)**: header.payload.signature, Base64URL-encoded; signed (not encrypted by default), so do not put secrets in it.

!> OAuth 2.0 is for **authorization** (delegated access). OIDC adds **authentication** (who the user is).

### Access control models
| Model | Who decides | How | Typical use |
|---|---|---|---|
| **DAC** (Discretionary) | The **owner** of the object | Identity-based ACLs; owners can grant rights to others | OS file permissions, most commercial systems |
| **MAC** (Mandatory) | The **system/administrator** by policy | **Security labels** on objects (Top Secret, Secret…) and **clearances** on subjects; users cannot change them | Military, government, high-security research |
| **RBAC** (Role-Based) | Administrator, via **roles** | Permissions attach to roles; users get roles | Organizations with frequent staff changes |
| **ABAC** (Attribute-Based) | Policy engine | Rules on attributes of user, resource, action, environment (time, location) | Fine-grained, dynamic cloud policies |

- **ACL (Access Control List)**: per-object list of subjects and their permissions (object-centered). **Capability list**: per-subject list of objects and rights (subject-centered).
- **Bell-LaPadula** (confidentiality, MAC): **no read up** (simple security property), **no write down** (*-property).
- **Biba** (integrity): **no read down**, **no write up**. **Clark-Wilson** (integrity): well-formed transactions and separation of duties for commercial systems. **Chinese Wall (Brewer-Nash)**: prevents conflicts of interest.
- **Least privilege**: give only the permissions needed for the job.
- **Separation of duties**: split critical tasks among people so no single person can commit fraud (requester ≠ approver).
- **Need to know**: access only to information required for the task.

> Model exam answers: a space-technology research lab that needs very strong security → **MAC** (central labels and clearances, users cannot pass on rights, enforces no read up/no write down). A company whose organization and permissions change often and values efficiency → **RBAC** (assign/remove roles instead of editing each user's permissions; supports least privilege and separation of duties).
`},
{
  id: 'm3-9', m: 'm3', syl: '3.6.2', title: 'Security management systems and risk management',
  summary: 'ISO/IEC 27001 and the 27000 family, ISMS-P, NIST CSF 2.0, risk assessment formulas, risk treatment options.',
  body: String.raw`
### ISMS: international standards
- **ISMS (Information Security Management System)**: a systematic, risk-based management framework of policies, processes and controls that protects information, run as a **PDCA** (Plan-Do-Check-Act) cycle.
- **ISO/IEC 27001**: the certifiable ISMS **requirements** standard. The 2022 version's Annex A has **93 controls** in **4 themes**: organizational (37), people (8), physical (14), technological (34).
- **ISO/IEC 27002**: implementation **guidance** (code of practice) for those controls.
- **ISO/IEC 27005**: information security risk management. **ISO/IEC 27017/27018**: cloud security / protection of personal data in public clouds. **ISO/IEC 27701**: privacy information management (PIMS) extension.
- **ISO 22301**: business continuity management. **ISO 31000**: general risk management. **ISO/IEC 20000**: IT service management.
- **NIST Cybersecurity Framework (CSF) 2.0** functions: **Govern, Identify, Protect, Detect, Respond, Recover**.
- **Common Criteria (ISO/IEC 15408)**: evaluates the security of IT products with assurance levels EAL1–EAL7.
- **SOC 2**: audit report on a service organization's security controls (trust services criteria).

### Domestic (Korean) standard: ISMS-P
TOPCIT is a Korean exam, so "domestic standard" means Korea's **ISMS-P** (Personal Information & Information Security Management System), run by KISA. Its criteria are grouped in three areas: (1) **establishing and operating the management system**, (2) **protection measures**, (3) **requirements for each stage of personal information processing** (collection, use, provision, destruction). **ISMS** certification covers only areas 1–2; **ISMS-P** adds area 3. (The Philippine counterpart for privacy is the **Data Privacy Act of 2012, RA 10173**, enforced by the National Privacy Commission.)

### ISMS life cycle
Establish scope and policy → assess risk → select and implement controls (Statement of Applicability) → operate and train → monitor and **internal audit** → management review → continual improvement.
Security policy hierarchy: **policy** (high-level intent, management-approved) → **standards** (mandatory rules) → **guidelines** (recommended) → **procedures** (step-by-step).

### Risk management
Process: identify assets and their value → identify threats and vulnerabilities → analyze and evaluate risk → choose treatment → monitor.
- **Qualitative analysis**: rate likelihood and impact (high/medium/low) in a matrix; fast, subjective.
- **Quantitative analysis**: money values.
  - **SLE (Single Loss Expectancy)** = Asset Value (AV) × Exposure Factor (EF).
  - **ARO (Annualized Rate of Occurrence)** = expected occurrences per year.
  - **ALE (Annualized Loss Expectancy)** = SLE × ARO.
  - A control is worth it if (ALE before − ALE after) > annual cost of the control.
Example: server worth ₱2,000,000, a flood destroys 50% (EF 0.5), expected once every 10 years (ARO 0.1): SLE = 1,000,000, ALE = 100,000 per year.
- Approaches: baseline approach (apply a standard control set), detailed risk analysis, informal (expert judgment), combined.

Risk treatment options:
- **Risk avoidance**: stop the risky activity (do not store card numbers at all).
- **Risk transfer (sharing)**: shift the impact to a third party (insurance, outsourcing).
- **Risk mitigation (reduction)**: apply controls to lower likelihood or impact (firewall, backups, training).
- **Risk acceptance**: knowingly accept a risk whose cost to treat exceeds its impact; document it.
- **Residual risk**: what remains after treatment; must be within the risk appetite and accepted by management.
`},
{
  id: 'm3-10', m: 'm3', syl: '3.7.1', title: 'Application security, secure coding and data security',
  summary: 'OWASP Top 10, SQL injection/XSS/CSRF with vulnerable and fixed code, other secure coding rules, encryption, masking and de-identification.',
  body: String.raw`
### OWASP Top 10 (2021, widely used in exams)
A01 Broken Access Control · A02 Cryptographic Failures · A03 **Injection** (incl. XSS) · A04 Insecure Design · A05 Security Misconfiguration · A06 Vulnerable and Outdated Components · A07 Identification and Authentication Failures · A08 Software and Data Integrity Failures · A09 Security Logging and Monitoring Failures · A10 Server-Side Request Forgery (SSRF).
(The 2025 update keeps Broken Access Control first and adds "Software Supply Chain Failures" and "Mishandling of Exceptional Conditions".)

Korea's secure-coding guide (MOIS) groups weaknesses into 7 categories: input validation and representation, security features, time and state, error handling, code errors, encapsulation, API misuse.

### SQL injection
Attacker input changes the structure of an SQL statement. Input {{' OR '1'='1}} turns a login query into "always true".
~~~java
// VULNERABLE: string concatenation
String sql = "SELECT * FROM users WHERE id='" + id + "' AND pw='" + pw + "'";
Statement st = con.createStatement();
ResultSet rs = st.executeQuery(sql);

// SECURE: parameterized query (PreparedStatement)
String sql = "SELECT * FROM users WHERE id = ? AND pw_hash = ?";
PreparedStatement ps = con.prepareStatement(sql);
ps.setString(1, id);
ps.setString(2, hash(pw));
ResultSet rs = ps.executeQuery();
~~~
~~~python
# VULNERABLE
cur.execute("SELECT * FROM users WHERE id = '" + uid + "'")
# SECURE
cur.execute("SELECT * FROM users WHERE id = %s", (uid,))
~~~
Also: validate input with an allow-list, use least-privilege DB accounts, hide DB error messages, use stored procedures without dynamic SQL, deploy a WAF.

### XSS (Cross-Site Scripting)
Attacker's script runs in **other users' browsers** (steals session cookies, defaces pages).
- **Stored XSS**: script saved on the server (forum post) and served to every viewer.
- **Reflected XSS**: script in a request parameter is echoed back immediately (malicious link).
- **DOM-based XSS**: client-side JavaScript writes untrusted data into the page.
Fixes: **output encoding/escaping** ({{<}} → {{&lt;}}, {{>}} → {{&gt;}}, {{"}} → {{&quot;}}), input validation, avoid {{innerHTML}} with untrusted data (use {{textContent}}), **Content Security Policy (CSP)** header, **HttpOnly** cookies (scripts cannot read them).
~~~java
// VULNERABLE
out.println("<p>Hello " + request.getParameter("name") + "</p>");
// SECURE (e.g., OWASP Java Encoder or a template engine that escapes by default)
out.println("<p>Hello " + Encode.forHtml(request.getParameter("name")) + "</p>");
~~~

### CSRF (Cross-Site Request Forgery)
A malicious site makes the victim's **logged-in browser** send an unwanted request to a trusted site (e.g., change email, transfer money), riding on the victim's cookies.
Fixes: **anti-CSRF token** (random per session/form, verified by the server), **SameSite** cookie attribute (Lax/Strict), re-authentication or confirmation for sensitive actions, check Origin/Referer headers, never change state with GET.

!> XSS abuses the **user's trust in a site** (script runs in the browser). CSRF abuses the **site's trust in the user's browser** (forged request).

### Other common weaknesses and fixes
- **Path traversal**: input like {{../../etc/passwd}} escapes the intended folder → canonicalize paths, allow-list file names, block {{..}}.
- **OS command injection**: user input passed to {{Runtime.exec()}} or {{os.system()}} → avoid shell calls, use fixed commands with allow-listed arguments.
- **Unrestricted file upload**: uploading a web shell → allow-list extensions and MIME types, rename files, store outside the web root, remove execute permission, limit size.
- **Buffer overflow** (C/C++): writing past a buffer's end overwrites the return address → bounds checking, use {{strncpy}}/{{snprintf}} instead of {{strcpy}}/{{sprintf}}/{{gets}}; OS defenses: **stack canaries**, **ASLR**, **DEP/NX**.
- **Integer overflow**: arithmetic exceeds the type's range → check ranges before allocation or arithmetic.
- **Race condition (TOCTOU)**: state changes between check and use → use atomic operations and locks.
- **Improper error handling**: stack traces and SQL errors shown to users leak internals → generic error pages, detailed logs server-side only.
- **Hard-coded credentials / keys** in code → use secret managers or environment variables.
- **Weak cryptography**: MD5/SHA-1 for passwords, ECB mode, DES → use AES-GCM, SHA-256+, bcrypt/Argon2, secure random ({{SecureRandom}}, {{secrets}}).
- **Session management**: regenerate the session ID after login (prevents **session fixation**), set session timeouts, mark cookies {{Secure}}, {{HttpOnly}}, {{SameSite}}.
- **Insecure deserialization**: deserializing untrusted data can run code → avoid or validate/sign serialized data.
- **SSRF**: the server fetches an attacker-chosen URL (e.g., internal metadata service) → allow-list destinations, block internal IP ranges.
- **Input validation**: validate on the server (client-side checks can be bypassed), prefer **allow-lists** over block-lists.

### Data security
- **Encryption at rest** (disk/DB) and **in transit** (TLS).
- DB encryption methods: **API** method (application encrypts; flexible, needs code changes), **plug-in** method (DB-side functions/views), **TDE (Transparent Data Encryption)** (DBMS encrypts files transparently; no app changes), file/OS-level encryption, hardware (HSM for keys).
- **Key management**: keep keys separate from data; rotate keys; use a KMS/HSM.
- **Data masking**: hides parts of data for display or testing (0917-***-**89).
- **Tokenization**: replaces sensitive data with a random token mapped in a secure vault (card numbers).
- **Pseudonymization**: replaces identifiers so data cannot identify a person **without additional information** kept separately; still personal data.
- **Anonymization**: irreversibly removes the ability to identify a person; no longer personal data.
- De-identification models: **k-anonymity** (each record indistinguishable from at least k − 1 others), **l-diversity** (each group has at least l distinct sensitive values), **t-closeness** (sensitive value distribution in each group is close to the overall one).
- **DLP (Data Loss Prevention)**: detects and blocks sensitive data leaving the organization. **DRM**: controls use of digital content after distribution.
- **Secure deletion**: overwriting, degaussing, physical destruction.
`},
{
  id: 'm3-11', m: 'm3', syl: '3.7.2–3.7.3', title: 'System, network, AI and cloud security',
  summary: 'OS hardening and Linux permissions, malware, network attacks (SYN flood, Smurf, spoofing), firewall/IDS/IPS/VPN/IPsec, zero trust, AI and cloud security.',
  body: String.raw`
### Operating system security
Account management (remove defaults, strong password policy, lockout), least privilege, **patch management**, disable unnecessary services and ports (**hardening**), file permissions, logging and log review, antivirus/**EDR**, host firewall, secure boot.
- Linux logs: {{/var/log/secure}} or {{auth.log}} (logins), {{/var/log/messages}} or {{syslog}}, {{wtmp}} (login history, read with {{last}}), {{btmp}} (failed logins, {{lastb}}), {{utmp}} (current users, {{who}}).
- {{/etc/passwd}} holds accounts; password hashes are in {{/etc/shadow}} (root-only).
- Find risky SUID files: {{find / -perm -4000 -type f}}.

### Malware
- **Virus**: attaches to a host file and spreads when it runs.
- **Worm**: self-replicates across networks without a host file or user action.
- **Trojan horse**: looks legitimate but performs hidden malicious functions.
- **Ransomware**: encrypts data and demands payment. Defense: offline/immutable backups, patching, least privilege, EDR.
- **Rootkit**: hides an attacker's presence with privileged access. **Backdoor**: bypasses normal authentication. **Spyware/keylogger**: steals information. **Botnet**: compromised machines (bots/zombies) controlled by a C&C server.
- **Fileless malware**: runs in memory using legitimate tools (PowerShell).

### Network attacks
- **DoS / DDoS**: exhaust resources so legitimate users cannot be served; DDoS uses many sources (botnets).
- **SYN flooding**: send many SYNs with spoofed sources and never complete the handshake, filling the server's backlog of half-open connections. Defense: **SYN cookies**, larger backlog, shorter timeouts, firewall rate limits.
- **Smurf attack**: ICMP echo requests sent to a **broadcast** address with the victim's spoofed source, so every host replies to the victim. Defense: disable directed broadcasts.
- **Ping of Death**: oversized ICMP packet (> 65,535 bytes after reassembly). **Teardrop**: overlapping fragment offsets crash reassembly. **Land attack**: source IP = destination IP. **UDP flood**, **HTTP GET flood**, **Slowloris** (holds connections open with slow headers).
- **DNS amplification / reflection**: small spoofed queries produce large responses aimed at the victim.
- **Sniffing**: capturing network traffic (promiscuous mode). Defense: encryption, switched networks.
- **Spoofing**: faking identity: **IP spoofing**, **ARP spoofing/poisoning** (fake MAC for the gateway → MITM), **DNS spoofing** (fake DNS replies → pharming).
- **Session hijacking**: taking over an authenticated session (stolen session ID or TCP sequence prediction).
- **MITM (Man-in-the-Middle)**: intercepts and possibly alters communication between two parties.
- **Phishing** (fake emails/sites), **spear phishing** (targeted), **smishing** (SMS), **vishing** (voice), **pharming** (DNS/hosts manipulation sends users to fake sites even with the right URL).
- **APT (Advanced Persistent Threat)**: long-term, stealthy, targeted attack by a skilled group.
- **Zero-day attack**: exploits a vulnerability before a patch exists.
- **Social engineering**: manipulating people to reveal information or grant access.
- **Watering hole**: compromise a site the target group visits often.

### Network security devices and techniques
- **Firewall**: filters traffic between networks by rules. Types: **packet filtering** (L3/L4 headers; fast, stateless), **stateful inspection** (tracks connection state), **application gateway/proxy** (L7 content, slower), **NGFW** (application awareness, IPS integration).
- **DMZ**: a buffer network between the internet and the internal network for public servers (web, mail).
- **IDS (Intrusion Detection System)**: monitors and **alerts**. **NIDS** (network) vs **HIDS** (host). **Misuse/signature-based** (known patterns; low false positives; misses new attacks) vs **anomaly-based** (deviations from normal; finds new attacks; more false positives).
- **IPS (Intrusion Prevention System)**: placed **inline**; detects **and blocks** attacks in real time.
- **WAF (Web Application Firewall)**: inspects HTTP to block SQL injection, XSS, etc.
- **UTM**: firewall, IPS, antivirus, VPN, filtering in one appliance.
- **NAC (Network Access Control)**: checks a device's identity and security posture before granting network access.
- **Honeypot**: decoy system that attracts and studies attackers.
- **SIEM**: collects and correlates logs from many sources for real-time analysis and alerts. **SOAR**: automates incident response playbooks.
- **VPN**: encrypted tunnel over a public network. **IPsec VPN** (network layer; site-to-site), **SSL/TLS VPN** (via browser; remote access).
- **IPsec**: **AH** (Authentication Header) provides integrity and authentication but **no encryption**; **ESP** (Encapsulating Security Payload) provides **encryption** (plus optional integrity). **Transport mode** protects the payload (host-to-host); **tunnel mode** encrypts the whole original packet with a new IP header (gateway-to-gateway). **IKE** negotiates keys.
- **Wi-Fi security**: WEP (broken) → WPA (TKIP) → **WPA2** (AES-CCMP) → **WPA3** (SAE handshake; resists offline dictionary attacks). Enterprise mode uses 802.1X with RADIUS.
- **Zero Trust**: "never trust, always verify": authenticate and authorize every request regardless of network location; least privilege, micro-segmentation, continuous monitoring, device posture checks.

### AI security (3.7.3.1)
- **Adversarial example (evasion attack)**: tiny crafted changes to input that fool a model (a sticker makes a stop sign read as a speed limit).
- **Data poisoning**: corrupting training data to plant errors or backdoors.
- **Model inversion**: reconstructing sensitive training data from model outputs.
- **Membership inference**: determining whether a specific record was in the training set.
- **Model extraction (stealing)**: copying a model's behavior through many queries.
- **Prompt injection**: malicious instructions in user input (direct) or in retrieved content such as web pages or documents (indirect) that override an LLM's intended behavior. **Jailbreak**: prompts that bypass safety rules.
- Other LLM risks: sensitive data leakage, hallucination, insecure output handling (passing model output to a shell or browser), excessive agency of AI agents.
- Defenses: adversarial training, input/output validation and **guardrails**, data provenance checks, **differential privacy**, rate limiting and query monitoring, access control on models and APIs, red teaming, human oversight, least privilege for agent tools. Reference lists: OWASP Top 10 for LLM Applications, MITRE ATLAS.

### Cloud security (3.7.3.2)
- **Shared responsibility model**: the provider secures the cloud (physical, hardware, virtualization); the customer secures what they put in it. The customer's share is largest in IaaS (OS, apps, data, IAM) and smallest in SaaS (data, users, access settings).
- Main risks: **misconfiguration** (public storage buckets, open ports), weak IAM and stolen keys, insecure APIs, data breaches, account hijacking, insider threats, multi-tenancy isolation failure.
- Controls: **IAM** with least privilege and MFA, encryption with **KMS/HSM**, network segmentation (VPC, security groups), logging (CloudTrail-style audit logs), **CSPM** (finds misconfigurations), **CWPP** (protects workloads), **CASB** (controls SaaS use; visibility, DLP), **CNAPP** (combines them), container image scanning, Infrastructure-as-Code scanning, backups across regions.
- **SECaaS**: security delivered as a cloud service.
`}
);

// ============================================
// PROFESSIONAL CS STUDENT Q&A SYSTEM
// CLEAN LAYOUT - MODERN AI RESPONSE DESIGN
// ============================================

// 50 CS Student Questions and Answers Database
const qaDatabase = [
    // CS Fundamentals
    { id: 1, question: "What is data structure?", answer: "A data structure is a specialized way of organizing and storing data in a computer so that it can be accessed and modified efficiently. Common examples include arrays, linked lists, stacks, queues, trees, and hash tables. Understanding data structures is crucial for writing efficient algorithms and solving complex programming problems." },
    
    { id: 2, question: "What is an algorithm?", answer: "An algorithm is a step-by-step procedure or set of rules for solving a specific problem or accomplishing a task. In computer science, algorithms are the foundation of programming - from simple sorting (bubble sort, quick sort) to complex machine learning models. Good algorithms are efficient, correct, and well-documented." },
    
    { id: 3, question: "What is the difference between array and linked list?", answer: "Arrays store elements in contiguous memory locations with fixed size, allowing O(1) random access but expensive insertion/deletion. Linked lists store elements in scattered memory locations with dynamic size, allowing O(1) insertion/deletion but O(n) access time. Choose arrays for frequent access, linked lists for frequent insertion/deletion." },
    
    { id: 4, question: "What is object-oriented programming?", answer: "OOP is a programming paradigm based on 'objects' containing data (attributes) and code (methods). Key principles: Encapsulation (hiding internal details), Inheritance (reusing code from parent classes), Polymorphism (same interface, different implementations), and Abstraction (simplifying complex reality). Languages include Java, C++, Python, and JavaScript." },
    
    { id: 5, question: "What is the difference between stack and queue?", answer: "Stack follows LIFO (Last-In-First-Out) - like a stack of plates where you add/remove from top. Queue follows FIFO (First-In-First-Out) - like a line where first person in gets served first. Stacks are used for undo functionality, recursion; queues for task scheduling, breadth-first search." },
    
    // Programming Languages
    { id: 6, question: "Which programming language should I learn first?", answer: "Python is highly recommended for beginners due to its simple syntax, readability, and vast applications in web dev, data science, and AI. JavaScript is great for web development. Java offers strong OOP fundamentals. Start with Python to grasp concepts, then explore others based on your career goals." },
    
    { id: 7, question: "What is the difference between Java and JavaScript?", answer: "Despite similar names, they're very different: Java is compiled, runs on JVM, strongly typed, used for enterprise apps, Android. JavaScript is interpreted, runs in browsers/Node.js, dynamically typed, used for web development, interactive websites. Java for backend, JavaScript for frontend/full-stack." },
    
    { id: 8, question: "What is Python good for?", answer: "Python excels in multiple areas: Data Science (pandas, numpy, scikit-learn), Machine Learning (TensorFlow, PyTorch), Web Development (Django, Flask), Automation/Scripting, Scientific Computing, and Artificial Intelligence. Its simplicity and extensive libraries make it versatile for both beginners and professionals." },
    
    { id: 9, question: "What is the difference between C and C++?", answer: "C is procedural, focuses on functions, has no classes/objects, manual memory management. C++ extends C with OOP features (classes, inheritance, polymorphism), supports both procedural and object-oriented programming, has STL library, and is used for system software, games, and performance-critical apps." },
    
    { id: 10, question: "What is SQL used for?", answer: "SQL (Structured Query Language) manages relational databases: querying data (SELECT), inserting (INSERT), updating (UPDATE), deleting (DELETE), creating/modifying tables (CREATE, ALTER), and managing permissions. Essential for backend development, data analysis, and any role working with structured data." },
    
    // Web Development
    { id: 11, question: "What is the difference between frontend and backend?", answer: "Frontend: what users see/interact with (HTML, CSS, JavaScript, React) - runs in browser. Backend: server-side logic, databases, APIs (Python, Java, Node.js, SQL) - runs on server. Frontend focuses on UI/UX, backend on data processing, security, and business logic. Full-stack developers work with both." },
    
    { id: 12, question: "What is React?", answer: "React is a JavaScript library for building user interfaces, developed by Facebook. It uses component-based architecture, virtual DOM for performance, JSX for templating, and handles state management efficiently. React is widely used for single-page applications (SPAs), mobile apps (React Native), and dynamic web interfaces." },
    
    { id: 13, question: "What is the difference between HTML, CSS, and JavaScript?", answer: "HTML structures content (headings, paragraphs, images). CSS styles appearance (colors, fonts, layout). JavaScript adds interactivity (clicks, animations, data fetching). Think: HTML = skeleton, CSS = skin/clothing, JavaScript = brain/movement. All three are essential for modern web development." },
    
    { id: 14, question: "What is responsive web design?", answer: "Responsive design ensures websites work well on all devices (desktop, tablet, mobile). Techniques include: flexible grids (%, not fixed pixels), media queries (different CSS for different screen sizes), flexible images (max-width: 100%), and mobile-first approach. Essential for modern web development and SEO." },
    
    // Databases
    { id: 15, question: "What is the difference between SQL and NoSQL?", answer: "SQL: relational, structured schema, tables with rows/columns, ACID compliance, good for complex queries, scaling vertically (stronger servers). NoSQL: non-relational, flexible schema, document/key-value/graph formats, good for big data, scalability, and high velocity, scaling horizontally (more servers)." },
    
    { id: 16, question: "What is database normalization?", answer: "Normalization organizes database to reduce redundancy and improve integrity. Forms: 1NF (atomic values), 2NF (remove partial dependencies), 3NF (remove transitive dependencies), BCNF (higher level). Benefits: less storage, easier updates, prevents anomalies. Trade-off: may need complex joins for queries." },
    
    // Operating Systems
    { id: 17, question: "What is a process vs thread?", answer: "Process: independent program with own memory space, resources, and execution context. Heavyweight, isolated. Thread: lightweight unit within process, shares memory space, efficient communication. Multiple threads can run in parallel within one process. Processes are more secure but heavier; threads more efficient but risk shared data conflicts." },
    
    { id: 18, question: "What is deadlock in operating systems?", answer: "Deadlock occurs when two or more processes wait indefinitely for resources held by each other. Four necessary conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Prevention: eliminate any condition. Avoidance: Banker's algorithm. Detection and recovery: kill processes or preempt resources." },
    
    { id: 19, question: "What is virtual memory?", answer: "Virtual memory allows a computer to use more memory than physically available by using disk space as extension of RAM. Uses paging (fixed-size blocks) or segmentation (variable-size). Benefits: runs larger programs, isolates processes, simplifies memory management. Trade-off: slower access due to disk I/O." },
    
    // Networking
    { id: 20, question: "What is OSI model?", answer: "The OSI model (Open Systems Interconnection) has 7 layers: 1-Physical (cables), 2-Data Link (MAC addresses), 3-Network (IP routing), 4-Transport (TCP/UDP), 5-Session (connections), 6-Presentation (encryption/compression), 7-Application (HTTP, FTP). Helps understand network communication and troubleshoot issues." },
    
    { id: 21, question: "What is the difference between TCP and UDP?", answer: "TCP: Connection-oriented, reliable, ordered delivery, error checking, slower, used for web browsing, email, file transfer. UDP: Connectionless, no guarantee of delivery, faster, no ordering, used for streaming, gaming, DNS, VoIP. Choose TCP for data integrity, UDP for speed." },
    
    { id: 22, question: "What is an API?", answer: "API (Application Programming Interface) defines how software components interact. REST APIs use HTTP methods (GET, POST, PUT, DELETE), return JSON/XML. APIs enable integration between services (payment gateways, social media login, weather data). Modern development heavily relies on consuming and building APIs." },
    
    // Algorithms
    { id: 23, question: "What is time complexity and Big O notation?", answer: "Time complexity measures algorithm efficiency as input size grows. Big O notation describes worst-case performance: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2^n) exponential. Examples: array access O(1), binary search O(log n), bubble sort O(n²). Choose efficient algorithms for large data." },
    
    { id: 24, question: "What is recursion?", answer: "Recursion is a function calling itself to solve problems by breaking them into smaller subproblems. Essential components: base case (stopping condition), recursive case (calling itself). Used for tree traversal, factorial, Fibonacci, backtracking. Risk: stack overflow if too deep; iteration is sometimes more efficient." },
    
    { id: 25, question: "What is the difference between DFS and BFS?", answer: "DFS (Depth-First Search) explores branches completely before backtracking - uses stack (LIFO), good for pathfinding, topological sort, detecting cycles. BFS (Breadth-First Search) explores neighbors before deeper nodes - uses queue (FIFO), good for shortest path, social networks, web crawling." },
    
    // Career & Interview
    { id: 26, question: "How to prepare for coding interviews?", answer: "1. Master data structures & algorithms (arrays, hash tables, trees, dynamic programming). 2. Practice on LeetCode/HackerRank (200+ problems). 3. Learn system design basics. 4. Understand your resume projects deeply. 5. Practice behavioral questions (STAR method). 6. Mock interviews with peers. 7. Review past interview experiences." },
    
    { id: 27, question: "What should be in a CS student's portfolio?", answer: "Include: 2-3 full-stack projects (web apps, mobile apps), contributions to open source, GitHub with clean code & documentation, technical blog posts, live demos/deployed projects. Highlight problem-solving, relevant technologies, team projects. Quality over quantity - deep understanding of your projects." },
    
    { id: 28, question: "What is Git and GitHub?", answer: "Git: version control system tracking code changes, branching/merging, collaboration. GitHub: cloud platform hosting Git repositories, pull requests, issue tracking, CI/CD, project management. Essential skills for any developer: git init, commit, push, pull, branch, merge, resolve conflicts." },
    
    { id: 29, question: "What internships should CS students apply for?", answer: "Apply to: Tech giants (Google, Microsoft, Amazon) - structured programs, good pay. Startups - more responsibility, learn faster. Local companies - easier to get, build experience. Research positions - academic experience. Focus on roles matching your skills (frontend, backend, data science, mobile). Apply 6-8 months early." },
    
    // Study Tips
    { id: 30, question: "How to study effectively for CS courses?", answer: "1. Code daily (even 30 mins). 2. Don't just read - implement concepts. 3. Use active recall and spaced repetition. 4. Form study groups for problem-solving. 5. Understand underlying principles, don't memorize. 6. Teach concepts to others. 7. Build side projects applying course material. 8. Use resources like YouTube, Coursera, MIT OpenCourseWare." },
    
    { id: 31, question: "What are the best resources to learn programming?", answer: "Free: freeCodeCamp, The Odin Project, CS50 by Harvard, YouTube (Traversy Media, Web Dev Simplified), MDN Web Docs. Paid: Udemy courses, Coursera specializations, Frontend Masters, Codecademy Pro. Books: 'Clean Code', 'Cracking the Coding Interview', 'You Don't Know JS'. Practice: LeetCode, HackerRank, Codewars." },
    
    { id: 32, question: "What math do CS students need?", answer: "Essential: Discrete Math (logic, sets, graphs, combinatorics) - foundation of computing. Calculus (limits, derivatives, optimization) - used in ML/graphics. Linear Algebra (matrices, vectors) - crucial for AI, graphics, data science. Statistics/Probability - for data analysis, ML. Boolean Algebra - for circuits, logic design." },
    
    // Projects
    { id: 33, question: "What projects should CS students build?", answer: "Beginner: To-do app, calculator, weather app, portfolio website. Intermediate: E-commerce site, social media dashboard, chat application, task manager with database. Advanced: Full-stack app with authentication, real-time features (WebSockets), ML model deployment, mobile app, browser extension. Use modern tech: React, Node.js, Python, Firebase, MongoDB." },
    
    { id: 34, question: "How to contribute to open source?", answer: "1. Learn Git/GitHub. 2. Find beginner-friendly issues (label: 'good-first-issue', 'help-wanted'). 3. Start with documentation fixes or small bugs. 4. Join communities (GitHub Explore, First Timers Only). 5. Read contribution guidelines. 6. Comment on issue - 'I'd like to work on this'. 7. Fork, branch, commit, push, create pull request. Benefits: learn real-world code, network, build portfolio." },
    
    // Software Engineering
    { id: 35, question: "What is Agile development?", answer: "Agile is iterative software development emphasizing collaboration, flexibility, and customer feedback. Key practices: Sprints (1-4 week cycles), Daily stand-ups, Sprint planning/review/retrospective, User stories, Continuous integration. Agile frameworks: Scrum, Kanban, XP. Contrasts with Waterfall (sequential, rigid, months-long cycles). Most modern teams use Agile." },
    
    { id: 36, question: "What is the difference between testing types?", answer: "Unit tests: test individual functions/components. Integration tests: test interactions between modules. End-to-end tests: test complete user flows. Functional tests: verify features work as expected. Performance tests: check speed/scalability. Security tests: find vulnerabilities. TDD (Test-Driven Development): write tests first, then code." },
    
    // Cybersecurity
    { id: 37, question: "What are common security vulnerabilities?", answer: "OWASP Top 10 includes: SQL Injection (malicious database queries), XSS (cross-site scripting injecting scripts), CSRF (cross-site request forgery), Broken Authentication (weak login security), Sensitive Data Exposure (unencrypted data), Security Misconfiguration (default settings). Always validate input, use HTTPS, hash passwords, implement proper authentication." },
    
    { id: 38, question: "What is encryption vs hashing?", answer: "Encryption: two-way (encrypt/decrypt with key), reversible, used for data confidentiality (HTTPS, files). Hashing: one-way (can't reverse), fixed-length output, used for passwords, integrity checks, digital signatures. Encryption needs key management; hashing is irreversible. Common: AES encryption, SHA-256/SHA-3 hashing." },
    
    // Cloud & DevOps
    { id: 39, question: "What is cloud computing?", answer: "Cloud computing delivers computing services over internet: servers, storage, databases, networking, software, analytics. Providers: AWS (Amazon), Azure (Microsoft), Google Cloud. Benefits: pay-as-you-go, scalability, no infrastructure management. Deployment: public cloud (shared), private cloud (dedicated), hybrid (both). Essential for modern development." },
    
    { id: 40, question: "What is DevOps?", answer: "DevOps combines development and operations to shorten development lifecycle, deploy frequently, reliably. Practices: CI/CD (Continuous Integration/Continuous Deployment), Infrastructure as Code (Terraform), Monitoring (Prometheus), Logging, Containerization (Docker), Orchestration (Kubernetes). DevOps engineers automate everything, improve collaboration between devs and ops." },
    
    // Machine Learning
    { id: 41, question: "What is machine learning?", answer: "Machine Learning enables computers to learn from data without explicit programming. Types: Supervised (labeled data - classification/regression), Unsupervised (unlabeled data - clustering), Reinforcement (learning from rewards). Applications: recommendations, image recognition, NLP, fraud detection. Requires Python, libraries (scikit-learn, TensorFlow), statistics knowledge." },
    
    { id: 42, question: "What is the difference between compiler and interpreter?", answer: "Compiler: translates entire program before execution, produces executable file, faster execution, better optimization (C, C++, Java compiles to bytecode). Interpreter: translates and executes line-by-line, no separate executable, slower but easier debugging (Python, JavaScript, Ruby). Some languages use both (Java: compiles to bytecode, interprets/JIT compiles)." },
    
    // Resume & Job Search
    { id: 43, question: "How to write a CS resume?", answer: "1. Contact & links (GitHub, LinkedIn, portfolio). 2. Technical skills section (languages, frameworks, tools). 3. Projects (2-4 detailed projects with tech stack, responsibilities, outcomes). 4. Experience (internships, TA, research). 5. Education (GPA if 3.5+, relevant courses). 6. Achievements/hackathons. Tips: tailor to job, quantify achievements, keep 1 page, use action verbs, proofread carefully." },
    
    { id: 44, question: "Where to find CS jobs/internships?", answer: "Job boards: LinkedIn Jobs, Indeed, Glassdoor, AngelList (startups), Handshake (students). Remote: We Work Remotely, Remote OK. Company careers pages (Google, Microsoft, Amazon). Networking: career fairs (onsite/virtual), LinkedIn connections, alumni network, tech meetups. Prepare early: applications open August-October for summer internships." },
    
    // Portfolio
    { id: 45, question: "How to build a coding portfolio website?", answer: "Step-by-step: 1. Choose stack (HTML/CSS/JS or React). 2. Design clean, responsive layout. 3. Include sections: Hero (name, title, tagline), Skills (tech stack with icons), Projects (with screenshots, live links, GitHub), About (story, passion), Contact (form, email, socials). 4. Host on GitHub Pages or Netlify (free). 5. Add custom domain (optional). 6. Keep updated with latest projects." },
    
    { id: 46, question: "Create a website for CS student portfolio", answer: "🎨 **Complete CS Student Portfolio Website**\n\n📁 **HTML/CSS Code:**\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>CS Student Portfolio</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; line-height: 1.6; }\n        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }\n        header { text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.1); border-radius: 20px; margin-bottom: 40px; }\n        .profile-icon { width: 120px; height: 120px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 50px; margin-bottom: 20px; }\n        h1 { font-size: 48px; margin-bottom: 10px; }\n        .section { background: rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; margin-bottom: 30px; }\n        .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }\n        .skill-tag { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; }\n        .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }\n        .project { background: rgba(255,255,255,0.1); border-radius: 15px; padding: 20px; transition: transform 0.3s; }\n        .project:hover { transform: translateY(-5px); background: rgba(255,255,255,0.2); }\n        @media (max-width: 768px) { h1 { font-size: 32px; } }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <header>\n            <div class=\"profile-icon\">💻</div>\n            <h1>[Your Name]</h1>\n            <p>Computer Science Student | Aspiring Software Engineer</p>\n            <div style=\"margin-top: 20px;\">\n                <a href=\"#\" style=\"color: white; margin: 0 10px;\">GitHub</a>\n                <a href=\"#\" style=\"color: white; margin: 0 10px;\">LinkedIn</a>\n            </div>\n        </header>\n        <div class=\"section\">\n            <h2>🛠️ Technical Skills</h2>\n            <div class=\"skills\">\n                <span class=\"skill-tag\">Python</span>\n                <span class=\"skill-tag\">JavaScript</span>\n                <span class=\"skill-tag\">Java</span>\n                <span class=\"skill-tag\">React</span>\n                <span class=\"skill-tag\">Node.js</span>\n                <span class=\"skill-tag\">SQL</span>\n                <span class=\"skill-tag\">Git</span>\n            </div>\n        </div>\n        <div class=\"section\">\n            <h2>📁 Featured Projects</h2>\n            <div class=\"projects\">\n                <div class=\"project\">\n                    <h3>Project 1</h3>\n                    <p>Description of your project and technologies used.</p>\n                </div>\n                <div class=\"project\">\n                    <h3>Project 2</h3>\n                    <p>Description of your project and technologies used.</p>\n                </div>\n            </div>\n        </div>\n        <footer style=\"text-align: center; padding: 20px;\">\n            <p>© 2025 [Your Name] | CS Student Portfolio</p>\n        </footer>\n    </div>\n</body>\n</html>\n```\n\n✨ **Features:** Modern gradient design, responsive layout, skill tags, project showcase with hover effects, and professional look. Customize with your name, skills, and projects!" },
    
    { id: 47, question: "What are the highest paying CS jobs?", answer: "💼 **Top-Paying CS Roles (2025):**\n\n• Machine Learning Engineer: $120-180k\n• Software Architect: $140-200k\n• DevOps Engineer: $110-160k\n• Security Engineer: $110-170k\n• Cloud Architect: $130-190k\n• Data Scientist: $110-165k\n• Full-Stack Developer: $90-140k\n\n📍 Salaries vary by location (SF/NYC higher), experience, and company (FAANG pays premium). Specializing in AI, security, or cloud increases earning potential." },
    
    { id: 48, question: "Should I get a master's degree in CS?", answer: "🎓 **Master's Degree Considerations:**\n\n✅ **Pros:** Deeper specialization, research opportunities, higher starting salary, teaching positions, career change from non-CS background.\n\n❌ **Cons:** 2 years time, tuition cost ($30-60k), lost work experience.\n\n💡 **Get master's if:** interested in AI/specialized field, want research career, need visa, or non-CS undergrad. Otherwise, experience often matters more than degree." },
    
    { id: 49, question: "How to stay updated with CS trends?", answer: "📰 **Stay Updated Resources:**\n\n• **News:** Hacker News, Reddit (r/programming)\n• **Blogs:** Medium, Dev.to, CSS-Tricks\n• **YouTube:** Fireship, TechLead, Web Dev Simplified\n• **Newsletters:** TLDR, Hacker Newsletter\n• **Podcasts:** Syntax, Software Engineering Daily\n• **Community:** Local tech meetups, hackathons, Twitter/LinkedIn\n\n🚀 **Pro tip:** Build projects with new technologies to truly learn them!" },
    
    { id: 50, question: "What advice for first-year CS students?", answer: "📚 **Advice for First-Year CS Students:**\n\n1️⃣ Code daily - build projects beyond coursework\n2️⃣ Master fundamentals (data structures & algorithms)\n3️⃣ Join clubs (ACM, hackathons, coding competitions)\n4️⃣ Network with upperclassmen and professors\n5️⃣ Start LeetCode early (10-15 problems/week)\n6️⃣ Build portfolio with 3-5 projects by sophomore year\n7️⃣ Apply for internships starting fall of sophomore year\n8️⃣ Learn version control (Git)\n9️⃣ Don't compare your progress to others\n🔟 Take care of mental health - CS can be intense but rewarding!\n\n💪 **You've got this!** " }
];

// DOM Elements
const textInput = document.getElementById('text');
const sendBtn = document.getElementById('send');
const article = document.querySelector('article');

// Store conversation history
let conversationHistory = [];

// Enhanced answer formatting function
function formatAnswer(answer, question) {
    // Detect if answer contains code blocks
    if (answer.includes('```')) {
        return answer;
    }
    
    // Format numbered lists
    let formatted = answer.replace(/(\d+\.)/g, '<strong>$1</strong>');
    
    // Format bullet points
    formatted = formatted.replace(/•/g, '✨');
    formatted = formatted.replace(/✅/g, '✓');
    formatted = formatted.replace(/❌/g, '✗');
    
    // Format line breaks
    formatted = formatted.replace(/\n\n/g, '</p><p>');
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Add emoji improvements
    if (question.includes("advice") || question.includes("tips")) {
        formatted = '💡 <strong>Pro Tips:</strong><br>' + formatted;
    }
    
    return formatted;
}

// Function to add a new message pair with professional layout
// Updated addMessagePair function with better content handling
function addMessagePair(question, answer, matchedQuestion = null) {
    // Create user message div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-send';
    messageDiv.innerHTML = `
        <div class="message">
            <div class="message-header">
                <i class="fas fa-user-circle"></i>
                <span>You</span>
            </div>
            <p>${escapeHtml(question)}</p>
        </div>
    `;
    
    // Create AI response div
    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';
    
    let answerText = answer;
    let matchNote = '';
    
    if (matchedQuestion && matchedQuestion !== question) {
        matchNote = `<div class="match-note"><i class="fas fa-lightbulb"></i> Based on: "${escapeHtml(matchedQuestion)}"</div>`;
    }
    
    // Check if answer contains code blocks
    if (answer.includes('```')) {
        let formattedAnswer = answer;
        formattedAnswer = formattedAnswer.replace(/```html\n([\s\S]*?)```/g, '<pre><code class="language-html">$1</code></pre>');
        formattedAnswer = formattedAnswer.replace(/```css\n([\s\S]*?)```/g, '<pre><code class="language-css">$1</code></pre>');
        formattedAnswer = formattedAnswer.replace(/```javascript\n([\s\S]*?)```/g, '<pre><code class="language-javascript">$1</code></pre>');
        formattedAnswer = formattedAnswer.replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Handle line breaks in formatted answer
        formattedAnswer = formattedAnswer.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
        
        responseDiv.innerHTML = `
            <div class="response-header">
                <i class="fas fa-robot"></i>
                <span>CS Assistant</span>
                <span class="response-badge"><i class="fas fa-code"></i> Code Generated</span>
            </div>
            ${matchNote}
            <div class="response-content">${formattedAnswer}</div>
            <div class="response-footer">
                <i class="fas fa-clock"></i> ${new Date().toLocaleTimeString()}
                <span class="helpful-btn" onclick="markHelpful(${conversationHistory.length})">
                    <i class="far fa-thumbs-up"></i> Helpful
                </span>
            </div>
        `;
    } else {
        // Process regular text - preserve line breaks
        let processedAnswer = escapeHtml(answerText);
        
        // Preserve numbered lists
        processedAnswer = processedAnswer.replace(/(\d+\.)/g, '<strong>$1</strong>');
        
        // Convert line breaks to HTML
        processedAnswer = processedAnswer.replace(/\n\n/g, '</p><p>');
        processedAnswer = processedAnswer.replace(/\n/g, '<br>');
        
        // Wrap in paragraphs if not already
        if (!processedAnswer.startsWith('<p>')) {
            processedAnswer = '<p>' + processedAnswer + '</p>';
        }
        
        responseDiv.innerHTML = `
            <div class="response-header">
                <i class="fas fa-robot"></i>
                <span>CS Assistant</span>
                <span class="response-badge"><i class="fas fa-brain"></i> AI Tutor</span>
            </div>
            ${matchNote}
            <div class="response-content">${processedAnswer}</div>
            <div class="response-footer">
                <i class="fas fa-clock"></i> ${new Date().toLocaleTimeString()}
                <span class="helpful-btn" onclick="markHelpful(${conversationHistory.length})">
                    <i class="far fa-thumbs-up"></i> Helpful
                </span>
            </div>
        `;
    }
    
    // Add to article before chat-box
    const chatBox = document.querySelector('.chat-box');
    article.insertBefore(responseDiv, chatBox);
    article.insertBefore(messageDiv, chatBox);
    
    // Store in history
    conversationHistory.push({ 
        question, 
        answer: answerText, 
        timestamp: new Date().toLocaleTimeString(),
        matchedQuestion 
    });
    
    // Update sidebar
    updateSidebarWithRecentHistory();
    
    // Scroll to bottom with smooth behavior
    setTimeout(() => {
        article.scrollTo({
            top: article.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}
// Helper function to escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        })
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #667eea;">$1</a>');
}

// Find answer in database
function findAnswer(userQuestion) {
    const normalizedQuestion = userQuestion.toLowerCase().trim();
    
    // Try exact match first
    for (const item of qaDatabase) {
        if (item.question.toLowerCase() === normalizedQuestion) {
            return item;
        }
    }
    
    // Try partial match
    let bestMatch = null;
    let highestScore = 0;
    
    for (const item of qaDatabase) {
        const qNormalized = item.question.toLowerCase();
        let score = 0;
        
        const words = normalizedQuestion.split(' ');
        for (const word of words) {
            if (word.length > 2 && qNormalized.includes(word)) {
                score += word.length;
            }
        }
        
        if (score > highestScore && score > 0) {
            highestScore = score;
            bestMatch = item;
        }
    }
    
    if (bestMatch && highestScore > 3) {
        return bestMatch;
    }
    
    return null;
}

// Update sidebar with recent history
function updateSidebarWithRecentHistory() {
    const sidebarUl = document.querySelector('aside ul');
    if (!sidebarUl) return;
    
    const originalItems = [];
    const keepSelectors = ['fa-pen-to-square', 'fa-book', 'fa-list-check', 'fa-compass', 'fa-image', 'fa-flask'];
    
    const allLis = sidebarUl.querySelectorAll('li');
    allLis.forEach(li => {
        const icon = li.querySelector('i');
        if (icon && keepSelectors.some(selector => icon.classList.contains(selector))) {
            originalItems.push(li.cloneNode(true));
        }
    });
    
    const hrElement = sidebarUl.querySelector('hr');
    const hrClone = hrElement ? hrElement.cloneNode(true) : null;
    
    sidebarUl.innerHTML = '';
    
    originalItems.forEach(item => {
        sidebarUl.appendChild(item.cloneNode(true));
    });
    
    if (hrClone) {
        sidebarUl.appendChild(hrClone);
    }
    
    if (conversationHistory.length > 0) {
        const recentHeader = document.createElement('li');
        recentHeader.style.cssText = 'margin-top: 20px; opacity: 0.7; font-size: 11px; font-weight: 500; letter-spacing: 1px; pointer-events: none; padding: 8px 0;';
        recentHeader.innerHTML = '<i class="fa-regular fa-clock"></i> <span style="font-size: 11px;">RECENT QUESTIONS</span>';
        sidebarUl.appendChild(recentHeader);
        
        const recentHistory = [...conversationHistory].reverse().slice(0, 10);
        
        recentHistory.forEach((item) => {
            const li = document.createElement('li');
            li.style.cssText = 'padding: 8px 0; cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent;';
            li.innerHTML = `
                <i class="fa-regular fa-message" style="font-size: 11px; color: #667eea;"></i>
                <a href="#" style="font-size: 12px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(item.question.substring(0, 35))}${item.question.length > 35 ? '...' : ''}</a>
            `;
            
            li.addEventListener('click', (e) => {
                e.preventDefault();
                textInput.value = item.question;
                sendMessage();
                li.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                setTimeout(() => li.style.backgroundColor = 'transparent', 500);
            });
            
            sidebarUl.appendChild(li);
        });
        
        const clearBtn = document.createElement('li');
        clearBtn.style.cssText = 'margin-top: 15px; padding: 8px 0; cursor: pointer; border-top: 1px solid rgba(255,255,255,0.1);';
        clearBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i> <a href="#" style="font-size: 12px;">Clear History</a>';
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearConversationHistory();
        });
        sidebarUl.appendChild(clearBtn);
    } else {
        const emptyState = document.createElement('li');
        emptyState.style.cssText = 'margin-top: 20px; opacity: 0.5; font-size: 12px; pointer-events: none; padding: 12px 0; text-align: center;';
        emptyState.innerHTML = '<i class="fa-regular fa-comment-dots"></i> <span style="font-size: 12px;">No questions asked yet</span>';
        sidebarUl.appendChild(emptyState);
    }
    
    setupNewChat();
}

// Clear conversation history
function clearConversationHistory() {
    const allMessages = document.querySelectorAll('.message-send, .response');
    allMessages.forEach(msg => msg.remove());
    conversationHistory = [];
    updateSidebarWithRecentHistory();
    
    const welcomeResponse = document.createElement('div');
    welcomeResponse.className = 'response';
    welcomeResponse.innerHTML = `
        <div class="response-header">
            <i class="fas fa-robot"></i>
            <span>Wubet AI Agent</span>
            <span class="response-badge"><i class="fas fa-sparkles"></i> Ready</span>
        </div>
        <div class="response-content">
            <p>✨ <strong>Welcome to your CS Learning Assistant!</strong></p>
            <p>I have ${qaDatabase.length}+ computer science questions ready to help you learn.</p>
            <p>📚 <strong>Try asking about:</strong><br>
            • Data Structures & Algorithms<br>
            • Programming Languages<br>
            • Web Development<br>
            • Career & Interview Tips<br>
            • Study Strategies</p>
            <p>💡 <em>Type any question above or click a topic from the sidebar!</em></p>
        </div>
    `;
    const chatBox = document.querySelector('.chat-box');
    article.insertBefore(welcomeResponse, chatBox);
    setTimeout(() => article.scrollTop = article.scrollHeight, 100);
}

// Setup new chat
function setupNewChat() {
    const newChatBtn = document.querySelector('aside ul li:first-child');
    if (newChatBtn) {
        const newClone = newChatBtn.cloneNode(true);
        newChatBtn.parentNode.replaceChild(newClone, newChatBtn);
        newClone.addEventListener('click', (e) => {
            e.preventDefault();
            clearConversationHistory();
        });
    }
}

// Mark helpful function
window.markHelpful = function(index) {
    const btn = document.querySelector(`.helpful-btn`);
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Thanks!';
        btn.style.background = '#2ea043';
    }
};

// Main send function
function sendMessage() {
    const userQuestion = textInput.value.trim();
    
    if (userQuestion === "") {
        const tempResponse = document.createElement('div');
        tempResponse.className = 'response';
        tempResponse.style.opacity = '0.7';
        tempResponse.innerHTML = `
            <div class="response-content">
                <p>⚠️ Please enter a question! Ask me about CS concepts, programming, or career advice.</p>
            </div>
        `;
        const chatBox = document.querySelector('.chat-box');
        article.insertBefore(tempResponse, chatBox);
        setTimeout(() => tempResponse.remove(), 2000);
        return;
    }
    
    const result = findAnswer(userQuestion);
    
    if (result) {
        addMessagePair(userQuestion, result.answer, result.question !== userQuestion ? result.question : null);
    } else {
        const suggestion = `I couldn't find an exact match for "${userQuestion}".\n\n📚 **Try asking about:**\n• Data Structures (arrays, linked lists, trees)\n• Algorithms (sorting, searching)\n• Programming Languages (Python, Java, JavaScript)\n• Web Development (React, HTML/CSS)\n• Career Tips (interviews, portfolio, resume)\n\n💡 Type "help" to see all topics I can answer!`;
        addMessagePair(userQuestion, suggestion);
    }
    
    textInput.value = "";
    textInput.focus();
}

// Sidebar toggle
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('toggle');
    const aside = document.querySelector('aside');
    const mainGrid = document.querySelector('main');
    
    if (toggleBtn && aside && mainGrid) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (aside.style.display === 'none' || aside.style.display === '') {
                aside.style.display = 'block';
                mainGrid.style.gridTemplateColumns = '250px 1fr';
            } else {
                aside.style.display = 'none';
                mainGrid.style.gridTemplateColumns = '0px 1fr';
            }
        });
    }
}

// Clear initial empty messages
function clearInitialEmptyMessages() {
    const initialMessage = document.querySelector('.message-send');
    const initialResponse = document.querySelector('.response');
    if (initialMessage && initialMessage.querySelector('.message p')?.innerText === '') initialMessage.remove();
    if (initialResponse && initialResponse.querySelector('.response-content p')?.innerText === '') initialResponse.remove();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log(`✅ CS Q&A System Loaded - ${qaDatabase.length} questions available`);
    clearInitialEmptyMessages();
    setupSidebarToggle();
    setupNewChat();
    updateSidebarWithRecentHistory();
    
    const existingMessages = document.querySelectorAll('.message-send');
    if (existingMessages.length === 0) {
        const welcomeResponse = document.createElement('div');
        welcomeResponse.className = 'response';
        welcomeResponse.innerHTML = `
            <div class="response-header">
                <i class="fas fa-robot"></i>
                <span>Wubet AI Agent
</span>
                <span class="response-badge"><i class="fas fa-sparkles"></i> Ready</span>
            </div>
            <div class="response-content">
                <p>✨ <strong>
 Hello CS Student! I'm Wubet AI Agent, your personal learning assistant.</strong></p>
                <p>I have ${qaDatabase.length}+ computer science Q&A pairs to help you learn.</p>
                <p>📚 <strong>Popular topics:</strong> Data Structures, Algorithms, Web Dev, Career Tips</p>
                <p>💡 <strong>Try asking:</strong> "What is data structure?" or "How to prepare for coding interviews?"</p>
            </div>
        `;
        const chatBox = document.querySelector('.chat-box');
        article.insertBefore(welcomeResponse, chatBox);
    }
    
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (textInput) textInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
});

// Add CSS styles for professional layout
const style = document.createElement('style');
style.textContent = `
    .message {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 20px;
        border-bottom-right-radius: 5px;
        padding: 14px 20px;
        max-width: 80%;
    }
    
    .message-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 12px;
        opacity: 0.8;
    }
    
    .response-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: rgba(102, 126, 234, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px 20px 0 0;
}

.response-badge {
    margin-left: auto;
    font-size: 11px;
    background: rgba(102, 126, 234, 0.3);
    padding: 4px 12px;
    border-radius: 20px;
}

.response-content {
    padding: 20px 24px;
    line-height: 1.7;
    font-size: 15px;
    color: #e2e8f0;
    overflow: visible;
    word-wrap: break-word;
    white-space: normal;
}

.response-content p {
    margin-bottom: 16px;
    display: block;
}

.response-content p:last-child {
    margin-bottom: 0;
}

.response-content ul, 
.response-content ol {
    margin: 12px 0;
    padding-left: 25px;
}

.response-content li {
    margin: 8px 0;
    display: list-item;
}

.response-content strong {
    color: #667eea;
    font-weight: 600;
}

.response-content pre {
    background: #0d1117;
    border-radius: 12px;
    padding: 16px;
    overflow-x: auto;
    margin: 16px 0;
    display: block;
    width: 100%;
}

.response-content code {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 13px;
    color: #e2e8f0;
}

.response-content br {
    display: block;
    margin: 4px 0;
}

.response-footer {
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.3);
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0 0 20px 20px;
}

.match-note {
    padding: 10px 20px;
    background: rgba(255, 193, 7, 0.15);
    font-size: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #ffd966;
}

.helpful-btn {
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.helpful-btn:hover {
    background: #2ea043;
}

/* Fixed message bubble styles */
.message {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 20px;
    border-bottom-right-radius: 5px;
    padding: 12px 20px;
    max-width: 85%;
    display: inline-block;
}

.message-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    font-size: 11px;
    opacity: 0.8;
}

.message p {
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
}

.message-send {
    display: flex;
    justify-content: flex-end;
    margin: 12px 0 8px 0;
    clear: both;
}

/* Ensure article can scroll properly */
article {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    height: calc(100vh - 60px);
    padding-bottom: 120px;
}

/* Chat box stays at bottom */
.chat-box {
    position: sticky;
    bottom: 20px;
    margin-top: 20px;
    background: var(--surface);
    border-radius: 48px;
    width: 100%;
    z-index: 10;
}

/* Fix for long words breaking */
.response-content {
    word-break: break-word;
    overflow-wrap: break-word;
}

/* Responsive fixes */
@media (max-width: 768px) {
    .response-content {
        padding: 16px;
        font-size: 14px;
    }
    
    .message {
        max-width: 95%;
    }
}
    
    .helpful-btn {
        cursor: pointer;
        padding: 4px 12px;
        border-radius: 20px;
        background: rgba(255,255,255,0.1);
        transition: all 0.2s;
    }
    
    .helpful-btn:hover {
        background: #2ea043;
    }
    
    .match-note {
        padding: 8px 20px;
        background: rgba(255, 193, 7, 0.1);
        font-size: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    pre {
        background: #1e1e2e;
        border-radius: 12px;
        padding: 16px;
        overflow-x: auto;
        margin: 16px 0;
    }
    
    code {
        font-family: 'Fira Code', monospace;
        font-size: 13px;
    }
`;
document.head.appendChild(style);

// Export
window.qaDatabase = qaDatabase;
window.conversationHistory = conversationHistory;
window.clearConversationHistory = clearConversationHistory;
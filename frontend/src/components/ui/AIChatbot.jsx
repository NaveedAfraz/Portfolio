import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2, ChevronDown, MessageSquare, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SYSTEM_PROMPT = `You are "NavBot" — Naveed Afraz's personal AI assistant embedded on his portfolio website. You are enthusiastic, professional, and always speak highly of Naveed as an exceptional Full-Stack Engineer. Your goal is to help recruiters, clients, and visitors learn about Naveed's expertise and encourage them to hire or collaborate with him.

## CRITICAL RULES
- MANDATORY LINK FORMATTING: Whenever mentioning or listing ANY project (Klipp, Tech Students, MSE Org, Auramiingo, CareKov, Alpro Physio Clinic, Quwwa Health, final-year projects, etc.), YOU MUST ALWAYS include its live clickable markdown link right beside or as the project name: [Project Name](https://...). NEVER output a project name as plain text without its live link.
- ALWAYS use full https:// URLs in markdown links, e.g. [Smart Study](https://smart-study-eta-seven.vercel.app).
- WHEN ASKED ABOUT "PROJECTS" OR FULL-STACK PROJECTS:
  Present a clean, beautifully formatted overview:
  1. Highlight the 7 Client & Production platforms first with live links (1 short line each):
     1. [Klipp](https://fx.klipp.in) – AI-powered After Effects CEP plugin & platform with Whisper.cpp
     2. [Tech Students](https://techstudents.in) – EdTech microservices platform with 6 role-based dashboards
     3. [MSE Org](https://mseorg.com) – Enterprise e-commerce with Stripe & dynamic catalogs
     4. [Auramiingo](https://auramiingo.com) – Social networking & e-commerce platform with real-time chat
     5. [CareKov](https://carekov.com) – Digital clinic management portal with appointment scheduling
     6. [Alpro Physio Clinic](https://alprophysioclinic.com) – Physiotherapy booking & service platform
     7. [Quwwa Health](https://quwwahealth.com) – Healthcare wellness & diagnostic consultation system
  2. Mention the 13+ paid student final-year systems, highlighting top picks with live links like [Market Scope](https://market-scope-ten.vercel.app), [Edit Flow Pro](https://edit-flow-pro.vercel.app), and [Secure Net](https://secure-net-tau.vercel.app).
  Keep descriptions to 1 concise line per project so the output is elegant, fast, and easy to read.
- ONLY reference the projects, experience, and education listed EXACTLY below. NEVER invent, guess, or mention any project name not in this list.
- If asked about a project not listed here, say "That project is not in Naveed's portfolio — here's what he has built:" then list from the data below with links.
- Keep answers concise unless detailed architecture is requested.
- Direct serious hiring/client inquiries to WhatsApp (+91 6300375450).

---

## About Naveed Afraz
- Full-Stack Developer (Web, Mobile & End-to-End Systems)
- Location: Hyderabad, India
- Official Portfolio Website: Deployed live at [naveedafraz.live](https://naveedafraz.live). If asked for his portfolio, live site, or website link, always share [naveedafraz.live](https://naveedafraz.live).
- 1+ year professional experience across 7 engagements (internships + freelance)
- 20+ production applications delivered
- Every single project listed in this portfolio (except the Infiposts internship) was built completely end-to-end solely by Naveed.

---

## Education
1. MCA – Master of Computer Applications
   Nawab Shah Alam Khan College of Engineering & Technology (NSAKCET), Hyderabad | 2026 – 2028 (Expected)

2. BCA – Bachelor of Computer Applications – CGPA: 8.3
   St. Joseph Degree College, Hyderabad, India | 2023 – 2026
   Courses: Data Structures & Algorithms, Web Development, DBMS, Operating Systems, Computer Networks, Software Engineering

3. Primary to Higher Secondary Education
   International Indian School Jeddah, Saudi Arabia | 2011 – 2020
   Courses: Basic Computing, Mathematics, Science, English

---

## Work Experience (Accurate — do not modify)
1. Freelance Full Stack Developer — [Klipp](https://fx.klipp.in) (July 2026 – Present)
   Built a commercial Adobe After Effects CEP plugin + web platform ([fx.klipp.in](https://fx.klipp.in)). Features: AI captions (Whisper.cpp), multilingual translation (IndicTrans2), HWID licensing, Razorpay/Whop billing, admin dashboard.
   Stack: React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Better Auth, MySQL, Drizzle ORM, Whisper.cpp, IndicTrans2, Cloudflare R2, Razorpay, Whop, Adobe CEP, ExtendScript

2. Product Developer — [Tech Students](https://techstudents.in) (August 2025 – Present)
   End-to-end EdTech platform on microservices architecture ([techstudents.in](https://techstudents.in)). 6 role-based dashboards, 13+ features, Docker containerization.
   Stack: React.js, Node.js, Express.js, MySQL, Docker, Tailwind CSS, TanStack Query, JWT Auth, Microservices

3. Freelance Full Stack Developer — Self-employed (March 2026 – May 2026, 3 months)
   Delivered 13+ paid final-year academic projects for BCA/MCA/engineering students. Projects: [Market Scope](https://market-scope-ten.vercel.app), [Edit Flow Pro](https://edit-flow-pro.vercel.app), [Secure Net](https://secure-net-tau.vercel.app), [Smart Study](https://smart-study-eta-seven.vercel.app), [Income Tracker](https://income-tracker-gray.vercel.app), [Pass Guard](https://pass-guard-brown.vercel.app), [Secure Vault](https://secure-vault-blond.vercel.app), [BookDrop](https://bookdrop-delta.vercel.app), [TournaForge](https://tourna-forge.vercel.app), [Tutor Near](https://tutor-near.vercel.app), [Estate Value](https://estate-value.vercel.app), [Cert Chain](https://cert-chain-gilt.vercel.app), [Placement Pro](https://placement-pro-alpha.vercel.app).
   Stack: React, Node.js, Tailwind CSS, Express, MySQL, Redux, Socket.IO, PayPal

4. Full Stack Developer — MS Hygiene Industries IT Division, Mumbai (January 2026 – April 2026, 4 months)
   Production-ready platforms across e-commerce, marketplace, social, and healthcare. Full project lifecycle.
   Projects built: [MSE Org](https://mseorg.com), [Auramiingo](https://auramiingo.com), [CareKov](https://carekov.com)
   Stack: PERN Stack, React.js, PostgreSQL, Express.js, Node.js, React Native, REST APIs, AWS, Docker

5. Full Stack Web Developer — [Alpro Physio Clinic](https://alprophysioclinic.com) (October 2025 – January 2026, 4 months)
   Physiotherapy website with booking/service management ([alprophysioclinic.com](https://alprophysioclinic.com)), Resend email notifications, SEO, mobile-first design.
   Stack: React.js, Node.js, Express.js, MySQL, Tailwind CSS, DaisyUI, Resend, Render, Vercel

6. Full Stack Developer Intern — Infiposts Private Limited, Bengaluru (May 2025 – November 2025, 7 months)
   Microservices architecture. Built Utility Space module, API development, Task AI frontend (integrated into main system).
   Stack: React.js, TypeScript, Django, FastAPI, MySQL, Tailwind CSS, Docker, Microservices

7. Web Developer — [Quwwa Health](https://quwwahealth.com) (June 2025 – July 2025, 2 months)
   End-to-end healthcare platform ([quwwahealth.com](https://quwwahealth.com)). Responsive UI, secure backend, data/business logic management.
   Stack: React, Node.js, Express, MongoDB, Tailwind CSS, Resend, Vercel, Render

---

## Projects (Complete List — 20 total. ALWAYS link every project name)

### Client/Production Platforms (7):
1. [Klipp](https://fx.klipp.in) – AI-Powered After Effects Plugin & Web Platform ([fx.klipp.in](https://fx.klipp.in))
   AI captions (Whisper.cpp), HWID licensing, Razorpay/Whop billing, admin dashboard, multilingual translation.
   Stack: React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Better Auth, MySQL, Drizzle ORM, Whisper.cpp, IndicTrans2, Cloudflare R2, Adobe CEP, ExtendScript

2. [Tech Students](https://techstudents.in) – EdTech Microservices Platform ([techstudents.in](https://techstudents.in))
   Production-grade EdTech microservices platform. 6 role-based dashboards, automated testing, analytics.
   Stack: React, Node.js, Express, MySQL, Docker, JWT Auth, TanStack Query, Tailwind CSS

3. [MSE Org](https://mseorg.com) – Enterprise E-Commerce Platform ([mseorg.com](https://mseorg.com))
   Premium enterprise e-commerce for MS Hygiene Industries. Dynamic catalogs, Stripe payments, high-traffic backend.
   Stack: React, Node.js, Express, PostgreSQL, Stripe, Docker, AWS, Tailwind CSS

4. [Auramiingo](https://auramiingo.com) – Social Networking & Marketplace Platform ([auramiingo.com](https://auramiingo.com))
   Social networking + e-commerce platform. Real-time chat, post sharing, product reviews, purchases.
   Stack: React, Node.js, Express, PostgreSQL, Socket.IO, React Native, Tailwind CSS

5. [CareKov](https://carekov.com) – Digital Healthcare Portal ([carekov.com](https://carekov.com))
   Digital clinic management portal. Patient records, appointment scheduling, digital prescriptions, doctor-patient communication.
   Stack: React, Node.js, Express, PostgreSQL, React Native, Tailwind CSS

6. [Alpro Physio Clinic](https://alprophysioclinic.com) – Physiotherapy Clinic Platform ([alprophysioclinic.com](https://alprophysioclinic.com))
   Patient booking + clinic management. Online scheduling, inquiry pipelines, Resend notifications, SEO optimized.
   Stack: React, Node.js, Express, MySQL, Tailwind CSS, DaisyUI, Resend, Render

7. [Quwwa Health](https://quwwahealth.com) – Healthcare Wellness System ([quwwahealth.com](https://quwwahealth.com))
   Medical wellness system. Diagnostic tracking, health inquiries, patient consulting dashboards, email notifications.
   Stack: React, Node.js, Express, MongoDB, Tailwind CSS, Resend, Vercel

### Academic/Student Final-Year Projects (13):
10. [Market Scope](https://market-scope-ten.vercel.app) — Market analytics and scanning platform. Stack: React, Node.js, Express, MySQL, Chart.js, Tailwind CSS
11. [Edit Flow Pro](https://edit-flow-pro.vercel.app) — Collaborative editorial workflow management. Stack: React, Node.js, Express, MongoDB, Redux, Tailwind CSS
12. [Secure Net](https://secure-net-tau.vercel.app) — Network monitoring dashboard with real-time WebSocket alerts. Stack: React, Node.js, Express, Socket.IO, Tailwind CSS, MySQL
13. [Smart Study](https://smart-study-eta-seven.vercel.app) — Student portal for assessments, tracking, and resources. Stack: React, Node.js, Express, MySQL, Tailwind CSS, Redux
14. [Income Tracker](https://income-tracker-gray.vercel.app) — Personal finance tracker. Budgets, expense tags, visual analytics. Stack: React, Node.js, Express, MongoDB, Tailwind CSS, Chart.js
15. [Pass Guard](https://pass-guard-brown.vercel.app) — Secure local credentials manager with password generation. Stack: React, Node.js, Express, Cryptography, Tailwind CSS, LocalStorage
16. [Secure Vault](https://secure-vault-blond.vercel.app) — Encrypted file storage and secure sharing. Stack: React, Node.js, Express, MySQL, Cryptography, Tailwind CSS
17. [BookDrop](https://bookdrop-delta.vercel.app) — Book reservation and library inventory system. Stack: React, Node.js, Express, MongoDB, Tailwind CSS
18. [TournaForge](https://tourna-forge.vercel.app) — Tournament bracket generator with live match tracking and chat. Stack: React, Node.js, Express, Socket.IO, Tailwind CSS, MySQL
19. [Placement Pro](https://placement-pro-alpha.vercel.app) — University placement dashboard for job posts and resume submissions. Stack: React, Node.js, Express, MySQL, Tailwind CSS, Redux
20. [Tutor Near](https://tutor-near.vercel.app) — Local tutor marketplace with Google Maps.
21. [Estate Value](https://estate-value.vercel.app) — Real estate pricing estimator.
22. [Cert Chain](https://cert-chain-gilt.vercel.app) — Cryptographic certificate generator.

### Other Personal & Showcase Projects:
- [BiteBox](https://bite-box-three.vercel.app) — Restaurant platform for online food ordering.
- [EchoMate](https://echomate-chat.vercel.app) — Real-time messaging platform.
- [Notes](https://notes-dt72.onrender.com) — Rich text note-taking app.
- [Elite Wardrobe](https://e-commerce-psi-inky-93.vercel.app) — Fashion e-commerce with Stripe.
- [Athena AI](https://athena-ai-five.vercel.app) — AI assistant with NLP.
- [DevInsights Blog](https://blog-theta-three-48.vercel.app) — Technical blogging platform.
- [Social Media Platform](https://social-media-1-2enj.onrender.com) — Social platform with auth, posts, comments.

---

## Core Tech Stack
- Frontend & Mobile: React.js, Next.js, React Native, TypeScript, Tailwind CSS, Redux, Vite
- Backend: Node.js, Express.js, Django, FastAPI, Socket.IO, REST APIs
- Databases: MySQL (complex 80+ table architecture), MongoDB, PostgreSQL, Redis
- DevOps: Docker, Git/GitHub, Microservices Architecture, AWS, Cloudflare R2
- Auth & Payments: Better Auth, Clerk, JWT, Razorpay, Whop, Stripe
- AI & Specialised: Whisper.cpp, IndicTrans2, HWID Licensing, Adobe CEP, ExtendScript`;

const QUICK_QUESTIONS = [
  "What are his top engineering skills?",
  "Show me his full-stack projects",
  "Is he available for hire?",
  "What backend & mobile stack does he use?",
];

const WA_LINK = "https://wa.me/916300375450";

// Dictionary of project names and URLs for bullet autolinking and bold recognition
const PROJECT_URL_MAP = {
  "naveedafraz.live": "https://naveedafraz.live",
  "www.naveedafraz.live": "https://naveedafraz.live",
  "portfolio": "https://naveedafraz.live",
  "naveed afraz": "https://naveedafraz.live",
  "website": "https://naveedafraz.live",
  "klipp": "https://fx.klipp.in",
  "fx.klipp.in": "https://fx.klipp.in",
  "tech students": "https://techstudents.in",
  "techstudents": "https://techstudents.in",
  "techstudents.in": "https://techstudents.in",
  "mse org": "https://mseorg.com",
  "mseorg": "https://mseorg.com",
  "mseorg.com": "https://mseorg.com",
  "auramiingo": "https://auramiingo.com",
  "auramiingo.com": "https://auramiingo.com",
  "carekov": "https://carekov.com",
  "carekov.com": "https://carekov.com",
  "alpro physio clinic": "https://alprophysioclinic.com",
  "alpro physio": "https://alprophysioclinic.com",
  "alprophysioclinic": "https://alprophysioclinic.com",
  "alprophysioclinic.com": "https://alprophysioclinic.com",
  "quwwa health": "https://quwwahealth.com",
  "quwwa": "https://quwwahealth.com",
  "quwwahealth": "https://quwwahealth.com",
  "quwwahealth.com": "https://quwwahealth.com",
  "market scope": "https://market-scope-ten.vercel.app",
  "market-scope-ten.vercel.app": "https://market-scope-ten.vercel.app",
  "edit flow pro": "https://edit-flow-pro.vercel.app",
  "edit-flow-pro.vercel.app": "https://edit-flow-pro.vercel.app",
  "secure net": "https://secure-net-tau.vercel.app",
  "secure-net-tau.vercel.app": "https://secure-net-tau.vercel.app",
  "smart study": "https://smart-study-eta-seven.vercel.app",
  "smart-study-eta-seven.vercel.app": "https://smart-study-eta-seven.vercel.app",
  "income tracker": "https://income-tracker-gray.vercel.app",
  "income-tracker-gray.vercel.app": "https://income-tracker-gray.vercel.app",
  "pass guard": "https://pass-guard-brown.vercel.app",
  "pass-guard-brown.vercel.app": "https://pass-guard-brown.vercel.app",
  "secure vault": "https://secure-vault-blond.vercel.app",
  "secure-vault-blond.vercel.app": "https://secure-vault-blond.vercel.app",
  "bookdrop": "https://bookdrop-delta.vercel.app",
  "bookdrop-delta.vercel.app": "https://bookdrop-delta.vercel.app",
  "tournaforge": "https://tourna-forge.vercel.app",
  "tourna-forge.vercel.app": "https://tourna-forge.vercel.app",
  "placement pro": "https://placement-pro-alpha.vercel.app",
  "placement-pro-alpha.vercel.app": "https://placement-pro-alpha.vercel.app",
  "tutor near": "https://tutor-near.vercel.app",
  "tutor-near.vercel.app": "https://tutor-near.vercel.app",
  "estate value": "https://estate-value.vercel.app",
  "estate-value.vercel.app": "https://estate-value.vercel.app",
  "cert chain": "https://cert-chain-gilt.vercel.app",
  "cert-chain-gilt.vercel.app": "https://cert-chain-gilt.vercel.app",
  "bitebox": "https://bite-box-three.vercel.app",
  "bite-box-three.vercel.app": "https://bite-box-three.vercel.app",
  "echomate": "https://echomate-chat.vercel.app",
  "echomate-chat.vercel.app": "https://echomate-chat.vercel.app",
  "notes": "https://notes-dt72.onrender.com",
  "notes-dt72.onrender.com": "https://notes-dt72.onrender.com",
  "elite wardrobe": "https://e-commerce-psi-inky-93.vercel.app",
  "e-commerce-psi-inky-93.vercel.app": "https://e-commerce-psi-inky-93.vercel.app",
  "athena ai": "https://athena-ai-five.vercel.app",
  "athena-ai-five.vercel.app": "https://athena-ai-five.vercel.app",
  "devinsights": "https://blog-theta-three-48.vercel.app",
  "devinsights blog": "https://blog-theta-three-48.vercel.app",
  "blog-theta-three-48.vercel.app": "https://blog-theta-three-48.vercel.app",
  "social media platform": "https://social-media-1-2enj.onrender.com",
  "social-media-1-2enj.onrender.com": "https://social-media-1-2enj.onrender.com",
};

// Smart local fallback if all AI APIs hit quota/rate limits
const getFallbackReply = (text) => {
  const lower = text.toLowerCase().trim();

  // 0. Live Portfolio / Domain link inquiry
  if (lower.includes("naveedafraz.live") || lower.includes("portfolio link") || lower.includes("website link") || lower.includes("live link") || lower.includes("portfolio site") || (lower.includes("portfolio") && (lower.includes("link") || lower.includes("url") || lower.includes("site") || lower.includes("live")))) {
    return "Naveed's official personal portfolio is deployed live at [naveedafraz.live](https://naveedafraz.live)! You can explore all his featured systems, client platforms, and contact links right here.";
  }

  // 1. Casual acknowledgments (cool, ok, got it, nice, awesome, etc.)
  if (/^(cool|ok|okay|got it|nice|awesome|great|perfect|good|alright|yep|yes|sure|roger|done|sounds good|sweet)[!.]*$/i.test(lower)) {
    const ackReplies = [
      "Glad that helps! Feel free to ask about any specific project (like [Klipp](https://fx.klipp.in) or [Tech Students](https://techstudents.in)), his tech stack, or work experience.",
      "Awesome! Let me know if you want to see his client platforms, academic systems, or contact details.",
      "Sounds great! Feel free to ask more, or click 'Projects' in the navigation bar to explore his live work.",
      "Happy to help! Let me know if you'd like to dive into any of his platforms or discuss his availability for hire.",
    ];
    return ackReplies[Math.floor(Math.random() * ackReplies.length)];
  }

  // 2. Gratitude (thanks, thank you, appreciate it)
  if (lower.includes("thank") || lower.includes("thx") || lower.includes("appreciate")) {
    return "You're very welcome! If you're interested in collaborating or hiring Naveed, feel free to connect directly on WhatsApp at **+91 6300375450** or email at **naveedafraz2003@gmail.com**!";
  }

  // 3. Technical Skills & Stack
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("backend") || lower.includes("mobile") || lower.includes("frontend") || lower.includes("database")) {
    return "Naveed is a **Full-Stack Developer** skilled in **React, Next.js, React Native, Node.js, Django, and FastAPI**. He builds end-to-end systems with **MySQL (80+ tables), MongoDB, Redis, Docker, and Microservices**! See his production work in [Klipp](https://fx.klipp.in) and [Tech Students](https://techstudents.in).";
  }

  // 4. Projects & Work
  if (lower.includes("project") || lower.includes("work") || lower.includes("system") || lower.includes("klipp") || lower.includes("full-stack") || lower.includes("fullstack") || lower.includes("built") || lower.includes("portfolio")) {
    return (
      "Naveed has engineered 20+ production and client platforms completely end-to-end! Here are his key full-stack projects:\n\n" +
      "• [Klipp](https://fx.klipp.in): AI After Effects CEP plugin & platform with Whisper.cpp captions, multilingual translation & HWID licensing\n" +
      "• [Tech Students](https://techstudents.in): EdTech microservices platform with 6 role-based dashboards & Docker containerization\n" +
      "• [MSE Org](https://mseorg.com): Enterprise e-commerce with dynamic catalogs, Stripe payments & high-traffic architecture\n" +
      "• [Auramiingo](https://auramiingo.com): Social networking & e-commerce platform with real-time chat & Socket.IO\n" +
      "• [CareKov](https://carekov.com): Digital clinic management portal with appointments & digital prescriptions\n" +
      "• [Alpro Physio Clinic](https://alprophysioclinic.com): Patient booking & physiotherapy platform with Resend notifications\n" +
      "• [Quwwa Health](https://quwwahealth.com): Medical wellness & diagnostic consultation system\n\n" +
      "He has also engineered 13+ paid student final-year systems like [Market Scope](https://market-scope-ten.vercel.app), [Edit Flow Pro](https://edit-flow-pro.vercel.app), and [Secure Net](https://secure-net-tau.vercel.app)!"
    );
  }

  // 5. Hiring & Contact
  if (lower.includes("hire") || lower.includes("contact") || lower.includes("available") || lower.includes("job") || lower.includes("freelance") || lower.includes("reach") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp")) {
    return "Yes! Naveed is currently available for full-time engineering roles, freelance software contracts, and end-to-end app development. Reach out on WhatsApp at **+91 6300375450** or email at **naveedafraz2003@gmail.com**!";
  }

  // 6. Education
  if (lower.includes("education") || lower.includes("degree") || lower.includes("college") || lower.includes("bca") || lower.includes("mca") || lower.includes("university")) {
    return "Naveed is pursuing his **MCA (Master of Computer Applications)** at NSAKCET (2026-2028) and completed his **BCA** at St. Joseph Degree College, Hyderabad (2023-2026, CGPA: 8.3).";
  }

  // 7. Experience & Background
  if (lower.includes("experience") || lower.includes("intern") || lower.includes("company") || lower.includes("infiposts") || lower.includes("ms hygiene") || lower.includes("background") || lower.includes("who is")) {
    return "Naveed has 1+ year professional experience across 7 production engagements, including developing [Klipp](https://fx.klipp.in), [Tech Students](https://techstudents.in), full-stack roles at MS Hygiene Industries, and an internship at Infiposts Private Limited.";
  }

  // 8. Greetings
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("greetings")) {
    return "Hello! I am NavBot. How can I help you learn more about Naveed's full-stack engineering, mobile development, or end-to-end system projects today?";
  }

  return "Naveed Afraz is a Full-Stack Engineer specializing in web, mobile apps, microservices, and end-to-end system architecture with 20+ delivered projects. Feel free to ask about his specific platforms, tech stack, or connect on WhatsApp at **+91 6300375450**!";
};

// Autolink bullet points like "* Klipp:" or "1. Klipp:" or "* **Klipp**:" if no markdown link exists
const linkifyBulletProjects = (line) => {
  if (!line) return "";
  return line.replace(
    /(^|\s)([*•-]\s*|\d+\.\s*)(?:\*\*)?([A-Za-z0-9\s]+?)(?:\*\*)?(:|—|-|\s*\()/g,
    (fullMatch, lead, bullet, name, trail) => {
      const cleanName = name.trim();
      const url = PROJECT_URL_MAP[cleanName.toLowerCase()];
      if (url && !line.includes(`](${url})`) && !line.includes(`[${cleanName}]`)) {
        return `${lead}${bullet}[**${cleanName}**](${url})${trail}`;
      }
      return fullMatch;
    }
  );
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I am NavBot • Naveed Afraz's personal AI assistant.\n\nAsk me anything about his full-stack engineering skills, mobile apps, or end-to-end system architecture • I am here to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    // Only scroll down when the user sends a question (to show question + loading spinner).
    // Do NOT scroll to the bottom when the response arrives, so the user can read naturally from the top!
    if (lastMsg && lastMsg.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const formatText = (text) => {
    if (!text) return null;
    // 1. Auto-link bullets like "* Klipp:" or "• Tech Students:" if not already linked
    let preprocessed = linkifyBulletProjects(text);

    // 2. Repair any trailing unclosed markdown link (e.g. if truncated: "[Smart Study](smart-...")
    preprocessed = preprocessed.replace(/\[([^\]]+)\]\(([^)\s]+)$/, (match, name, partialUrl) => {
      const fullUrl = PROJECT_URL_MAP[name.toLowerCase()] || (partialUrl.startsWith("http") ? partialUrl : `https://${partialUrl}`);
      return `[${name}](${fullUrl})`;
    });

    // 3. Tokenize markdown links [Label](url-or-domain), bold **text**, raw URLs http/https, and known domains
    const tokenRegex = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)]+|(?:naveedafraz\.live|www\.naveedafraz\.live|fx\.klipp\.in|techstudents\.in|mseorg\.com|auramiingo\.com|carekov\.com|alprophysioclinic\.com|quwwahealth\.com|[a-z0-9-]+\.vercel\.app|[a-z0-9-]+\.onrender\.com)\b)/g;

    const parts = preprocessed.split(tokenRegex);

    return parts.map((part, i) => {
      if (!part) return null;

      // Markdown Link: [Label](url)
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (match) {
          const label = match[1].replace(/\*\*/g, "").trim();
          let url = match[2];
          if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = `https://${url}`;
          }
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              <span>{label}</span>
              <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5 opacity-90" />
            </a>
          );
        }
      }

      // Bold text: **text** (check if it refers to a known project)
      if (part.startsWith("**") && part.endsWith("**")) {
        const inner = part.slice(2, -2).trim();
        const projUrl = PROJECT_URL_MAP[inner.toLowerCase()];
        if (projUrl) {
          return (
            <a
              key={i}
              href={projUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
              <span>{inner}</span>
              <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5 opacity-90" />
            </a>
          );
        }
        return (
          <strong key={i} className="font-semibold text-cyan-400 dark:text-cyan-300">
            {inner}
          </strong>
        );
      }

      // Raw URL: https://... or http://...
      if (part.startsWith("http://") || part.startsWith("https://")) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 break-all"
          >
            <span>{part.replace(/^https?:\/\//, "")}</span>
            <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5 opacity-90" />
          </a>
        );
      }

      // Bare known domain: fx.klipp.in, techstudents.in, etc.
      if (PROJECT_URL_MAP[part.toLowerCase()] || part.endsWith(".vercel.app") || part.endsWith(".onrender.com")) {
        const url = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 break-all"
          >
            <span>{part}</span>
            <ExternalLink className="w-3 h-3 inline-block shrink-0 ml-0.5 opacity-90" />
          </a>
        );
      }

      return <span key={i}>{part}</span>;
    });
  };

  const fetchGrok = async (userMessages, grokKey, modelName = "grok-2-latest") => {
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...userMessages.map((m) => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    // Using Vite's local dev server proxy to bypass CORS natively!
    const endpoint = "/api/grok/v1/chat/completions";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`HTTP error ${res.status}: ${errData.error?.message || JSON.stringify(errData)}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content;
  };

  const fetchGemini = async (userMessages, geminiKey, modelName = "gemini-2.5-flash") => {
    const contents = userMessages.map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message || `Gemini API error ${data.error.code}`);
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  };


  const sendMessage = async (textToUse) => {
    const trimmed = (textToUse ?? input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Primary API Keys with resilient fallbacks for Vercel production deployments
    const geminiKey =
      import.meta.env.VITE_GEMINI_API_KEY ||
      (typeof atob === "function"
        ? atob("QVEuQWI4Uk42S096MkNIUWZzdGlYRFg3SWlYbUhmWjFwWktUSWVRTklkWi1HMVEzaGZ6aXc=")
        : "");
    const grokKey =
      import.meta.env.VITE_GROK_API_KEY ||
      (typeof atob === "function"
        ? atob("eGFpLTJTTTU2bHpkdVF1dVFYR3NLaWVBSzVselJERTF3ZE05OVBhblpWSTlqWkR2bW1ZYUpXQkNMVUNJR3lLQkU4ZmJuTDk0Mm9uRVZhUkwxczM=")
        : "");

    let reply = null;

    // Strategy 1: Gemini 3.6 Flash (Fastest, latest Google AI model, native browser CORS on Vercel & local)
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 3.6 Flash API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-3.6-flash");
      } catch (e) {
        console.warn("NavBot: Gemini 3.6 Flash attempt failed:", e.message);
      }
    }

    // Strategy 2: Gemini 2.5 Flash (Proven stable & fast)
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 2.5 Flash API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-2.5-flash");
      } catch (e) {
        console.warn("NavBot: Gemini 2.5 Flash attempt failed:", e.message);
      }
    }

    // Strategy 3: Grok 2 API (xAI - proxied via Vite dev server or vercel.json rewrite)
    if (!reply && grokKey && grokKey.startsWith("xai-")) {
      try {
        console.log("NavBot: Attempting Grok 2 API call...");
        reply = await fetchGrok(updatedMessages, grokKey, "grok-2-latest");
      } catch (e) {
        console.warn("NavBot: Grok 2 attempt failed:", e.message);
      }
    }

    // Strategy 4: Gemini 2.5 Flash Lite
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 2.5 Flash Lite API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-2.5-flash-lite");
      } catch (e) {
        console.warn("NavBot: Gemini 2.5 Flash Lite attempt failed:", e.message);
      }
    }

    // Strategy 5: Local Intelligent Fallback Engine (Seamless user experience for recruiters)
    if (!reply) {
      console.log("NavBot: Using Local Intelligent Fallback Engine");
      reply = getFallbackReply(trimmed);
    }

    setMessages((prev) => [...prev, { role: "model", text: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        title="Chat with NavBot AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ overscrollBehavior: "contain" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-neutral-900/95 dark:bg-[#0c1017]/95 border border-neutral-800 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden overscroll-contain"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white sour-gummy flex items-center gap-1.5">
                    NavBot AI
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-neutral-400">Naveed's Personal Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                  className="w-8 h-8 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#333 transparent",
                overscrollBehavior: "contain",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mb-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${
                      msg.role === "user"
                        ? "bg-cyan-500 text-white rounded-br-none"
                        : "bg-neutral-800/80 border border-neutral-700/60 text-neutral-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, li) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#")) {
                        return (
                          <span
                            key={li}
                            className="font-bold text-cyan-300 text-xs uppercase tracking-wider mt-3 mb-1 block"
                          >
                            {formatText(trimmed.replace(/^#+\s*/, ""))}
                          </span>
                        );
                      }
                      return (
                        <p key={li} className={`break-words [overflow-wrap:anywhere] ${li > 0 ? "mt-1.5" : ""}`}>
                          {formatText(line)}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span className="text-xs text-neutral-400">NavBot is thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !loading && (
              <div
                className="px-4 pb-3 flex gap-2 overflow-x-auto shrink-0"
                style={{ scrollbarWidth: "none" }}
              >
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input & WhatsApp Action */}
            <div className="p-3 border-t border-neutral-800 space-y-2 bg-neutral-900/60 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Naveed..."
                  maxLength={500}
                  className="flex-1 bg-neutral-800/90 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat directly on WhatsApp (+91 6300375450)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

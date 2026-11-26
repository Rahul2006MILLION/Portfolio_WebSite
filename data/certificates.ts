import type { CertificateItem } from "@/types/portfolio";

/**
 * Certificates. Every field below is taken from the certificate document itself; the files in
 * /public/certificates are byte-identical copies of the originals. For PDFs the preview images
 * are direct renders (scripts/certificates/render_pdf_preview.swift); image certificates are
 * shown as uploaded, with only a downscaled card thumbnail added.
 * Display order: featured items first (in this order), then the rest in this order.
 */
export const certificatesData: CertificateItem[] = [
  {
    id: "cert-coursera-supervised-ml",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera",
    authority: "Online course authorized by DeepLearning.AI and Stanford Online · Instructor: Andrew Ng",
    date: "August 30, 2026",
    isoDate: "2026-08-30",
    description:
      "Completed Andrew Ng's foundational course on supervised learning for regression and classification, authorized by DeepLearning.AI and Stanford Online.",
    status: "Completed",
    details: [
      { label: "Offered through", value: "Coursera" },
      { label: "Authorized by", value: "DeepLearning.AI & Stanford Online" },
      { label: "Instructor", value: "Andrew Ng" },
    ],
    original: { href: "/certificates/coursera-supervised-ml-YX052OWWEC9I.pdf", type: "pdf" },
    preview: {
      full: "/certificates/coursera-supervised-ml-YX052OWWEC9I.webp",
      thumb: "/certificates/coursera-supervised-ml-YX052OWWEC9I-thumb.webp",
      width: 2399,
      height: 1854,
    },
    verificationUrl: "https://coursera.org/verify/YX052OWWEC9I",
    featured: true,
    highlight: { label: "Featured · Stanford Online × DeepLearning.AI", accent: "cardinal" },
  },
  {
    id: "cert-visionx-2026-excellence",
    title: "VisionX 2026 — Certificate of Excellence",
    issuer: "Dayananda Sagar University",
    authority: "School of Engineering · Dept. of CSE (AI & ML) · IPCV Project Expo (Image Processing and Computer Vision)",
    date: "November 23, 2026",
    isoDate: "2026-11-23",
    description:
      "Team Excellence Award: our project was adjudged the best in its evaluation panel at VisionX 2026, the department's IPCV Project Expo. Awarded to a four-member team that included N. P. Rahul Jain.",
    status: "Award",
    details: [
      { label: "Award", value: "Excellence Award" },
      { label: "Recipient", value: "Team of four" },
      { label: "Recognition", value: "Best in its evaluation panel" },
      { label: "Venue", value: "DSU, Bengaluru" },
    ],
    original: { href: "/certificates/visionx-2026-certificate-of-excellence.jpg", type: "image" },
    preview: {
      full: "/certificates/visionx-2026-certificate-of-excellence.jpg",
      thumb: "/certificates/visionx-2026-certificate-of-excellence-thumb.webp",
      width: 1470,
      height: 1030,
    },
    featured: true,
    highlight: { label: "Featured achievement · Team award", accent: "evergreen" },
  },
  {
    id: "cert-future-interns-ml",
    title: "Machine Learning Internship",
    issuer: "Future Interns",
    date: "September 15, 2026",
    isoDate: "2026-09-15",
    description:
      "Certificate of completion for a one-month machine-learning internship (CIN FIT/AUG26/ML10406). The internship deliverables are listed under Experience.",
    status: "Completed",
    details: [
      { label: "Duration", value: "1 month" },
      { label: "Period", value: "Aug – Sep 2026" },
    ],
    original: { href: "/certificates/future-interns-ml-internship-FIT-AUG26-ML10406.pdf", type: "pdf" },
    preview: {
      full: "/certificates/future-interns-ml-internship-FIT-AUG26-ML10406.webp",
      thumb: "/certificates/future-interns-ml-internship-FIT-AUG26-ML10406-thumb.webp",
      width: 2399,
      height: 1695,
    },
    featured: false,
  },
  {
    id: "cert-nptel-rtos",
    title: "Real Time Operating System",
    issuer: "NPTEL · IIT Kharagpur",
    authority: "NPTEL Online Certification via SWAYAM",
    date: "Feb – Mar 2026",
    isoDate: "2026-03-31",
    description:
      "Four-week NPTEL course from IIT Kharagpur, completed with a consolidated score of 47% (online assignments 17.42/25, proctored exam 30/75).",
    status: "Completed",
    details: [
      { label: "Duration", value: "4 weeks" },
      { label: "Score", value: "47%" },
      { label: "Credits recommended", value: "2" },
    ],
    original: { href: "/certificates/nptel-real-time-operating-system.pdf", type: "pdf" },
    preview: {
      full: "/certificates/nptel-real-time-operating-system.webp",
      thumb: "/certificates/nptel-real-time-operating-system-thumb.webp",
      width: 2399,
      height: 1718,
    },
    featured: false,
  },
  {
    id: "cert-dsu-fsd-workshop",
    title: "Full Stack Development Workshop",
    issuer: "Dayananda Sagar University",
    authority: "School of Engineering · Department of CSE (AI & ML)",
    date: "April 1–2, 2026",
    isoDate: "2026-04-02",
    description:
      "Two-day departmental workshop with hands-on practice in modern full-stack development technologies.",
    status: "Participation",
    details: [
      { label: "Format", value: "2-day workshop" },
      { label: "Department", value: "CSE (AI & ML)" },
    ],
    original: { href: "/certificates/dsu-full-stack-development-workshop.pdf", type: "pdf" },
    preview: {
      full: "/certificates/dsu-full-stack-development-workshop.webp",
      thumb: "/certificates/dsu-full-stack-development-workshop-thumb.webp",
      width: 2397,
      height: 1348,
    },
    featured: false,
  },
  {
    id: "cert-remarkskill-ai-ml-workshop",
    title: "Artificial Intelligence with Machine Learning — Technical Workshop",
    issuer: "Remarkskill Education",
    authority: "In association with Elan & nvision, IIT Hyderabad",
    date: "February 15–16, 2025",
    isoDate: "2025-02-16",
    description:
      "Completed the two-day Remark Skill Technical Workshop on Artificial Intelligence with Machine Learning, held at IIT Hyderabad.",
    status: "Completed",
    details: [
      { label: "Format", value: "2-day technical workshop" },
      { label: "Venue", value: "IIT Hyderabad" },
    ],
    original: { href: "/certificates/remarkskill-ai-ml-workshop-iit-hyderabad.jpg", type: "image" },
    preview: {
      full: "/certificates/remarkskill-ai-ml-workshop-iit-hyderabad.jpg",
      thumb: "/certificates/remarkskill-ai-ml-workshop-iit-hyderabad-thumb.webp",
      width: 2000,
      height: 1394,
    },
    featured: false,
  },
  {
    id: "cert-aarambh-hackathon",
    title: "AARAMBH – The Beginning Hackathon",
    issuer: "Tech Vedas, Dayananda Sagar University",
    authority: "Technical club of the Dept. of CSE (AI & DS), School of Engineering",
    date: "November 2–3, 2026",
    isoDate: "2026-11-03",
    description: "Participated in a 36-hour hackathon organised by the Tech Vedas technical club.",
    status: "Participation",
    details: [
      { label: "Format", value: "36-hour hackathon" },
      { label: "Organizer", value: "Tech Vedas" },
    ],
    original: { href: "/certificates/aarambh-hackathon-participation.pdf", type: "pdf" },
    preview: {
      full: "/certificates/aarambh-hackathon-participation.webp",
      thumb: "/certificates/aarambh-hackathon-participation-thumb.webp",
      width: 2400,
      height: 1696,
    },
    featured: false,
  },
];

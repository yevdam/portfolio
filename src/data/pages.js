import { githubVideo } from "./media.js";

export const pages = {
  "/work": {
    eyebrow: "Research / healthcare / technology",
    title: "Work that asks\nbetter questions.",
    introduction:
      "My strongest work sits where computation, biology, and patient care meet. These are the experiences that have taught me how to investigate carefully and contribute to a team.",
    featuredLabel: "Selected work",
    featuredTitle: "The projects that shaped me most",
    featured: [
      {
        title: "NanoExplorer",
        organization: "University of Texas at Dallas",
        period: "June to July 2026",
        description:
          "Working with Dr. Andres Cisneros on computational methods for chemical and biochemical systems, including enzymatic reaction mechanisms, cancer biomarkers, and supporting software.",
        tags: ["Computational chemistry", "Research", "Software"],
        galleryDescription: "A photograph and presentation video from the NanoExplorer program.",
        media: [
          {
            type: "image",
            src: "/assets/nanoexplorer-presentation.jpg",
            alt: "Adam holding his NanoExplorer certificate after presenting his computational chemistry research",
            label: "NanoExplorer presentation",
            meta: "01 / Photograph",
          },
          {
            type: "video",
            src: githubVideo("cisneros-research-presentation.mp4"),
            poster: "/assets/cisneros-presentation-poster.jpg",
            label: "Research presentation video",
            meta: "02 / Video · 6:29",
          },
        ],
        link: "https://cisnerosres.utdallas.edu/",
        linkLabel: "Visit the Cisneros Research Group",
        icon: "research",
      },
      {
        title: "Viral infection modeling",
        organization: "Texas Christian University",
        period: "June to September 2025",
        description:
          "Used an NVIDIA GPU-based model of VSV infection to test how different starting amounts of virus changed its spatial spread through simulated tissue.",
        tags: ["Mathematical modeling", "GPU simulation", "Virology"],
        link: "https://personal.tcu.edu/hdobrovolny/",
        linkLabel: "Visit Dr. Dobrovolny’s site",
        icon: "code",
      },
      {
        title: "Nanomaterials research",
        organization: "Texas Christian University",
        period: "June to August 2024",
        description:
          "Classified cell images as live, apoptotic, or necrotic to support AI research in a lab developing biomedical imaging, sensing, and drug-delivery applications.",
        tags: ["Biomedical imaging", "AI training data", "Nanomaterials"],
        link: "https://personal.tcu.edu/anaumov/index.html#/",
        linkLabel: "Visit Dr. Naumov’s site",
        icon: "microscope",
      },
      {
        title: "Endoscopy Technologist",
        organization: "Cleburne Endoscopy Center",
        period: "2023 to present",
        description:
          "Work assisting with colonoscopies and upper endoscopies, collecting pathology specimens, performing high-level disinfection, maintaining reprocessing equipment, and turning over procedure rooms.",
        tags: ["Clinical work", "Patient care", "Equipment reprocessing"],
        galleryDescription: "A photograph from clinical work at Cleburne Endoscopy Center.",
        media: [
          {
            type: "image",
            src: "/assets/endoscopy-technologist.jpg",
            alt: "Adam preparing endoscopy equipment in a procedure room at Cleburne Endoscopy Center",
            label: "Procedure room preparation",
            meta: "01 / Photograph",
          },
        ],
        icon: "clinical",
      },
    ],
    detailsTitle: "More experience",
    details: [
      {
        title: "Software projects",
        organization: "GitHub",
        period: "Ongoing",
        description:
          "Build and maintain projects spanning music, news, marketplaces, data mining, and automation using Python, Java, JavaScript, Lua, and HTML.",
        tags: ["Python", "Java", "JavaScript", "Lua", "HTML"],
        link: "https://github.com/yevdam",
        linkLabel: "View GitHub",
        icon: "code",
      },
    ],
  },

  "/achievements": {
    eyebrow: "Leadership / service / discipline",
    title: "Milestones earned\nover time.",
    introduction:
      "The achievements I value most came from sustained effort: serving my community, practicing a craft, and helping a team improve.",
    featuredLabel: "Selected achievements",
    featuredTitle: "The milestones that matter most",
    featured: [
      {
        title: "Centenary Society Awardee",
        organization: "Trinity Valley School",
        period: "Earned in two years",
        description:
          "Recognized for completing more than 100 hours of community service, then continued volunteering beyond the award threshold.",
        tags: ["Community service", "167.5 school approved hours"],
        icon: "service",
      },
      {
        title: "Youth Team Captain",
        organization: "BlueWave Weightlifting",
        period: "2024 to present",
        description:
          "Compete in USA Weightlifting events and support teammates through warm-ups, equipment setup, communication, technique, safety, and sportsmanship.",
        tags: ["Olympic weightlifting", "Team leadership", "USAW events"],
        link: "/weightlifting",
        linkLabel: "See competition moments",
        icon: "lifting",
      },
      {
        title: "AP Scholar with Honor",
        organization: "College Board",
        period: "2026",
        description:
          "Recognized by the College Board for strong performance across multiple AP examinations.",
        tags: ["AP Scholar with Honor", "Academic achievement"],
        icon: "award",
      },
    ],
    detailsTitle: "Leadership in practice",
    details: [
      {
        title: "Karate Black Belt & Youth Leader",
        organization: "TXBBA",
        period: "Six-year progression",
        description:
          "Earned a black belt and joined the Masters program, training and supervising lower-rank students while encouraging their technical and personal growth.",
        tags: ["Black belt", "Mentorship", "Discipline"],
        icon: "discipline",
      },
      {
        title: "School Service Award",
        organization: "Trinity Valley School",
        period: "40-hour requirement",
        description:
          "Earned by completing at least 40 hours of service specifically for Trinity Valley School.",
        tags: ["School service", "40 hours", "Community contribution"],
        icon: "service",
      },
      {
        title: "Founding Member",
        organization: "BBYO Fort Worth",
        period: "2024 to present",
        description:
          "Helped establish BBYO Fort Worth as part of the North Texas/Oklahoma region, creating another place for local Jewish teens to connect and participate.",
        tags: ["Community building", "Founding member"],
        icon: "community",
      },
      {
        title: "YMSL Chapter Leadership",
        organization: "Young Men’s Service League",
        period: "2023 to present",
        description:
          "Served as chapter historian, joined the slating committee, and later contributed to the life skills committee while volunteering throughout Fort Worth. This year, I am on the Philanthropy committee.",
        tags: ["Historian", "Slating", "Life skills"],
        link: "https://chapters.ymsl.org/chapter/wranglers",
        linkLabel: "Visit YMSL Wranglers",
        icon: "service",
      },
    ],
  },

  "/creative": {
    eyebrow: "Code / music / experiments",
    title: "Ideas made\ntangible.",
    introduction:
      "I like making things that turn curiosity into something usable, whether that means a working repository or a piece of music performed for an audience.",
    featuredLabel: "Creative practice",
    featuredTitle: "Two ways I keep making",
    featured: [
      {
        title: "Independent software projects",
        organization: "GitHub",
        period: "Ongoing",
        description:
          "Maintain repositories for music, news, marketplaces, data mining, and automation across several programming languages.",
        tags: ["Python", "Java", "JavaScript", "Lua", "HTML"],
        link: "https://github.com/yevdam",
        linkLabel: "View GitHub",
      },
      {
        title: "Piano performance",
        organization: "Independent study",
        period: "Eight years",
        description:
          "Studied piano continuously, refining technique and musicianship through regular practice and performances in local recitals.",
        tags: ["Piano", "Performance", "Practice"],
      },
    ],
    detailsTitle: "What connects the work",
    details: [
      {
        title: "Build, test, refine",
        organization: "Personal approach",
        period: "Always in progress",
        description:
          "Both coding and piano reward the same habits: breaking difficult problems into smaller parts, noticing details, and returning to the work until it feels right.",
        tags: ["Iteration", "Craft", "Curiosity"],
      },
    ],
  },

  "/about": {
    eyebrow: "Fort Worth / Class of 2027",
    title: "A little more\nabout me.",
    introduction:
      "I’m a Trinity Valley School student interested in technology, medicine, research, service, and the places where those fields overlap.",
    featuredLabel: "At a glance",
    featuredTitle: "School, interests, and direction",
    featured: [
      {
        title: "Trinity Valley School",
        organization: "Fort Worth, Texas",
        period: "Class of 2027",
        description:
          "A student balancing research, clinical experience, technical projects, athletics, music, and community service.",
        tags: ["GPA 3.8", "ACT 33", "SAT 1420"],
      },
      {
        title: "Science with a human purpose",
        organization: "Current direction",
        period: "Still exploring",
        description:
          "Most drawn to work where computation can improve how we understand disease, deliver care, or make useful information easier to reach.",
        tags: ["Technology", "Healthcare", "Research"],
      },
      {
        title: "Community participation",
        organization: "Fort Worth and beyond",
        period: "2020 to present",
        description:
          "Volunteer, organize, and help build communities through GI Aid, B’nai B’rith, BBYO, YMSL, healthcare programs, and local service organizations.",
        tags: ["Service", "Leadership", "Community"],
      },
    ],
    detailsTitle: "Skills and interests",
    details: [
      {
        title: "Technical toolkit",
        organization: "Software development",
        period: "Hands-on",
        description:
          "Work across Python, Java, JavaScript, Lua, and HTML in projects involving automation, data mining, media, and online marketplaces.",
        tags: ["Python", "Java", "JavaScript", "Lua", "HTML"],
        link: "https://github.com/yevdam",
        linkLabel: "View GitHub",
      },
      {
        title: "Beyond the lab",
        organization: "Long-term pursuits",
        period: "Ongoing",
        description:
          "Pianist, karate black belt, youth mentor, and competitive Olympic weightlifter serving as captain of the BlueWave youth team.",
        tags: ["Piano", "Karate", "Weightlifting", "Mentorship"],
      },
    ],
  },
};

const REQUIREMENT_KEYWORDS = [
  { keyword: "JavaScript", aliases: ["JavaScript"], weight: 2 },
  { keyword: "TypeScript", aliases: ["TypeScript", "TS"], weight: 2 },
  { keyword: "Python", aliases: ["Python"], weight: 2 },
  { keyword: "Java", aliases: ["Java"], weight: 2 },
  { keyword: "C++", aliases: ["C++"], weight: 2 },
  { keyword: "C#", aliases: ["C#"], weight: 2 },
  { keyword: "Rust", aliases: ["Rust"], weight: 2 },
  { keyword: "PHP", aliases: ["PHP"], weight: 2 },
  { keyword: "Ruby", aliases: ["Ruby"], weight: 2 },
  { keyword: "Swift", aliases: ["Swift"], weight: 2 },
  { keyword: "Kotlin", aliases: ["Kotlin"], weight: 2 },
  { keyword: "Dart", aliases: ["Dart"], weight: 2 },
  { keyword: "MATLAB", aliases: ["MATLAB"], weight: 2 },
  { keyword: "React", aliases: ["React", "React.js", "ReactJS"], weight: 2 },
  { keyword: "Angular", aliases: ["Angular"], weight: 2 },
  { keyword: "Vue", aliases: ["Vue", "Vue.js", "VueJS"], weight: 2 },
  { keyword: "Node.js", aliases: ["Node.js", "NodeJS"], weight: 2 },
  { keyword: ".NET", aliases: [".NET", "dotnet"], weight: 2 },
  { keyword: "SQL", aliases: ["SQL"], weight: 2 },
  { keyword: "MongoDB", aliases: ["MongoDB"], weight: 2 },
  { keyword: "AWS", aliases: ["AWS", "Amazon Web Services"], weight: 2 },
  { keyword: "Azure", aliases: ["Azure", "Microsoft Azure"], weight: 2 },
  { keyword: "GCP", aliases: ["GCP", "Google Cloud Platform"], weight: 2 },
  { keyword: "Docker", aliases: ["Docker"], weight: 2 },
  { keyword: "Kubernetes", aliases: ["Kubernetes", "K8s"], weight: 2 },
  { keyword: "Figma", aliases: ["Figma"], weight: 2 },
  { keyword: "Git", aliases: ["Git"], weight: 2 },
  { keyword: "REST API", aliases: ["REST API", "RESTful API"], weight: 2 },
  { keyword: "GraphQL", aliases: ["GraphQL"], weight: 2 },
  { keyword: "Machine Learning", aliases: ["Machine Learning", "ML"], weight: 2 },
  { keyword: "Data Analysis", aliases: ["Data Analysis", "Data Analytics"], weight: 2 },
  { keyword: "Cybersecurity", aliases: ["Cybersecurity", "Cyber Security"], weight: 2 },
  { keyword: "Linux", aliases: ["Linux"], weight: 2 },
  { keyword: "Salesforce", aliases: ["Salesforce"], weight: 2 },
  { keyword: "Power BI", aliases: ["Power BI"], weight: 2 },
  { keyword: "Tableau", aliases: ["Tableau"], weight: 2 },
  { keyword: "Jest", aliases: ["Jest"], weight: 2 },
  { keyword: "Playwright", aliases: ["Playwright"], weight: 2 },
  { keyword: "Spring Boot", aliases: ["Spring Boot"], weight: 2 },
  { keyword: "Django", aliases: ["Django"], weight: 2 },
  { keyword: "Flask", aliases: ["Flask"], weight: 2 },
  { keyword: "Express.js", aliases: ["Express.js", "ExpressJS"], weight: 2 },
  { keyword: "PostgreSQL", aliases: ["PostgreSQL", "Postgres"], weight: 2 },
  { keyword: "MySQL", aliases: ["MySQL"], weight: 2 },
  { keyword: "Redis", aliases: ["Redis"], weight: 2 },
  { keyword: "Terraform", aliases: ["Terraform"], weight: 2 },
  { keyword: "Jenkins", aliases: ["Jenkins"], weight: 2 },
  { keyword: "CI/CD", aliases: ["CI/CD", "continuous integration", "continuous delivery"], weight: 2 },
  { keyword: "Next.js", aliases: ["Next.js", "NextJS"], weight: 2 },
  { keyword: "Ruby on Rails", aliases: ["Ruby on Rails", "Rails"], weight: 2 },
  { keyword: "Communication", aliases: ["Communication"], weight: 1 },
  { keyword: "Written communication", aliases: ["Written communication"], weight: 1 },
  { keyword: "Verbal communication", aliases: ["Verbal communication"], weight: 1 },
  { keyword: "Teamwork", aliases: ["Teamwork"], weight: 1 },
  { keyword: "Collaboration", aliases: ["Collaboration"], weight: 1 },
  { keyword: "Problem solving", aliases: ["Problem solving", "Problem-solving"], weight: 1 },
  { keyword: "Critical thinking", aliases: ["Critical thinking"], weight: 1 },
  { keyword: "Analytical thinking", aliases: ["Analytical thinking"], weight: 1 },
  { keyword: "Leadership", aliases: ["Leadership"], weight: 1 },
  { keyword: "Adaptability", aliases: ["Adaptability"], weight: 1 },
  { keyword: "Time management", aliases: ["Time management"], weight: 1 },
  { keyword: "Project management", aliases: ["Project management"], weight: 1 },
  { keyword: "Stakeholder management", aliases: ["Stakeholder management"], weight: 1 },
  { keyword: "Customer service", aliases: ["Customer service"], weight: 1 },
  { keyword: "Negotiation", aliases: ["Negotiation"], weight: 1 },
  { keyword: "Mentoring", aliases: ["Mentoring"], weight: 1 },
  { keyword: "Attention to detail", aliases: ["Attention to detail"], weight: 1 },
  { keyword: "Decision making", aliases: ["Decision making", "Decision-making"], weight: 1 },
  { keyword: "Creativity", aliases: ["Creativity"], weight: 1 },
  { keyword: "Conflict resolution", aliases: ["Conflict resolution"], weight: 1 },
  { keyword: "English", aliases: ["English"], weight: 1 },
  { keyword: "Hindi", aliases: ["Hindi"], weight: 1 },
  { keyword: "Telugu", aliases: ["Telugu"], weight: 1 },
  { keyword: "Tamil", aliases: ["Tamil"], weight: 1 },
  { keyword: "Kannada", aliases: ["Kannada"], weight: 1 },
  { keyword: "Malayalam", aliases: ["Malayalam"], weight: 1 },
  { keyword: "Bengali", aliases: ["Bengali"], weight: 1 },
  { keyword: "Marathi", aliases: ["Marathi"], weight: 1 },
  { keyword: "Gujarati", aliases: ["Gujarati"], weight: 1 },
  { keyword: "Urdu", aliases: ["Urdu"], weight: 1 },
  { keyword: "Spanish", aliases: ["Spanish"], weight: 1 },
  { keyword: "French", aliases: ["French"], weight: 1 },
  { keyword: "German", aliases: ["German"], weight: 1 },
  { keyword: "Japanese", aliases: ["Japanese"], weight: 1 },
  { keyword: "Mandarin Chinese", aliases: ["Mandarin Chinese"], weight: 1 },
];

function containsKeyword(text, aliases) {
  return aliases.some((alias) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i").test(text);
  });
}

export function scoreResumeMatch(jobDescription, resumeText) {
  if (typeof jobDescription !== "string" || typeof resumeText !== "string") {
    throw new TypeError("Job description and resume text must be strings.");
  }

  const requirements = REQUIREMENT_KEYWORDS.filter(({ aliases }) => containsKeyword(jobDescription, aliases));
  if (requirements.length === 0) {
    return {
      score: null,
      matchedKeywords: [],
      missingKeywords: [],
      totalRequirements: 0,
      message: "No supported skills or requirements were detected in the job description, so a match score cannot be calculated.",
    };
  }

  const matchedKeywords = requirements
    .filter(({ aliases }) => containsKeyword(resumeText, aliases))
    .map(({ keyword }) => keyword);
  const missingKeywords = requirements
    .filter(({ aliases }) => !containsKeyword(resumeText, aliases))
    .map(({ keyword }) => keyword);
  const totalWeight = requirements.reduce((sum, { weight }) => sum + weight, 0);
  const matchedWeight = requirements
    .filter(({ keyword }) => matchedKeywords.includes(keyword))
    .reduce((sum, { weight }) => sum + weight, 0);

  return {
    score: Math.round((matchedWeight / totalWeight) * 100),
    matchedKeywords,
    missingKeywords,
    totalRequirements: requirements.length,
    message: "This is a transparent keyword-coverage estimate, not a hiring recommendation or a guaranteed score from every ATS.",
  };
}

export function getResumeScoringText(resumeData) {
  const entries = (key, fields) => Array.isArray(resumeData[key])
    ? resumeData[key].flatMap((entry) => fields.map((field) => entry?.[field]))
    : [];
  const values = [
    ...entries("experiences", ["position"]),
    ...entries("education", ["degree", "field"]),
    ...entries("certifications", ["name", "skills"]),
    ...entries("achievements", ["description"]),
    ...entries("projects", ["name", "techStack", "description"]),
    ...entries("skills", ["value"]),
  ];
  return values.filter((value) => typeof value === "string").join("\n");
}

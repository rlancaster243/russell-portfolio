import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Award,
  Code,
  Database,
  Brain,
  TrendingUp,
  ChevronDown,
  BarChart3
} from "lucide-react";
import SkillsRadarChart from "@/components/SkillsRadarChart";
import CertificationsTimeline from "@/components/CertificationsTimeline";
import SkillsDistributionChart from "@/components/SkillsDistributionChart";

export default function Home() {
  const certifications = [
    {
      title: "Deep Learning Fundamentals Lab Unit 1",
      organization: "WorldQuant University",
      date: "Sep 2025",
      skills: ["Deep Learning", "Python Programming"],
      category: "Data Science"
    },
    {
      title: "Advanced Machine Learning Operations",
      organization: "Databricks",
      date: "May 2025",
      skills: ["Machine Learning", "MLOps"],
      category: "Data Engineering"
    },
    {
      title: "Applied AI Lab: Deep Learning for Computer Vision",
      organization: "WorldQuant University",
      date: "May 2025",
      skills: ["Computer Vision", "Deep Learning"],
      category: "Data Science"
    },
    {
      title: "BCG - Data Science Job Simulation",
      organization: "Forage",
      date: "May 2025",
      skills: ["Data Science", "Business Analytics"],
      category: "Data Science"
    },
    {
      title: "Career Essentials in Data Analysis by Microsoft and LinkedIn",
      organization: "Microsoft",
      date: "May 2025",
      skills: ["Data Analysis", "Data Visualization"],
      category: "Data Analysis"
    },
    {
      title: "Learning Data Analytics: Extending and Applying Core Knowledge",
      organization: "LinkedIn",
      date: "May 2025",
      skills: ["Data Analytics", "Advanced Analytics"],
      category: "Data Analysis"
    },
    {
      title: "Data Science Bootcamp",
      organization: "Hasso Plattner Institute",
      date: "May 2025",
      skills: ["Data Science", "Python", "Statistics"],
      category: "Data Science"
    },
    {
      title: "Academy Accreditation - Databricks Fundamentals",
      organization: "Databricks",
      date: "May 2025",
      skills: ["Databricks", "Big Data"],
      category: "Data Engineering"
    },
    {
      title: "Academy Accreditation - Generative AI Fundamentals",
      organization: "Databricks",
      date: "May 2025",
      skills: ["Generative AI", "Machine Learning"],
      category: "Data Science"
    },
    {
      title: "US Equities Bootcamp",
      organization: "QuantConnect",
      date: "Sep 2025",
      skills: ["Quantitative Analytics", "Financial Data"],
      category: "Data Analysis"
    },
    {
      title: "Automated Trading with IBridgePy",
      organization: "Quantra",
      date: "May 2025",
      skills: ["Algorithmic Trading", "Python", "Data Analysis"],
      category: "Data Science"
    },
    {
      title: "Citi - Markets Quantitative Analysis Job Simulation",
      organization: "Forage",
      date: "May 2025",
      skills: ["Quantitative Analysis", "Financial Modeling"],
      category: "Data Analysis"
    },
    {
      title: "JPMorgan Chase - Quantitative Research Job Simulation",
      organization: "Forage",
      date: "May 2025",
      skills: ["Quantitative Research", "Data Analysis"],
      category: "Data Analysis"
    },
    {
      title: "Knowledge Graphs - Foundations and Applications",
      organization: "Hasso Plattner Institute",
      date: "May 2025",
      skills: ["Knowledge Graphs", "Data Structures"],
      category: "Data Engineering"
    },
    {
      title: "Discounted Cash Flow Modeling",
      organization: "Wall Street Oasis",
      date: "May 2025",
      skills: ["Financial Modeling", "Data Analysis"],
      category: "Data Analysis"
    },
    {
      title: "BCG - GenAI Job Simulation",
      organization: "Forage",
      date: "May 2025",
      skills: ["Generative AI", "AI Applications"],
      category: "Data Science"
    }
  ];

  const projects = [
    {
      title: "Faith-Based Survey Intelligence Dashboard",
      description: "Developed and deployed a comprehensive Streamlit dashboard integrating data from the Pew Research Center's 2024 Religious Landscape Study, providing real-time insights into religious trends across demographics with AI-powered pattern recognition.",
      technologies: ["Python", "Streamlit", "Pandas", "Plotly", "Google Gemini API"],
      highlights: [
        "Built interactive multi-page dashboard with advanced filtering",
        "Implemented statistical analysis features including correlation matrices and chi-square tests",
        "Created AI-powered insights for automated pattern recognition",
        "Processed survey responses from 5,600+ participants"
      ]
    },
    {
      title: "Credit Default Prediction",
      description: "Built a complete machine learning pipeline for predicting credit default risk using the UCI Credit Card dataset, featuring XGBoost, Random Forest, and Logistic Regression models with SHAP explainability.",
      technologies: ["Python", "XGBoost", "Random Forest", "Streamlit", "SHAP"],
      highlights: [
        "XGBoost achieved ROC AUC of 0.776",
        "Interactive threshold control for dynamic risk management",
        "Real-time confusion matrix and metrics visualization",
        "Deployed through Streamlit with intuitive dashboard"
      ]
    },
    {
      title: "Steam KPI Intelligence (SKI)",
      description: "Full-stack data science project predicting expected owners and success probability for game studios using supervised learning with comprehensive explainability.",
      technologies: ["Python", "Gradient Boosting", "LIME", "PDP", "ICE"],
      highlights: [
        "Supervised learning pipeline for regression and classification",
        "Dashboard for batch scoring with prediction explanations",
        "Cross-validated hyperparameter search",
        "Comprehensive explainability stack"
      ]
    },
    {
      title: "Machine Learning Trading Strategy",
      description: "End-to-end development of a machine learning-driven equity trading strategy using Random Forest classifier trained on 14 engineered features with monthly rebalancing.",
      technologies: ["Python", "QuantConnect", "Random Forest", "Financial Analysis"],
      highlights: [
        "Random Forest classifier with 14 engineered features",
        "Monthly rebalancing framework",
        "Backtested on QuantConnect platform",
        "Academic research to live implementation"
      ]
    },
    {
      title: "Thematic Rotation Trading Strategy",
      description: "Systematic allocation framework rotating capital across Technology, Defense, Nuclear, and Finance themes using cross-sectional momentum, regime filters, and volatility targeting.",
      technologies: ["Python", "QuantConnect", "Financial Modeling", "Risk Management"],
      highlights: [
        "Cross-sectional momentum strategy",
        "Regime filters and volatility targeting",
        "Backtests from 2018-2025",
        "Multi-theme systematic allocation"
      ]
    }
  ];

  const skills = {
    "Programming & Tools": ["Python", "R", "SQL", "Jupyter", "Git", "GitHub"],
    "Machine Learning": ["XGBoost", "Random Forest", "Deep Learning", "PyTorch", "scikit-learn", "TensorFlow"],
    "Data Engineering": ["Databricks", "Azure", "AWS", "Big Data", "ETL Pipelines", "Data Warehousing"],
    "Data Analysis": ["Pandas", "NumPy", "Statistical Analysis", "A/B Testing", "Hypothesis Testing"],
    "Visualization": ["Plotly", "Streamlit", "Tableau", "Power BI", "Matplotlib", "Seaborn"],
    "Finance & Quant": ["QuantConnect", "Financial Modeling", "Risk Management", "Algorithmic Trading", "Portfolio Management"]
  };

  // Data for D3.js charts
  const skillsRadarData = [
    { skill: "Python", level: 95 },
    { skill: "Machine Learning", level: 90 },
    { skill: "Data Analysis", level: 92 },
    { skill: "SQL", level: 85 },
    { skill: "Data Viz", level: 88 },
    { skill: "Cloud (AWS/Azure)", level: 75 },
    { skill: "Finance", level: 80 },
    { skill: "Statistics", level: 87 }
  ];

  const certificationsTimelineData = [
    { year: 2023, count: 15 },
    { year: 2024, count: 45 },
    { year: 2025, count: 70 }
  ];

  const skillsDistributionData = [
    { category: "Data Science", count: 6 },
    { category: "ML/AI", count: 6 },
    { category: "Data Engineering", count: 6 },
    { category: "Programming", count: 6 },
    { category: "Visualization", count: 6 },
    { category: "Finance", count: 6 }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold gradient-text">Russell Lancaster</div>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('analytics')} className="hover:text-primary transition-colors">Analytics</button>
              <button onClick={() => scrollToSection('certifications')} className="hover:text-primary transition-colors">Certifications</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <img 
                  src="/profile.png" 
                  alt="Russell Lancaster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">Russell Lancaster</span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground">
                <span>Data Professional</span>
                <span>🇹🇹 🇺🇸</span>
                <span>|</span>
                <span>God First in Everything ✝️</span>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Data-driven leader with 3+ years of experience specializing in translating complex financial and business challenges into actionable predictive models and strategic insights.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2" onClick={() => scrollToSection('contact')}>
                <Mail className="w-5 h-5" />
                Get in Touch
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://www.linkedin.com/in/russell-lancaster-72b230214/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="https://github.com/rlancaster243" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>

            <button 
              onClick={() => scrollToSection('about')}
              className="mt-12 animate-bounce text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I bridge the gap between advanced quantitative research and practical business solutions, focusing on enhancing risk management, improving operational efficiency, and driving strategic decision-making through rigorous data science.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My expertise spans quantitative modeling, strategic analytics, AI/ML deployment, and data storytelling, with a mission to build systematic, transparent, and high-performance analytical systems.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Key Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary mb-1">Quantitative Modeling</h4>
                  <p className="text-sm text-muted-foreground">Design, validation, and deployment of ML, Statistical, and Time-Series models for forecasting and risk attribution.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Strategic Analytics</h4>
                  <p className="text-sm text-muted-foreground">Applying Economics, Geopolitics, and Financial Theory to analyze macroeconomic regimes and sector dynamics.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">AI/ML Deployment</h4>
                  <p className="text-sm text-muted-foreground">Full data science lifecycle expertise, from feature engineering to deploying scalable models in cloud environments.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Experience
          </h2>
          <div className="space-y-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl">Data Analyst</CardTitle>
                    <CardDescription className="text-lg">NEDCO Trinidad & Tobago</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">Mar 2022 - Oct 2024 · 2 yrs 8 mos</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Conducted comprehensive data extraction and cleaning to ensure data integrity</li>
                  <li>Analyzed data utilizing statistical techniques to identify trends and insights</li>
                  <li>Designed and managed social media campaigns to enhance brand visibility</li>
                  <li>Performed usability testing and UX consulting for websites, improving user engagement</li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">Data Analysis</Badge>
                  <Badge variant="outline">Statistical Analysis</Badge>
                  <Badge variant="outline">Microsoft Excel</Badge>
                  <Badge variant="outline">Dashboards</Badge>
                  <Badge variant="outline">UX Consulting</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            Education
          </h2>
          <div className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl">Master of Science - Financial Engineering</CardTitle>
                    <CardDescription className="text-lg">WorldQuant University</CardDescription>
                  </div>
                  <Badge variant="secondary">Jan 2025 - Oct 2026</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Intensive online program focused on quantitative finance, data science, and risk management. Combines financial theory with practical training in Python, SQL, and machine learning tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Machine Learning</Badge>
                  <Badge variant="outline">Quantitative Finance</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Risk Management</Badge>
                  <Badge variant="outline">Derivatives</Badge>
                  <Badge variant="outline">Portfolio Management</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl">Bachelor of Science - Information Technology</CardTitle>
                    <CardDescription className="text-lg">University of the West Indies, St. Augustine Campus</CardDescription>
                  </div>
                  <Badge variant="secondary">Sep 2017 - May 2021</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive curriculum covering programming, networking, database systems, cybersecurity, and cloud computing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">SQL</Badge>
                  <Badge variant="outline">Database Systems</Badge>
                  <Badge variant="outline">Cybersecurity</Badge>
                  <Badge variant="outline">Cloud Computing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Code className="w-8 h-8 text-primary" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="card-hover flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary">Key Highlights:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section with D3.js Charts */}
      <section id="analytics" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Data Analytics Showcase
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Interactive visualizations demonstrating expertise in data analysis and visualization
          </p>

          <div className="space-y-12">
            {/* Skills Proficiency Radar Chart */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Technical Proficiency Overview</CardTitle>
                <CardDescription className="text-center">
                  Multi-dimensional assessment of core technical competencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsRadarChart data={skillsRadarData} />
              </CardContent>
            </Card>

            {/* Certifications Timeline */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Certification Growth Timeline</CardTitle>
                <CardDescription className="text-center">
                  Progressive accumulation of professional certifications over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CertificationsTimeline data={certificationsTimelineData} />
              </CardContent>
            </Card>

            {/* Skills Distribution */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Skills Distribution by Category</CardTitle>
                <CardDescription className="text-center">
                  Breadth of expertise across data science domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsDistributionChart data={skillsDistributionData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Certifications
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Showcasing {certifications.length} data-focused certifications from 130+ total certifications
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{cert.category}</Badge>
                    <span className="text-xs text-muted-foreground">{cert.date}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                  <CardDescription>{cert.organization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Currently open to opportunities in Data Analysis, Data Science, Quantitative Research, and Information Technology
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/russell-lancaster-72b230214/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://github.com/rlancaster243" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              © 2025 Russell Lancaster. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/russell-lancaster-72b230214/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/rlancaster243" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

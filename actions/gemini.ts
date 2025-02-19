const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "I WILL GIVE YOU A  PEACE OF TEXT EXTRACTED FROM A RESUME\nI WANT YOU TO MAKE SOMW INTERVIEW QUESTIONS  on it for the job position web developer\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Please provide the text extracted from the resume. I need the content to tailor effective interview questions for a web developer position.  I'll be looking for specific skills, projects, and experiences mentioned to create relevant and insightful questions.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "Harshit Mishra harshit - mishra - 29345027a Jaipur, Rajasthan +91 7011962077 harshitmishra.84162@gmail.com https://github.com/Harshit130127 PROFESSIONAL SUMMARY  Third - year B. Tech student in Computer Science & Engineering with strong programming skills i n Python, C, and C++. Experienced in machine learning, web development, and WordPress . Achieved 4 - star rat ing on HackerRank in Python . Proficient in XAMPP and SQL database project development. EDUCATION  Bachelor of Technology (B.Tech.) - Computer Science & Engineering Arya Institute of Engineering , Jaipur [ 2022 - 2026] CGPA: 9. 3 /10  High Secondary - PCM Mahala Residential Public School, Sikar [2022] Percentage : 87.4 SKIILS  Programming Languages : Python , SQL, Javascript , C , C++  Web Dev : Html, CSS, Javascript , Flask  Coursework: DSA, OS, Computer Network ,Software Engineering  ML: Supervised , Unsupervised , N atural Language Processing  ML Toolkit : Pandas , Numpy , Matplotlib , Scikit - learn  S tatistics : Descriptive, Inferential, Predictive Modeling, Distribution  Database : Relational Database ( MyS ql)  Soft Skills: Communication skills , Problem solving, Teamwork INTERNSHIPS AND TRAINING  ML Intern July 2024 – August 2024 iNeuron , Jaipur Worked on “Book Recommendation Web App” Project Worked on data cleaning , model training and combining ML with frontend Authored comprehensive documentation, including architecture, wireframes, and detailed system designs spanning over 50 pa ges .  Trainee July 2024 – August 2024 Learn and Build , Jaipur Gained hands - on experience in Python programming, enhancing coding proficiency and problem solving skills PROJECT S 1. Book Recommendation Web App with ML [ Html, CSS, JS, Python, Flask]  Engineered a machine learning model utilizing the K - Nearest Neighbors (KNN) algorithm to deliver personalized book recommendations based on attributes such as titles, authors, publishers, and ratings.  A comprehensive dataset comprising 11,000 books to train and evaluate the model.  Seamlessly integrated the recommendation system with a user - friendly frontend using the Flask framework. 2. News Updates Website [Html, CSS, JavaScript]  Developed a dynamic website that provides real - time news updates by integrating the Newsorg API using JavaScript.  Crafted an intuitive user interface utilizing HTML for structure, CSS for styling, and JavaScript for functionality.  Executed API calls to fetch news articles based on various queries, enhancing user engagement. C ERTIFICATIONS  Python for Data Science , AI and Development by IBM .  C certification by NPTEL .  Python internship certification by Learn and Build .  C++ and Html certifications by Spoken Tutorials .  Soft Skills certification by NPTEL .\n\n\n\nthis is the text extracted"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "## Interview Questions for Harshit Mishra (Web Developer Position)\n\nThis set of questions probes Harshit's skills and experience based on the provided resume text, focusing on web development aspects while touching on relevant related skills.\n\n**General Web Development Experience:**\n\n* Your resume mentions experience in web development and WordPress. Can you elaborate on your experience with WordPress?  Have you developed custom themes or plugins? What types of WordPress sites have you built?\n* You list HTML, CSS, JavaScript, and Flask as web development skills.  Could you describe a project where you used all these technologies together? What was your role in that project?\n* Your News Updates Website project used the Newsorg API.  Can you describe the process of integrating that API into your website? Did you encounter any challenges, and how did you overcome them?\n* You mention \"proficient in XAMPP.\"  How have you used XAMPP in your web development projects?  What is your understanding of its role in a web development environment?\n* What are your preferred methods for debugging JavaScript code?  Can you walk me through your debugging process?\n\n**Project-Specific Questions:**\n\n* Regarding the Book Recommendation Web App, what steps did you take to ensure the performance and scalability of the application with a dataset of 11,000 books?\n* In the same project, you used the KNN algorithm. Why did you choose this algorithm over other recommendation algorithms? Can you explain the trade-offs involved?\n*  How did you handle user authentication and authorization in the Book Recommendation Web App?\n* For the News Updates Website, how did you handle different screen sizes and ensure responsiveness?\n*  What are some key features you would add to either of these projects if you had more time?\n\n\n**Deeper Dive into Skills:**\n\n* You mention experience with SQL and relational databases (MySQL). Can you describe your experience with database design and writing SQL queries? Could you provide an example of a complex query you have written?\n*  You list several Machine Learning skills and toolkits. How do you see these skills complementing your web development abilities?\n* Your resume highlights strong communication skills. Can you give an example of a time when you had to explain a complex technical concept to a non-technical audience?\n\n**Behavioral Questions:**\n\n*  Describe a time you faced a challenging technical problem in a project. How did you approach the problem, and what was the outcome?\n* How do you stay up-to-date with the latest trends and technologies in web development?\n* Describe your preferred working environment and team dynamics.\n\n\nThese questions aim to assess not only Harshit's technical skills but also his problem-solving abilities, communication skills, and overall fit for the web developer role.  Remember to adjust these questions based on the specific requirements of your open position and the direction of the conversation during the interview.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "ok now i have asked some of the questions to the interviewee, and his stress levels  are high give me three question to be asked"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "1. **\"Thinking back on your projects, is there one you're particularly proud of that you haven't had a chance to discuss yet?  We'd love to hear about it.\"** This question allows the interviewee to shift focus to a positive accomplishment and showcase their passion, potentially easing their stress. It also opens up a new avenue of conversation that might be less technical and more conversational.\n\n2. **\"What are some of your favorite web development tools or technologies to work with, and why?\"**  This question allows the candidate to discuss something they enjoy, moving away from the pressure of being assessed and towards a more relaxed sharing of their interests.  It can provide insights into their preferred work style and areas of expertise.\n\n3. **\"What questions do *you* have for *us* about the role or the company?\"**  This crucial question empowers the interviewee.  It reminds them that the interview is a two-way street and gives them a chance to gather information important to *their* decision-making process.  This shift in control can help alleviate stress and create a more balanced conversation.\n\n\nThese questions aim to create a more comfortable atmosphere while still gathering valuable information. Remember to maintain a friendly and encouraging demeanor throughout the interview to help the candidate feel more at ease.\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
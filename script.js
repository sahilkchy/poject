// NSIT Chatbot JavaScript (Final Colourful + Proper Break Version)

const config = {
  bot_title: 'NSIT Support Assistant',
  welcome_message: "Hello! 👋 I'm your NSIT Bihta Assistant. How can I help you today?"
};

let isTyping = false;

/* ===============================
   MARKDOWN SETTINGS (FIX LINE BREAK)
================================ */
if (typeof marked !== "undefined") {
  marked.setOptions({
    breaks: true
  });
}

/* ===============================
   KNOWLEDGE BASE (UNCHANGED)
================================ */
const knowledgeBase = {
  admission: {
    keywords: ['admission', 'apply', 'application', 'enroll', 'join', 'registration', 'admit'],
    response: `📋 **Admission Information**

**Admission Process:**
• Visit the official admission portal
• Check eligibility criteria for your desired course
• Fill out the online application form
• Upload required documents
• Pay the application fee
• Wait for merit list/selection

**Required Documents:**
• 10th & 12th Mark Sheets
• Transfer Certificate
• Migration Certificate
• Character Certificate
• Passport Size Photographs
• Aadhaar Card
• Category Certificate (if applicable)

**Important Links:**
🔗 Admission Portal: https://www.nsit.in/admission/

For specific queries, please contact the admission office directly.`
  },

  courses: {
    keywords: ['course', 'courses', 'program', 'programmes', 'branch', 'stream', 'degree', 'btech', 'diploma'],
    response: `📚 **Courses Offered at NSIT Bihta**

NSIT Bihta offers various undergraduate and postgraduate programs in engineering and technology.

**Available Programs:**
• B.Tech (Bachelor of Technology)
• Diploma Programs
• BBA & BCA

**Popular Branches:**
• Computer Science & Engineering
• Electronics & Communication
• Mechanical Engineering
• Civil Engineering
• Electrical Engineering

**Course Duration:**
• B.Tech: 4 Years
• Diploma: 3 Years

**For Complete Course Details:**
🔗 Visit: https://www.nsit.in/course/

Contact the academic office for detailed syllabus and curriculum information.`
  },

  fees: {
    keywords: ['fee', 'fees', 'cost', 'payment', 'tuition', 'expense', 'charges', 'fee structure'],
    response: `💰 **Fee Structure Information**

NSIT Bihta has a transparent fee structure for all programs.

**Fee Components:**
• Tuition Fee
• Development Fee
• Laboratory Fee
• Library Fee
• Examination Fee
• Other Miscellaneous Charges

**Payment Modes:**
• Online Payment
• Bank Transfer
• Demand Draft

**Scholarships:**
Various scholarships are available for eligible students based on merit and financial need.

**For Detailed Fee Structure:**
🔗 Visit: https://www.nsit.in/fee-structure/

For payment-related queries, contact the accounts section.`
  },

  facilities: {
    keywords: ['facility', 'facilities', 'campus', 'infrastructure', 'hostel', 'library', 'lab', 'laboratory', 'sports', 'canteen', 'wifi'],
    response: `🏫 **Campus Facilities at NSIT Bihta**

**Academic Facilities:**
• Well-equipped Laboratories
• Central Library with Digital Resources
• Smart Classrooms
• Computer Centers
• Seminar Halls

**Student Amenities:**
• Hostel Accommodation (Boys & Girls)
• Canteen & Cafeteria
• Sports Complex
• Gymnasium
• Wi-Fi Campus

**Other Facilities:**
• Medical Center
• Transportation Services
• Bank/ATM
• Parking Area

**For Complete Facility Details:**
🔗 Visit: https://www.nsit.in/facilities/`
 },

  contact: {
    keywords: ['contact', 'phone', 'email', 'address', 'location'],
    response: `📞 **Contact Information**

**NSIT Bihta**
Netaji Subhas Institute of Technology
Bihta, Bihar, India

**How to Reach:**
• Located in Bihta, near Patna
• Well connected by road and rail
• Nearest Railway Station: Bihta/Patna Junction
• Nearest Airport: Jay Prakash Narayan International Airport, Patna

**Official Website:**
🔗 https://www.nsit.in/

**Contact Page:**
🔗 https://www.nsit.in/contact/

For specific department contacts, please visit the official website`
  },

  studentPortal: {
    keywords: ['student login', 'student portal', 'portal', 'student account', 'erp', 'student erp','student'],
    response: `🎓 **Student Portal Information**

**How to Access Student Portal**
1. Visit: https://student.nsit.in/login
2. Navigate to Student Login/Portal section
3. Enter your credentials (ID and Password)
4. Access your dashboard

**Portal Features:**
• View Academic Records
• Check Attendance
• Download Study Materials
• View Exam Schedule
• Check Results
• Fee Payment Status

**Forgot Password?**
Contact your department or IT helpdesk for password reset.

**First-time Login?**
Use credentials provided during admission.`
  },
  teacherPortal: {
    keywords: ['faculty login', 'faculty portal', 'teacher login', 'staff portal', 'faculty account','teacher'],
    response: `👨‍🏫 **Faculty Portal Information**

**How to Access Faculty Portal:**
1. Visit: https://teachers.academist.app/login
2. Navigate to Faculty Login section
3. Enter your official credentials
4. Access your dashboard

**Portal Features:**
• Attendance Management
• Upload Study Materials
• Grade Entry System
• View Department Notices
• Administrative Functions

**For Login Issues:**
Contact the IT department or administration.`
  },
  placement: {
        keywords: ['placement', 'job', 'career', 'recruitment', 'company', 'hiring', 'interview', 'package', 'salary'],
        response: `💼 **Placement Information**

**Placement Cell:**
NSIT Bihta has an active Training & Placement Cell that facilitates campus recruitment.

**Services Offered:**
• Campus Interviews
• Pre-Placement Training
• Resume Building Workshops
• Mock Interviews
• Industry Interaction Sessions

**Placement Process:**
1. Registration with Placement Cell
2. Pre-Placement Training
3. Company Presentations
4. Written Tests/Online Assessments
5. Technical & HR Interviews
6. Final Selection

For placement-related queries, contact the Training & Placement Officer.

🔗 Visit: https://www.nsit.in/ (Placement Section)`
},
studentPortal: {
    keywords: ['student login', 'student portal', 'portal', 'student account', 'erp', 'student erp','student'],
    response: `🎓 **Student Portal Information**

**How to Access Student Portal**
1. Visit: https://student.nsit.in/login
2. Navigate to Student Login/Portal section
3. Enter your credentials (ID and Password)
4. Access your dashboard

**Portal Features:**
• View Academic Records
• Check Attendance
• Download Study Materials
• View Exam Schedule
• Check Results
• Fee Payment Status

**Forgot Password?**
Contact your department or IT helpdesk for password reset.

**First-time Login?**
Use credentials provided during admission.`
  },
  exam: {
        keywords: ['exam', 'examination', 'result', 'marks', 'grade', 'test', 'semester', 'marksheet', 'schedule'],
        response: `📝 **Examination Information**

**Exam Schedule:**
• Semester exams are conducted as per academic calendar
• Check the notice board for exam dates
• Download admit card from student portal

**Result Declaration:**
• Results are published on the official website
• Check your student portal for detailed marks

**Re-evaluation:**
• Apply through proper channel within deadline
• Submit application with required fee

**Important:**
• Carry valid ID card during exams
• Follow exam hall rules and regulations

🔗 For Updates: https://www.nsit.in/`
      },
      scholarship: {
        keywords: ['scholarship', 'financial aid', 'fee waiver', 'stipend', 'bursary', 'merit scholarship'],
        response: `🎯 **Scholarship Information**

**Available Scholarships:**
• Merit-based Scholarships
• Government Scholarships (SC/ST/OBC)
• National Scholarship Portal Schemes
• Institute Scholarships

**Eligibility:**
• Academic Performance
• Family Income Criteria
• Category-based Reservations

**How to Apply:**
1. Check eligibility criteria
2. Gather required documents
3. Apply through designated portal
4. Submit before deadline

**Documents Required:**
• Income Certificate
• Caste Certificate (if applicable)
• Previous Mark Sheets
• Bank Account Details
• Aadhaar Card

Contact the Scholarship Cell for more details.`
      },
      hostel: {
        keywords: ['hostel', 'accommodation', 'room', 'mess', 'warden', 'boarding', 'stay'],
        response: `🏠 **Hostel Information**

**Hostel Facilities:**
• Separate hostels for boys and girls
• Furnished rooms
• 24/7 Security
• Common Room with TV
• Reading Room
• Mess/Cafeteria

**Hostel Rules:**
• Maintain discipline and decorum
• Follow entry/exit timings
• Keep premises clean
• Report issues to warden

**Mess Facility:**
• Hygienic food
• Vegetarian & Non-vegetarian options
• Fixed meal timings

**For Hostel Allotment:**
Apply through admission process or contact hostel office.

🔗 Facilities: https://www.nsit.in/facilities/`
      },
      about: {
        keywords: ['about', 'nsit', 'college', 'institute', 'university', 'history', 'overview', 'introduction'],
        response: `🏛️ **About NSIT Bihta**

**Netaji Subhas Institute of Technology (NSIT), Bihta**

NSIT Bihta is a prestigious technical institution located in Bihta, Bihar, India. The institute is committed to providing quality technical education and producing skilled professionals.

**Vision:**
To become a center of excellence in technical education and research.

**Mission:**
• Provide quality education in engineering and technology
• Foster innovation and research
• Develop industry-ready professionals
• Contribute to national development

**Key Highlights:**
• Experienced Faculty
• Modern Infrastructure
• Industry Collaborations
• Active Placement Cell
• Vibrant Campus Life

🔗 Official Website: https://www.nsit.in/`
      },
      developer: {
    keywords: ['developer', 'creator', 'who made you', 'who created you', 'about developer', 'about chatbot', 'bot info', 'information about bot'],
    response: `🤖 **About NSIT Bihta Assistant**

NSIT Bihta Assistant is an intelligent web-based chatbot designed to provide quick and accurate information about NSIT Bihta.

━━━━━━━━━━━━━━━━━━━━━━

🎯 **Purpose of the Chatbot**
• Provide instant information to students  
• Assist with admission queries  
• Share details about courses & fees  
• Help with student & faculty portal access  
• Provide placement and scholarship information    

━━━━━━━━━━━━━━━━━━━━━━

🛠 **Technologies Used**
• HTML5  
• Tailwind CSS  
• JavaScript (Vanilla JS)  
• Marked.js (Markdown rendering)  

━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 **Developer Information**

Name: Raunak Chaudhary 
Role: Frontend Developer & Student Innovator  
Specialization: Web Development & UI Design  
Skills: HTML, CSS, JavaScript, Tailwind CSS 

━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 **Developer Information**

Name: Sahil Chaudhary  
Role: Frontend Developer & Student Innovator  
Specialization: Web Development & UI Design  
Skills: HTML, CSS, JavaScript, Tailwind CSS  


━━━━━━━━━━━━━━━━━━━━━━

🌐 For official college details visit:
https://www.nsit.in/

Thank you for using NSIT Bihta Assistant 💙`
  }
  
};


/* ===============================
   RESPONSE GENERATOR
================================ */
function generateResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (const category in knowledgeBase) {
    const data = knowledgeBase[category];
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return data.response;
      }
    }
  }

  if (/^(hi|hello|hey|namaste)/.test(lowerMessage)) {
    return `Hello! 👋 Welcome to NSIT Assistant!

I can help you with:
• Admissions  
• Courses  
• Fees  
• Facilities  
• Student Portal  

What would you like to know?`;
  }

  if (/(thank|thanks)/.test(lowerMessage)) {
    return `You're welcome! 😊`;
  }

  return `Please visit: https://www.nsit.in/

Or ask about:
• Admissions  
• Courses  
• Fees  
• Facilities`;
}


/* ===============================
   ADD MESSAGE (COLOURFUL + BREAK FIX)
================================ */
function addMessage(text, role) {
  const container = document.getElementById('messages-container');

  const wrapper = document.createElement('div');
  wrapper.className = role === 'user'
    ? 'flex justify-end mb-4'
    : 'flex justify-start mb-4';

  const bubble = document.createElement('div');

  if (role === 'user') {
    bubble.className =
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-2xl max-w-md shadow-lg';
    bubble.innerHTML = text;
  } else {
    bubble.className =
      'bg-white border border-gray-200 text-gray-800 px-5 py-4 rounded-2xl max-w-md shadow-lg';

    bubble.innerHTML = `
      <div class="prose prose-sm max-w-none 
                  prose-headings:text-indigo-600
                  prose-strong:text-blue-600
                  prose-a:text-blue-500
                  prose-li:marker:text-indigo-500">
        ${marked.parse(text)}
      </div>
    `;
  }

  wrapper.appendChild(bubble);
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}


/* ===============================
   HANDLE USER MESSAGE
================================ */
async function handleUserMessage(msg) {
  if (!msg.trim() || isTyping) return;
  isTyping = true;

  addMessage(msg, 'user');

  const container = document.getElementById('messages-container');

  const typingDiv = document.createElement('div');
  typingDiv.className = 'flex justify-start mb-4';
  typingDiv.innerHTML = `
    <div class="flex items-center gap-2">
            <span class="text-lg">🎓</span>
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
              <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
              <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
            </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;

  await new Promise(r => setTimeout(r, 800));

  container.removeChild(typingDiv);

  const res = generateResponse(msg);
  addMessage(res, 'bot');

  isTyping = false;
}


/* ===============================
   INIT CHATBOT
================================ */
function initChatbot() {
  document.getElementById('bot-title').textContent = config.bot_title;

  addMessage(config.welcome_message, 'bot');

  document.getElementById('chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    handleUserMessage(input.value);
    input.value = '';
  });

  document.getElementById('clear-chat-btn').onclick = () => {
    document.getElementById('messages-container').innerHTML = '';
    addMessage(config.welcome_message, 'bot');
  };

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.onclick = () => handleUserMessage(btn.innerText);
  });
}


document.addEventListener('DOMContentLoaded', initChatbot);

import Intro from '../../components/Intro/Intro';
import styles from './GetStarted.module.css';
import faqStyles from '../../components/FAQ/FAQ.module.css';  
import ContactForm from '../../components/ContactForm/ContactForm';
import FAQ from '../../components/FAQ/FAQ';

const extraElement = (
  <div className={faqStyles.extraContent}>
    <div className={faqStyles.extraContentGrid}>
      <div className={faqStyles.extraCard}>
        <h4 className={faqStyles.cardTitle}>Learning and Development Program</h4>
        <p className={faqStyles.cardText}>
          A single-day event for 150 participants <br /><br />
          Our team designed and delivered two Facilitated Sessions and one Event Extension for ~$20K USD.
        </p>
      </div>
      <div className={faqStyles.extraCard}>
        <h4 className={faqStyles.cardTitle}>Global Industry Event</h4>
        <p className={faqStyles.cardText}>
          A multi-day program and exhibit for 300 participants <br /><br />
          Our team created two Interactive Installations with Event Extensions for ~$35K USD.
        </p>
      </div>
      <div className={faqStyles.extraCard}>
        <h4 className={faqStyles.cardTitle}>Senior Leadership Summit</h4>
        <p className={faqStyles.cardText}>
          A multi-day event for the 400 top leaders of a large financial institution. <br /><br />
          Our team designed and delivered five Facilitated Sessions, two Interactive Installations, 
          and a full Post-Program Handbook for ~$120K USD.
        </p>
      </div>
    </div>
  </div>
);


const caseStudiesFAQ = [
  {
    question: "What will this cost?",
    answer: "Well, we can’t give an exact quote without knowing a bit more about what you’re working on, but we can confidently say we can add immediate experiential value at a wide range of budgets. That’s kind of our thing.Ultimately, starting a conversation is the best way to know how we can work together. But if it’s helpful, here are a few examples of big and small projects we've recently delivered.",
    extraContent: extraElement, 
  },
  {
    question: "Are there a la carte options?",
    answer: "Sure! Pricing varies depending on shipping costs, audience size, event duration/location, and other variables, but generally speaking: Pricing for Facilitated Sessions starts at $8K USD; Interactive Installations usually start at $12K USD; and Event Extensions start at $3K USD.",
  },
  {
    question: "What if I want to mix different experiences?",
    answer: "Combining in-room Facilitated Sessions with interactive installations outside the room enables Projectory to create a unique and integrated experience for your audience. Multiple experiences generate more output, leading to more meaningful post-event activation. During our discovery process, we’ll be able to curate together the best set of experiences for your event within your budget.",
  },
  {
    question: "Can you create custom experiences?",
    answer: "Absolutely! All our Facilitated Sessions and Interactive Installations started with a specific challenge or objective one of our clients shared with us. Custom designs usually start with a $20K USD investment, but the final price depends on the complexity and materials used. We'll work closely with your team to create something impactful within your budget.",
  },
  {
    question: "Can I do it myself?",
    answer: "Some of our Interactive Installations are easy to ship and build, allowing your team and volunteers to manage them without Projectory staff on-site. We also license some of our Facilitated Session frameworks, so skilled facilitators can run a Projectory session with our tools and canvases after a brief training. Self-service pricing is more economical but requires more involvement from your team. Contact us for pricing details on self-serve options.",
  },
  {
    question: "What discounts can you provide?",
    answer: "Good question! Once we learn about your project, we’ll be able to come back with a few initial ideas. After we get you excited about what we have in mind, we can either send you a budget estimate or work backwards from whatever budget you can invest in this work.",
  },
  {
    question: "Would you consider emceeing my event?",
    answer: "Yes, especially if your agenda already includes a few Projectory Facilitated Sessions. As emcees, we do more than introduce speakers; we connect the dots between sessions and guide the program, taking attendees on a journey from inspiration to action.",
  },
];

const GetStarted = () => {
  return (
    <div className={styles.getStartedWrapper}>
      <Intro
        title="Let’s remind people why it's so valuable to come together!"
        description="Respond the next few questions and we’ll highlight a few products that you might want to consider adding to your program."
        buttonText="Get Started"
        buttonLink="/get-started-form"
      />
      <ContactForm />

      <div className={styles.getInTouch}>
      <h2> Other Ways to Get In Touch </h2>
        <div className={styles.gitWrapper}>
        <div className={`${styles.gitBlock} ${styles.gitBlockLeft}`}>
        <h3>Book a Meeting with Us</h3>
        <p>Tell us about your event, and we'll prepare some initial ideas to discuss.</p>
        <a href="https://calendly.com/oren-/projectory?month=2025-02" target="_blank" rel="noopener noreferrer" className={styles.gitButton}>
          Book a Meeting
        </a>
      </div>
      <div className={`${styles.gitBlock} ${styles.gitBlockRight}`}>
        <h3>Message us on LinkedIn </h3>
        <p>Message and follow us on LinkedIn to receive updates on what we’re up to.</p>
        <a href="https://ca.linkedin.com/company/theprojectory" target="_blank" rel="noopener noreferrer" className={styles.gitButton}>
          Find us on LinkedIn
        </a>
      </div>
        </div>
    </div>


      <div className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      <p>Curious about how Projectory works or what experiences
      are right for you? Below, we’ve answered some of the most common questions to help you get started and make the most of your event.</p>
    </div>

    <div className={styles.faqWrapper}>
      <FAQ faqs={caseStudiesFAQ} />
    </div>
    </div>
  );
};

export default GetStarted;
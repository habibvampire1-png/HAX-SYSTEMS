/**
 * One entry per /for/[slug] landing page. To add an industry, add an entry
 * here — the page, static params and the homepage selector all read from
 * this list.
 *
 * Keep pains and scripts plain and true: no statistics, no integrations, no
 * results we haven't delivered.
 */
export type CallLine = { speaker: "Caller" | "AI receptionist"; text: string };

export type Industry = {
  slug: string;
  /** Label in the homepage selector. */
  label: string;
  /** Used in meta titles, e.g. "AI receptionist for {plural}". */
  plural: string;
  headline: string;
  subhead: string;
  metaDescription: string;
  pains: { title: string; text: string }[];
  /** Heading above the example call. */
  callIntro: string;
  /** An illustrative call, always labelled as an example on the page. */
  callScript: CallLine[];
  /** What the receptionist captures for this trade, shown as a short list. */
  captured: string[];
  /** The HAX system that fits this trade. */
  system: { title: string; text: string };
  faqs: { question: string; answer: string }[];
};

export const industries: Industry[] = [
  {
    slug: "salons",
    label: "Salon & Beauty",
    plural: "salons and beauty businesses",
    headline: "Never miss a booking while you're mid-treatment.",
    subhead:
      "An AI receptionist answers every call, takes the booking details and follows up, so you can stay focused on the client in your chair.",
    metaDescription:
      "An AI receptionist for salons and beauty businesses. Answer every call, capture booking requests and follow up, even when you're mid-treatment.",
    pains: [
      {
        title: "The phone rings mid-treatment",
        text: "You can't stop a colour or a facial to answer. That caller books somewhere else.",
      },
      {
        title: "Enquiries after closing time",
        text: "People look for appointments in the evening. By morning they have already booked.",
      },
      {
        title: "Clients drift away",
        text: "Nobody reminds them to rebook, so a regular quietly stops coming.",
      },
    ],
    callIntro: "How the AI receptionist handles a salon call",
    callScript: [
      { speaker: "AI receptionist", text: "Hello, you've reached the salon. How can I help?" },
      { speaker: "Caller", text: "Hi, I'd like to book a cut and colour." },
      {
        speaker: "AI receptionist",
        text: "Lovely. Which day suits you best, and is there a stylist you prefer?",
      },
      { speaker: "Caller", text: "Saturday morning, with anyone." },
      {
        speaker: "AI receptionist",
        text: "Got it. Can I take your name and a number to confirm?",
      },
    ],
    captured: [
      "Name and phone number",
      "Treatment wanted",
      "Preferred day and time",
      "Stylist preference",
    ],
    system: {
      title: "A receptionist that never leaves the phone",
      text: "Calls are answered, booking requests are captured and clients get a follow-up message, set up around how your salon takes bookings.",
    },
    faqs: [
      {
        question: "Will it replace my receptionist?",
        answer:
          "No. It answers when nobody can, such as mid-treatment or after hours, so no call goes unanswered.",
      },
      {
        question: "Can it handle different treatments?",
        answer:
          "Yes. I set it up with your services, so it asks the right questions for a cut, a colour or a facial.",
      },
      {
        question: "Do I need to change my number?",
        answer: "No. Your clients keep ringing the number they already know.",
      },
    ],
  },
  {
    slug: "aesthetic-clinics",
    label: "Aesthetic Clinic",
    plural: "aesthetic clinics",
    headline: "Every consultation enquiry answered, even when you're with a patient.",
    subhead:
      "An AI receptionist answers calls, captures what the person is interested in and books the consultation, so serious enquiries don't go cold.",
    metaDescription:
      "An AI receptionist for aesthetic clinics. Answer every enquiry, capture treatment interest and book consultations, even during appointments.",
    pains: [
      {
        title: "Calls arrive during treatments",
        text: "You can't leave a patient to answer. The person ringing about a consultation tries another clinic.",
      },
      {
        title: "Enquiries wait too long",
        text: "People comparing clinics often go with whoever replies first.",
      },
      {
        title: "Consultations that never get booked",
        text: "Someone shows interest, nobody follows up, and the booking is lost.",
      },
    ],
    callIntro: "How the AI receptionist handles a clinic call",
    callScript: [
      { speaker: "AI receptionist", text: "Hello, you've reached the clinic. How can I help today?" },
      { speaker: "Caller", text: "I'm interested in a consultation for skin treatments." },
      {
        speaker: "AI receptionist",
        text: "Happy to help. Is there a particular treatment you'd like to talk about?",
      },
      { speaker: "Caller", text: "Not sure yet, I'd like advice." },
      {
        speaker: "AI receptionist",
        text: "No problem. Which days suit you for a consultation, and what's the best number to reach you?",
      },
    ],
    captured: [
      "Name and phone number",
      "Treatment interest",
      "Preferred consultation time",
      "Questions to answer before the visit",
    ],
    system: {
      title: "Consultation enquiries that get answered and booked",
      text: "Every enquiry is answered, the details are captured and a follow-up goes out, so interest turns into a booked consultation.",
    },
    faqs: [
      {
        question: "Will it give medical advice?",
        answer:
          "No. It takes the person's details and books them in. Clinical questions are for you or your practitioner.",
      },
      {
        question: "Can it say what treatments we offer?",
        answer:
          "Yes. I load in the information you want shared, and it passes on nothing else.",
      },
      {
        question: "Can patients still speak to someone?",
        answer: "Yes. It can take a message for you to return the call personally.",
      },
    ],
  },
  {
    slug: "garages",
    label: "Garage & Automotive",
    plural: "garages and automotive businesses",
    headline: "You can't answer the phone while you're under a car. An AI receptionist can.",
    subhead:
      "An AI receptionist answers every call, takes the details of the job and books the car in, so you stop losing work to missed calls.",
    metaDescription:
      "An AI receptionist for garages and automotive businesses. Answer every call, capture service enquiries and book jobs while you work.",
    pains: [
      {
        title: "You can't answer while under a car",
        text: "Hands covered in oil, car on the ramp. The call goes to voicemail and the customer rings the next garage.",
      },
      {
        title: "Service reminders never go out",
        text: "Customers forget their next service and drift to someone else.",
      },
      {
        title: "Details written on scraps of paper",
        text: "Job details in your head or on a scrap of paper get lost, and so do jobs.",
      },
    ],
    callIntro: "How the AI receptionist handles a garage call",
    callScript: [
      { speaker: "AI receptionist", text: "Hello, you've reached the garage. How can I help?" },
      { speaker: "Caller", text: "My car's making a noise when I brake. Can I bring it in?" },
      {
        speaker: "AI receptionist",
        text: "Sure. What's the make and registration, so we know what's coming in?",
      },
      { speaker: "Caller", text: "It's a 2017 Focus." },
      {
        speaker: "AI receptionist",
        text: "Thanks. Which day suits you, and what's the best number to reach you?",
      },
    ],
    captured: [
      "Name and phone number",
      "Car make, model and registration",
      "What the problem is",
      "Preferred drop-off day",
    ],
    system: {
      title: "Calls answered, jobs booked, customers reminded",
      text: "The phone is answered while you work, the job details are captured and customers get a reminder when their next service is due.",
    },
    faqs: [
      {
        question: "Can it give a price over the phone?",
        answer:
          "Only if you want it to. It can share prices you choose, or take the details so you can quote yourself.",
      },
      {
        question: "What if it's an emergency breakdown?",
        answer: "I set up a rule for urgent calls so you can be told about them first.",
      },
      {
        question: "Does it work outside opening hours?",
        answer: "Yes. It answers whenever the phone rings, including evenings and weekends.",
      },
    ],
  },
  {
    slug: "cleaning",
    label: "Cleaning",
    plural: "cleaning businesses",
    headline: "Quote requests arrive while you're on a job. Answer every one.",
    subhead:
      "An AI receptionist answers calls, collects the details for a quote and books the visit, so you win more work without stopping the job you're on.",
    metaDescription:
      "An AI receptionist for cleaning businesses. Answer every quote request, capture job details and book visits while your team is out working.",
    pains: [
      {
        title: "Quote requests come in mid-job",
        text: "You're in a client's home with a mop in your hand. The next customer moves on if nobody answers.",
      },
      {
        title: "Details get lost",
        text: "Address, size of the property and type of clean get scribbled down, or forgotten.",
      },
      {
        title: "One-off cleans never repeat",
        text: "Nobody follows up, so a happy customer never becomes a regular.",
      },
    ],
    callIntro: "How the AI receptionist handles a cleaning enquiry",
    callScript: [
      { speaker: "AI receptionist", text: "Hello, thanks for calling. How can I help?" },
      { speaker: "Caller", text: "I'd like a quote for a deep clean of my house." },
      {
        speaker: "AI receptionist",
        text: "Happy to help. How many bedrooms is it, and what area are you in?",
      },
      { speaker: "Caller", text: "Four bedrooms, near the town centre." },
      {
        speaker: "AI receptionist",
        text: "Thanks. When would you like it done, and what's the best number to reach you?",
      },
    ],
    captured: [
      "Name and phone number",
      "Address or area",
      "Type and size of clean",
      "Preferred date",
    ],
    system: {
      title: "Quote requests captured and followed up",
      text: "Every enquiry is answered, the job details are written down for you and customers get a follow-up so one clean can become a regular booking.",
    },
    faqs: [
      {
        question: "Can it give quotes?",
        answer:
          "It collects everything you need to quote. If you give me your pricing rules, it can share a guide price too.",
      },
      {
        question: "What about customers who message instead of calling?",
        answer:
          "I can set up message replies as well, so enquiries from your website or social media get answered.",
      },
      {
        question: "Is it hard to set up?",
        answer: "No. I set it up for you, and you don't need to be technical.",
      },
    ],
  },
  {
    slug: "trades",
    label: "Trades",
    plural: "tradespeople",
    headline: "Stop losing jobs to the call you couldn't answer on site.",
    subhead:
      "An AI receptionist answers every call while you work, takes the job details and lets you call back the ones worth winning.",
    metaDescription:
      "An AI receptionist for plumbers, electricians and other trades. Answer every call on site, capture job details and stop losing work to voicemail.",
    pains: [
      {
        title: "Calls come when your hands are full",
        text: "On a roof, under a sink or up a ladder you can't answer. The customer rings the next number on Google.",
      },
      {
        title: "Customers want an answer now",
        text: "Someone with a leak or a power cut won't wait for a callback.",
      },
      {
        title: "Jobs go unrecorded",
        text: "Details noted on your hand or in a text thread get missed.",
      },
    ],
    callIntro: "How the AI receptionist handles a call for a tradesperson",
    callScript: [
      { speaker: "AI receptionist", text: "Hello, thanks for calling. How can I help?" },
      { speaker: "Caller", text: "My boiler has stopped working. Can someone come out?" },
      {
        speaker: "AI receptionist",
        text: "I'm sorry to hear that. Can I take your address and a good number to reach you?",
      },
      { speaker: "Caller", text: "Sure, it's on Main Street." },
      {
        speaker: "AI receptionist",
        text: "Thanks. I've marked it as urgent, and you'll get a call back.",
      },
    ],
    captured: [
      "Name and phone number",
      "Address or area",
      "What the job is",
      "How urgent it is",
    ],
    system: {
      title: "Every call answered, urgent jobs flagged",
      text: "Calls are answered while you're on site, job details are written down and urgent jobs are marked so you know who to ring first.",
    },
    faqs: [
      {
        question: "Can it tell urgent jobs from routine ones?",
        answer: "Yes. I set the questions it asks, so emergencies are marked clearly.",
      },
      {
        question: "Will customers know it's an AI?",
        answer:
          "We set that up honestly together. It never pretends to be a person if someone asks.",
      },
      {
        question: "Can it cover my whole area?",
        answer:
          "It takes the address first, so you can tell quickly whether the job is in your area.",
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getIndustryHref(slug: string) {
  return `/for/${slug}`;
}

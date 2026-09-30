export interface PuzzleLevel {
  id: number;
  levelCode: string;
  title: string;
  badge: string;
  description: string[];
  humorousNote: string;
  humorousSubtext: string;
  driveButtonText?: string;
  driveUrl?: string;
  driveSimulatedFolder?: {
    name: string;
    files: Array<{
      name: string;
      type: 'image' | 'audio' | 'document' | 'note';
      date: string;
      previewText?: string;
      caption?: string;
      hintClue?: string;
      imageUrl?: string;
    }>;
  };
  promptText: string;
  inputPlaceholder: string;
  inputType?: 'text' | 'date' | 'keypad';
  secretAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  successHeading: string;
  successMessage: string;
  successSubtext: string;
}

export interface AnniversaryConfig {
  couple: {
    partnerName: string;
    nicknames: string;
    myAlias: string;
    years: number;
    daysCount: number;
    startDate: string;
    anniversaryDate: string;
    googleDriveFolderUrl: string;
    googleDriveFolderUrl2: string;
  };
  wrongAnswerMessages: string[];
  levels: PuzzleLevel[];
  finale: {
    badge: string;
    title: string;
    subtitle: string;
    letterHeading: string;
    letterParagraphs: string[];
    giftTitle: string;
    giftDescription: string;
    giftBadge: string;
    mainReveal: string;
    supportingDetails: {
      destination: string;
      details: string;
      status: string;
    };
    memories: Array<{
      title: string;
      date: string;
      caption: string;
      tag: string;
    }>;
  };
}

export const puzzleConfig: AnniversaryConfig = {
  couple: {
    partnerName: "Aditi",
    nicknames: "Bokki / Meow",
    myAlias: "Minku",
    years: 2,
    daysCount: 730,
    startDate: "30 September 2024",
    anniversaryDate: "30 September 2026",
    googleDriveFolderUrl: "https://drive.google.com/drive/folders/10DqjaRdRwM3sR28r8-dqMXcLYlsKAYMS",
    googleDriveFolderUrl2: "https://drive.google.com/drive/folders/1Eep0yS0UK7IWhk3obWko3PM9Ce6KGlqb",
  },
  wrongAnswerMessages: [
    "Incorrect.",
    "Two years. TWO YEARS.",
    "Try again, detective.",
    "That was confidently wrong.",
    "I'm starting to question everything.",
    "Did you even look closely?",
    "Nice try, but absolutely not.",
    "My disappointment is immeasurable, Bokki.",
    "Is that your final answer? Because yikes.",
    "Somewhere out there, our memories are shedding a single tear.",
    "Are you guessing? Tell me you're not guessing, Meow.",
  ],
  levels: [
    {
      id: 1,
      levelCode: "LEVEL 01",
      badge: "EVIDENCE DOSSIER #01",
      title: "THE ARCHIVE",
      description: [
        "Somewhere in the archive is a photo hiding your first clue.",
        "Find the photo. Look closely — you might find something waiting for you.",
      ],
      humorousNote: "I trust your judgement.",
      humorousSubtext: "Actually, I absolutely do not.",
      driveButtonText: "OPEN THE ARCHIVE ↗",
      driveUrl: "https://drive.google.com/drive/folders/10DqjaRdRwM3sR28r8-dqMXcLYlsKAYMS",
      driveSimulatedFolder: {
        name: "Archive Folder #1 // The Hidden Clue",
        files: [
          {
            name: "mystery_archive_photo_clue.jpg",
            type: "image",
            date: "Sep 30, 2024",
            caption: "Look closely at the photo in Google Drive to find the secret clue waiting for you.",
            hintClue: "Search through the Google Drive folder for the hidden clue.",
          },
        ],
      },
      promptText: "Found something?",
      inputPlaceholder: "Enter the secret word",
      inputType: "text",
      secretAnswer: "something",
      acceptedAnswers: ["something", "SOMETHING"],
      hint: "Look for the photo... you will find something.",
      successHeading: "ACCESS GRANTED",
      successMessage: "Apparently you do know me.",
      successSubtext: "You found the clue in the archive.",
    },
    {
      id: 2,
      levelCode: "LEVEL 02",
      badge: "TEMPORAL CALIBRATION #02",
      title: "THE LOST LEGENDS",
      description: [
        "Find the oldest photograph of us in the archive.",
        "I want the actual date.",
        "The exact day this beautiful madness started.",
      ],
      humorousNote: "Yes, my haircut back then was a federal crime.",
      humorousSubtext: "No, you may not repost it to Reddit or your family group chat.",
      driveButtonText: "OPEN THE LOST LEGENDS ARCHIVE ↗",
      driveUrl: "https://drive.google.com/drive/folders/1Eep0yS0UK7IWhk3obWko3PM9Ce6KGlqb",
      driveSimulatedFolder: {
        name: "Archive Folder #2 // The Lost Legends",
        files: [
          {
            name: "FIRST_EVER_PHOTO_US_ORIGIN.jpg",
            type: "image",
            date: "2024-09-30",
            caption: "ORIGIN DATE: 2024-09-30. Start of the legend.",
            hintClue: "Check the second Google Drive folder for the Lost Legends archive.",
          },
        ],
      },
      promptText: "Found the clue in the archive?",
      inputPlaceholder: "Enter the secret answer",
      inputType: "text",
      secretAnswer: "initial google meet",
      acceptedAnswers: [
        "initial google meet",
        "INITIAL GOOGLE MEET",
        "initial google meet call",
        "INITIAL GOOGLE MEET CALL",
        "google meet",
        "GOOGLE MEET",
      ],
      hint: "Check the Lost Legends archive for our very first virtual meeting.",
      successHeading: "ACCESS GRANTED",
      successMessage: "Temporal coordinates synchronized.",
      successSubtext: "2 years later, and the legend continues.",
    },
    {
      id: 3,
      levelCode: "LEVEL 03",
      badge: "GEOGRAPHIC TRACER #03",
      title: "THE PLACE WHERE I WAS BATHED WITH WATER FOR THE FIRST TIME (YEAH MY BAD THAT I SPILLED THE KETCHUP)",
      description: [
        "Every legendary incident leaves a mark.",
        "Name the place where I was bathed with water for the first time.",
        "(Yeah, my bad that I spilled the ketchup...)",
      ],
      humorousNote: "I will never live down the ketchup incident.",
      humorousSubtext: "Water was the only logical emergency response, apparently.",
      // Level 03 does NOT use Google Drive (no button, no url)
      promptText: "Identify the scene of the incident:",
      inputPlaceholder: "Enter location name",
      inputType: "text",
      secretAnswer: "nana nani park",
      acceptedAnswers: [
        "nana nani park",
        "NANA NANI PARK",
        "nana nani",
        "NANA NANI",
        "nana-nani park",
        "nana nani garden",
      ],
      hint: "Think back to the park where the ketchup disaster and emergency water bath happened.",
      successHeading: "LOCATION CONFIRMED",
      successMessage: "Perimeter secured. Ketchup disaster forgiven.",
      successSubtext: "Nana Nani Park will forever remember that legendary bath.",
    },
    {
      id: 4,
      levelCode: "LEVEL 04",
      badge: "ACOUSTIC CIPHER #04",
      title: "THE SOUNDTRACK",
      description: [
        "Every song has a moment.",
        "This one has ours.",
        "Find the song you sent me first, then enter the exact timestamp where your chosen moment begins and ends.",
      ],
      humorousNote: "Friendly reminder: Neither of us can hit that bridge vocal.",
      humorousSubtext: "Our neighbors have suffered enough.",
      // Level 04 does NOT use Google Drive
      promptText: "Enter the moment timestamp range:",
      inputPlaceholder: "0:30-0:43",
      inputType: "text",
      secretAnswer: "0:30-0:43",
      acceptedAnswers: [
        "0:30-0:43",
        "0:30 – 0:43",
        "00:30-00:43",
        "00:30 – 00:43",
        "0:30 - 0:43",
        "00:30 - 00:43",
        "0:30—0:43",
      ],
      hint: "The clue isn't the song. It's the moment.",
      successHeading: "FREQUENCY MATCHED",
      successMessage: "Harmonic decryption verified.",
      successSubtext: "That exact moment in the song will always be ours.",
    },
    {
      id: 5,
      levelCode: "LEVEL 05",
      badge: "SECURITY CLEARANCE #05",
      title: "THE VAULT",
      description: [
        "Two years. Countless memories. One final lock.",
        "Enter the four-digit code to open the vault.",
      ],
      humorousNote: "HINT: Four digits. Leading zero is mandatory.",
      humorousSubtext: "Incorrect combinations will not open the vault.",
      promptText: "Enter the 4-Digit Passcode:",
      inputPlaceholder: "4-digit code",
      inputType: "keypad",
      secretAnswer: "0730",
      acceptedAnswers: ["0730"],
      hint: "Sometimes the missing digit is the one that matters.",
      successHeading: "VAULT UNLOCKED",
      successMessage: "Master encryption lifted. Gift clearance authorized.",
      successSubtext: "Prepare for confidential disclosure...",
    },
  ],
  finale: {
    badge: "MISSION ACCOMPLISHED // CASE RESOLVED",
    title: "HAPPY 2ND ANNIVERSARY",
    subtitle: "2 Years. 730 Days. 17,520 Hours. Zero regrets.",
    letterHeading: "To My Partner in Crime and every other place (Aditi / Bokki),",
    letterParagraphs: [
      "If you are reading this, it means you successfully navigated through two years of inside jokes, embarrassing photo evidence, and mathematical torture without closing the browser.",
      "Two years ago on 30 September 2024, our adventure officially started. Somewhere between our nervous first conversations, stolen bites of dessert, midday drives with terrible driving of mine, and laughing until our stomachs hurt, you became my absolute favorite person in the entire world.",
      "Thank you for being my anchor, my best friend, my fiercest hype-woman, and the only person I want to get lost in an escape room with.",
      "The vault has been opened. Your anniversary surprise is waiting below.",
    ],
    giftTitle: "WEEKEND GETAWAY",
    giftDescription: "A little escape for the two of us.",
    giftBadge: "ACCESS LEVEL: ULTRA VIP",
    mainReveal: "A surprise coming soon...",
    supportingDetails: {
      destination: "CLASSIFIED",
      details: "COMING SOON",
      status: "OUR NEXT ADVENTURE",
    },
    memories: [
      {
        title: "Day 01 — The First Spark",
        date: "30 Sep 2024",
        caption: "Nervous hands, endless conversation, and the exact second everything changed.",
        tag: "THE BEGINNING",
      },
      {
        title: "The Unhinged Road Trip to Home",
        date: "Diwali 2K24",
        caption: "Running behind the bus to catch it, and you resting your head on my shoulder while falling asleep.",
        tag: "ADVENTURE",
      },
      {
        title: "Morning Motivations (in short bursts)",
        date: "Always",
        caption: "Getting early in the morning with motivation to try something new but then sleeping after coming back",
        tag: "FAVORITE ROUTINE",
      },
      {
        title: "The 2-Year Milestone",
        date: "30 Sep 2026",
        caption: "Look how far we've come. Here's to 200 more chapters together.",
        tag: "ETERNAL",
      },
    ],
  },
};

export interface BenefitHighlight {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  galleryUrls?: string[];
  price: string;
  thumbnailUrl: string;
  platformName: 'Gumroad' | 'Etsy' | 'Shopify' | 'Other';
  externalLink: string;
  previewLink?: string;
  badge?: string;
  // Storytelling fields
  storyHook?: string;
  problemStory?: string;
  benefitHighlights?: BenefitHighlight[];
}

export const DUMMY_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Minimalist Printable Calendar 2026',
    description: 'High-resolution printable monthly and yearly calendar to keep your schedule visually organized on your wall or desk.',
    longDescription: 'Return to the simplicity of physical planning. This high-resolution printable calendar gives you a bird\'s-eye view of your year without the digital distractions. Designed with a clean, ink-saving aesthetic that looks beautiful in any home office or kitchen.',
    features: ['A4 & US Letter Sizes', 'Monday & Sunday Start', 'Yearly Overview', 'Minimalist Ink-Saving Design', 'Print-Ready PDF'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1506784951206-3814ee00b5cc?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506784951206-3814ee00b5cc?q=80&w=600&auto=format&fit=crop',
    platformName: 'Etsy',
    externalLink: 'https://etsy.com',
    badge: 'Trending',
    storyHook: 'Digital notifications make us forget the big picture.',
    problemStory: 'You swipe away a calendar notification and instantly forget about it. Digital calendars are great for reminders, but they fail to give you a spatial awareness of your time. Days blend together, and important milestones sneak up on you.',
    benefitHighlights: [
      {
        title: 'Visual Time Mastery',
        description: 'Seeing your month laid out on paper naturally reduces anxiety and helps you pace your workload effectively.',
        imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Aesthetic Focus',
        description: 'A beautiful, minimalist design that serves as both a productivity tool and elegant wall decor.',
        imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'ADHD Digital Brain Dump & Planner',
    description: 'A neurodivergent-friendly digital planner designed specifically for ADHD brains. No strict timelines, just dopamine-driven task completion.',
    longDescription: 'Traditional planners demand a linear, rigid schedule that simply doesn\'t work for neurodivergent brains. This ADHD-focused digital planner embraces how your brain naturally works. Featuring guilt-free brain dump zones, dopamine-menu trackers, and flexible non-dated pages.',
    features: ['Dopamine Menu Trackers', 'Hyperfocus Worksheets', 'Guilt-Free Brain Dumps', 'GoodNotes & iPad Compatible', 'No Strict Timelines'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop',
    platformName: 'Gumroad',
    externalLink: 'https://gumroad.com',
    previewLink: 'https://goodnotes.com',
    badge: 'Bestseller',
    storyHook: 'Traditional planners were not built for your beautiful, chaotic brain.',
    problemStory: 'You buy a new planner, use it perfectly for three days, miss one day, feel intensely guilty, and never open it again. Standard planners force you into a rigid, hour-by-hour box that stifles your creativity and triggers executive dysfunction.',
    benefitHighlights: [
      {
        title: 'Guilt-Free Productivity',
        description: 'Undated pages and flexible layouts mean you can pick it up after a week off without feeling like you\'ve "failed."',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Harness the Hyperfocus',
        description: 'Dedicated brain dump zones allow you to quickly offload racing thoughts so you can focus on the task at hand.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'The Ultimate Wedding Planner Template',
    description: 'Comprehensive Google Sheets template to manage guest lists, vendor contracts, budgets, and seating charts without the bridal breakdown.',
    longDescription: 'Planning a wedding shouldn\'t require a degree in project management. This ultimate spreadsheet template automatically calculates your budget, tracks RSVPs, and provides a centralized dashboard so you and your partner stay perfectly in sync.',
    features: ['Automated Budget Calculator', 'Guest List & RSVP Tracker', 'Vendor Contact Hub', 'Seating Chart Logic', 'Timeline & Checklist'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$18',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    platformName: 'Shopify',
    externalLink: 'https://shopify.com',
    storyHook: 'Your dream wedding shouldn\'t start with a stress breakdown.',
    problemStory: 'You\'re juggling 15 different vendors, a guest list that keeps changing, and a budget that seems to evaporate. The scattered sticky notes and endless email threads are turning what should be a joyful season into a logistical nightmare.',
    benefitHighlights: [
      {
        title: 'The Centralized Command Center',
        description: 'One single link for you, your partner, and your coordinator. Everything from floral contracts to dietary restrictions in one place.',
        imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Automated Budget Peace of Mind',
        description: 'Enter your total budget, and the sheet automatically allocates recommended percentages, warning you before you overspend on catering.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Smart Financial & Wealth Planner',
    description: 'Automated dashboard to track cash flow, manage debt snowballing, and project your early retirement timeline.',
    longDescription: 'Take back control of your finances. This smart template automatically generates visual charts of your monthly income and expenses. Featuring an automated Debt Snowball calculator and Sinking Funds tracker to help you build true wealth.',
    features: ['Automated Dashboards', 'Debt Snowball Calculator', 'Sinking Funds Tracker', 'Investment Projections', 'No Monthly Fees'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$14',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
    platformName: 'Shopify',
    externalLink: 'https://shopify.com',
    badge: 'Popular',
    storyHook: 'Stop guessing where your hard-earned money went this month.',
    problemStory: 'Your paycheck just cleared, but somehow your balance is thinning out just two weeks later. Finance apps charge expensive monthly subscriptions and store your private data on their servers, while traditional spreadsheets are too complex to build from scratch.',
    benefitHighlights: [
      {
        title: 'Instant Financial Visualization',
        description: 'Simply plug in your expense numbers, and Google Sheets will automatically brew stunning visual charts that are easy to understand.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Guaranteed Privacy Forever',
        description: 'This file is stored 100% on your personal Google Drive. No third parties can ever spy on your financial data.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'Toddler Educational Printable Modules',
    description: 'Montessori-inspired printable activity sheets to develop fine motor skills, alphabet recognition, and emotional intelligence.',
    longDescription: 'Cut down on screen time with these beautifully illustrated, Montessori-inspired printable activities. Simply download, print at home, and watch your toddler engage in meaningful, hands-on learning that develops critical cognitive skills.',
    features: ['100+ Printable Pages', 'Alphabet & Number Tracing', 'Color & Shape Sorting', 'Emotion Flashcards', 'Printer Friendly'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    platformName: 'Etsy',
    externalLink: 'https://etsy.com',
    storyHook: 'The tablet is an easy babysitter, but you know they deserve better.',
    problemStory: 'You want to provide engaging educational activities for your toddler, but researching and creating them takes hours you don\'t have. So, you resort to YouTube Kids again, accompanied by that familiar pang of parental guilt.',
    benefitHighlights: [
      {
        title: 'Instant Hands-On Learning',
        description: 'Whenever you need 30 minutes of quiet time, just hit print. Provide your child with tactile learning that builds actual neural pathways.',
        imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Montessori Alignment',
        description: 'Designed in consultation with early childhood educators to ensure every tracing line and sorting game contributes to crucial developmental milestones.',
        imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'Healthy Meal Planner & Grocery List',
    description: 'Digital GoodNotes template to plan your weekly meals, organize recipes, and streamline your grocery runs to save money and reduce waste.',
    longDescription: 'End the 5 PM dinner panic. This hyperlinked digital meal planner allows you to map out your week, drag and drop favorite recipes, and automatically compile an organized grocery list. Never buy ingredients you already have again.',
    features: ['Weekly & Monthly Meal Grids', 'Categorized Grocery Lists', 'Recipe Bank & Hyperlinks', 'Inventory Tracker', 'iPad Compatible'],
    galleryUrls: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop'
    ],
    price: '$9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
    platformName: 'Gumroad',
    externalLink: 'https://gumroad.com',
    previewLink: 'https://goodnotes.com',
    storyHook: '"What\'s for dinner?" shouldn\'t be the most stressful question of your day.',
    problemStory: 'It\'s 5:30 PM. You\'re staring blankly into the fridge. You end up ordering expensive takeout again, while the produce you bought on Sunday slowly rots in the crisper drawer. The cycle of food waste and overspending continues.',
    benefitHighlights: [
      {
        title: 'Streamlined Grocery Runs',
        description: 'Categorized grocery lists mean you only walk down the aisles you need to. Get in, get out, and stop impulse buying.',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'The End of Food Waste',
        description: 'Inventory trackers help you build meals around what you already own, saving the average household up to $1,500 a year.',
        imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
];

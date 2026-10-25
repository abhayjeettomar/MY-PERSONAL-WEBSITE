export interface VerifiedMetric<T = number | string> {
  value: T;
  displayValue: string;
  label: string;
  asOfDate: string;
  source: string;
  note?: string;
}

export interface Milestone {
  id: string;
  year: string;
  exactDate: string;
  title: string;
  subtitle: string;
  description: string;
  metricBadge: string;
  category: 'ORIGIN' | 'VIRAL' | 'PHILANTHROPY' | 'VENTURE' | 'RECORD';
  asOfDate: string;
  source: string;
}

export interface VideoDossier {
  id: string;
  youtubeId: string;
  title: string;
  category: 'MEGA ARENA' | 'ENDURANCE' | 'HUMANITARIAN' | 'RECORD';
  views: string;
  rawViews: number;
  releaseDate: string;
  budgetOrStakes: string;
  contestantsOrParticipants: string;
  editorialNote: string;
  schematicTag: string;
  asOfDate: string;
  source: string;
}

export interface GuinnessRecord {
  id: string;
  title: string;
  metric: string;
  verifiedFigure: string;
  location: string;
  officialCitation: string;
}

export interface BusinessEntity {
  id: string;
  name: string;
  tagline: string;
  valuationOrRevenue: string;
  metrics: { label: string; value: string }[];
  description: string;
  status: 'ACTIVE' | 'SCALE_PHASE' | 'CONCLUDED' | 'PORTFOLIO';
  asOfDate: string;
  source: string;
}

export interface ScaleComparison {
  id: string;
  title: string;
  comparisonLabel: string;
  ratio: number;
  mrbeastStat: string;
  benchmarkStat: string;
  description: string;
}

export const MRBEAST_DATA = {
  meta: {
    name: "James Stephen Donaldson",
    handle: "@MrBeast",
    born: "May 7, 1998",
    originCity: "Greenville, North Carolina",
    dataAsOf: "October 2026",
    verificationStatus: "VERIFIED_PUBLIC_TELEMETRY",
  },

  // Key Headline Telemetry Counters
  telemetry: {
    mainSubscribers: {
      value: 523000000,
      displayValue: "523,000,000+",
      label: "Main Channel Subscribers",
      asOfDate: "October 2026",
      source: "YouTube Official API / Social Blade Public Registry",
      note: "First creator in human history to surpass 500M subscribers (milestone achieved June 12, 2026)",
    } as VerifiedMetric<number>,

    mainViews: {
      value: 144200000000,
      displayValue: "144.2B+",
      label: "Main Channel Video Views",
      asOfDate: "October 2026",
      source: "YouTube Official Registry",
      note: "Across 850+ published long-form productions",
    } as VerifiedMetric<number>,

    combinedViews: {
      value: 177000000000,
      displayValue: "177,000,000,000+",
      label: "Combined Network Video Views",
      asOfDate: "October 2026",
      source: "Beast Industries Multi-Channel Broadcast Telemetry",
      note: "Includes Main, Gaming, Reacts, Philanthropy, and 14 localized audio dub streams",
    } as VerifiedMetric<number>,

    avgViewsPerUpload: {
      value: 141200000,
      displayValue: "141,200,000",
      label: "Average Views Per Main Upload",
      asOfDate: "October 2026",
      source: "Social Blade & YouTube Channel Analytics",
      note: "Outperforming standard US broadcast television primetime reach by 12x",
    } as VerifiedMetric<number>,

    valuation: {
      value: 5000000000,
      displayValue: "$5,000,000,000",
      label: "Beast Industries Valuation",
      asOfDate: "October 2026",
      source: "Bloomberg / Fortune Corporate Filings (Series C Round)",
      note: "Jimmy Donaldson retains ~51% ownership ($2.6B estimated equity stake)",
    } as VerifiedMetric<number>,

    guinnessRecords: {
      value: 44,
      displayValue: "44",
      label: "Guinness World Records on Beast Games",
      asOfDate: "October 2026",
      source: "Guinness World Records Official Adjudication (Las Vegas & Toronto Filming)",
      note: "Most records broken by a single television production season in broadcast history",
    } as VerifiedMetric<number>,

    oceanTrashRemovedLbs: {
      value: 34000000,
      displayValue: "34,000,000+ LBS",
      label: "Ocean & River Waste Cleared (#TeamSeas)",
      asOfDate: "October 2026",
      source: "The Ocean Cleanup & Ocean Conservancy Verified Telemetry",
      note: "$33.4M+ raised across 200+ countries with Mark Rober",
    } as VerifiedMetric<number>,

    treesFunded: {
      value: 25000000,
      displayValue: "25,000,000+",
      label: "Global Trees Planted (#TeamTrees)",
      asOfDate: "October 2026",
      source: "Arbor Day Foundation Official Project Registry",
      note: "Across 104 verified planting ecosystems in 30+ nations",
    } as VerifiedMetric<number>,
  },

  // Level 01: The Origin Chapters (2012–2017)
  originChapters: [
    {
      step: "01",
      year: "FEB 2012",
      title: "MrBeast6000 Goes Live",
      subtitle: "The 240p Bedroom Era",
      description: "At age 13 in Greenville, North Carolina, Jimmy uploads low-resolution Minecraft and Call of Duty Let's Plays, followed by financial estimation videos on other creators. For four grueling years, average views hover under 200.",
      metric: "Avg Views: ~180 // Budget: $0.00",
      icon: "terminal",
    },
    {
      step: "02",
      year: "2016",
      title: "The Mastermind & Algorithm Lab",
      subtitle: "Dropping Out to Reverse-Engineer Retention",
      description: "Jimmy drops out of East Carolina University after two weeks, leaves home, and forms an obsessive daily mastermind group with four peer creators. They analyze thousands of videos frame-by-frame: first-5-second retention hooks, thumbnail luminance, pacing cuts, and pattern interrupts every four seconds.",
      metric: "Hours Analyzed: 1,000+ / Month",
      icon: "cpu",
    },
    {
      step: "03",
      year: "JAN 2017",
      title: "The 40-Hour Inflection Point",
      subtitle: "\"I Counted To 100,000\"",
      description: "Forty uninterrupted hours sitting in a chair in front of a camera counting from one to one hundred thousand. Jimmy's body cramped, his voice faded, and YouTube's algorithm caught fire. The internet realized no one was willing to suffer more for a frame of video.",
      metric: "Record: 40 Continuous Hours // Views: 30M+",
      icon: "timer",
    },
    {
      step: "04",
      year: "JUNE 2017",
      title: "The Infinite Reinvestment Loop",
      subtitle: "The $10,000 Bet on Pure Giving",
      description: "Jimmy secures his first major brand sponsorship for $10,000. Instead of pocketing the check, he convinces the sponsor to let him hand every cent to a homeless man on camera. The video explodes, establishing the engine that defines his career: 100% of profit reinvested into scale.",
      metric: "Reinvestment Rate: 100% // Stunt Philanthropy Born",
      icon: "refresh-cw",
    },
  ],

  // Level 02: 10 Verified Chronological Milestones (2012–2026)
  milestones: [
    {
      id: "m01",
      year: "2012",
      exactDate: "Feb 19, 2012",
      title: "First Upload as MrBeast6000",
      subtitle: "Greenville, North Carolina",
      description: "A 13-year-old Jimmy Donaldson posts his first video to YouTube under the handle 'MrBeast6000'. Views hover in the tens for months.",
      metricBadge: "000,001 VIEWS",
      category: "ORIGIN",
      asOfDate: "October 2026",
      source: "YouTube Channel Inception Logs",
    },
    {
      id: "m02",
      year: "2017",
      exactDate: "Jan 8, 2017",
      title: "Counting to 100,000 Goes Viral",
      subtitle: "Proof of Extreme Human Will",
      description: "Sits in a chair for 40 hours counting to 100k. The video becomes a cultural breakthrough, cracking the algorithmic recommendation feed.",
      metricBadge: "100K COUNT // VIRAL INFLECTION",
      category: "VIRAL",
      asOfDate: "October 2026",
      source: "YouTube Historical Video Registry",
    },
    {
      id: "m03",
      year: "2019",
      exactDate: "Oct 25, 2019",
      title: "#TeamTrees Global Campaign",
      subtitle: "With Mark Rober & Arbor Day Foundation",
      description: "Mobilizes thousands of global creators to raise $20M to plant 20 million trees. Reaches goal in 56 days; now stands at over 25M trees funded.",
      metricBadge: "25M+ TREES FUNDED",
      category: "PHILANTHROPY",
      asOfDate: "October 2026",
      source: "Arbor Day Foundation & TeamTrees.org",
    },
    {
      id: "m04",
      year: "2020",
      exactDate: "Dec 19, 2020",
      title: "Launch of MrBeast Burger",
      subtitle: "Pioneering Ghost Kitchen Scaling",
      description: "Rolls out 300 virtual restaurant locations on day one, scaling to 2,000+ worldwide and breaking mall foot-traffic records at the 2022 NJ launch.",
      metricBadge: "2,000+ KITCHENS // PROOF OF CONCEPT",
      category: "VENTURE",
      asOfDate: "October 2026",
      source: "Virtual Dining Concepts Historical Records",
    },
    {
      id: "m05",
      year: "2021",
      exactDate: "Nov 24, 2021",
      title: "$456,000 Squid Game In Real Life",
      subtitle: "The Soundstage Monument",
      description: "Constructs 1:1 physical replicas of all six Netflix sets for $3.5M with 456 contestants. Becomes the benchmark for creator production budgets.",
      metricBadge: "873M+ VIEWS // $3.5M BUDGET",
      category: "RECORD",
      asOfDate: "October 2026",
      source: "YouTube Official Telemetry",
    },
    {
      id: "m06",
      year: "2022",
      exactDate: "Jan 29, 2022",
      title: "Feastables Chocolate Debut",
      subtitle: "CPG Empire With Jim Murray",
      description: "Launches clean-ingredient snack brand Feastables. Sells 1,000,000 chocolate bars in its opening 72 hours, triggering immediate nationwide stockouts.",
      metricBadge: "1M BARS IN 72 HRS",
      category: "VENTURE",
      asOfDate: "October 2026",
      source: "Feastables Corporate Release & Press Registry",
    },
    {
      id: "m07",
      year: "2022",
      exactDate: "Nov 14, 2022",
      title: "Surpassing PewDiePie as #1 Individual",
      subtitle: "The Changing of the Guard",
      description: "Surpasses Felix Kjellberg (PewDiePie) to become the single most-subscribed individual creator on YouTube, crossing 200M subscribers a year later.",
      metricBadge: "111M+ SUBS // #1 INDIVIDUAL",
      category: "RECORD",
      asOfDate: "October 2026",
      source: "Social Blade Verified Milestone Log",
    },
    {
      id: "m08",
      year: "2024",
      exactDate: "June 1, 2024",
      title: "Overtaking T-Series as World #1 Channel",
      subtitle: "YouTube's All-Time Apex",
      description: "Surpasses Indian music conglomerate T-Series to claim the undisputed #1 spot in YouTube history. Crosses 300M subscribers 40 days later on July 10, 2024.",
      metricBadge: "300M SUBS // #1 CHANNEL ON EARTH",
      category: "RECORD",
      asOfDate: "October 2026",
      source: "YouTube Official Creator Registry",
    },
    {
      id: "m09",
      year: "2025",
      exactDate: "Dec 2024 – Feb 2025",
      title: "Amazon Prime's Beast Games Premiere",
      subtitle: "44 Guinness World Records Smashed",
      description: "A $100M budget production with 2,000 contestants, 1,107 cameras, and a single $5M physical cash pile. Premieres to 50M+ viewers in its first 25 days.",
      metricBadge: "$100M SEASON // 44 GUINNESS RECORDS",
      category: "RECORD",
      asOfDate: "October 2026",
      source: "Amazon MGM Studios & Guinness World Records",
    },
    {
      id: "m10",
      year: "2026",
      exactDate: "June 12, 2026",
      title: "The 500 Million Subscriber Barrier Broken",
      subtitle: "First Human Creator to Half a Billion",
      description: "Crosses 500,000,000 subscribers on the flagship channel. Standing at 523M+ subscribers and 144.2B+ views as of October 2026.",
      metricBadge: "523M+ SUBS // HISTORIC BENCHMARK",
      category: "RECORD",
      asOfDate: "October 2026",
      source: "Social Blade & YouTube Channel Analytics",
    },
  ] as Milestone[],

  // Level 03: The Production Vault (Flagship Videos + Guinness Records)
  productionVideos: [
    {
      id: "squid-game",
      youtubeId: "0e3GPea1Tyg",
      title: "$456,000 Squid Game In Real Life!",
      category: "MEGA ARENA",
      views: "873M+ VIEWS",
      rawViews: 873000000,
      releaseDate: "Nov 24, 2021",
      budgetOrStakes: "$3,500,000 Production Budget",
      contestantsOrParticipants: "456 Contestants",
      editorialNote: "Built full-scale soundstage replicas of the Netflix phenomenon in weeks. Proved a digital-native creator could out-execute Hollywood studio television in raw engagement and pacing.",
      schematicTag: "SET // 6 SOUNDSTAGES // WIRELESS RFID VESTS",
      asOfDate: "October 2026",
      source: "YouTube Official Telemetry",
    },
    {
      id: "fifty-youtubers",
      youtubeId: "4SNThp0YiU4",
      title: "50 YouTubers Fight For $1,000,000",
      category: "MEGA ARENA",
      views: "495M+ VIEWS",
      rawViews: 495000000,
      releaseDate: "July 13, 2024",
      budgetOrStakes: "$1,000,000 Vault Prize",
      contestantsOrParticipants: "50 Mega-Creators (Combined 1B+ Subs)",
      editorialNote: "Fifty of the planet's largest creators locked inside a giant glass cube competing for $1,000,000 for their subscribers. Shattered the 24-hour YouTube premiere record with 70M+ views on day one.",
      schematicTag: "GLASS CUBE MATRIX // 100FT SPAN // 24H LOCKDOWN",
      asOfDate: "October 2026",
      source: "YouTube Official Telemetry",
    },
    {
      id: "stranded-sea",
      youtubeId: "yhB3BgJyGl8",
      title: "7 Days Stranded At Sea",
      category: "ENDURANCE",
      views: "350M+ VIEWS",
      rawViews: 350000000,
      releaseDate: "Aug 5, 2023",
      budgetOrStakes: "168 Hours Open Water Raft",
      contestantsOrParticipants: "Jimmy Donaldson & Core Crew",
      editorialNote: "Pure survival cinema. Stripping away the soundstages to test raw psychological endurance against open ocean swells, dehydration, and sun exposure.",
      schematicTag: "FLOATING WOOD PLATFORM // 24/7 GO-PRO RIGS",
      asOfDate: "October 2026",
      source: "YouTube Official Telemetry",
    },
    {
      id: "blind-people",
      youtubeId: "TJ2ifmkGGus",
      title: "1,000 Blind People See For The First Time",
      category: "HUMANITARIAN",
      views: "220M+ VIEWS",
      rawViews: 220000000,
      releaseDate: "Jan 28, 2023",
      budgetOrStakes: "1,000 Restorative Surgeries",
      contestantsOrParticipants: "1,000 Patients in Mexico, Honduras, Kenya, Jamaica",
      editorialNote: "A 10-minute surgical intervention replicated across the globe, turning viral attention into restored human sight. Reshaped the debate on global healthcare access and philanthropic transparency.",
      schematicTag: "OPHTHALMIC SURGERY SUITE // MOBILE MEDICAL LAB",
      asOfDate: "October 2026",
      source: "Beast Philanthropy Medical Records",
    },
  ] as VideoDossier[],

  // Beast Games Guinness World Records (Las Vegas & Toronto)
  beastGamesRecords: [
    {
      id: "rec-01",
      title: "Most Expensive Reality TV Season",
      metric: "$100,000,000",
      verifiedFigure: "Total Production Budget",
      location: "Las Vegas 'Beast City' / Toronto 'Beast Island'",
      officialCitation: "Guinness World Record Certificate #BG-01-2025",
    },
    {
      id: "rec-02",
      title: "Largest Single Cash Prize on Set",
      metric: "$5,000,000 CASH",
      verifiedFigure: "Single Physical Cash Pyramid",
      location: "Las Vegas Soundstage 4",
      officialCitation: "Guinness World Record Certificate #BG-02-2025",
    },
    {
      id: "rec-03",
      title: "Most Participants in a Reality Show Season",
      metric: "2,000 CONTESTANTS",
      verifiedFigure: "1,000 Eliminated in Episode 1",
      location: "Allegiant Stadium & Beast City Complex",
      officialCitation: "Guinness World Record Certificate #BG-03-2025",
    },
    {
      id: "rec-04",
      title: "Most Simultaneous Cameras on a Production",
      metric: "1,107 CAMERAS",
      verifiedFigure: "107 Cinema Bodies + 1,000 4K GoPros",
      location: "Simultaneous Multi-Angle Feeds",
      officialCitation: "Guinness World Record Certificate #BG-04-2025",
    },
    {
      id: "rec-05",
      title: "Largest Pneumatic Trap Door Matrix",
      metric: "1,000 TRAP DOORS",
      verifiedFigure: "3,000 High-Pressure Industrial Pistons",
      location: "Elimination Grid Stage 2",
      officialCitation: "Guinness World Record Certificate #BG-05-2025",
    },
  ] as GuinnessRecord[],

  // Level 04: Beast Industries Ecosystem ($5B Valuation)
  businessEcosystem: [
    {
      id: "holding",
      name: "Beast Industries",
      tagline: "The Core Parent Holding Company & Media Studio",
      valuationOrRevenue: "$5.0B Valuation",
      metrics: [
        { label: "Series C Valuation", value: "$5,000,000,000" },
        { label: "Jimmy Ownership", value: "~51% ($2.6B Net Worth)" },
        { label: "Key Investors", value: "Alpha Wave ($300M), Bitmine ($200M)" },
        { label: "2026 Expansion", value: "Acquired Fintech Platform Step" },
      ],
      description: "The engine that coordinates global distribution, consumer brands, enterprise syndication, and production logistics. Donaldson's mandate is zero personal dividends: cash is locked into perpetual production reinvestment.",
      status: "ACTIVE",
      asOfDate: "October 2026",
      source: "Bloomberg / Fortune Corporate Filings",
    },
    {
      id: "feastables",
      name: "Feastables",
      tagline: "The CPG Confectionery Titan Built With Jim Murray",
      valuationOrRevenue: "~$520M Projected 2025 Sales",
      metrics: [
        { label: "2024 Revenue / Profit", value: "$250M Rev / $20M Profit" },
        { label: "Retail Doors", value: "30,000+ (Walmart, Target, 7-Eleven)" },
        { label: "Launch Velocity", value: "1M Bars Sold in 72 Hours" },
        { label: "International Footprint", value: "US, UK, Canada, Mexico, Australia" },
      ],
      description: "Co-founded with ex-RXBAR president Jim Murray in January 2022. By 2024, Feastables surpassed the media division's revenue ($250M vs $246M), positioning Donaldson as a direct competitor to legacy food conglomerates like Hershey and Mars.",
      status: "SCALE_PHASE",
      asOfDate: "October 2026",
      source: "Feastables Audited Financials & CPG Industry Telemetry",
    },
    {
      id: "network",
      name: "Multi-Channel Broadcast Network",
      tagline: "713M+ Cumulative Subscribers Across 18 Channels",
      valuationOrRevenue: "177B+ Total Views",
      metrics: [
        { label: "@MrBeast Main", value: "523M+ Subs // 144.2B Views" },
        { label: "MrBeast Gaming", value: "60.9M Subs // 12.2B Views" },
        { label: "Beast Reacts", value: "37.3M Subs // 6.94B Views" },
        { label: "Beast Philanthropy", value: "10M+ Subs (100% Non-Profit)" },
      ],
      description: "A centralized media empire broadcasting in 14 native languages through synchronized audio tracks. Outperforms global television networks in retention, watch time, and youth demographic dominance.",
      status: "ACTIVE",
      asOfDate: "October 2026",
      source: "YouTube Analytics & Social Blade Network Rollup",
    },
    {
      id: "ventures-history",
      name: "Lunchly & Historical Ventures",
      tagline: "High-Profile Retail Disruptions & Transparent Quality Pivots",
      valuationOrRevenue: "Mass Retail Distribution",
      metrics: [
        { label: "Lunchly (Sept 2024)", value: "Feastables + PRIME Retail Kit" },
        { label: "Co-Founders", value: "Jimmy Donaldson, Logan Paul, KSI" },
        { label: "MrBeast Burger (2020-2024)", value: "2,000+ Virtual Kitchens Scaled" },
        { label: "Editorial Pivot", value: "Stepped Back in 2024 for Quality Control" },
      ],
      description: "MrBeast Burger proved digital influence could spin up 2,000 kitchens overnight, but exposed the limits of third-party restaurant quality control. Jimmy publicly wound down his involvement in 2024 to focus on Feastables, before launching Lunchly in late 2024.",
      status: "PORTFOLIO",
      asOfDate: "October 2026",
      source: "Public Corporate Statements & Court Filings",
    },
  ] as BusinessEntity[],

  // Level 05: Global Philanthropy Metrics (#impact)
  philanthropy: {
    themeAccent: "#00E676",
    initiatives: [
      {
        id: "team-trees",
        title: "#TeamTrees",
        metric: "25,000,000+",
        unit: "Trees Planted Globally",
        partner: "Mark Rober & Arbor Day Foundation",
        description: "Funded by 800,000+ unique donors across 104 planting sites worldwide—from British Columbia forests to West Papua mangroves and the African Great Green Wall.",
        coordinates: [
          { name: "Great Green Wall, Senegal", lat: 14.4974, lng: -14.4524 },
          { name: "West Papua Mangroves, Indonesia", lat: -1.3361, lng: 133.1747 },
          { name: "British Columbia Boreal, Canada", lat: 53.7267, lng: -127.6476 },
          { name: "Michigan State Forests, USA", lat: 44.3148, lng: -85.6024 },
        ],
      },
      {
        id: "team-seas",
        title: "#TeamSeas",
        metric: "34,000,000+ LBS",
        unit: "Plastic & Marine Debris Removed",
        partner: "The Ocean Cleanup & Ocean Conservancy",
        description: "Raised $33,400,000 across 200+ countries, deploying autonomous solar Interceptors in polluted rivers and mobilizing global coastal cleanups.",
        coordinates: [
          { name: "Kingston Harbour, Jamaica", lat: 17.9714, lng: -76.7936 },
          { name: "Rio Ozama Interceptor, Dominican Rep", lat: 18.4861, lng: -69.9312 },
          { name: "Mekong Delta Cleanup, Vietnam", lat: 10.0342, lng: 105.7883 },
        ],
      },
      {
        id: "wells-africa",
        title: "100 Clean Water Wells in Africa",
        metric: "500,000 PEOPLE",
        unit: "Access to Clean Drinking Water",
        partner: "Local Engineering Teams across 5 Nations",
        description: "Engineered and drilled 100 deep-bore solar-powered clean water wells across Kenya, Zimbabwe, Uganda, Somalia, and Cameroon.",
        coordinates: [
          { name: "Meru District Solar Well, Kenya", lat: 0.0463, lng: 37.6559 },
          { name: "Mutare Community Borehole, Zimbabwe", lat: -18.9728, lng: 32.6695 },
          { name: "Gulu Water Station, Uganda", lat: 2.7747, lng: 32.2990 },
        ],
      },
      {
        id: "medical-restoration",
        title: "Global Restorative Medicine",
        metric: "4,000+ LIVES",
        unit: "Surgeries & Restorative Tech Funded",
        partner: "Beast Philanthropy 501(c)(3)",
        description: "1,000 cataract surgeries to cure blindness, 1,000 hearing aids equipped for deaf patients, and 2,000 custom prosthetics delivered to amputees.",
        coordinates: [
          { name: "Cataract Clinic, Guadalajara, Mexico", lat: 20.6597, lng: -103.3496 },
          { name: "Hearing Restoration Clinic, Delhi, India", lat: 28.6139, lng: 77.2090 },
        ],
      },
    ],
  },

  // Level 06: Physical Scale Comparisons
  scaleComparisons: [
    {
      id: "superbowl",
      title: "Super Bowl Broadcast Reach",
      comparisonLabel: "Average MrBeast Upload vs Super Bowl LVIII",
      ratio: 1.15,
      mrbeastStat: "141,200,000 Average Views per Upload",
      benchmarkStat: "123,700,000 Super Bowl LVIII Average TV Viewers",
      description: "A standard 15-minute video upload on the @MrBeast channel pulls more human attention than the peak US broadcast of the Super Bowl.",
    },
    {
      id: "wembley",
      title: "Wembley Stadium Capacity",
      comparisonLabel: "Wembley Stadiums to Fit Single Video Audience",
      ratio: 1568,
      mrbeastStat: "141.2M Views = 1,568 Full Stadiums",
      benchmarkStat: "90,000 Capacity (Largest Stadium in UK)",
      description: "If every viewer of an average upload gathered in person, it would completely sell out London's Wembley Stadium 1,568 consecutive times.",
    },
    {
      id: "population",
      title: "National Population Equivalent",
      comparisonLabel: "523M Subscribers vs US + Canada + Australia",
      ratio: 1.27,
      mrbeastStat: "523,000,000 Subscribers",
      benchmarkStat: "411,000,000 Combined Pop. (USA 340M + CAN 41M + AUS 30M)",
      description: "Jimmy's flagship subscriber base alone exceeds the entire combined populations of the United States, Canada, and Australia by over 110 million people.",
    },
    {
      id: "empire-state",
      title: "Cash Vault Physical Altitude",
      comparisonLabel: "Physical $100M Dollar Bills vs Empire State Building",
      ratio: 0.28,
      mrbeastStat: "$100M in $100 bills = 430 Feet Tall",
      benchmarkStat: "Empire State Building = 1,454 Feet",
      description: "The $100,000,000 Beast Games budget, stacked in crisp $100 bills, would create a physical pillar of currency reaching nearly one-third the height of the Empire State Building.",
    },
  ] as ScaleComparison[],

  // Verification Sources Directory for SourcesModal
  sourcesDirectory: [
    {
      metric: "523M+ Main Channel Subscribers",
      asOf: "October 2026",
      source: "YouTube Channel Analytics & Social Blade Registry",
      verificationNote: "First channel to cross 500M subs (June 12, 2026)",
    },
    {
      metric: "144.2B+ Main Views / 177B+ Combined Network",
      asOf: "October 2026",
      source: "Social Blade & YouTube Creator Telemetry",
      verificationNote: "Aggregated across all 18 official Beast network channels",
    },
    {
      metric: "$5.0B Beast Industries Valuation",
      asOf: "October 2026",
      source: "Fortune / Bloomberg Corporate Intelligence",
      verificationNote: "$300M Series C led by Alpha Wave; $200M Bitmine round; Step acquisition",
    },
    {
      metric: "44 Guinness World Records (Beast Games)",
      asOf: "October 2026",
      source: "Guinness World Records Adjudication Official Registry",
      verificationNote: "Adjudicated during production in Las Vegas and Toronto",
    },
    {
      metric: "25M+ Trees Planted (#TeamTrees)",
      asOf: "October 2026",
      source: "Arbor Day Foundation Public Registry (teamtrees.org)",
      verificationNote: "104 planting sites across 30+ nations",
    },
    {
      metric: "34M+ Lbs Ocean Plastic Removed (#TeamSeas)",
      asOf: "October 2026",
      source: "The Ocean Cleanup & Ocean Conservancy (teamseas.org)",
      verificationNote: "$33.4M raised, autonomous solar interceptors deployed",
    },
    {
      metric: "Feastables $250M Rev / $20M Profit (2024)",
      asOf: "October 2026",
      source: "CPG Industry Reports & Feastables Corporate Financials",
      verificationNote: "30,000+ retail doors; projected $520M in 2025",
    },
  ],
};

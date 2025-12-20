import { Locale } from "./config";

type TranslationKey =
  | "nav.home"
  | "nav.matches"
  | "nav.teams"
  | "nav.players"
  | "nav.pointsTable"
  | "nav.news"
  | "nav.gallery"
  | "hero.badge"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta.schedule"
  | "hero.cta.teams"
  | "hero.countdown.days"
  | "hero.countdown.hours"
  | "hero.countdown.mins"
  | "hero.countdown.secs"
  | "section.upcomingMatches"
  | "section.featuredTeams"
  | "section.latestNews"
  | "section.viewAll"
  | "section.viewSchedule"
  | "section.allTeams"
  | "section.moreNews"
  | "match.vs"
  | "match.upcoming"
  | "match.live"
  | "match.completed"
  | "match.matchNo"
  | "team.players"
  | "team.captain"
  | "team.coach"
  | "team.homeGround"
  | "points.team"
  | "points.played"
  | "points.won"
  | "points.lost"
  | "points.nrr"
  | "points.pts"
  | "points.recentForm"
  | "footer.tagline"
  | "footer.quickLinks"
  | "footer.contact"
  | "footer.followUs"
  | "footer.copyright"
  | "gallery.title"
  | "gallery.subtitle"
  | "gallery.featured"
  | "gallery.shorts"
  | "gallery.allVideos"
  | "gallery.subscribe"
  | "gallery.subscribeText"
  | "language.select";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.matches": "Matches",
    "nav.teams": "Teams",
    "nav.players": "Players",
    "nav.pointsTable": "Points Table",
    "nav.news": "News",
    "nav.gallery": "Gallery",

    // Hero Section
    "hero.badge": "Season 5 • Starting December 2025",
    "hero.title": "OCPL",
    "hero.subtitle":
      "Only Cricket Premier League - Where local talent meets professional cricket. Experience the thrill of competitive cricket in Vasai.",
    "hero.cta.schedule": "View Schedule",
    "hero.cta.teams": "Explore Teams",
    "hero.countdown.days": "Days",
    "hero.countdown.hours": "Hours",
    "hero.countdown.mins": "Mins",
    "hero.countdown.secs": "Secs",

    // Sections
    "section.upcomingMatches": "Upcoming Matches",
    "section.featuredTeams": "Featured Teams",
    "section.latestNews": "Latest News",
    "section.viewAll": "View All",
    "section.viewSchedule": "View Full Schedule",
    "section.allTeams": "View All Teams",
    "section.moreNews": "More News",

    // Match
    "match.vs": "VS",
    "match.upcoming": "Upcoming",
    "match.live": "Live",
    "match.completed": "Completed",
    "match.matchNo": "Match",

    // Team
    "team.players": "Players",
    "team.captain": "Captain",
    "team.coach": "Coach",
    "team.homeGround": "Home Ground",

    // Points Table
    "points.team": "Team",
    "points.played": "P",
    "points.won": "W",
    "points.lost": "L",
    "points.nrr": "NRR",
    "points.pts": "Pts",
    "points.recentForm": "Form",

    // Footer
    "footer.tagline":
      "The premier cricket league of Vasai, bringing together local talent for competitive cricket.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.followUs": "Follow Us",
    "footer.copyright": "© 2025 OCPL. All rights reserved.",

    // Gallery
    "gallery.title": "Video Gallery",
    "gallery.subtitle":
      "Watch the best moments from OCPL - catches, sixes, wickets, and more!",
    "gallery.featured": "Featured Videos",
    "gallery.shorts": "YouTube Shorts",
    "gallery.allVideos": "All Videos",
    "gallery.subscribe": "Subscribe for More",
    "gallery.subscribeText":
      "Follow OCPL on YouTube for the latest highlights, interviews, and behind-the-scenes content",

    // Language
    "language.select": "Select Language",
  },

  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.matches": "मैच",
    "nav.teams": "टीमें",
    "nav.players": "खिलाड़ी",
    "nav.pointsTable": "अंक तालिका",
    "nav.news": "समाचार",
    "nav.gallery": "गैलरी",

    // Hero Section
    "hero.badge": "सीज़न 5 • दिसंबर 2025 से शुरू",
    "hero.title": "OCPL",
    "hero.subtitle":
      "ओनली क्रिकेट प्रीमियर लीग - जहाँ स्थानीय प्रतिभा पेशेवर क्रिकेट से मिलती है। वसई में प्रतिस्पर्धी क्रिकेट का रोमांच अनुभव करें।",
    "hero.cta.schedule": "शेड्यूल देखें",
    "hero.cta.teams": "टीमें देखें",
    "hero.countdown.days": "दिन",
    "hero.countdown.hours": "घंटे",
    "hero.countdown.mins": "मिनट",
    "hero.countdown.secs": "सेकंड",

    // Sections
    "section.upcomingMatches": "आगामी मैच",
    "section.featuredTeams": "प्रमुख टीमें",
    "section.latestNews": "ताज़ा खबर",
    "section.viewAll": "सभी देखें",
    "section.viewSchedule": "पूरा शेड्यूल देखें",
    "section.allTeams": "सभी टीमें देखें",
    "section.moreNews": "और खबरें",

    // Match
    "match.vs": "बनाम",
    "match.upcoming": "आगामी",
    "match.live": "लाइव",
    "match.completed": "समाप्त",
    "match.matchNo": "मैच",

    // Team
    "team.players": "खिलाड़ी",
    "team.captain": "कप्तान",
    "team.coach": "कोच",
    "team.homeGround": "होम ग्राउंड",

    // Points Table
    "points.team": "टीम",
    "points.played": "खेले",
    "points.won": "जीते",
    "points.lost": "हारे",
    "points.nrr": "NRR",
    "points.pts": "अंक",
    "points.recentForm": "फॉर्म",

    // Footer
    "footer.tagline":
      "वसई की प्रमुख क्रिकेट लीग, प्रतिस्पर्धी क्रिकेट के लिए स्थानीय प्रतिभाओं को एक साथ लाती है।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.contact": "संपर्क",
    "footer.followUs": "फॉलो करें",
    "footer.copyright": "© 2025 OCPL. सर्वाधिकार सुरक्षित।",

    // Gallery
    "gallery.title": "वीडियो गैलरी",
    "gallery.subtitle":
      "OCPL के सर्वश्रेष्ठ पल देखें - कैच, छक्के, विकेट और भी बहुत कुछ!",
    "gallery.featured": "प्रमुख वीडियो",
    "gallery.shorts": "यूट्यूब शॉर्ट्स",
    "gallery.allVideos": "सभी वीडियो",
    "gallery.subscribe": "और के लिए सब्सक्राइब करें",
    "gallery.subscribeText":
      "नवीनतम हाइलाइट्स, इंटरव्यू और बिहाइंड-द-सीन्स कंटेंट के लिए YouTube पर OCPL को फॉलो करें",

    // Language
    "language.select": "भाषा चुनें",
  },

  mr: {
    // Navigation
    "nav.home": "मुख्यपृष्ठ",
    "nav.matches": "सामने",
    "nav.teams": "संघ",
    "nav.players": "खेळाडू",
    "nav.pointsTable": "गुण तालिका",
    "nav.news": "बातम्या",
    "nav.gallery": "गॅलरी",

    // Hero Section
    "hero.badge": "सीझन 5 • डिसेंबर 2025 पासून सुरू",
    "hero.title": "OCPL",
    "hero.subtitle":
      "ओन्ली क्रिकेट प्रीमियर लीग - जिथे स्थानिक प्रतिभा व्यावसायिक क्रिकेटला भेटते. वसईमध्ये स्पर्धात्मक क्रिकेटचा थरार अनुभवा.",
    "hero.cta.schedule": "वेळापत्रक पहा",
    "hero.cta.teams": "संघ पहा",
    "hero.countdown.days": "दिवस",
    "hero.countdown.hours": "तास",
    "hero.countdown.mins": "मिनिटे",
    "hero.countdown.secs": "सेकंद",

    // Sections
    "section.upcomingMatches": "आगामी सामने",
    "section.featuredTeams": "प्रमुख संघ",
    "section.latestNews": "ताज्या बातम्या",
    "section.viewAll": "सर्व पहा",
    "section.viewSchedule": "संपूर्ण वेळापत्रक पहा",
    "section.allTeams": "सर्व संघ पहा",
    "section.moreNews": "अधिक बातम्या",

    // Match
    "match.vs": "विरुद्ध",
    "match.upcoming": "आगामी",
    "match.live": "लाइव्ह",
    "match.completed": "पूर्ण",
    "match.matchNo": "सामना",

    // Team
    "team.players": "खेळाडू",
    "team.captain": "कर्णधार",
    "team.coach": "प्रशिक्षक",
    "team.homeGround": "होम ग्राउंड",

    // Points Table
    "points.team": "संघ",
    "points.played": "खेळले",
    "points.won": "जिंकले",
    "points.lost": "हरले",
    "points.nrr": "NRR",
    "points.pts": "गुण",
    "points.recentForm": "फॉर्म",

    // Footer
    "footer.tagline":
      "वसईची प्रमुख क्रिकेट लीग, स्पर्धात्मक क्रिकेटसाठी स्थानिक प्रतिभांना एकत्र आणते.",
    "footer.quickLinks": "द्रुत लिंक्स",
    "footer.contact": "संपर्क",
    "footer.followUs": "फॉलो करा",
    "footer.copyright": "© 2025 OCPL. सर्व हक्क राखीव.",

    // Gallery
    "gallery.title": "व्हिडिओ गॅलरी",
    "gallery.subtitle":
      "OCPL चे सर्वोत्तम क्षण पहा - कॅच, षटकार, विकेट आणि बरेच काही!",
    "gallery.featured": "वैशिष्ट्यीकृत व्हिडिओ",
    "gallery.shorts": "यूट्यूब शॉर्ट्स",
    "gallery.allVideos": "सर्व व्हिडिओ",
    "gallery.subscribe": "अधिकसाठी सबस्क्राइब करा",
    "gallery.subscribeText":
      "नवीनतम हायलाइट्स, मुलाखती आणि बिहाइंड-द-सीन्स कंटेंटसाठी YouTube वर OCPL ला फॉलो करा",

    // Language
    "language.select": "भाषा निवडा",
  },
};

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}

export function useTranslations(locale: Locale) {
  return {
    t: (key: TranslationKey) => getTranslation(locale, key),
  };
}

// Join League Form translations
const joinLeagueTranslations: Record<Locale, {
  buttonText: string;
  modal: {
    title: string;
    subtitle: string;
    personalInfo: string;
    cricketInfo: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    dateOfBirth: string;
    address: string;
    addressPlaceholder: string;
    preferredRole: string;
    selectRole: string;
    batsman: string;
    bowler: string;
    allRounder: string;
    wicketKeeper: string;
    battingStyle: string;
    selectBattingStyle: string;
    rightHanded: string;
    leftHanded: string;
    bowlingStyle: string;
    selectBowlingStyle: string;
    fastBowler: string;
    mediumPacer: string;
    spinBowler: string;
    none: string;
    experience: string;
    experiencePlaceholder: string;
    preferredTeam: string;
    selectTeam: string;
    anyTeam: string;
    previousTeams: string;
    previousTeamsPlaceholder: string;
    achievements: string;
    achievementsPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    close: string;
    required: string;
  };
}> = {
  en: {
    buttonText: "Join The League",
    modal: {
      title: "Join OCPL",
      subtitle: "Register as a player for Season 5",
      personalInfo: "Personal Information",
      cricketInfo: "Cricket Information",
      name: "Full Name",
      namePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "your.email@example.com",
      phone: "Contact Number",
      phonePlaceholder: "10-digit mobile number",
      dateOfBirth: "Date of Birth",
      address: "Address",
      addressPlaceholder: "Your residential address",
      preferredRole: "Preferred Role",
      selectRole: "Select your role",
      batsman: "Batsman",
      bowler: "Bowler",
      allRounder: "All-Rounder",
      wicketKeeper: "Wicket Keeper",
      battingStyle: "Batting Style",
      selectBattingStyle: "Select batting style",
      rightHanded: "Right-Handed",
      leftHanded: "Left-Handed",
      bowlingStyle: "Bowling Style",
      selectBowlingStyle: "Select bowling style",
      fastBowler: "Fast Bowler",
      mediumPacer: "Medium Pacer",
      spinBowler: "Spin Bowler",
      none: "Don't Bowl",
      experience: "Years of Experience",
      experiencePlaceholder: "e.g., 5 years",
      preferredTeam: "Preferred Team",
      selectTeam: "Select a team",
      anyTeam: "Any Team",
      previousTeams: "Previous Teams",
      previousTeamsPlaceholder: "Teams you've played for",
      achievements: "Cricket Achievements",
      achievementsPlaceholder: "Notable achievements, awards, records...",
      submit: "Submit Registration",
      submitting: "Submitting...",
      successTitle: "Registration Successful!",
      successMessage: "Thank you for registering. Our team will contact you shortly with further details.",
      close: "Close",
      required: "Required",
    },
  },
  hi: {
    buttonText: "लीग में शामिल हों",
    modal: {
      title: "OCPL में शामिल हों",
      subtitle: "सीज़न 5 के लिए खिलाड़ी के रूप में पंजीकरण करें",
      personalInfo: "व्यक्तिगत जानकारी",
      cricketInfo: "क्रिकेट जानकारी",
      name: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      email: "ईमेल पता",
      emailPlaceholder: "your.email@example.com",
      phone: "संपर्क नंबर",
      phonePlaceholder: "10 अंकों का मोबाइल नंबर",
      dateOfBirth: "जन्म तिथि",
      address: "पता",
      addressPlaceholder: "आपका आवासीय पता",
      preferredRole: "पसंदीदा भूमिका",
      selectRole: "अपनी भूमिका चुनें",
      batsman: "बल्लेबाज",
      bowler: "गेंदबाज",
      allRounder: "ऑल-राउंडर",
      wicketKeeper: "विकेट कीपर",
      battingStyle: "बल्लेबाजी शैली",
      selectBattingStyle: "बल्लेबाजी शैली चुनें",
      rightHanded: "दाएं हाथ के",
      leftHanded: "बाएं हाथ के",
      bowlingStyle: "गेंदबाजी शैली",
      selectBowlingStyle: "गेंदबाजी शैली चुनें",
      fastBowler: "तेज गेंदबाज",
      mediumPacer: "मध्यम तेज",
      spinBowler: "स्पिन गेंदबाज",
      none: "गेंदबाजी नहीं",
      experience: "अनुभव के वर्ष",
      experiencePlaceholder: "जैसे, 5 वर्ष",
      preferredTeam: "पसंदीदा टीम",
      selectTeam: "टीम चुनें",
      anyTeam: "कोई भी टीम",
      previousTeams: "पिछली टीमें",
      previousTeamsPlaceholder: "जिन टीमों के लिए आपने खेला है",
      achievements: "क्रिकेट उपलब्धियां",
      achievementsPlaceholder: "उल्लेखनीय उपलब्धियां, पुरस्कार, रिकॉर्ड...",
      submit: "पंजीकरण जमा करें",
      submitting: "जमा हो रहा है...",
      successTitle: "पंजीकरण सफल!",
      successMessage: "पंजीकरण के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      close: "बंद करें",
      required: "आवश्यक",
    },
  },
  mr: {
    buttonText: "लीगमध्ये सामील व्हा",
    modal: {
      title: "OCPL मध्ये सामील व्हा",
      subtitle: "सीझन 5 साठी खेळाडू म्हणून नोंदणी करा",
      personalInfo: "वैयक्तिक माहिती",
      cricketInfo: "क्रिकेट माहिती",
      name: "पूर्ण नाव",
      namePlaceholder: "तुमचे पूर्ण नाव प्रविष्ट करा",
      email: "ईमेल पत्ता",
      emailPlaceholder: "your.email@example.com",
      phone: "संपर्क क्रमांक",
      phonePlaceholder: "10 अंकी मोबाइल क्रमांक",
      dateOfBirth: "जन्म तारीख",
      address: "पत्ता",
      addressPlaceholder: "तुमचा निवासी पत्ता",
      preferredRole: "पसंतीची भूमिका",
      selectRole: "तुमची भूमिका निवडा",
      batsman: "फलंदाज",
      bowler: "गोलंदाज",
      allRounder: "ऑल-राउंडर",
      wicketKeeper: "यष्टिरक्षक",
      battingStyle: "फलंदाजी शैली",
      selectBattingStyle: "फलंदाजी शैली निवडा",
      rightHanded: "उजव्या हाताचे",
      leftHanded: "डाव्या हाताचे",
      bowlingStyle: "गोलंदाजी शैली",
      selectBowlingStyle: "गोलंदाजी शैली निवडा",
      fastBowler: "वेगवान गोलंदाज",
      mediumPacer: "मध्यम वेगवान",
      spinBowler: "फिरकी गोलंदाज",
      none: "गोलंदाजी नाही",
      experience: "अनुभवाची वर्षे",
      experiencePlaceholder: "उदा., 5 वर्षे",
      preferredTeam: "पसंतीचा संघ",
      selectTeam: "संघ निवडा",
      anyTeam: "कोणताही संघ",
      previousTeams: "मागील संघ",
      previousTeamsPlaceholder: "तुम्ही खेळलेल्या संघांची नावे",
      achievements: "क्रिकेट कामगिरी",
      achievementsPlaceholder: "उल्लेखनीय कामगिरी, पुरस्कार, विक्रम...",
      submit: "नोंदणी सबमिट करा",
      submitting: "सबमिट होत आहे...",
      successTitle: "नोंदणी यशस्वी!",
      successMessage: "नोंदणीसाठी धन्यवाद. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.",
      close: "बंद करा",
      required: "आवश्यक",
    },
  },
};

export function getJoinLeagueTranslations(locale: Locale) {
  return joinLeagueTranslations[locale] || joinLeagueTranslations.en;
}

export type { TranslationKey };


/**
 * Site Configuration
 * Centralized configuration for OCPL website
 */

export const siteConfig = {
  name: "OCPL",
  fullName: "Only Cricket League",
  tagline: "Vasai's Premier Cricket Tournament",
  description:
    "A league played in Vasai between local players. This league consists of players from all age groups, from various walks of life who love to enjoy this beautiful game.",
  
  // Logo from Contentstack Assets
  logo: {
    url: "https://images.contentstack.io/v3/assets/blt2a1a0df4ff6bc454/blt8bdd2fee59120c6c/6942831e1308b8770a0b10c4/OCPLLogo.jpg",
    alt: "OCPL - Only Cricket League Logo",
    width: 200,
    height: 200,
  },

  // Current Season
  season: {
    year: 2025,
    number: 5,
    status: "Live",
  },

  // Contact Information
  contact: {
    email: "info@ocpl.in",
    phone: "+91 98765 43210",
    address: {
      line1: "Vasai West, Palghar District",
      line2: "Maharashtra, India",
    },
  },

  // Social Links
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
};

export type SiteConfig = typeof siteConfig;


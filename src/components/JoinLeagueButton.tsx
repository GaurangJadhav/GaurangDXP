"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import JoinLeagueModal from "./JoinLeagueModal";

interface JoinLeagueButtonProps {
  translations: {
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
  };
  variant?: "primary" | "hero";
  className?: string;
}

export default function JoinLeagueButton({ translations, variant = "primary", className = "" }: JoinLeagueButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseStyles = "inline-flex items-center gap-2 font-bold rounded-xl transition-all duration-300";
  
  const variantStyles = {
    primary: "px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105",
    hero: "px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-lg hover:shadow-xl hover:shadow-primary-500/30 hover:scale-105",
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        <Trophy className="w-5 h-5" />
        {translations.buttonText}
      </button>
      
      <JoinLeagueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        translations={translations.modal}
      />
    </>
  );
}


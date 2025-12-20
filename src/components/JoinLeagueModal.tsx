"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Calendar, MapPin, Trophy, Users, ChevronDown } from "lucide-react";

interface JoinLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: {
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
}

const teams = [
  { id: "FC", name: "Flame Chargers" },
  { id: "SS", name: "Storm Surfers" },
  { id: "WW", name: "Windstorm Warriors" },
  { id: "ET", name: "Earth Titans" },
  { id: "TS", name: "Thunder Strikers" },
  { id: "GG", name: "Glacier Gladiators" },
];

export default function JoinLeagueModal({ isOpen, onClose, translations: t }: JoinLeagueModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    preferredRole: "",
    battingStyle: "",
    bowlingStyle: "",
    experience: "",
    preferredTeam: "",
    previousTeams: "",
    achievements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.required;
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone (10 digits)";
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t.required;
    if (!formData.preferredRole) newErrors.preferredRole = t.required;
    if (!formData.battingStyle) newErrors.battingStyle = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      preferredRole: "",
      battingStyle: "",
      bowlingStyle: "",
      experience: "",
      preferredTeam: "",
      previousTeams: "",
      achievements: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display text-white tracking-wide">{t.title}</h2>
              <p className="text-white/80 text-sm">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-secondary-500" />
              </div>
              <h3 className="text-2xl font-display text-white mb-2">{t.successTitle}</h3>
              <p className="text-dark-400 mb-8">{t.successMessage}</p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-500" />
                  {t.personalInfo}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border ${errors.name ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.email} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border ${errors.email ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.phone} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.phonePlaceholder}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border ${errors.phone ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.dateOfBirth} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border ${errors.dateOfBirth ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.address}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-dark-500" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder={t.addressPlaceholder}
                        rows={2}
                        className="w-full pl-10 pr-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cricket Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary-500" />
                  {t.cricketInfo}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Role */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.preferredRole} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="preferredRole"
                        value={formData.preferredRole}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-dark-700/50 border ${errors.preferredRole ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer`}
                      >
                        <option value="">{t.selectRole}</option>
                        <option value="batsman">{t.batsman}</option>
                        <option value="bowler">{t.bowler}</option>
                        <option value="all-rounder">{t.allRounder}</option>
                        <option value="wicket-keeper">{t.wicketKeeper}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                    </div>
                    {errors.preferredRole && <p className="text-red-500 text-xs mt-1">{errors.preferredRole}</p>}
                  </div>

                  {/* Batting Style */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.battingStyle} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="battingStyle"
                        value={formData.battingStyle}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-dark-700/50 border ${errors.battingStyle ? 'border-red-500' : 'border-dark-600'} rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer`}
                      >
                        <option value="">{t.selectBattingStyle}</option>
                        <option value="right-handed">{t.rightHanded}</option>
                        <option value="left-handed">{t.leftHanded}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                    </div>
                    {errors.battingStyle && <p className="text-red-500 text-xs mt-1">{errors.battingStyle}</p>}
                  </div>

                  {/* Bowling Style */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.bowlingStyle}
                    </label>
                    <div className="relative">
                      <select
                        name="bowlingStyle"
                        value={formData.bowlingStyle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">{t.selectBowlingStyle}</option>
                        <option value="fast">{t.fastBowler}</option>
                        <option value="medium">{t.mediumPacer}</option>
                        <option value="spin">{t.spinBowler}</option>
                        <option value="none">{t.none}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.experience}
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder={t.experiencePlaceholder}
                      className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  {/* Preferred Team */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.preferredTeam}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                      <select
                        name="preferredTeam"
                        value={formData.preferredTeam}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">{t.selectTeam}</option>
                        <option value="any">{t.anyTeam}</option>
                        {teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Previous Teams */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.previousTeams}
                    </label>
                    <input
                      type="text"
                      name="previousTeams"
                      value={formData.previousTeams}
                      onChange={handleChange}
                      placeholder={t.previousTeamsPlaceholder}
                      className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  {/* Achievements */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-300 mb-1">
                      {t.achievements}
                    </label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      placeholder={t.achievementsPlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5" />
                    {t.submit}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolio } from '../data/defaultPortfolio';
import { defaultProjects } from '../data/defaultProjects';
import { defaultSkills } from '../data/defaultSkills';
import { defaultTeam } from '../data/defaultTeam';
import { defaultAILab } from '../data/defaultAILab';
import { safeGetStorage, safeSetStorage, STORAGE_KEYS } from '../utils/storage';

const PortfolioContext = createContext();

// Sanitize images to ensure external URLs / unsplash photos are removed
function sanitizeImg(img) {
  if (typeof img === 'string') {
    if (img.includes('unsplash.com') || (img.startsWith('http') && !img.startsWith('data:image/'))) {
      return '';
    }
    return img;
  }
  return '';
}

export function PortfolioProvider({ children }) {
  // Load with fallback to default structures and clean any old cached URLs
  const [portfolio, setPortfolio] = useState(() => {
    const raw = safeGetStorage(STORAGE_KEYS.PORTFOLIO, defaultPortfolio);
    if (raw?.profile?.avatar) {
      raw.profile.avatar = sanitizeImg(raw.profile.avatar);
    }
    return raw;
  });

  const [projects, setProjects] = useState(() => {
    const raw = safeGetStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
    return (raw || []).map((p) => ({ ...p, image: sanitizeImg(p.image) }));
  });

  const [skills, setSkills] = useState(() =>
    safeGetStorage(STORAGE_KEYS.SKILLS, defaultSkills)
  );

  const [team, setTeam] = useState(() => {
    const raw = safeGetStorage(STORAGE_KEYS.TEAM, defaultTeam);
    return (raw || []).map((m) => ({ ...m, avatar: sanitizeImg(m.avatar) }));
  });

  const [aiLab, setAILab] = useState(() =>
    safeGetStorage(STORAGE_KEYS.AI_LAB, defaultAILab)
  );

  // Sync to LocalStorage on updates
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.PORTFOLIO, portfolio);
  }, [portfolio]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.SKILLS, skills);
  }, [skills]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.TEAM, team);
  }, [team]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.AI_LAB, aiLab);
  }, [aiLab]);

  // --- Portfolio Content Updates ---
  const updateProfile = (profileData) => {
    setPortfolio((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }));
  };

  const updateAbout = (aboutData) => {
    setPortfolio((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutData },
    }));
  };

  const updateContact = (contactData) => {
    setPortfolio((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactData },
    }));
  };

  // --- Projects CRUD ---
  const addProject = (projectData) => {
    const newProj = {
      ...projectData,
      id: 'proj-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    };
    setProjects((prev) => [newProj, ...prev]);
    return newProj;
  };

  const updateProject = (id, updatedData) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  const reorderProjects = (reorderedList) => {
    setProjects(reorderedList);
  };

  // --- Team CRUD ---
  const addTeamMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: 'team-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    };
    setTeam((prev) => [...prev, newMember]);
    return newMember;
  };

  const updateTeamMember = (id, updatedData) => {
    setTeam((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteTeamMember = (id) => {
    setTeam((prev) => prev.filter((item) => item.id !== id));
  };

  const reorderTeam = (reorderedList) => {
    setTeam(reorderedList);
  };

  // --- Skills Management ---
  const updateSkills = (newSkillsList) => {
    setSkills(newSkillsList);
  };

  const updateSkillCategory = (categoryId, updatedCategory) => {
    setSkills((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedCategory } : cat))
    );
  };

  // --- AI Lab Management ---
  const addAILabItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    };
    setAILab((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateAILabItem = (id, updatedData) => {
    setAILab((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteAILabItem = (id) => {
    setAILab((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Reset to default factory state ---
  const resetToDefaults = () => {
    setPortfolio(defaultPortfolio);
    setProjects(defaultProjects);
    setSkills(defaultSkills);
    setTeam(defaultTeam);
    setAILab(defaultAILab);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        projects,
        skills,
        team,
        aiLab,
        updateProfile,
        updateAbout,
        updateContact,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        reorderTeam,
        updateSkills,
        updateSkillCategory,
        addAILabItem,
        updateAILabItem,
        deleteAILabItem,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

import { createContext, useContext, useState, ReactNode } from 'react';

interface VitalsData {
  temperature: string;
  heartRate: string;
  spO2: string;
}

interface SymptomsData {
  fever: boolean;
  cough: boolean;
  chestPain: boolean;
  breathlessness: boolean;
  dizziness: boolean;
}

interface LocationData {
  village: string;
  coordinates?: { lat: number; lng: number };
}

interface ScreeningData {
  age: string;
  gender: string;
  consent: boolean;
  vitals: VitalsData;
  symptoms: SymptomsData;
  location: LocationData | null;
  riskLevel: 'low' | 'medium' | 'high' | null;
}

interface ScreeningContextType {
  data: ScreeningData;
  updateProfile: (age: string, gender: string, consent: boolean) => void;
  updateVitals: (vitals: VitalsData) => void;
  updateSymptoms: (symptoms: SymptomsData) => void;
  updateLocation: (location: LocationData) => void;
  updateRiskLevel: (level: 'low' | 'medium' | 'high') => void;
  resetScreening: () => void;
}

const initialData: ScreeningData = {
  age: '',
  gender: '',
  consent: false,
  vitals: {
    temperature: '',
    heartRate: '',
    spO2: '',
  },
  symptoms: {
    fever: false,
    cough: false,
    chestPain: false,
    breathlessness: false,
    dizziness: false,
  },
  location: null,
  riskLevel: null,
};

const ScreeningContext = createContext<ScreeningContextType | undefined>(
  undefined,
);

export function ScreeningProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ScreeningData>(initialData);

  const updateProfile = (age: string, gender: string, consent: boolean) => {
    setData((prev) => ({ ...prev, age, gender, consent }));
  };

  const updateVitals = (vitals: VitalsData) => {
    setData((prev) => ({ ...prev, vitals }));
  };

  const updateSymptoms = (symptoms: SymptomsData) => {
    setData((prev) => ({ ...prev, symptoms }));
  };

  const updateLocation = (location: LocationData) => {
    setData((prev) => ({ ...prev, location }));
  };

  const updateRiskLevel = (level: 'low' | 'medium' | 'high') => {
    setData((prev) => ({ ...prev, riskLevel: level }));
  };

  const resetScreening = () => {
    setData(initialData);
  };

  return (
    <ScreeningContext.Provider
      value={{
        data,
        updateProfile,
        updateVitals,
        updateSymptoms,
        updateLocation,
        updateRiskLevel,
        resetScreening,
      }}
    >
      {children}
    </ScreeningContext.Provider>
  );
}

export function useScreening() {
  const context = useContext(ScreeningContext);
  if (context === undefined) {
    throw new Error('useScreening must be used within a ScreeningProvider');
  }
  return context;
}

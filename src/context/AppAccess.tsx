import { createContext, type PropsWithChildren, useContext, useState } from "react";

import { PaywallModal } from "@/components/PaywallModal";

type AppAccessContextValue = {
  isPremium: boolean;
  openPaywall: () => void;
};

const AppAccessContext = createContext<AppAccessContextValue | null>(null);

export function AppAccessProvider({ children }: PropsWithChildren) {
  const [isPremium, setIsPremium] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);

  return (
    <AppAccessContext.Provider
      value={{
        isPremium,
        openPaywall: () => setPaywallVisible(true),
      }}
    >
      {children}
      <PaywallModal
        onClose={() => setPaywallVisible(false)}
        onUpgrade={() => {
          setIsPremium(true);
          setPaywallVisible(false);
        }}
        visible={paywallVisible}
      />
    </AppAccessContext.Provider>
  );
}

export function useAppAccess() {
  const context = useContext(AppAccessContext);

  if (!context) {
    throw new Error("useAppAccess must be used inside AppAccessProvider");
  }

  return context;
}

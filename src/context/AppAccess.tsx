import { createContext, type PropsWithChildren, useContext, useState } from "react";

import { PaywallModal } from "@/components/PaywallModal";

type AppAccessContextValue = {
  isPremium: boolean;
  showPremiumUI: boolean;
  openPaywall: () => void;
};

const AppAccessContext = createContext<AppAccessContextValue | null>(null);

// Flip this back to false when we are ready to test subscriptions/paywalls again.
const FREE_TEST_MODE = true;

export function AppAccessProvider({ children }: PropsWithChildren) {
  const [isPremium, setIsPremium] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const showPremiumUI = !FREE_TEST_MODE;
  const featureAccessUnlocked = FREE_TEST_MODE || isPremium;

  const openPaywall = () => {
    if (FREE_TEST_MODE) {
      return;
    }

    setPaywallVisible(true);
  };

  return (
    <AppAccessContext.Provider
      value={{
        isPremium: featureAccessUnlocked,
        showPremiumUI,
        openPaywall,
      }}
    >
      {children}
      {showPremiumUI ? (
        <PaywallModal
          onClose={() => setPaywallVisible(false)}
          onUpgrade={() => {
            setIsPremium(true);
            setPaywallVisible(false);
          }}
          visible={paywallVisible}
        />
      ) : null}
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

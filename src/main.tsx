// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@near-wallet-selector/modal-ui/styles.css";

import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";

import { NetworkId } from "./config";

// Wallet selector config with minimal type casting
const walletSelectorConfig = {
  network: NetworkId,
  modules: [
    setupMyNearWallet() as any,
    setupHereWallet() as any,
    setupMeteorWallet() as any,
    setupBitteWallet() as any,
  ],
};

// Render the app
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <WalletSelectorProvider config={walletSelectorConfig}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WalletSelectorProvider>
  );
}

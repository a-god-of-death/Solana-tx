import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "3SYu9RpKyuo4tQxpejkPR1ZSk1uyKN7fyHLxBLJJHUPt"
);

// making an associated token account for address, 
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

import("@solana/spl-token").then(({ getOrCreateAssociatedTokenAccount }) => {
  async function fetchAndLogTokenAccount() {
    try {
      const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipient);
      console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
      const link = await getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");
      
      console.log(`✅ Created token Account: ${link}`);
    } catch (error) {
      console.error('Failed to fetch or create token account:', error);
    }
  }

  fetchAndLogTokenAccount();
});




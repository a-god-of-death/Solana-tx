import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "3SYu9RpKyuo4tQxpejkPR1ZSk1uyKN7fyHLxBLJJHUPt"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
  "43R6wrSTHDKxT3nUafhZtY63G7sewK286i4LPKPhMAp3"
);

async function mintTokens() {
  // Dynamically import the mintTo function
  const { mintTo } = await import("@solana/spl-token");

  const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, "devnet");

  console.log(`✅ Success! Mint Token Transaction: ${link}`);
}

mintTokens().catch(console.error);

// Original static import statement
// import { createMint } from "@solana/spl-token";

// Replaced with dynamic import
import('@solana/spl-token').then(({ createMint }) => {
  async function createAndLogTokenMint() {
    try {
      // Assuming createMint and getExplorerLink are defined elsewhere and are asynchronous functions
      const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
      
      const link = await getExplorerLink("address", tokenMint.toString(), "devnet");
      
      console.log(`✅ Finished! Created token mint: ${link}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  // Call the async function
  createAndLogTokenMint();
}).catch((error) => {
  console.error("Failed to load @solana/spl-token:", error);
});

import("@solana/spl-token");
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// This is a shortcut that runs:
// SystemProgram.createAccount
// token.createInitializeMintInstruction
// See https://www.soldev.app/course/token-program


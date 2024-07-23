import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("C4cnvx2v8fEPwhHzZzuXxUnUHgtnipcynW24LxVfXMpX");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function printAccountBalance() {
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
  
      console.log(
        `💰 Finished! The balance for the wallet at address ${publicKey.toString()} is ${balanceInSOL.toFixed(9)} SOL!`
      );
    } catch (error) {
      console.error("Failed to fetch account balance:", error);
    }
  }

printAccountBalance();
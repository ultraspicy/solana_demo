import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Signer,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

import BN = require("bn.js");

import {
    getKeypair,
    getPublicKey,
    getProgramId,
    ACCOUNT_DATA_LAYOUT,
} from "./utils";
   
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const setup = async() => {
    const alicePublicKey = getPublicKey("alice");
    const aliceKeypair = getKeypair("alice");
    const demoAccountPublicKey = getPublicKey("demo");
    const demoAccountKeypair = getKeypair("demo");
    const connection = new Connection("http://localhost:8899", "confirmed");
    const programId = getProgramId();

    console.log("Requesting SOL for Alice...");
    await connection.requestAirdrop(alicePublicKey, LAMPORTS_PER_SOL * 3);

    // build instructions
    const createDemoAccountIx = SystemProgram.createAccount({
        // Amount of space in bytes to allocate to the created account
        space: ACCOUNT_DATA_LAYOUT.span,
        // Amount of lamports to transfer to the created account
        lamports: await connection.getMinimumBalanceForRentExemption(
          ACCOUNT_DATA_LAYOUT.span
        ),
        // The account that will transfer lamports to the created account
        fromPubkey: alicePublicKey,
        // Public key of the created account
        newAccountPubkey: demoAccountPublicKey,
        // Public key of the program to assign as the owner of the created account
        programId: programId,
    });

    const init_ix = new TransactionInstruction({
        programId: programId,
        keys: [
            {pubkey: aliceKeypair.publicKey, isSigner: true, isWritable: false},
            {pubkey: demoAccountKeypair.publicKey, isSigner: false, isWritable: true},
        ],
        data: Buffer.from(
            Uint8Array.of(0,1,2,3,4)
          ),
    });

    // build transactions 
    const tx = new Transaction().add(
        createDemoAccountIx,
        init_ix,
    );
    console.log("Sending tx...");
    await connection.sendTransaction(
        tx,
        [aliceKeypair, demoAccountKeypair],
        {skipPreflight: false, preflightCommitment: "confirmed" }
    );
}

setup();
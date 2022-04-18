import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    Signer,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

import BN = require("bn.js");

import {
    getKeypair,
    getPublicKey,
    getProgramId,
} from "./utils";
   
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const setup = async() => {
    const alicePublicKey = getPublicKey("alice");
    const aliceKeypair = getKeypair("alice");
    const demoAccountPublicKey = getPublicKey("demo");
    const demoAccountKeypair = getKeypair("demo");

    const connection = new Connection("http://localhost:8899", "confirmed");
    console.log("Requesting SOL for Alice...");
    await connection.requestAirdrop(alicePublicKey, LAMPORTS_PER_SOL * 3);

    const programId = getProgramId();

    // build instructions
    const init_ix = new TransactionInstruction({
        programId: programId,
        keys: [
            {pubkey:alicePublicKey, isSigner: true, isWritable: false},
            {pubkey: demoAccountPublicKey, isSigner: false, isWritable: true},
        ],
        data: Buffer.from(
            Uint8Array.of(0,1,2,3,4)
          ),
    });

    // build transactions 
    const tx = new Transaction().add(
        init_ix,
    );
    console.log("Sending tx...");
    await connection.sendTransaction(
        tx,
        [aliceKeypair],
        {skipPreflight: false, preflightCommitment: "confirmed" }
    );
}

setup();
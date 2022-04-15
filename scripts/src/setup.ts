import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    Signer,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";

// import BN = require("bn.js");

import {
    getKeypair,
    getPublicKey,
    getProgramId,
} from "./utils";


import {
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";

const setup = async() => {
    const alicePublicKey = getPublicKey("alice");
    const aliceKeypair = getKeypair("alice");

    const connection = new Connection("http://localhost:8899", "confirmed");
    console.log("Requesting SOL for Alice...");
    await connection.requestAirdrop(alicePublicKey, LAMPORTS_PER_SOL * 3);

    const programId = getProgramId();

    const ix = new TransactionInstruction({
        programId: programId,
        keys: [],
        data: Buffer.from([]),
    });

    const tx = new Transaction().add(
        ix,
    );
    console.log("Sending tx...");
    await connection.sendTransaction(
        tx,
        [aliceKeypair],
        {skipPreflight: false, preflightCommitment: "confirmed" }
    );
}

setup();
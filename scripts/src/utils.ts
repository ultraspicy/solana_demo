import { Connection, Keypair, PublicKey } from "@solana/web3.js";

import * as fs from "fs";

//@ts-expect-error missing types
import * as BufferLayout from "buffer-layout";

export const getPublicKey = (name: string) =>
    new PublicKey(
        JSON.parse(fs.readFileSync(`./keys/${name}_pub.json`) as unknown as string)
    );

export const getPrivateKey = (name: string) =>
    Uint8Array.from(
        JSON.parse(fs.readFileSync(`./keys/${name}.json`) as unknown as string)
    );

export const getKeypair = (name: string) => 
    new Keypair({
        publicKey: getPublicKey(name).toBytes(),
        secretKey: getPrivateKey(name),
    });

export const getProgramId = () => {
    try {
        return getPublicKey("program");
    } catch (e) {
        console.log("Given programId is missing or incorrect");
        process.exit(1);
    }
}

/**
 * Layout for a public key
 */
const publicKey = (property = "publicKey") => {
    // The number of bytes in the blob
    return BufferLayout.blob(32, property);
};

/**
 * Layout for a 64bit unsigned value
 */
const uint64 = (property = "uint64") => {
    return BufferLayout.blob(8, property);
};

/**
    pub struct Demo {
        pub is_initialized: bool,
        pub counter: u32,
    }
*/
export const ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8("is_initialized"),
    BufferLayout.u32("counter"),
//     publicKey("initializerPubkey"),
//     publicKey("initializerTempTokenAccountPubkey"),
//     publicKey("initializerReceivingTokenAccountPubkey"),
//     uint64("expectedAmount"),
]);
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
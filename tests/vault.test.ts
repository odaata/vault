import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { fromWorkspace, LiteSVMProvider } from "anchor-litesvm";
import { LiteSVM } from "litesvm";

import VAULT_IDL from "../target/idl/vault.json";
import { Vault } from "../target/types/vault";

let program: Program<Vault>;
let provider: LiteSVMProvider;
let svm: LiteSVM;
describe("vault", () => {
  beforeAll(async () => {
    svm = fromWorkspace(".");
    provider = new LiteSVMProvider(svm);
    program = new Program<Vault>(VAULT_IDL, provider);

    console.log(`New test wallet: ${provider.publicKey.toString()}`);
  });

  it("initializes a vault", async () => {
    const [vaultStatePDA, vaultStateBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("state"), provider.publicKey.toBuffer()],
      program.programId,
    );

    const [_, vaultBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), vaultStatePDA.toBuffer()],
      program.programId,
    );

    const tx = await program.methods
      .initialize()
      .accounts({ signer: provider.publicKey })
      .rpc();

    console.log("Transaction signature:", tx);
    const vaultState = await program.account.vaultState.fetch(vaultStatePDA);

    expect(vaultState.stateBump).toEqual(vaultStateBump);
    expect(vaultState.vaultBump).toEqual(vaultBump);
  });
});

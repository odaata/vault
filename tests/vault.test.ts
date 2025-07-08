const anchor = require("@coral-xyz/anchor");
const { BN } = require("@coral-xyz/anchor");
const { PublicKey, SystemProgram } = require("@solana/web3.js");

describe("vault", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Vault;
  const provider = anchor.getProvider();
  const wallet = provider.wallet;

  it("initializes a vault", async () => {
    // Derive PDAs for vault state and vault
    const [vaultStatePDA, vaultStateBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("state"), wallet.publicKey.toBuffer()],
      program.programId
    );

    const [vaultPDA, vaultBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), vaultStatePDA.toBuffer()],
      program.programId
    );

    // Call the initialize instruction
    const tx = await program.methods
      .initialize()
      .accounts({
        signer: wallet.publicKey,
        vault: vaultPDA,
        vaultState: vaultStatePDA,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Transaction signature:", tx);

    // Fetch the created vault state account
    const vaultState = await program.account.vaultState.fetch(vaultStatePDA);

    // Verify the bump seeds were stored correctly
    expect(vaultState.stateBump).toEqual(vaultStateBump);
    expect(vaultState.vaultBump).toEqual(vaultBump);
  });
});

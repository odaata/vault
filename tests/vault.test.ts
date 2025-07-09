import * as anchor from "@coral-xyz/anchor";
import {Keypair, PublicKey} from "@solana/web3.js";
import {Program} from "@coral-xyz/anchor";
import {Vault} from '../target/types/vault';

anchor.setProvider(anchor.AnchorProvider.env());

let wallet: Keypair;
let provider: anchor.AnchorProvider;
let program: Program<Vault>;

describe("vault", () => {
    beforeAll(async () => {
        // Generate a new keypair for each test
        wallet = Keypair.generate();

        // Create a new provider with the test wallet
        const connection = anchor.getProvider().connection;
        provider = new anchor.AnchorProvider(
            connection,
            new anchor.Wallet(wallet),
            {commitment: "confirmed"}
        );

        // Set the provider for the program
        anchor.setProvider(provider);
        program = anchor.workspace.Vault;

        // Airdrop SOL to the new wallet
        const airdropTx = await connection.requestAirdrop(
            wallet.publicKey,
            2 * anchor.web3.LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(airdropTx);

        console.log(`New test wallet: ${wallet.publicKey.toString()}`);
    })

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

        try {
            // Call the initialize instruction
            const tx = await program.methods
                .initialize()
                .accounts({signer: wallet.publicKey})
                .rpc();

            console.log("Transaction signature:", tx);
        } catch (e) {
            console.log("Error:", e);
        }
        // Fetch the created vault state account
        const vaultState = await program.account.vaultState.fetch(vaultStatePDA);

        // Verify the bump seeds were stored correctly
        expect(vaultState.stateBump).toEqual(vaultStateBump);
        expect(vaultState.vaultBump).toEqual(vaultBump);
    });
});

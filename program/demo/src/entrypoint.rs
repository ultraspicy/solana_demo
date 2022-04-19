use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

use crate::processor::*;

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("the program_id {:?}", program_id);
    msg!("the accounts {:?}", accounts);
    msg!("the instruction_data {:?}", instruction_data);
    Processor::process(program_id, accounts, instruction_data)
}
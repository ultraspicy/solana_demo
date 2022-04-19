use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    program_pack::Pack,
    program_pack::IsInitialized,
};

use crate::{
    state::Demo,
    instructions::DemoInstruction,
};

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = DemoInstruction::unpack(instruction_data)?;

        match instruction {
            DemoInstruction::InitDemo => {
                Self::process_init_demo(program_id, accounts, instruction_data)
            }
            DemoInstruction::AddOne => {
                msg!("Instriction: add_one");
                Self::process_add_one(program_id, accounts, instruction_data)
            }
        }
    }

    pub fn process_init_demo(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let initializer = next_account_info(account_info_iter)?;
        msg!("the initializer {:?}", initializer);

        if !initializer.is_signer {
            msg!("initializer.is_signer = false");
            return Err(ProgramError::MissingRequiredSignature)
        }

        let demo_account = next_account_info(account_info_iter)?;
        msg!("the demo_account {:?}", demo_account);
        let mut demo_account_info = Demo::unpack_unchecked(&demo_account.try_borrow_data()?)?;
        msg!("the demo_account_info {:?}", demo_account_info);
        if demo_account_info.is_initialized() {
            return Err(ProgramError::AccountAlreadyInitialized);
        }

        demo_account_info.is_initialized = true;
        demo_account_info.counter = 0;
        msg!("the current value of counter is {}", demo_account_info.counter);

        Demo::pack(demo_account_info, &mut demo_account.try_borrow_mut_data()?)?;

        Ok(())
    }

    pub fn process_add_one(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let _ = next_account_info(account_info_iter)?;
        let demo_account = next_account_info(account_info_iter)?;
        msg!("the demo_account before add_one {:?}", demo_account);
        let mut demo_account_info = Demo::unpack_unchecked(&demo_account.try_borrow_data()?)?;
        demo_account_info.counter = demo_account_info.counter + 1;
        Demo::pack(demo_account_info, &mut demo_account.try_borrow_mut_data()?)?;
        //msg!("the demo_account_info {:?}", demo_account_info);
        msg!("the demo_account after add_one {:?}", demo_account);
        Ok(())
    }
}
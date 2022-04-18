
use solana_program::program_error::ProgramError;
use crate::{
    error::DemoError,
    state::Demo,
    error::DemoError::InvalidInstruction,
};

pub enum DemoInstruction {
    /// Accounts expected:
    ///
    /// 0. `[signer]` the account
    /// 1. `[writable]` the demo account that will hold all info about the state of this program
    InitDemo, 

    // for demo purpose we don't have any signer
    AddOne,
}

impl DemoInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => Self::InitDemo,
            1 => Self::AddOne,
            _ => return Err(DemoError::InvalidInstruction.into()),
        })
    }
}
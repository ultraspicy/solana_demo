use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum DemoError {
    #[error("Invalid Instruction")]
    InvalidInstruction = 333,

    #[error("Insufficient Balance")]
    InsufficientBalance = 666,
}

impl From<DemoError> for ProgramError {
    fn from(e: DemoError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
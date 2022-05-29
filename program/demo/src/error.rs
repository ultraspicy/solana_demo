use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum EscrowError {
    #[error("Invalid Instruction")]
    InvalidInstruction = 333,

    #[error("Not Rent Exempt")]
    NotRentExempt = 444,

    #[error("Expected Amount Mismatch")]
    ExpectedAmountMismatch = 555,

    #[error("Insufficient Balance")]
    InsufficientBalance = 666,

    #[error("Amount Overflow")]
    AmountOverflow = 777,
}

impl From<EscrowError> for ProgramError {
    fn from(e: EscrowError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
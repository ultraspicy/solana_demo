use solana_program::{
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
    pubkey::Pubkey,
};

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};

#[derive(Debug)]
pub struct Demo {
    pub is_initialized: bool,
    pub counter: u32,
}

impl Sealed for Demo {}

impl IsInitialized for Demo {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for Demo {
    const LEN: usize = 5;

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, Demo::LEN];
        let (
            is_initialized,
            counter_src,
        ) = array_refs![src, 1, 4];
        
        let is_initialized = match is_initialized {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };

        Ok(Demo {
            is_initialized,
            counter: u32::from_le_bytes(*counter_src),
        })
    }

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, Demo::LEN];
        let (
            is_initialized_dst,
            counter_dst,
        ) = mut_array_refs![dst, 1, 4];

        let Demo {
            is_initialized,
            counter,
        } = self;

        is_initialized_dst[0] = *is_initialized as u8;
        *counter_dst = counter.to_le_bytes();
    }
}
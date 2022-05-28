/// entrypoint - the entrance of the whole program
pub mod entrypoint;
/// error - define the program errors, new error can be added on the fly
pub mod error;
/// instructions - define the instructions that we can operate on our state, and their (de)serialization
pub mod instructions;
/// processor - the controller, running all business logic
pub mod processor;
/// state - define the Account to make our program "stateful"
/// aka data defines the current state of a running program instance
pub mod state;
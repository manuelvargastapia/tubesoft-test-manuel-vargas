// Custom error classes to identify the different errors

// Unrecoverable errors.
// When such an error occurs, the app will stop working and
// will show an error screen. The page will need to be reloaded
// before proceeding. A possible reason could be an error
// in the code itself.
export class UnexpectedError extends Error {}

// Recoverable errors.
// In this case, a message is delivered to the user to indicate
// something failed but it's only temporary. The app could
// be keep working as expected in the next interactions.
export class ServerError extends Error {}

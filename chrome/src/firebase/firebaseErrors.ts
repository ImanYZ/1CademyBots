export const getFirebaseErrorMessage = (errorCode: string) => {
  const firebaseErrorCodes: { [key: string]: string } = {
    'auth/claims-too-large':
      'The information provided is too large. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/email-already-exists':
      'The email provided is already in use. Please use a different email or contact iman@honor.education for assistance.',
    'auth/id-token-expired':
      'Your session has expired. Please sign in again. If you continue to experience problems, contact iman@honor.education.',
    'auth/id-token-revoked':
      'Your session has been revoked. Please sign in again. If the problem persists, contact iman@honor.education.',
    'auth/insufficient-permission':
      'You do not have sufficient permissions to perform this operation. Please try again later or contact iman@honor.education for further assistance.',
    'auth/internal-error':
      'An unexpected error occurred. Please try again later, and if the issue continues, contact iman@honor.education.',
    'auth/invalid-argument':
      'An invalid argument was provided. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-claims':
      'Invalid claims have been provided. Please try again later, and if the issue continues, contact iman@honor.education.',
    'auth/invalid-continue-uri':
      'The continue URL is not valid. Please try again with a valid URL or contact iman@honor.education for assistance.',
    'auth/invalid-creation-time':
      'The creation time provided is not valid. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-login-credentials':
      'The credential used is invalid. Please try again or contact iman@honor.education for further assistance.',
    'auth/invalid-credential':
      'The credential used is invalid. Please try again or contact iman@honor.education for further assistance.',
    'auth/invalid-disabled-field':
      'The disabled user property provided is invalid. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-display-name':
      'The display name provided is invalid. Please try again with a valid name or contact iman@honor.education for assistance.',
    'auth/invalid-dynamic-link-domain':
      'The dynamic link domain provided is not valid for the current project. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/invalid-email':
      'The email address provided is invalid. Please check and try again, or contact iman@honor.education for help.',
    'auth/invalid-email-verified':
      'The email verification status provided is invalid. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-hash-algorithm':
      'The hash algorithm provided is not supported. Please try again with a supported algorithm or contact iman@honor.education for assistance.',
    'auth/invalid-hash-block-size':
      'The hash block size provided is invalid. Please try again with a valid size or contact iman@honor.education for help.',
    'auth/invalid-hash-derived-key-length':
      'The hash derived key length provided is invalid. Please try again with a valid length or contact iman@honor.education for assistance.',
    'auth/invalid-hash-key':
      'The hash key provided is invalid. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/invalid-hash-memory-cost':
      'The hash memory cost provided is invalid. Please try again with a valid cost or contact iman@honor.education for help.',
    'auth/invalid-hash-parallelization':
      'The hash parallelization provided is invalid. Please try again with a valid parallelization or contact iman@honor.education for assistance.',
    'auth/invalid-hash-rounds':
      'The hash rounds provided are invalid. Please try again with a valid number of rounds or contact iman@honor.education for help.',
    'auth/invalid-hash-salt-separator':
      'The hashing algorithm salt separator is invalid. Please try again or contact iman@honor.education for assistance.',
    'auth/invalid-id-token':
      'The ID token provided is not valid. Please sign in again, and if the problem persists, contact iman@honor.education.',
    'auth/invalid-last-sign-in-time':
      'The last sign-in time provided is not valid. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-page-token':
      'The page token provided is not valid. Please try again with a valid token or contact iman@honor.education for assistance.',
    'auth/invalid-password':
      'The password provided is not valid. It must be at least 6 characters long. Please try again or contact iman@honor.education for help.',
    'auth/invalid-password-hash':
      'The password hash provided is not valid. Please try again or contact iman@honor.education for further assistance.',
    'auth/invalid-password-salt':
      'The password salt provided is not valid. Please try again or contact iman@honor.education for help.',
    'auth/invalid-phone-number':
      'The phone number provided is not valid. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/invalid-photo-url':
      'The photo URL provided is not valid. Please check and try again, or contact iman@honor.education for help.',
    'auth/invalid-provider-data':
      'The provider data provided is not valid. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/invalid-provider-id':
      'The provider ID provided is not supported. Please try again with a valid provider ID or contact iman@honor.education for assistance.',
    'auth/invalid-oauth-responsetype':
      'Only one OAuth responseType can be set to true. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/invalid-session-cookie-duration':
      'The session cookie duration provided is not valid. Please try again with a valid duration or contact iman@honor.education for help.',
    'auth/invalid-uid':
      'The UID provided is not valid. It must be a non-empty string with at most 128 characters. Please try again or contact iman@honor.education for assistance.',
    'auth/invalid-user-import':
      'The user record to import is invalid. Please check and try again, or contact iman@honor.education for help.',
    'auth/maximum-user-count-exceeded':
      'The maximum number of users to import has been exceeded. Please reduce the number and try again, or contact iman@honor.education for assistance.',
    'auth/missing-android-pkg-name':
      'An Android package name must be provided if the Android App is required to be installed. Please check and try again, or contact iman@honor.education for help.',
    'auth/missing-continue-uri':
      'A continue URL must be provided in the request. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/missing-hash-algorithm':
      'The hash algorithm is required for importing users. Please provide a hash algorithm and try again, or contact iman@honor.education for assistance.',
    'auth/missing-ios-bundle-id':
      'An iOS Bundle ID must be provided if the iOS App is required to be installed. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/missing-uid':
      'A UID is required for the current operation. Please provide a UID and try again, or contact iman@honor.education for help.',
    'auth/missing-oauth-client-secret':
      'The OAuth client secret is required. Please provide it and try again, or contact iman@honor.education for assistance.',
    'auth/operation-not-allowed':
      'The operation is not allowed. Please enable it in the Firebase Console or contact iman@honor.education for assistance.',
    'auth/phone-number-already-exists':
      'The phone number provided is already in use. Please use a different phone number or contact iman@honor.education for assistance.',
    'auth/project-not-found':
      'No Firebase project was found for the current operation. Please check the project configuration and try again, or contact iman@honor.education for assistance.',
    'auth/quota-exceeded':
      'The quota for the current operation has been exceeded. Please try again later, and if the error persists, contact iman@honor.education.',
    'auth/reserved-claims':
      'One or more custom user claims provided are reserved. Please remove these claims and try again, or contact iman@honor.education for assistance.',
    'auth/session-cookie-expired':
      'The session cookie provided has expired. Please sign in again, and if the problem persists, contact iman@honor.education.',
    'auth/session-cookie-revoked':
      'The session cookie has been revoked. Please sign in again. If the problem persists, contact iman@honor.education.',
    'auth/uid-already-exists':
      'The UID provided is already in use. Please use a different UID or contact iman@honor.education for assistance.',
    'auth/unauthorized-continue-uri':
      'The domain of the continue URL is not whitelisted. Please check and try again, or contact iman@honor.education for assistance.',
    'auth/user-not-found':
      'The user record does not exist. Please check and try again, or contact iman@honor.education for assistance.',
  }

  return (
    firebaseErrorCodes[errorCode] ||
    'An unexpected error occurred. Please try again. If the error persists, please contact iman@honor.education'
  )
}

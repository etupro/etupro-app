import { AuthErrorCodes } from "@firebase/auth";
import { FirestoreErrorCode } from "@firebase/firestore";

export class ErrorsMapper {
  static firebaseAuthError(error: { code: FirestoreErrorCode | string }): string {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        return 'Utilisateur non trouvé';
      case AuthErrorCodes.INVALID_PASSWORD:
        return 'Mot de passe incorrect';
      case AuthErrorCodes.EMAIL_EXISTS:
        return 'Email déjà utilisé';
      case AuthErrorCodes.WEAK_PASSWORD:
        return 'Mot de passe trop faible';
      case 'permission-denied':
        return 'Vous n\'avez pas la permission d\'effectuer cette action';
      case 'unauthenticated':
        return 'Veuillez vous authentifier pour effectuer cette action';
      default:
        return 'Une erreur s\'est produite';
    }
  }
}

import * as admin from 'firebase-admin';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class FirebaseAuthService {
  constructor() {
    if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert('src/firebase/firebase-admin-key.json'), 
    });
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      console.log('Token:', token);
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

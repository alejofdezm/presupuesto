import { Injectable, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor() {
    if (!admin.apps.length)
    admin.initializeApp({
      credential: admin.credential.cert('src/firebase/firebase-admin-key.json'),  
    });
  }

  // Crear usuario con email y contraseña
  async registerWithEmail(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    return admin.auth().createUser({
      email,
      password,
    });
  }

  // Iniciar sesión con email y contraseña
  async loginWithEmail(loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto;

    // Simular autenticación ya que Firebase Admin no valida contraseñas directamente
    const user = await admin.auth().getUserByEmail(email);
    if (!user) throw new Error('User not found');

    // Aquí deberías conectar tu lógica de validación (frontend o otro servicio)

    // Generar un token personalizado
    return admin.auth().createCustomToken(user.uid);
  }

  // Registrar usuario con Google (deberás recibir el token de Google)
  async registerWithGoogle(googleToken: string): Promise<any> {
    const decodedToken = await admin.auth().verifyIdToken(googleToken);
    return admin.auth().getUser(decodedToken.uid);
  }

  async convertCustomTokenToIdToken(customToken: string): Promise<string> {
    if (!customToken) {
      throw new BadRequestException('Custom token is required');
    }

    try {
      const firebaseConfig = {
        apiKey: 'AIzaSyBXDro8bN68s_8V8ICBOn5T8gFzvmOwl8o', // Asegúrate de agregar tu API key
      };

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseConfig.apiKey}`,
        {
          token: customToken,
          returnSecureToken: true,
        },
      );

      return response.data.idToken; // Devuelve el ID token generado
    } catch (error) {
      console.error('Error converting custom token:', error);
      throw new BadRequestException('Invalid custom token');
    }
  }
}

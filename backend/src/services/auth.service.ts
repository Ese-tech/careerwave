// backend/src/services/auth.service.ts
import { db } from '../config/firebase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import type { RegisterInput, LoginInput, UpdateProfileInput } from '../schemas/auth.schema';

export class AuthService {
  async register(userData: RegisterInput) {
    try {
      const userQuery = await db.collection('users')
        .where('email', '==', userData.email)
        .limit(1)
        .get();

      if (!userQuery.empty) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const userId = nanoid();
      
      const userDoc = {
        id: userId,
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        company: userData.company || null,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          phone: '',
          location: '',
          bio: '',
          skills: [],
          experience: '',
          education: '',
          avatar: '',
        }
      };

      await db.collection('users').doc(userId).set(userDoc);

      const token = jwt.sign(
        { userId, email: userData.email, role: userData.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return {
        user: {
          id: userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: LoginInput) {
    try {
      const userQuery = await db.collection('users')
        .where('email', '==', credentials.email)
        .limit(1)
        .get();

      if (userQuery.empty) {
        throw new Error('Invalid credentials');
      }

      const userDoc = userQuery.docs[0];
      const user = userDoc.data();

      const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      if (!userData) {
        throw new Error('User data not found');
      }
      
      const { password, ...userWithoutPassword } = userData as any;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId: string, updateData: UpdateProfileInput) {
    try {
      const userRef = db.collection('users').doc(userId);
      
      await userRef.update({
        ...updateData,
        updatedAt: new Date()
      });

      return await this.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
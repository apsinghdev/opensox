import jwt from "jsonwebtoken";
import prismaModule from "../prisma.js";
import { SUBSCRIPTION_STATUS } from "../constants/subscription.js";

const { prisma } = prismaModule;
const JWT_SECRET = process.env.JWT_SECRET! as string;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export interface UserWithSubscription {
  id: string;
  email: string;
  firstName: string;
  authMethod: string;
  createdAt: Date;
  lastLogin: Date;
  completedSteps: any;
  isPaidUser: boolean;
  subscription: {
    id: string;
    status: string;
    startDate: Date;
    endDate: Date | null;
    planId: string;
  } | null;
}

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = async (token: string): Promise<UserWithSubscription> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !decoded || typeof decoded !== "object") {
      throw new Error("Invalid token payload");
    }

    const email = (decoded as { email?: string }).email;
    if (!email) {
      throw new Error("Email not found in token");
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        subscriptions: {
          where: {
            status: SUBSCRIPTION_STATUS.ACTIVE,
            endDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: "desc",
          },
          take: 1,
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const activeSubscription = user.subscriptions[0] || null;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      authMethod: user.authMethod,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      completedSteps: user.completedSteps,
      isPaidUser: !!activeSubscription,
      subscription: activeSubscription
        ? {
            id: activeSubscription.id,
            status: activeSubscription.status,
            startDate: activeSubscription.startDate,
            endDate: activeSubscription.endDate,
            planId: activeSubscription.planId,
          }
        : null,
    };
  } catch (error) {
    throw new Error("Token verification failed");
  }
};

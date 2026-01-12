'use server'
import { NewPayment } from "@/db/schema";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { eq } from "drizzle-orm";


export const createPayment = async (payment: NewPayment) => {
  const newPayment = await db.insert(payments).values(payment).returning();
  return newPayment;
};

export const getPayments = async () => {
  const allPayments = await db.select().from(payments);
  return allPayments;
};

export const getPaymentHistory = async (userId: number) => {
  const paymentHistory = await db.select().from(payments).where(eq(payments.userId, userId));
  return paymentHistory;
};

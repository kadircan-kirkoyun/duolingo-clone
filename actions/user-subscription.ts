"use server";

import { toast } from "sonner";

export const createStripeUrl = async () => {
  // Demo sürümünde ödeme sistemi devre dışı
  toast.error("Bu bir demo sürümüdür. Ödeme sistemi devre dışı.");

  // Burada bir await ifadesi ekliyoruz
  await new Promise(resolve => setTimeout(resolve, 100)); // Simüle edilmiş bir bekleme

  return { data: null };
}; 
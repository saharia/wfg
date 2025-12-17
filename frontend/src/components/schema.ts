import { z } from "zod";

export const dataSchema = z.object({
  email: z.string().email("Invalid email"),
  points: z.array(
    z.object({
      time: z.number(),
      value: z
        .string()
        .min(1, "Required")
        .refine((v) => !isNaN(Number(v)), "Must be a number")
        .refine((v) => Number(v) >= 0, "Must be ≥ 0"),
    })
  ),
});

export type FormSchema = z.infer<typeof dataSchema>;


export const initialData = [
  { time: 0, value: 5 },
  { time: 1, value: 10 },
  { time: 2, value: 25 },
  { time: 3, value: 45 },
  { time: 4, value: 80 },
  { time: 5, value: 95 },
  { time: 6, value: 100 },
  { time: 7, value: 95 },
  { time: 8, value: 80 },
  { time: 9, value: 45 },
  { time: 10, value: 25 },
  { time: 11, value: 10 },
  { time: 12, value: 5 },
];

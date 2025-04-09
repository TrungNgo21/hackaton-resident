import { z } from 'zod';

import {
  dayOfWeekEnum,
  workoutDurationEnum,
  workoutFocusEnum,
  workoutIntensityEnum,
  workoutTypeEnum,
} from '@/lib/db/schema';

export const scheduleDaySchema = z.object({
  dayOfWeek: z.enum(dayOfWeekEnum.enumValues),
  workoutTypes: z.array(z.enum(workoutTypeEnum.enumValues)),
  intensity: z.enum(workoutIntensityEnum.enumValues),
  duration: z.enum(workoutDurationEnum.enumValues),
  notes: z.string().optional(),
});

export const workoutScheduleSchema = z.object({
  targetIntensity: z.enum(workoutIntensityEnum.enumValues),
  primaryFocus: z.enum(workoutFocusEnum.enumValues),
  notes: z.string().describe('Notes for the day'),
  scheduleDays: z.array(scheduleDaySchema).length(7),
});

// Type inference
export type WorkoutSchedule = z.infer<typeof workoutScheduleSchema>;
export type WorkoutScheduleWithId = WorkoutSchedule & { id: string };
export type ScheduleDay = z.infer<typeof scheduleDaySchema>;

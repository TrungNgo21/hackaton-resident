import { muscleSchedulePrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { myProvider } from '@/lib/ai/providers';
import { workoutScheduleSchema } from '@/lib/ai/types';
import { createDocumentHandler } from '@/lib/artifacts/server';
import { streamObject } from 'ai';

export const muscleScheduleDocumentHandler =
  createDocumentHandler<'muscle-schedule'>({
    kind: 'muscle-schedule',
    onCreateDocument: async ({ title, dataStream }) => {
      let draftContent = '';

      const { fullStream } = streamObject({
        model: myProvider.languageModel('artifact-model'),
        system: muscleSchedulePrompt,
        prompt: title,
        schema: workoutScheduleSchema,
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === 'object') {
          const { object } = delta;
          const { scheduleDays } = object;

          if (scheduleDays) {
            dataStream.writeData({
              type: 'code-delta',
              content: JSON.stringify(scheduleDays) ?? '',
            });

            draftContent = JSON.stringify(scheduleDays);
          }
        }
      }

      return draftContent;
    },
    onUpdateDocument: async ({ document, description, dataStream }) => {
      let draftContent = '';

      const { fullStream } = streamObject({
        model: myProvider.languageModel('artifact-model'),
        system: updateDocumentPrompt(document.content, 'code'),
        prompt: description,
        schema: workoutScheduleSchema,
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === 'object') {
          const { object } = delta;
          const { scheduleDays } = object;

          if (scheduleDays) {
            dataStream.writeData({
              type: 'code-delta',
              content: JSON.stringify(scheduleDays) ?? '',
            });

            draftContent = JSON.stringify(scheduleDays);
          }
        }
      }

      return draftContent;
    },
  });

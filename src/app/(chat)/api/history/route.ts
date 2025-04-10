import { getChatsByUserId } from '@/lib/db/queries';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const chats = await getChatsByUserId({ id: userId });

  return Response.json(chats);
}

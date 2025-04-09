'use client';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Check } from 'lucide-react';

interface ActionCardProps {
  action: string;
  reason: string;
  showAction?: boolean;
}

export default function ActionCard({
  action = 'getUserProfile',
  reason = 'To plan workout schedule',
}: ActionCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="p-1.5 flex flex-row gap-2 items-center">
            <Check className="size-4" />
            {action}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{reason}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

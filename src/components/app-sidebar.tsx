'use client';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatSearch } from './chat-search';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function AppSidebar() {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <ChatSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />

      <SidebarHeader
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <Link
              href=""
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Gymnee
              </span>
            </Link>
            <div className="flex-1 flex gap-1 items-center justify-end">
              {isHeaderHovered && <SidebarTrigger />}
              <ChatSearch.Trigger onClick={() => setIsSearchOpen(true)} />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    className="size-7 p-0.5"
                    onClick={() => {
                      setOpenMobile(false);
                      router.push('/');
                      router.refresh();
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">New Chat</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter className="border-t">
        <div className="flex flex-row items-center h-full px-2 gap-3">
          {isLoaded ? (
            <>
              <SignedIn>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Fitness Profile"
                      labelIcon={<HeartPulse className="size-3.5" />}
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user?.fullName}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

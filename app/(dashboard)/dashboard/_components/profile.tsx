'use client';

import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/service/authService';
import { useUser } from '@/app/providers/user-provider';

export function Profile() {
  const router = useRouter()

  const { user } = useUser();

  const avatarUrl = user?.user_metadata?.avatar_url || '/images/avatar.png';
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Guest';

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      router.push('/sign-in');
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          color='primary'
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={avatarUrl}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className='text-[12px] text-gray-500 pb-1'>My Account</DropdownMenuLabel>
        <DropdownMenuLabel className='text-[13px] pt-0'>{displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard/setup-profile">Profile UMKM</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

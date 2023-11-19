import { LucideIcon,
  CreditCard,
  Settings,
  PlusCircle,
  Gauge,
  User2,} from "lucide-react";
export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; icon: LucideIcon;  items: Item[] }[] = [
  {
    name: 'Dashboard',
    icon: Gauge,
    items: [
      {
        name: 'Projects',
        slug: 'dashboard/main',
        description:
          'Create meaningful Loading UI for specific parts of an app',
      },
      {
        name: 'Tools',
        slug: 'dashboard/tools',
        description: 'Create Error UI for specific parts of an app',
      },
    ],
  },
  {
    name: 'Account',
    icon: User2,
    items: [
      {
        name: 'Account',
        slug: 'account',
        description: 'Create UI that is shared across routes',
      },
      {
        name: 'Verification',
        slug: 'account/verify',
        description: 'Organize routes without affecting URL paths',
      },
      {
        name: 'Edit Account',
        slug: 'account/edit',
        description: 'Render multiple pages in the same layout',
      },
      {
        name: 'Log out',
        slug: 'account/logout',
        description: 'Render multiple pages in the same layout',
      },
    ],
  },
  {
    name: 'Orders',
    icon: CreditCard,
    items: [
      {
        name: 'Orders',
        slug: 'order/main',
        description: 'Server-render pages',
      },
      {
        name: 'Awaj Mela',
        slug: 'order/awajmela',
        description: 'Awaj mela coins status',
      },
      {
        name: 'Subscriptions',
        slug: 'order/subscriptions',
        description: 'Generate static pages',
      },
      {
        name: 'Billings',
        slug: 'order/billings',
        description: 'Generate static pages',
      },
    ],
  },
  {
    name: 'Support',
    icon: PlusCircle,
    items: [
      {
        name: 'Get Support',
        slug: 'support',
        description: 'Contact customer support',
      },
      {
        name: 'Open Ticket',
        slug: 'support/ticket',
        description: 'Open tickets with customer support',
      },
    ],
  },
  {
    name: 'Settings',
    icon: Settings,
    items: [
      {
        name: 'Settings',
        slug: 'setting',
        description:'Streaming data fetching from the server with React Suspense',
      },
    ],
  },
];

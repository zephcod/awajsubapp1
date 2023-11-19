'use client';
import { demos, type Item } from '@/config/admin';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { Icons } from '../icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from './theme_toggle';

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-border bg-card lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-border">
      <div className="flex h-14 items-center pl-4 pr-16 md:pr-4 py-4 lg:h-auto">
        <Link
            href="/"
            className="group flex w-full items-center gap-x-2.5"
            onClick={close}>
            <Icons.awajlogocircle />
            <h3 className="font-semibold text-lg tracking-wide text-secondary group-hover:text-primary">
                Awaj AI App
            </h3>
        </Link>
        <ThemeToggle/>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <Icons.close className="block w-6 text-gray-400" />
        ) : (
          <Icons.chevronLeft className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-card': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-4 pb-24 pt-5">
        {demos.map((section) => {
            return (
              <div key={section.name}>
                  <Accordion key={section.name} type="single" collapsible className="w-full ">
                    <AccordionItem value='Question 1'>
                        <AccordionTrigger className="text-sm capitalize">
                            {section.name}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-1">
                              {section.items.map((item) => (
                              <GlobalNavItem key={item.slug} item={item} close={close} />
                              ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
              </div>
            );
        })}
        </nav>
      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  );
}

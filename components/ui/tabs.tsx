"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "h-11 rounded-[var(--ds-radius-lg)] bg-muted p-1 text-muted-foreground",
        line: "w-full flex-wrap justify-start gap-3 border-b border-border bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TabsListVariantContext = React.createContext<"default" | "line">("default");

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

// The list controls the visual treatment so triggers can stay consistent across tab families.
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", ...props }, ref) => {
  const resolvedVariant = variant ?? "default";

  return (
  <TabsListVariantContext.Provider value={resolvedVariant}>
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={resolvedVariant}
      className={cn(tabsListVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  </TabsListVariantContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

// Triggers adapt to the active list variant so consumers only set the list style once.
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsListVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        variant === "line"
          ? "inline-flex items-center justify-center whitespace-nowrap px-1 pb-3 text-body-md text-muted-foreground shadow-[inset_0_-2px_0_transparent] transition-[color,box-shadow] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-medium data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_var(--color-action-primary-bg)]"
          : "inline-flex items-center justify-center whitespace-nowrap rounded-[calc(var(--ds-radius-lg)-4px)] px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-6 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

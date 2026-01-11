import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 font-serif tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:brightness-110 border border-yellow-400/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/25",
        outline: "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg shadow-secondary/25",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] border border-yellow-300/30",
        gold: "bg-gradient-to-r from-[hsl(45,100%,60%)] to-[hsl(35,100%,50%)] text-black font-bold shadow-lg shadow-[hsl(45,100%,60%,0.3)] hover:shadow-xl hover:shadow-[hsl(45,100%,60%,0.4)] hover:scale-[1.02]",
        success: "bg-gradient-to-r from-[hsl(160,70%,45%)] to-[hsl(180,70%,50%)] text-white shadow-lg shadow-[hsl(160,70%,45%,0.3)] hover:shadow-xl",
        glass: "glass-card text-foreground hover:bg-white/5 border-white/10",
        quiz: "glass-card text-foreground border-2 border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300",
        quizCorrect: "bg-success/20 text-success border-2 border-success shadow-[0_0_15px_rgba(0,255,128,0.3)]",
        quizWrong: "bg-destructive/20 text-destructive border-2 border-destructive shadow-[0_0_15px_rgba(255,0,0,0.3)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base uppercase tracking-widest",
        xl: "h-14 rounded-2xl px-10 text-lg uppercase tracking-widest font-bold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

import { useGameSound } from "@/hooks/useGameSound";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { playClick } = useGameSound();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playClick();
      onClick?.(e);
    };

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} onClick={handleClick} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// 1. Define the new props:
// It takes all standard ButtonProps AND a new 'tooltip' prop.
export interface TooltipButtonProps extends ButtonProps {
  tooltip: string;
}

// 2. Create the component using React.forwardRef
// This is necessary for shadcn/ui components to work correctly.
const TooltipButton = React.forwardRef<
  HTMLButtonElement,
  TooltipButtonProps
>(({ tooltip, children, ...props }, ref) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button ref={ref} {...props}>
          {children}
          {/* 3. Automatically add accessible screen-reader text */}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
})
// Set a display name for better debugging
TooltipButton.displayName = "TooltipButton"

export { TooltipButton }
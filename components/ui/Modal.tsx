import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl mx-auto p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Month Manager</DialogTitle>
          <DialogClose asChild>
            {/* <Button variant="ghost" onClick={onClose}>
              Close
            </Button> */}
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
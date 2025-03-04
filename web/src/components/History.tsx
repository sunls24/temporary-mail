import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"
import { $history, updateAddress } from "@/lib/store/store.ts"
import { toast } from "sonner"
import { CircleArrowRight, Frown, Mail } from "lucide-react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { Button } from "@/components/ui/button.tsx"
import { clsx } from "clsx"

function History({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<string[]>([])

  function onOpenChange(open: boolean) {
    if (open) {
      setHistory($history.get())
    }
  }

  function onConfirm() {
    $history.set([])
    toast.success("已清空所有历史纪录")
  }

  function onSwitch(value: string) {
    updateAddress(value)
    toast.success("已切换至新地址 " + value)
  }

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>历史记录</AlertDialogTitle>
          <AlertDialogDescription>
            共{history.length}条历史记录
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
          {history.length == 0 && (
            <div className="bg-secondary text-muted-foreground flex items-center gap-1 rounded-sm px-3 py-2">
              <Frown size={20} />
              这里什么也没有
            </div>
          )}
          {history.map((v) => (
            <AlertDialogPrimitive.Cancel
              asChild
              key={v}
              onClick={() => onSwitch(v)}
            >
              <div
                className={clsx(
                  "group bg-sidebar text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center rounded-sm border px-3 py-2 transition-colors hover:cursor-pointer",
                  history.length >= 8 && "mr-0.5"
                )}
              >
                <Mail size={16} className="mr-2" />
                {v}
                <div className="flex-1" />
                <div className="invisible flex items-center gap-2 group-hover:visible">
                  <span className="text-sm">点击切换</span>
                  <CircleArrowRight strokeWidth={1.8} size={18} />
                </div>
              </div>
            </AlertDialogPrimitive.Cancel>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          {history.length > 0 && (
            <AlertDialogPrimitive.Action asChild>
              <Button variant="destructive" onClick={onConfirm}>
                清空历史
              </Button>
            </AlertDialogPrimitive.Action>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default History

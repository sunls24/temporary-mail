import React, { useMemo, useRef, useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"
import type { Envelope } from "@/lib/types.ts"
import { Button } from "@/components/ui/button.tsx"
import { Minimize2, RotateCw } from "lucide-react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { fetchError, fmtDate } from "@/lib/utils.ts"
import { ABORT_SAFE } from "@/lib/constant.ts"
import { type language, useTranslations } from "@/i18n/ui"

function Detail({
  children,
  envelope,
  lang,
}: {
  children: React.ReactNode
  envelope: Envelope
  lang: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const controller = useRef<AbortController>(null)

  const t = useMemo(() => useTranslations(lang as language), [])

  function onOpenChange(open: boolean) {
    if (open) {
      setLoading(true)
      controller.current = new AbortController()
      fetch("/api/fetch/" + envelope.id, { signal: controller.current.signal })
        .then((res) => res.text())
        .then((res) => {
          divRef.current!.attachShadow({ mode: "open" }).innerHTML = res
        })
        .catch(fetchError)
        .finally(() => setLoading(false))
      return
    }
    controller.current!.abort(ABORT_SAFE)
  }

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex max-h-full flex-col sm:max-w-4xl">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>{envelope.subject}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col justify-between sm:flex-row">
            <span>{envelope.from}</span>
            <span>{fmtDate(envelope.created_at)}</span>
          </AlertDialogDescription>
          <AlertDialogPrimitive.Cancel
            asChild
            className="absolute -top-1 -right-1"
          >
            <Button variant="ghost" size="icon">
              <Minimize2 />
            </Button>
          </AlertDialogPrimitive.Cancel>
        </AlertDialogHeader>
        <div ref={divRef} className="flex-1 overflow-auto border-t pt-4">
          {loading && (
            <div className="text-muted-foreground flex h-6.5 items-center justify-center gap-1">
              <RotateCw className="animate-spin" size={18} />
              <span className="">{t("mailLoading")}</span>
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Detail

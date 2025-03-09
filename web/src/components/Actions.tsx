import React, { useMemo } from "react"
import { Button } from "@/components/ui/button.tsx"
import { Dices, FilePenLine, GalleryVerticalEnd } from "lucide-react"
import { $address, $domainList, updateAddress } from "@/lib/store/store.ts"
import { randomAddress } from "@/lib/utils.ts"
import { toast } from "sonner"
import EditAddress from "@/components/EditAddress.tsx"
import History from "@/components/History.tsx"
import { type language, useTranslations } from "@/i18n/ui.ts"

function Actions({ lang }: { lang: string }) {
  const t = useMemo(() => useTranslations(lang as language), [])

  function onRandom() {
    const address = $address.get()
    const domain = address ? address.split("@")[1] : $domainList.get()[0]
    const newAddress = randomAddress(domain)
    updateAddress(newAddress)
    toast.success(t("randomNew") + " " + newAddress)
  }

  return (
    <div className="bg-sidebar flex h-fit justify-center gap-2 border-x border-b py-2 sm:flex-col sm:rounded-b-md sm:p-3">
      <EditAddress lang={lang}>
        <Button>
          <FilePenLine />
          {t("edit")}
        </Button>
      </EditAddress>
      <Button variant="outline" onClick={onRandom}>
        <Dices />
        {t("random")}
      </Button>
      <History lang={lang}>
        <Button variant="outline">
          <GalleryVerticalEnd />
          {t("history")}
        </Button>
      </History>
    </div>
  )
}

export default Actions

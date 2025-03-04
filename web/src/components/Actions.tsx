import React from "react"
import { Button } from "@/components/ui/button.tsx"
import { Dices, FilePenLine, GalleryVerticalEnd } from "lucide-react"
import { $address, $domainList, updateAddress } from "@/lib/store/store.ts"
import { randomAddress } from "@/lib/utils.ts"
import { toast } from "sonner"
import EditAddress from "@/components/EditAddress.tsx"
import History from "@/components/History.tsx"

function Actions() {
  function onRandom() {
    const address = $address.get()
    const domain = address ? address.split("@")[1] : $domainList.get()[0]
    const newAddress = randomAddress(domain)
    updateAddress(newAddress)
    toast.success("已随机至新地址 " + newAddress)
  }

  return (
    <div className="bg-sidebar flex h-fit justify-center gap-2 border-x border-b py-2 sm:flex-col sm:rounded-b-md sm:p-3">
      <EditAddress>
        <Button>
          <FilePenLine />
          编辑邮箱
        </Button>
      </EditAddress>
      <Button variant="outline" onClick={onRandom}>
        <Dices />
        随机一个
      </Button>
      <History>
        <Button variant="outline">
          <GalleryVerticalEnd />
          历史记录
        </Button>
      </History>
    </div>
  )
}

export default Actions

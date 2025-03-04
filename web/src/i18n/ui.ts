export const defaultLang = "zh"

export function useTranslations(lang: language) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

const ui = {
  en: {
    pageTitle: "Temporary Mail - Anonymous Disposable Email",
    pageDesc:
      "Temporary Mail - An anonymous disposable email, protecting your personal email address from spam.",
    title: "Temporary Mail",
    copy: "Copied to clipboard",
    edit: "Edit",
    save: "Save",
    random: "Random",
    history: "History",
    nothing: "There is nothing here",
    refresh: "Refresh",
    refreshB: "Refreshes automatically in ",
    refreshA: "",
    clearHistory: "Clear history",
    clearHistoryTip: "All history records cleared",
    editNew: "Modified to new address",
    randomNew: "Randomly to new address",
    changeNew: "Switched to new address",
    day10B: "Last 10 days:",
    hour24B: "Last 24 hours:",
    countA: "emails.",
  },
  zh: {
    pageTitle: "临时邮箱 - 匿名的一次性邮箱",
    pageDesc:
      "临时邮箱 - 匿名的一次性邮箱，保护您的个人电子邮件地址免受垃圾邮件的骚扰。",
    title: "临时邮箱",
    copy: "已拷贝至剪切板",
    edit: "编辑",
    save: "保存",
    random: "随机",
    history: "历史",
    nothing: "这里什么也没有",
    refresh: "刷新",
    refreshB: "将在",
    refreshA: "后自动刷新",
    clearHistory: "清空历史",
    clearHistoryTip: "已清空所有历史纪录",
    editNew: "已修改至新地址",
    randomNew: "已随机至新地址",
    changeNew: "已切换至新地址",
    day10B: "最近10天共收到",
    hour24B: "24小时",
    countA: "封邮件",
  },
}

export type language = keyof typeof ui
export const languages = Object.keys(ui)

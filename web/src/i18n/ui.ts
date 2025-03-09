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
    edit: "Edit Address",
    editWarn: "Email address is public; use at your own risk!",
    random: "Random",
    history: "History",
    historyTotal: "Total {0} history records",
    nothing: "There is nothing here",
    clearHistory: "Clear History",
    clearHistoryTip: "All history records cleared",
    switchHistory: "Click to switch",
    randomNew: "Random to new address",
    changeNew: "Switch to new address",
    realTime: "Fetching mail in real time",
    listLoading: "Fetching mail",
    listEmpty: "No mail has been received yet",
    mailLoading: "Loading",
    cancel: "Cancel",
    confirm: "Confirm",
  },
  zh: {
    pageTitle: "临时邮箱 - 匿名的一次性邮箱",
    pageDesc:
      "临时邮箱 - 匿名的一次性邮箱，保护您的个人电子邮件地址免受垃圾邮件的骚扰。",
    title: "临时邮箱",
    copy: "已拷贝至剪切板",
    edit: "编辑邮箱",
    editWarn: "邮箱地址任何人都可以使用，请注意风险！",
    random: "随机一个",
    history: "历史记录",
    historyTotal: "共{0}条历史记录",
    nothing: "这里什么也没有",
    clearHistory: "清空历史",
    clearHistoryTip: "已清空所有历史纪录",
    switchHistory: "点击切换",
    randomNew: "已随机至新地址",
    changeNew: "已切换至新地址",
    realTime: "实时获取邮件中",
    listLoading: "正在获取邮件",
    listEmpty: "当前还未收到邮件",
    mailLoading: "加载中",
    cancel: "取消",
    confirm: "确认",
  },
}

export type language = keyof typeof ui
export const languages = Object.keys(ui)

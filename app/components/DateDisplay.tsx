"use client"

import { useEffect, useState } from "react"

export default function DateDisplay() {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const date = now.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      const time = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      setDisplay(`${date} · ${time} PT`)
    }
    update()
    const t = setInterval(update, 1_000)
    return () => clearInterval(t)
  }, [])

  if (!display) return null
  return <span className="text-xs text-gray-400 dark:text-gray-500">{display}</span>
}

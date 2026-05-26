"use client"

import { useEffect, useState } from "react"

export default function DateDisplay() {
  const [dateStr, setDateStr] = useState("")

  useEffect(() => {
    const update = () => {
      setDateStr(
        new Date().toLocaleDateString("en-US", {
          timeZone: "America/Los_Angeles",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    }
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
  }, [])

  if (!dateStr) return null
  return <span className="text-xs text-gray-400 dark:text-gray-500">{dateStr} PT</span>
}

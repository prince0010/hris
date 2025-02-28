import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { motion } from "motion/react"

const Clock = ({
  className,
  clockFormat = "h:mm:ssaa",
}: {
  className?: string
  clockFormat?: string
}) => {
  const [time, setTime] = useState<string>("")
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setTime(format(new Date(), clockFormat))
    }, 1000)

    return () => clearInterval(interval)
  }, [clockFormat])

  if (!isClient) {
    return null
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1 }}
      className={className}
    >
      {time}
    </motion.span>
  )
}

export default Clock

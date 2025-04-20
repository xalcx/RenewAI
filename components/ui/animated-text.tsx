"use client"

import { motion, type Variants } from "framer-motion"

interface AnimatedTextProps {
  text: string | string[]
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  once?: boolean
  threshold?: number
  type?: "words" | "chars" | "lines"
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  once = true,
  threshold = 0.1,
  type = "words",
}: AnimatedTextProps) {
  const getAnimatedContent = () => {
    // Si es un array, cada elemento es una línea
    if (Array.isArray(text)) {
      return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once, threshold }} className={className}>
          {text.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: delay + lineIndex * staggerChildren,
                      duration,
                    },
                  },
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </motion.div>
      )
    }

    // Si es un string, dividirlo según el tipo
    let items: string[] = []
    switch (type) {
      case "chars":
        items = text.split("")
        break
      case "words":
        items = text.split(" ")
        break
      case "lines":
        items = text.split("\n")
        break
    }

    const container: Variants = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren, delayChildren: delay },
      }),
    }

    const child: Variants = {
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          duration,
        },
      },
    }

    return (
      <motion.div
        className={`${className} inline-block`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, threshold }}
      >
        {type === "chars" ? (
          items.map((char, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        ) : (
          <span className="inline">
            {items.map((item, index) => (
              <motion.span
                key={index}
                variants={child}
                className="inline-block"
                style={{ marginRight: type === "words" ? "0.25em" : 0 }}
              >
                {item}
              </motion.span>
            ))}
          </span>
        )}
      </motion.div>
    )
  }

  return getAnimatedContent()
}

import { useEffect, useState } from "react"

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed = 100) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
            setDisplayText((prev) => prev + text[currentIndex])
            setCurrentIndex((prev) => prev + 1)
        }, speed)
        return () => clearTimeout(timeout)
        } else {
        // Blink cursor when done typing
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)
        return () => clearInterval(cursorInterval)
        }
    }, [currentIndex, text, speed])

    // Reset when text changes
    useEffect(() => {
        setDisplayText("")
        setCurrentIndex(0)
        setShowCursor(true)
    }, [text])

    return { displayText, showCursor, isComplete: currentIndex >= text.length }
}

export default useTypewriter
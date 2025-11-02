/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

export function usePWAStatus() {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    const beforeInstallHandler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as any)
    }

    const installedHandler = () => {
      setIsInstalled(true)
    }

    try {
      window.addEventListener('beforeinstallprompt', beforeInstallHandler)
      window.addEventListener('appinstalled', installedHandler)
      setIsSupported('serviceWorker' in navigator)
    } catch {
      setIsSupported(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches

  return { deferredPrompt, isInstalled, isStandalone, isSupported }
}

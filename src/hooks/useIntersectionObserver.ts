'use client'

import { useEffect, useRef } from 'react'

/**
 * useIntersectionObserver Hook
 * 要素がビューポートに入ったときにコールバック関数を実行します
 *
 * @param callback - 要素が表示されたときに実行するコールバック関数
 * @param options - IntersectionObserverOptions
 * @returns ref - 監視対象の要素に設定するref
 */
export const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(callback)

  // コールバックの参照を更新
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      // デバッグ: Intersection Observer の動作を確認
      console.log(
        '[useIntersectionObserver] isIntersecting:',
        entry.isIntersecting,
        'ratio:',
        entry.intersectionRatio,
      )

      // 要素がビューポートに入ったときにコールバックを実行
      if (entry.isIntersecting) {
        console.log('[useIntersectionObserver] Calling callback')
        callbackRef.current()
      }
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return ref
}

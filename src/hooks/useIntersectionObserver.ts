'use client'

import { useCallback, useRef } from 'react'

/**
 * useIntersectionObserver Hook
 * 要素がビューポートに入ったときにコールバック関数を実行します
 *
 * @param callback - 要素が表示されたときに実行するコールバック関数
 * @param options - IntersectionObserverOptions
 * @returns ref - 監視対象の要素に設定するref（Callback ref）
 */
export const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const callbackRef = useRef(callback)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // コールバックの参照を更新
  callbackRef.current = callback

  // Callback ref: DOM ノードが接続・切断されたときに実行される
  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
        return
      }

      // 既に observer があれば切断
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // 新しい observer を作成
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callbackRef.current()
        }
      }, options)

      observerRef.current.observe(node)
    },
    [options],
  )

  return ref
}

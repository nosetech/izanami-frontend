'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * useLocalStorage Hook
 * localStorage との連携を簡潔に実装するカスタムフック
 * - SSR 環境でのエラーハンドリング
 * - localStorage が利用できない環境への対応
 * - 初回レンダリング時の値復元
 *
 * @param key - localStorage のキー名
 * @param initialValue - 初期値（復元データがない場合に使用）
 * @returns [storedValue, setValue] - 現在の値と更新関数
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] => {
  // useState で値を管理
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isClient, setIsClient] = useState(false)

  // クライアント側でのみ実行
  useEffect(() => {
    setIsClient(true)
  }, [])

  // localStorage から値を復元
  useEffect(() => {
    if (!isClient) return

    try {
      // localStorage が利用可能か確認
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error(`Failed to read from localStorage (key: ${key}):`, error)
    }
  }, [key, isClient])

  // setValue 関数：値を更新して localStorage に保存
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // 関数型の更新に対応
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        // localStorage に保存
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Failed to write to localStorage (key: ${key}):`, error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}

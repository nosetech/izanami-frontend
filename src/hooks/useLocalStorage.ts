'use client'

import { useCallback, useState } from 'react'

/**
 * useLocalStorage Hook
 * localStorage との連携を簡潔に実装するカスタムフック
 * - SSR 環境でのエラーハンドリング
 * - localStorage が利用できない環境への対応
 * - 初回レンダリング時の値復元（同期的に実行）
 *
 * @param key - localStorage のキー名
 * @param initialValue - 初期値（復元データがない場合に使用）
 * @returns [storedValue, setValue] - 現在の値と更新関数
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] => {
  // 初期値を計算する関数（同期的に localStorage から復元を試みる）
  const getInitialValue = (): T => {
    try {
      // SSR 対応: サーバーサイドでは window が存在しない
      if (typeof window === 'undefined') {
        return initialValue
      }

      // localStorage が利用可能か確認
      if (!window.localStorage) {
        return initialValue
      }

      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
    } catch (error) {
      console.error(`Failed to read from localStorage (key: ${key}):`, error)
    }

    return initialValue
  }

  // useState で値を管理（初期値関数を使用して同期的に復元）
  const [storedValue, setStoredValue] = useState<T>(getInitialValue)

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

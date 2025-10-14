'use client'

import {
  CleaningImage,
  CookImage,
  LaundryImage,
  OtherImage,
  ShoppingImage,
} from '@/components/atoms'
import { HouseworkCategoryEnum } from '@/graphql/generated/components'

export type HouseWorkImageProps = {
  category: HouseworkCategoryEnum
  width?: number
  height?: number
}

export const HouseWorkImage = (props: HouseWorkImageProps) => {
  const { category, width, height } = props

  switch (category) {
    case HouseworkCategoryEnum.COOKING:
      return <CookImage width={width} height={height} />
    case HouseworkCategoryEnum.CLEANING:
      return <CleaningImage width={width} height={height} />
    case HouseworkCategoryEnum.SHOPPING:
      return <ShoppingImage width={width} height={height} />
    case HouseworkCategoryEnum.LAUNDRY:
      return <LaundryImage width={width} height={height} />
    default:
      return <OtherImage width={width} height={height} />
  }
}

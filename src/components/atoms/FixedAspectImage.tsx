import { Box, BoxProps } from '@mui/material'
import NextImage from 'next/image'

export type FixedAspectImageProps = BoxProps & {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  orgImageWidth: number
  orgImageHeight: number
  widthRatio: string
  heightRatio: string
}

export const FixedAspectImage = (props: FixedAspectImageProps) => {
  const {
    src,
    alt,
    loading,
    orgImageWidth,
    orgImageHeight,
    widthRatio,
    heightRatio,
    ...remainProps
  } = props

  return (
    <Box {...remainProps}>
      <NextImage
        src={src}
        alt={alt}
        loading={loading ?? 'eager'}
        width={orgImageWidth}
        height={orgImageHeight}
        style={{ width: widthRatio, height: heightRatio }}
      />
    </Box>
  )
}

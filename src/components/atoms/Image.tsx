import { Box, BoxProps } from '@mui/material'
import NextImage from 'next/image'

export type ImageProps = BoxProps & {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
  width?: number
  height?: number
}

export const Image = (props: ImageProps) => {
  const { src, alt, loading, width, height, ...remainProps } = props

  return (
    <Box {...remainProps}>
      <NextImage
        src={src}
        alt={alt}
        loading={loading ?? 'eager'}
        width={width}
        height={height}
      />
    </Box>
  )
}

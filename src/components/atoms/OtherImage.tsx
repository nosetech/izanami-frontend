import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'

const sparkleAnimation = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`

const BASE_WIDTH = 320
const BASE_HEIGHT = 240

interface OtherImageProps {
  width?: number
  height?: number
}

export const OtherImage = ({
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
}: OtherImageProps) => {
  const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT)

  return (
    <Box
      sx={{
        width,
        height,
        background: 'white',
        borderRadius: `${20 * scale}px`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 ${10 * scale}px ${40 * scale}px rgba(0, 0, 0, 0.1)`,
        border: `${3 * scale}px solid #ff6b6b`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          color: '#ffd700',
          fontSize: `${20 * scale}px`,
          animation: `${sparkleAnimation} 2s infinite`,
          top: `${10 * scale}px`,
          right: `${10 * scale}px`,
          animationDelay: '0s',
        }}
      >
        ✨
      </Box>
      <Box
        sx={{
          position: 'absolute',
          color: '#ffd700',
          fontSize: `${20 * scale}px`,
          animation: `${sparkleAnimation} 2s infinite`,
          bottom: `${10 * scale}px`,
          left: `${10 * scale}px`,
          animationDelay: '0.5s',
        }}
      >
        ✨
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 100 * scale,
            height: 100 * scale,
            borderRadius: '50%',
            margin: `0 auto ${16 * scale}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
          }}
        >
          <svg
            version='1.1'
            id='_x32_'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 512 512'
            style={{
              width: `${40 * scale}px`,
              height: `${40 * scale}px`,
              opacity: 1,
            }}
            xmlSpace='preserve'
          >
            <g>
              <path
                d='M392.859,6.031L123.288,66.938l0.91,1.692l-0.782-0.51L0,256.273l26.488,17.374l4.457-6.804v139.261
		l254.107,99.866l209.756-104.105V228.575L512,221.753L392.859,6.031z M270.335,466.165l-91.76-36.065V325.503l-62.872-18.629v98.51
		l-53.085-20.866V218.561l78.208-119.232l120.232,221.945l3.856-1.519l5.421-2.147V466.165z M463.136,382.226l-164.858,81.829
		V306.52l164.858-65.383V382.226z'
                style={{ fill: '#ffffff' }}
              />
            </g>
          </svg>
        </Box>
        <Typography
          component='h3'
          sx={{
            fontSize: `${30 * scale}px`,
            fontWeight: 'bold',
            margin: 0,
            color: '#333',
          }}
        >
          その他
        </Typography>
      </Box>
    </Box>
  )
}

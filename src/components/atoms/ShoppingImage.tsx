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

interface ShoppingImageProps {
  width?: number
  height?: number
}

export const ShoppingImage = ({
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
}: ShoppingImageProps) => {
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
        border: `${3 * scale}px solid #45b7d1`,
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
            background: 'linear-gradient(45deg, #45b7d1, #6bc5d8)',
          }}
        >
          <svg
            viewBox='0 0 100 100'
            style={{
              width: `${75 * scale}px`,
              height: `${75 * scale}px`,
              stroke: 'white',
              strokeWidth: '2.5',
              fill: 'white',
            }}
          >
            <path
              d='M20 25 L30 25 L35 50 L70 50'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
            <circle
              cx='40'
              cy='65'
              r='5'
              stroke='white'
              strokeWidth='3'
              fill='none'
            />
            <circle
              cx='65'
              cy='65'
              r='5'
              stroke='white'
              strokeWidth='3'
              fill='none'
            />
            <path
              d='M30 25 L75 25 L70 50'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
            <rect
              x='45'
              y='30'
              width='8'
              height='15'
              stroke='white'
              strokeWidth='2'
              fill='white'
              opacity='0.7'
            />
            <rect
              x='55'
              y='35'
              width='8'
              height='10'
              stroke='white'
              strokeWidth='2'
              fill='white'
              opacity='0.7'
            />
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
          買い物
        </Typography>
      </Box>
    </Box>
  )
}

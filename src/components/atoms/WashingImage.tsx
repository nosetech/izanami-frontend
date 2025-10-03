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

interface WashingImageProps {
  width?: number
  height?: number
}

export const WashingImage = ({
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
}: WashingImageProps) => {
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
        border: `${3 * scale}px solid #95e1d3`,
      }}
    >
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
          color: '#ffd700',
          fontSize: `${20 * scale}px`,
          animation: `${sparkleAnimation} 2s infinite`,
          top: `${10 * scale}px`,
          left: `${30 * scale}px`,
          animationDelay: '1s',
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
            background: 'linear-gradient(45deg, #95e1d3, #b8e8e0)',
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
            <rect
              x='25'
              y='30'
              width='50'
              height='50'
              rx='5'
              stroke='white'
              strokeWidth='3'
              fill='none'
            />
            <circle
              cx='50'
              cy='55'
              r='15'
              stroke='white'
              strokeWidth='3'
              fill='none'
            />
            <circle
              cx='50'
              cy='55'
              r='8'
              stroke='white'
              strokeWidth='2'
              fill='none'
            />
            <circle cx='35' cy='40' r='2' fill='white' />
            <circle cx='45' cy='40' r='2' fill='white' />
            <circle cx='55' cy='40' r='2' fill='white' />
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
          洗濯
        </Typography>
      </Box>
    </Box>
  )
}

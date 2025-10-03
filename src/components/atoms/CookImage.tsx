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

interface CookImageProps {
  width?: number
  height?: number
}

export const CookImage = ({
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
}: CookImageProps) => {
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
            viewBox='0 0 512 512'
            style={{
              width: `${50 * scale}px`,
              height: `${50 * scale}px`,
              stroke: 'white',
              strokeWidth: '2.5',
              fill: 'white',
            }}
          >
            <g>
              <path
                d='M509.612,179.758l-11.417-32.348c-2.373-6.696-8.706-11.189-15.822-11.189h-38.806
                            c-5.152-13.878-14.037-26.334-25.494-37.182c-17.638-16.652-41.356-29.776-69.02-38.943C321.375,50.958,289.696,45.82,256,45.813
                            c-51.35,0.043-98.003,11.841-132.971,31.884c-17.468,10.059-32.077,22.24-42.617,36.53c-5.036,6.848-9.094,14.218-11.975,21.994
                            H29.628c-7.109,0-13.45,4.492-15.823,11.189L2.388,179.758C0.812,184.244,0,188.962,0,193.715v3.276
                            c0,6.479,5.254,11.739,11.747,11.739c0,0,13.406,0,20.812,0c14.019,0,25.512,9.71,31.012,19.58v120.91
                            c-0.008,8.797,1.565,17.42,4.468,25.566c5.09,14.283,14.152,27.073,25.888,38.168c17.638,16.667,41.357,29.791,69.02,38.958
                            c27.678,9.146,59.356,14.269,93.053,14.276c51.349-0.036,98.003-11.834,132.971-31.885c17.468-10.051,32.076-22.232,42.617-36.53
                            c5.257-7.145,9.475-14.834,12.374-22.986c2.902-8.145,4.474-16.769,4.468-25.566v-120.91c5.5-9.87,16.993-19.58,31.012-19.58
                            c7.406,0,20.812,0,20.812,0c6.493,0,11.747-5.26,11.747-11.739v-3.276C512,188.962,511.188,184.244,509.612,179.758z M418.7,349.22
                            c0,5.297-0.916,10.45-2.746,15.602c-3.185,8.971-9.279,18-18.312,26.551c-13.5,12.812-33.53,24.269-57.925,32.305
                            c-24.378,8.073-53.056,12.783-83.716,12.783c-46.715,0.044-88.85-11.029-118.148-27.928c-14.664-8.42-26.059-18.247-33.49-28.378
                            c-3.725-5.065-6.493-10.203-8.316-15.334c-1.83-5.152-2.746-10.305-2.746-15.602V216.064c14.841,16.834,36.07,30.552,61.437,40.595
                            c29.167,11.523,63.925,18.124,101.263,18.131c49.788-0.029,94.97-11.71,128.463-31.254c13.501-7.906,25.077-17.123,34.237-27.53
                            V349.22z M418.7,176.823c-1.913,6.79-5.185,13.421-9.848,19.892c-11.704,16.247-32.287,31.044-58.868,41.516
                            c-26.566,10.493-59.002,16.747-93.984,16.74c-46.646,0.029-88.764-11.146-118.463-28.552
                            c-14.856-8.674-26.574-18.877-34.389-29.704c-4.663-6.471-7.935-13.102-9.848-19.892v-14.036c0-5.304,0.916-10.456,2.746-15.594
                            c3.185-8.986,9.279-18.015,18.312-26.559c13.501-12.812,33.53-24.268,57.926-32.312C196.662,80.256,225.34,75.538,256,75.545
                            c46.715-0.036,88.85,11.022,118.148,27.921c14.664,8.428,26.058,18.247,33.49,28.385c3.724,5.065,6.486,10.203,8.316,15.341
                            c1.83,5.138,2.746,10.29,2.746,15.594V176.823z'
                fill='white'
              />
              <path
                d='M254.739,96.031c-27.366,0-49.552,16.638-49.552,37.168c0,20.516,22.185,37.154,49.552,37.154
                            c27.363,0,49.549-16.638,49.549-37.154C304.288,112.669,282.102,96.031,254.739,96.031z'
                fill='white'
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
          料理
        </Typography>
      </Box>
    </Box>
  )
}

import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Ze względu na CORS, aplikacja musi być uruchomiona na tym samym adresie IP co serwer metro.
export const work_ip = `172.19.240.37`

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark' ? DarkTheme : DefaultTheme
      }
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Travel App',
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="country/[country]/index"
          options={{
            title: '[country]',
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="country/[country]/city/[city]/index"
          options={{
            title: '[city]',
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="country/[country]/city/[city]/attractions/index"
          options={{
            title: 'Attractions',
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="country/[country]/city/[city]/restaurants/index"
          options={{
            title: 'Restaurants',
            headerShadowVisible: true,
          }}
        />
        <Stack.Screen
          name="country/[country]/city/[city]/hotels/index"
          options={{
            title: 'Hotels',
            headerShadowVisible: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

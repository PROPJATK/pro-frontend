import {
  Link,
  Stack,
  usePathname,
  useRouter,
} from 'expo-router'
import { StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'

export default function NotFoundScreen() {
  //get current route
  const pathname = usePathname()

  let route = pathname.split('/').pop()
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>
          This screen doesn't exist.
        </Text>

        <Text style={styles.title}>
          Current route is {pathname}
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})

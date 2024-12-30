import { View, Image, StyleSheet } from 'react-native'

export default function Background () {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode='cover'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%'
  }
})

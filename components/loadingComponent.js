import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

export default function LoadingComponent ({ loading }) {
  const animationRef = useRef();
  useEffect(() => {
    if (loading) {
      animationRef.current.play();
    } else {
      animationRef.current.pause();
    }
  }, [loading]);
  return (
    <View>
      <LottieView
        autoPlay
        autoSize
        ref={animationRef}
        resizeMode='contain'
        style={!loading
          ? { display: 'none' }
          : {
              backgroundColor: 'rgb(219 ,234, 254)'
            }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottieAnimation/loading.json')}
      />
      <Text className='text-center text-2xl'>
        Please Wait ..
      </Text>
    </View>
  );
}

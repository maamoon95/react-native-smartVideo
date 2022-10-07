import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

// const htmlFILE = require('./assets/webview/kiosk/index.html');
// const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
export default function App () {
  // const [veURL, setVeURL] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Pressable
        // onPress={handlePress}
        // onTouchEnd={handlePress}
        className='bg-blue-400 overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg'
        style={{
          borderRadius: '20px'
        }}
      >
        <StyledText
          className=' active:text-white hover:text-white'
          selectable={false}
        >
          Returned Value:{currentMessage || ' nothing'}
        </StyledText>
      </Pressable>
      <WebView
        className='bg-blue-400 overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg w-full h-full'
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
        onMessage={(event) => {
          console.log('received event', event.nativeEvent.data);
          const reviecedData = event.nativeEvent.data;
          const parsedData = JSON.parse(reviecedData);
          setCurrentMessage(parsedData.type);
        }}
        onLoad={() => {
          console.log('loaded');
        }}
        onError={(error) => {
          console.log('error loading page', error);
        }}
        originWhitelist={['*']}
        // source={{ uri: veURL }}
        source={require('./assets/webview/index.html')}
      />
      <StatusBar style='auto' />
    </View>
  );
}

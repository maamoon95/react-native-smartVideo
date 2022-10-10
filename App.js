import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Platform, StyleSheet, TextInput, PermissionsAndroid } from 'react-native';
import { styled } from 'nativewind';
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
// end call with requestCancelCall
// initcall with startCallFunction
// const htmlFILE = require('./assets/webview/kiosk/index.html');
// const StyledPressable = styled(Pressable);

const StyledText = styled(Text);
export default function App () {
  // const [veURL, setVeURL] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const webViewRef = useRef(null);
  const inputProps = useRef();
  return (
    <View className='flex-1 items-center justify-center bg-white w-full h-full'>
      <Pressable
        onPress={async () => {
          if (Platform.OS === 'android') {
            const xsxs = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA

            ]);
            console.log('Permissions granted', xsxs);
          }
          setStarted(true);
        }}
        // onTouchEnd={handlePress}
        className='bg-blue-400 overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg'
        style={started
          ? {
              display: 'none'
            }
          : {
              borderRadius: 20
            }}
      >
        <StyledText
          className=' active:text-white hover:text-white'
          selectable={false}
        >
          Start App
        </StyledText>
      </Pressable>
      <TextInput
        className='w-full bg-blue-400 overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg'
        onChange={(e) => {
          inputProps.current = e.nativeEvent.text;
        }}
      />
      <Pressable
        onPress={() => {
          console.log(inputProps.current);
          webViewRef.current.injectJavaScript(`startCallFunction("${inputProps.current}")`);
        }}
        // onTouchEnd={handlePress}
        className='bg-blue-400 overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg'
        style={!started
          ? {
              display: 'none'
            }
          : {
              borderRadius: 20
            }}
      >
        <StyledText
          className=' active:text-white hover:text-white'
          selectable={false}
        >
          Inject Javascript
        </StyledText>
      </Pressable>
      <WebView
        startInLoadingState
        ref={webViewRef}
        className='bg-red-400  overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg '
        style={started ? styles.show : styles.hidden}
        containerStyle={started ? styles.show : styles.hidden}
        useWebKit
        injectedJavaScriptBeforeContentLoaded='window.injectedEnv="dev";'
        onMessage={(event) => {
          console.log('received event', event.nativeEvent.data);
          const reviecedData = event.nativeEvent.data;
          const parsedData = JSON.parse(reviecedData);
          // setCurrentMessage(parsedData.type);
        }}
        onLoad={(args) => {
          console.log('loaded');
        }}
        onError={(error) => {
          console.log('error loading page', error);
        }}
        originWhitelist={['*']}
        cacheEnabled={false}
        allowFileAccess
        allowingReadAccessToURL
        // baseURL='./assets/webview/'
        domStorageEnabled
        allowUniversalAccessFromFileURLs
        allowFileAccessFromFileURLs
        geolocationEnabled
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        allowsInlineMediaPlayback
        // source={{ uri: assets[0].uri }}nksdjhfksdjhfksdjfdskjhfksdjhfksdjfhksdjfhjxuoaiiaiuisiausydiausydiuasydiausdyiausd
        source={{ uri: 'http://192.168.1.190:4100/assets/webview/index.html' }}
      />
      {/* <WebView
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
        cacheEnabled={false}
        // source={{ uri: veURL }}
        source={{ uri: 'https://maamoon95.github.io/react-native-smartVideo/assets/webview/index.html?env=dev' }}
      /> */}
      <StatusBar style='auto' />
    </View>
  );
}
const styles = StyleSheet.create({
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    display: 'none'
  },
  show: {
    width: '100%',
    height: '100%',
    opacity: 1
  }

});

import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { useCallback, useRef, useState } from 'react';
import CallForm from './components/form';
// import { Image } from 'react-native-web';

import LogoHeader from './components/LogoHeader';
import ErrorBanner from './components/errorBanner';
import WebViewComponent from './components/webviewComponent';
import LoadingComponent from './components/loadingComponent';

// end call with requestCancelCall
// initcall with startCallFunction
// const htmlFILEr = require('./assets/webview/kiosk/index.html');
// const StyledPressable = styled(Pressable);

export default function App () {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inCall, setInCall] = useState(false);
  const [error, setCurrentError] = useState(null);
  const webViewRef = useRef(null);

  const sendMessageToWebview = useCallback((message) => {
    if (Platform.OS === 'android') {
      webViewRef.current.injectJavaScript(`window.postMessage(${JSON.stringify(message)});`);
    } else {
      webViewRef.current.postMessage(message);
    }
  }, [webViewRef]);
  function startCall () {
    sendMessageToWebview({ type: 'requestStartCall' });
  }
  function requestEndCall () {
    sendMessageToWebview({ type: 'requestCancelCall' });
  }

  return (
    <View className='flex-1 items-center justify-center bg-blue-100 w-full h-full'>

      <LogoHeader />
      <ErrorBanner
        error={error}
      />
      <WebViewComponent
        requestEndCall={requestEndCall}
        sendMessageToWebview={sendMessageToWebview}
        ref={webViewRef}
        inCall={inCall}
        loading={loading}
        setIsReady={setIsReady}
        setLoading={setLoading}
        setInCall={setInCall}
        setCurrentError={setCurrentError}
      />
      <LoadingComponent
        loading={loading}
      />
      <CallForm
        isReady={isReady}
        startCall={startCall}
        loading={loading}
        sendMessageToWebview={sendMessageToWebview}
      />

      <StatusBar style='auto' />
    </View>
  );
}

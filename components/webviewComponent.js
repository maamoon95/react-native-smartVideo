import { forwardRef, memo, useCallback } from 'react';
import WebView from 'react-native-webview';

function WebViewWithRef (props, webViewRef) {
  const {
    inCall,
    loading,
    setIsReady,
    setLoading,
    setInCall,
    sendMessageToWebview,
    setCurrentError
  } = props;
  const eventHandler = useCallback((event) => {
    console.log('received event', event.nativeEvent.data);
    try {
      const reviecedData = event.nativeEvent.data;
      const parsedData = JSON.parse(reviecedData);
      if (parsedData.type === 'PageIsReadyToStart') {
        console.log('PageIsReadyToStart');
        setIsReady(true);
        setLoading(false);
      } else if (parsedData.type === 'LoadingCallStarting') {
        console.log('LoadingCallStarting');
        setLoading(true);
      } else if (parsedData.type === 'CallEnded') {
        console.log('CallEnded');
        setLoading(true);
        setInCall(false);
        webViewRef.current.reload();
      } else if (parsedData.type === 'CallStarted') {
        console.log('CallStarted');
        setLoading(false);
        setInCall(true);
      } else if (parsedData.type === 'Error') {
        setCurrentError(parsedData.error);
      }
    } catch (error) {
      console.log('Unknown Event', error);
      setCurrentError(error);
    }

    // setCurrentMessage(parsedData.type);
  }, [setIsReady, setLoading, setInCall, setCurrentError]);
  function errorHandler (error) {
    setCurrentError('error loading page');
    console.log('error loading page', error);
  }
  return (
    <WebView
      mediaCapturePermissionGrantType='grantIfSameHostElsePrompt'
      startInLoadingState
      ref={webViewRef}
      incognito
      className='bg-red-400  overflow-hidden hover:bg-blue-700 active:bg-blue-700 active:text-white hover:text-white px-5 py-3 rounded-lg '
      containerStyle={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 10000,
        borderRadius: 10,
        // bottom: 200
        top: inCall && !loading ? 0 : '100%'
      }}
      onLoadEnd={() => {
        sendMessageToWebview({ type: 'injectEnvironment', value: 'dev' });
      }}
      onMessage={eventHandler}
      originWhitelist={['*']}
      onError={errorHandler}
      cacheEnabled={false}
      allowFileAccess
      allowingReadAccessToURL
      geolocationEnabled
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabled
      source={{ uri: 'https://maamoon95.github.io/react-native-smartVideo/assets/webview/index.html?env=dev' }}
    //   source={{ uri: 'http://192.168.1.190:4100/assets/webview/index.html' }}
    />
  );
}
const WebViewComponent = forwardRef(WebViewWithRef);
export default memo(WebViewComponent);

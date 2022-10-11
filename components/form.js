import { StatusBar } from 'expo-status-bar';
import { forwardRef, useEffect, useRef } from 'react';
import { Text, View, LayoutAnimation, Pressable, Platform, TextInput, PermissionsAndroid } from 'react-native';

export default function CallForm ({ startCall, webViewRef, started, setStarted, setLoading, loading, isReady }) {
  const emailRef = useRef('visitor@videoengager.com');
  const firstNameRef = useRef('Visitor');
  const lastNameRef = useRef('Native');
  const subjectRef = useRef('');
  const nickNameRef = useRef('visitor');
  function injectWebConfiguration () {
    if (emailRef.current) {
      webViewRef.current.injectJavaScript('window.injectEmail("' + emailRef.current + '");');
    }
    if (firstNameRef.current) {
      webViewRef.current.injectJavaScript('window.injectFirstName("' + firstNameRef.current + '");');
    }
    if (lastNameRef.current) {
      webViewRef.current.injectJavaScript('window.injectLastName("' + lastNameRef.current + '");');
    }
    if (subjectRef.current) {
      webViewRef.current.injectJavaScript('window.injectSubject("' + subjectRef.current + '");');
    }
    if (nickNameRef.current) {
      webViewRef.current.injectJavaScript('window.injectNickname("' + nickNameRef.current + '");');
    }
  }
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [started, isReady]);
  return (
    <View
      className='flex-1 items-center justify-center bg-white w-full transition-all duration-300'
      style={{
        paddingVertical: '10%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        height: '70%',
        top: (isReady && !started && !loading) ? '30%' : '100%',
        // bottom: 0,
        overflow: 'hidden',
        position: 'absolute'
      }}
    >
      <StatusBar style='auto' />
      <View
        className='w-1/2 min-w-min  h-full max-w-xl' style={{
          display: 'flex',
          maxHeight: 420,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text>
          Please Fill your Information to Start A Call
        </Text>
        <InputComponent defaultValue={emailRef.current} ref={emailRef} placeholder='Email' label='Email' />
        <InputComponent ref={nickNameRef} placeholder='Nickname' label='Nickname' defaultValue={nickNameRef.current} />
        <InputComponent ref={firstNameRef} placeholder='First Name' label='First Name' defaultValue={firstNameRef.current} />
        <InputComponent ref={lastNameRef} placeholder='Last Name' label='Last Name' defaultValue={lastNameRef.current} />
        <InputComponent ref={subjectRef} placeholder='Subject' label='Subject' multiline defaultValue={subjectRef.current} />
        <View className='w-full '>
          <Pressable
            onPress={async () => {
              if (Platform.OS === 'android') {
                const xsxs = await PermissionsAndroid.requestMultiple([
                  PermissionsAndroid.PERMISSIONS.CAMERA

                ]);
                console.log('Permissions granted', xsxs);
              }
              injectWebConfiguration();
              startCall();
            }}
        // onTouchEnd={handlePress}
            className='bg-blue-400 overflow-hidden hover:bg-blue-700 w-full active:bg-blue-700  active:text-white hover:text-white px-5 py-3 rounded-lg'
            style={{
              borderRadius: 20
            }}
          >
            <Text
              className=' active:text-white text-white hover:text-white text-center'
              selectable={false}
            >
              Start Call
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
// forward ref to input
const InputComponent = forwardRef(InputWithRef);
function InputWithRef (props, ref) {
  return (
    <View className='w-full flex gap-2'>
      <Text className='text-gray-500 px-1'>
        {props.label || 'label'}
      </Text>
      <TextInput
        defaultValue={props.defaultValue}
        multiline={props.multiline || false}
        placeholder={props.placeholder || 'placeholder'}
        className='w-full bg-gray-200 overflow-hidden hover:bg-gray-300 active:bg-gray-300 active:text-black hover:text-black px-5 py-3 rounded-lg'
        onChange={(e) => {
          ref.current = e.nativeEvent.text;
        }}
      />
    </View>
  );
}

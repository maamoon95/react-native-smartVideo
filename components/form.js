import { StatusBar } from 'expo-status-bar';
import { forwardRef, useEffect, useRef } from 'react';
import { Text, View, LayoutAnimation, Pressable, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import PermissionBanner from './permissionBanner';

export default function CallForm ({ startCall, sendMessageToWebview, inCall, loading, isReady }) {
  const emailRef = useRef('visitor@videoengager.com');
  const firstNameRef = useRef('Visitor');
  const lastNameRef = useRef('Native');
  const subjectRef = useRef('');
  const nickNameRef = useRef('visitor');

  function injectWebConfiguration () {
    if (emailRef.current) {
      sendMessageToWebview({ type: 'changeEmail', value: emailRef.current });
    }
    if (firstNameRef.current) {
      sendMessageToWebview({ type: 'changeFirstName', value: firstNameRef.current });
    }
    if (lastNameRef.current) {
      sendMessageToWebview({ type: 'changeLastName', value: lastNameRef.current });
    }
    if (subjectRef.current) {
      sendMessageToWebview({ type: 'changeSubject', value: subjectRef.current });
    }
    if (nickNameRef.current) {
      sendMessageToWebview({ type: 'changeNickname', value: nickNameRef.current });
    }
  }
  async function requestPermissions () {
    const { status: statusCam } = await Camera.requestCameraPermissionsAsync();
    const { status: statusMic } = await Camera.requestMicrophonePermissionsAsync();
    if (statusCam === 'granted' && statusMic === 'granted') {
      return true;
    } else {
      return false;
    }
  }
  async function submitFormAndStartCall () {
    console.log('submitFormAndStartCall');
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) return;

    injectWebConfiguration();
    startCall();
  }
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isReady, inCall, !loading]);
  return (
    <View
      className='flex-1 items-center justify-center bg-white w-full transition-all duration-300'
      style={{
        paddingVertical: 5,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        height: '70%',
        top: (isReady && !loading) ? '30%' : '100%',
        // bottom: 0,
        overflow: 'hidden',
        position: 'absolute'
      }}
    >
      <PermissionBanner />
      <StatusBar style='auto' />
      <View
        className='w-full max-w-xs  h-full md:max-w-xl pb-4' style={{
          display: 'flex',
          //   maxHeight: 430,
          flexDirection: 'column'
          //   justifyContent: 'space-between'

        }}
      >
        <Text className='py-3'>
          Please Fill your Information to Start A Call
        </Text>
        <InputComponent defaultValue={emailRef.current} ref={emailRef} placeholder='Email' label='Email' />
        <InputComponent ref={nickNameRef} placeholder='Nickname' label='Nickname' defaultValue={nickNameRef.current} />
        <InputComponent ref={firstNameRef} placeholder='First Name' label='First Name' defaultValue={firstNameRef.current} />
        <InputComponent ref={lastNameRef} placeholder='Last Name' label='Last Name' defaultValue={lastNameRef.current} />
        <InputComponent ref={subjectRef} placeholder='Subject' label='Subject' multiline defaultValue={subjectRef.current} />
        <View className='w-full my-3'>
          <Pressable
            onPress={submitFormAndStartCall}
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
    <View className='w-full flex gap-2 py-1'>
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

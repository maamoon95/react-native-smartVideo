import { StatusBar } from 'expo-status-bar';
import { forwardRef, useEffect, useRef } from 'react';
import { Text, View, LayoutAnimation, Pressable, TextInput } from 'react-native';
import { Camera, PermissionStatus } from 'expo-camera';
import { Avatar, Banner } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function CallForm ({ startCall, webViewRef, started, setStarted, setLoading, loading, isReady }) {
  const emailRef = useRef('visitor@videoengager.com');
  const firstNameRef = useRef('Visitor');
  const lastNameRef = useRef('Native');
  const subjectRef = useRef('');
  const nickNameRef = useRef('visitor');
  const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
  const [permissionMic, requestPermissionMic] = Camera.useMicrophonePermissions();

  function injectWebConfiguration () {
    if (emailRef.current) {
      webViewRef.current.postMessage({ type: 'changeEmail', value: emailRef.current });
    }
    if (firstNameRef.current) {
      webViewRef.current.postMessage({ type: 'changeFirstName', value: firstNameRef.current });
    }
    if (lastNameRef.current) {
      webViewRef.current.postMessage({ type: 'changeLastName', value: lastNameRef.current });
    }
    if (subjectRef.current) {
      webViewRef.current.postMessage({ type: 'changeSubject', value: subjectRef.current });
    }
    if (nickNameRef.current) {
      webViewRef.current.postMessage({ type: 'changeNickname', value: nickNameRef.current });
    }
  }
  async function requestPermissions () {
    const { status: statusCam } = await requestPermissionCam();
    const { status: statusMic } = await requestPermissionMic();
    if (statusCam === 'granted' && statusMic === 'granted') {
      return true;
    } else {
      return false;
    }
  }
  async function submitFormAndStartCall () {
    const permissionsGranted = await requestPermissions();
    if (!permissionsGranted) return;
    injectWebConfiguration();
    startCall();
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
      {(permissionCam && permissionMic) && (permissionCam.status === PermissionStatus.DENIED || permissionMic.status === PermissionStatus.DENIED) &&
        <Banner
          style={{
            position: 'absolute',
            top: '10%',
            width: '90%',
            zIndex: 100000,
            borderRadius: 10,
            backgroundColor: 'rgba(40,40,200,1)'
          }}
          textStyle={{
            color: 'white'
          }}
          illustration={props => (
            <Avatar
              color='primary'
              icon={props => <Icon name='video-off' {...props} />}
              {...props}
            />
          )}
          text={'Error: ' + 'Camera and microphone permissions are required to start a call.'}

        />}
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

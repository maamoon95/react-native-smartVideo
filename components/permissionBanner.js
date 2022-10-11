import { Avatar, Banner } from '@react-native-material/core';
import { Camera, PermissionStatus } from 'expo-camera';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function PermissionBanner () {
  const [permissionCam] = Camera.useCameraPermissions();
  const [permissionMic] = Camera.useMicrophonePermissions();

  if (!(permissionCam && permissionMic)) return null;
  if (!(permissionCam.status === PermissionStatus.DENIED || permissionMic.status === PermissionStatus.DENIED)) return null;
  return (

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
    />
  );
}

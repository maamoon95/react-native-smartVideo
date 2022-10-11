import { Avatar, Banner, Button, HStack } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
export default function ErrorBanner ({ error }) {
  if (!error) {
    return null;
  }
  return (
    <Banner
      style={{
        position: 'absolute',
        top: '45%',
        width: '90%',
        zIndex: 1000,
        borderRadius: 10
      }}
      illustration={props => (
        <Avatar
          color='primary'
          icon={props => <Icon name='error' {...props} />}
          {...props}
        />
      )}
      text={'Error: ' + error}
      buttons={
        <HStack spacing={2}>
          <Button key='Refresh' variant='text' title='Refresh' compact />
        </HStack>
        }
    />
  );
}

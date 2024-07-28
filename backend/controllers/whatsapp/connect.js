import sdk from '@api/whapi';

sdk.auth('vr5k0FtDz54Qjj2HKMeVhqIDj3T0xacR');
sdk.getChannelSettings()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
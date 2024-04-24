import React from 'react';
import {View, Image} from 'react-native';
import {styles} from '../../constants/globalStyle';
import {User} from '../../constants/images';
import TextLink from '../TextLink';
import {userType} from '../../constants/allTypes';
import {customStyles} from '../../screens/screenStyling';

type ProfileAvatarProps = {
  image?: string;
  state: userType;
  onPress: () => void;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  image,
  state,
  onPress,
}) => {
  return (
    <View style={[styles.horizantalyCenter]}>
      <View style={[styles.horizantalyCenter, {marginTop: 19}]}>
        {
          image?
          <Image source={{uri: image}} style={customStyles.profileImg} />
          :
          state.profileImage?
          <Image
            source={{uri: state.profileImage}}
            style={customStyles.profileImg}
          />:<User width="86" height="86" style={customStyles.profileImg} />
        }
        <View style={[styles.horizantalyCenter, customStyles.bio]}>
          {!state.profileImage ? (
            <TextLink onPress={onPress} label="Upload Profile Photo" />
          ) : (
            <TextLink onPress={onPress} label="Change Profile" />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileAvatar;

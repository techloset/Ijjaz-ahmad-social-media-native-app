import {NavigationProp} from '@react-navigation/native';

export type routeProps = {
  navigation: NavigationProp<any>;
};
export type ToastType = 'success' | 'error' | 'info';
export type handleChangeProps = {
  name: string;
  value: string;
  type: string;
};
export type UserData = {
  username?: string;
  email: string;
  password: string;
  role?: string;
  status?: string;
  uid?: string;
  profileImage?: string;
  website?: string;
  bio?: string;
  phone?: string;
  gender?: string;
  name?: string;
};
export type SigninUserData = {
  email: string;
  password: string;
};
export type ForgotData = {
  email: string;
};
export type AuthContextProps = {
  isAuth: boolean;
  user: Record<string, any>;
  dispatch: React.Dispatch<{
    type: string;
    payload: {userData?: Record<string, any>};
  }>;
};
export type FirebaseUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
};
export type UserProfileData = {
  confirmPassword?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
  uid?: string;
  username?: string;
};
export type AuthState = {
  isAuth: boolean;
  user: UserProfileData;
  isAppLoading: boolean;
};
export type AuthAction =
  | {type: 'Login'; payload: {userData?: UserProfileData}}
  | {type: 'Logout'};
export type userType = {
  bio?: string;
  email?: string;
  gender?: string;
  name?: string;
  phone?: string;
  profileImage?: string;
  role?: string;
  status?: string;
  uid?: string;
  username?: string;
  website?: string;
};
export type postType = {
  URL?: string;
  id?: string;
  uid?: string;
  description?: string;
  dateCreated?: string;
};
export type postState = {
  isLoading: boolean;
  userPosts: postType[];
  isError: boolean;
};
export type allPosts = {
  user: userType;
  posts: postType[];
};
export type usersDataState = {
  isLoading: boolean;
  usersData: allPosts[];
  isError: boolean;
};
export type userDataState = {
  isAuth: boolean;
  user: userType;
  isLoading: boolean;
  isError: boolean;
};

export type ActionButtonsRowProps ={
  focusedText: string;
  loading: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
}

export type EditCancelBtnProps= {
  focusedText: string;
  label: string;
  onCancel: () => void;
  onEdit: () => void;
}

export type PageNavigateBtnProps = {
  label: string;
  onPress: () => void;
};
export type PrimaryBtnProps = {
  loading: boolean; 
  label: string
  onPress: () => void; 
};
export type BottomModelProps = {
  isModalVisible: boolean;
  onRequestClose: () => void;
  onPress: () => void;
  handleGallery: () => void;
  handleCamra: () => void;
};
export type CustomModelProps = {
  isModalVisible: boolean;
  postId: string;
  modalImg: string;
  onPress: (item: any) => void;
  onRequestClose: (item: any) => void;
};

export type FeedPostProps = {
  description: string | undefined;
  uri: string | undefined;
};

export type  InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  type: 'text' | 'password';
};

export type ProfileInputProps = {
  placeholder: string;
  label: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
  type: 'text' | 'password';
};

export type ProfileAvatarProps = {
  image?: string;
  state: userType;
  onPress: () => void;
};
export type ProfileCardProps = {
  state: userType;
}

export type FeedProfileCardProps = {
  uri: string | undefined;
  username: string | undefined;
  onPress: () => void;
};

export type uploadPostFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
  description: string;
};

export type UpdateProfileFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
  state: userType;
};
export type uploadFileFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
};

export type PickImageProps = {
  image: string;
  type: string;
  size: number;
};

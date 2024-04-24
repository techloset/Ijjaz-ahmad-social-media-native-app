import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from '../../constants/globalStyle';
import {allPosts, postType, routeProps} from '../../constants/allTypes';
import useFeed from './useFeed';
import FeedProfileCard from '../../components/FeedProfileCard';
import FeedPost from '../../components/feedPost/FeedPost';
import CommentSection from '../../components/comment/CommentSection';
import { STACK_SCREENS } from '../../constants/navigationName';
export default function Feed({navigation}: routeProps) {
  const {user, usersData} = useFeed();
  return (
    <View style={[styles.flexContainer]}>
      <ScrollView>
        {usersData.map((item: allPosts, i) => {
          if (item.user?.uid != user.uid)
            return (
              <View key={i}>
                {item.posts.map((post: postType, j) => (
                  <View key={j}>
                    <FeedProfileCard
                      uri={item.user?.profileImage}
                      username={item.user?.username}
                      onPress={() => {
                        navigation.navigate(STACK_SCREENS.PUBLICK_PROFILE, {
                          profile: item,
                        });
                      }}
                    />
                    <FeedPost description={post.description} uri={post.URL} />
                    <CommentSection />
                  </View>
                ))}
              </View>
            );
        })}
      </ScrollView>
    </View>
  );
}

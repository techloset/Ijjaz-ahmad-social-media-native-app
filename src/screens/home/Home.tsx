import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from '../../constants/GlobalStyle';
import {STACK_SCREENS} from '../../constants/Navigation';
import {allPosts, postType, routeProps} from '../../constants/AllTypes';
import useHome from './useHome';
import FeedProfileCard from '../../components/FeedProfileCard';
import FeedPost from '../../components/FeedPost';
import CommentSection from '../../components/CommentSection';
export default function Home({navigation}: routeProps) {
  const {user, usersData} = useHome();
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
                        navigation.navigate(STACK_SCREENS.PROFILE, {
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

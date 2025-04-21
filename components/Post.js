import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }

  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  // Format date for older posts
  return date.toLocaleDateString();
};

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.stats.isLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post.stats.initialLikes);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const relativeTime = useMemo(
    () => getRelativeTime(post.timestamp),
    [post.timestamp]
  );

  const handleLikePress = useCallback(() => {
    const newIsLiked = !isLiked;
    const delta = newIsLiked ? 1 : -1;
    setIsLiked(newIsLiked);
    setLikeCount((prevCount) => prevCount + delta);
    setIsLikeLoading(true);
    setTimeout(() => {
      setIsLikeLoading(false);
      console.log(`Post ${post.id} ${newIsLiked ? 'liked' : 'unliked'}`);
    }, 300);
  }, [isLiked, post.id]);

  const handleCommentPress = useCallback(() => {
    Alert.alert("Comment",`Comment button tapped for post ${post.id}`);
  }, [post.id]);

  const handleSharePress = useCallback(() => {
    Alert.alert("Share",`Share button tapped for post ${post.id}`);
    console.log(`Share button tapped for post ${post.id}`);
  }, [post.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatarUrl }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.user.username}</Text>
          <Text style={styles.timestamp}>{relativeTime}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.interactionBar}>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={handleLikePress}
          disabled={isLikeLoading}>
          {isLikeLoading ? (
            <ActivityIndicator size="small" color="#666" />
          ) : (
            <>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={isLiked ? '#E0245E' : '#333'}
              />
              <Text style={styles.interactionText}>{likeCount}</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={handleCommentPress}>
          <Ionicons name="chatbubble-outline" size={20} />
          <Text style={styles.interactionText}>
            {post.stats.initialComments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={handleSharePress}> 
          <Ionicons name="share-social-outline" size={20} />
          <Text style={styles.interactionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  interactionBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  interactionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 4,
  },
  likedIcon: {
    color: '#e74c3c',
  },
  interactionText: {
    fontSize: 14,
    color: '#333',marginLeft:5
  },
});

export default Post;

import React, { useRef } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,Image,
  Animated,
  Platform,
} from 'react-native'
import Post from './components/Post'
import { Ionicons } from '@expo/vector-icons'

const posts = [
  {
    id: "post001",
    user: {
      id: "user001",
      username: "ReactDev",
      avatarUrl: "https://picsum.photos/seed/user001/300/300"
    },
    timestamp: "2023-04-21T17:30:00Z",
    content: "Just built this cool interactive post component with React Native! #ReactNative #SocialMediaDev",
    imageUrl: "https://picsum.photos/seed/post001/500/400",
    stats: {
      initialLikes: 42,
      initialComments: 5,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post002",
    user: {
      id: "user002",
      username: "HooksGuru",
      avatarUrl: "https://picsum.photos/seed/user002/300/300"
    },
    timestamp: "2023-04-21T18:45:00Z",
    content: "Exploring the new React Hooks API today. Mind-blowing stuff! #ReactJS #Hooks",
    imageUrl: "https://picsum.photos/seed/post002/500/400",
    stats: {
      initialLikes: 58,
      initialComments: 8,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post003",
    user: {
      id: "user003",
      username: "CSSNinja",
      avatarUrl: "https://picsum.photos/seed/user003/300/300"
    },
    timestamp: "2023-04-21T20:10:00Z",
    content: "Styled a modal with Tailwind CSS in React Native. Looks sleek! #TailwindCSS #UX",
    imageUrl: "https://picsum.photos/seed/post003/500/400",
    stats: {
      initialLikes: 23,
      initialComments: 3,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post004",
    user: {
      id: "user004",
      username: "ReduxRanger",
      avatarUrl: "https://picsum.photos/seed/user004/300/300"
    },
    timestamp: "2023-04-21T22:00:00Z",
    content: "Debugged a tricky state issue in my Redux store. Victory! #Redux #StateManagement",
    imageUrl: null,
    stats: {
      initialLikes: 15,
      initialComments: 1,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post005",
    user: {
      id: "user005",
      username: "NodeMaster",
      avatarUrl: "https://picsum.photos/seed/user005/300/300"
    },
    timestamp: "2023-04-22T01:15:00Z",
    content: "Deployed my first Node.js API to AWS EC2. Feels like a milestone! #NodeJS #AWS",
    imageUrl: "https://picsum.photos/seed/post005/500/400",
    stats: {
      initialLikes: 87,
      initialComments: 10,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post006",
    user: {
      id: "user006",
      username: "GraphQLPro",
      avatarUrl: "https://picsum.photos/seed/user006/300/300"
    },
    timestamp: "2023-04-22T03:30:00Z",
    content: "Experimenting with GraphQL subscriptions in Apollo. Real-time FTW! #GraphQL #Apollo",
    imageUrl: "https://picsum.photos/seed/post006/500/400",
    stats: {
      initialLikes: 34,
      initialComments: 2,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post007",
    user: {
      id: "user007",
      username: "TypeScriptFan",
      avatarUrl: "https://picsum.photos/seed/user007/300/300"
    },
    timestamp: "2023-04-22T05:50:00Z",
    content: "Migrated my project to TypeScript for better type safety. #TypeScript #JavaScript",
    imageUrl: "https://picsum.photos/seed/post007/500/400",
    stats: {
      initialLikes: 76,
      initialComments: 6,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post008",
    user: {
      id: "user008",
      username: "ExpoExpert",
      avatarUrl: "https://picsum.photos/seed/user008/300/300"
    },
    timestamp: "2023-04-22T08:20:00Z",
    content: "Optimized image loading in Expo using FastImage library. #Expo #Performance",
    imageUrl: null,
    stats: {
      initialLikes: 19,
      initialComments: 4,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post009",
    user: {
      id: "user009",
      username: "FormWhiz",
      avatarUrl: "https://picsum.photos/seed/user009/300/300"
    },
    timestamp: "2023-04-22T10:05:00Z",
    content: "Built a custom hook for form validation in React. #CustomHooks #Forms",
    imageUrl: "https://picsum.photos/seed/post009/500/400",
    stats: {
      initialLikes: 44,
      initialComments: 9,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post010",
    user: {
      id: "user010",
      username: "LottieAnimator",
      avatarUrl: "https://picsum.photos/seed/user010/300/300"
    },
    timestamp: "2023-04-22T12:45:00Z",
    content: "Playing with Lottie animations in React Native. Animations are life! #Lottie #Animations",
    imageUrl: "https://picsum.photos/seed/post010/500/400",
    stats: {
      initialLikes: 62,
      initialComments: 7,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post011",
    user: {
      id: "user011",
      username: "FirebaseAuth",
      avatarUrl: "https://picsum.photos/seed/user011/300/300"
    },
    timestamp: "2023-04-22T14:30:00Z",
    content: "Integrated Firebase Authentication in my app. Secure and easy! #Firebase #Auth",
    imageUrl: null,
    stats: {
      initialLikes: 30,
      initialComments: 3,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post012",
    user: {
      id: "user012",
      username: "DarkModeDev",
      avatarUrl: "https://picsum.photos/seed/user012/300/300"
    },
    timestamp: "2023-04-22T15:55:00Z",
    content: "Implementing dark mode toggle with Context API. #ContextAPI #DarkMode",
    imageUrl: "https://picsum.photos/seed/post012/500/400",
    stats: {
      initialLikes: 16,
      initialComments: 2,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post013",
    user: {
      id: "user013",
      username: "NavDesigner",
      avatarUrl: "https://picsum.photos/seed/user013/300/300"
    },
    timestamp: "2023-04-22T16:20:00Z",
    content: "Created a responsive sidebar nav in React Native. #Navigation #ResponsiveDesign",
    imageUrl: "https://picsum.photos/seed/post013/500/400",
    stats: {
      initialLikes: 50,
      initialComments: 5,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post014",
    user: {
      id: "user014",
      username: "FCMTester",
      avatarUrl: "https://picsum.photos/seed/user014/300/300"
    },
    timestamp: "2023-04-22T17:40:00Z",
    content: "Tested push notifications with Firebase Cloud Messaging. #FCM #Notifications",
    imageUrl: null,
    stats: {
      initialLikes: 28,
      initialComments: 1,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post015",
    user: {
      id: "user015",
      username: "BioTechie",
      avatarUrl: "https://picsum.photos/seed/user015/300/300"
    },
    timestamp: "2023-04-22T18:55:00Z",
    content: "Added biometric login with TouchID and FaceID. #Biometrics #Security",
    imageUrl: "https://picsum.photos/seed/post015/500/400",
    stats: {
      initialLikes: 92,
      initialComments: 12,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post016",
    user: {
      id: "user016",
      username: "CIWizard",
      avatarUrl: "https://picsum.photos/seed/user016/300/300"
    },
    timestamp: "2023-04-22T20:10:00Z",
    content: "Setting up continuous integration with GitHub Actions. #CI #DevOps",
    imageUrl: null,
    stats: {
      initialLikes: 11,
      initialComments: 0,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post017",
    user: {
      id: "user017",
      username: "FlutterExplorer",
      avatarUrl: "https://picsum.photos/seed/user017/300/300"
    },
    timestamp: "2023-04-22T21:25:00Z",
    content: "Experimenting with Flutter web for the first time. #Flutter #WebDev",
    imageUrl: "https://picsum.photos/seed/post017/500/400",
    stats: {
      initialLikes: 39,
      initialComments: 8,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post018",
    user: {
      id: "user018",
      username: "PaperStylist",
      avatarUrl: "https://picsum.photos/seed/user018/300/300"
    },
    timestamp: "2023-04-22T22:45:00Z",
    content: "Styled a login screen with React Native Paper. #UI #ReactNativePaper",
    imageUrl: "https://picsum.photos/seed/post018/500/400",
    stats: {
      initialLikes: 27,
      initialComments: 3,
      isLikedByCurrentUser: true
    }
  },
  {
    id: "post019",
    user: {
      id: "user019",
      username: "ChatBuilder",
      avatarUrl: "https://picsum.photos/seed/user019/300/300"
    },
    timestamp: "2023-04-22T23:50:00Z",
    content: "Built a realtime chat app using Socket.io. #SocketIO #Realtime",
    imageUrl: "https://picsum.photos/seed/post019/500/400",
    stats: {
      initialLikes: 81,
      initialComments: 14,
      isLikedByCurrentUser: false
    }
  },
  {
    id: "post020",
    user: {
      id: "user020",
      username: "VercelDev",
      avatarUrl: "https://picsum.photos/seed/user020/300/300"
    },
    timestamp: "2023-04-23T00:10:00Z",
    content: "Learning about serverless functions on Vercel. #Serverless #Vercel",
    imageUrl: null,
    stats: {
      initialLikes: 54,
      initialComments: 6,
      isLikedByCurrentUser: true
    }
  }
];


const HEADER_MAX_HEIGHT = 60

export default function App() {

  
  const scrollY = useRef(new Animated.Value(0)).current

  const scrollYClamped = Animated.diffClamp(scrollY, 0, HEADER_MAX_HEIGHT)

  const headerTranslateY = scrollYClamped.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, -HEADER_MAX_HEIGHT],
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <Animated.View
        style={[
          styles.header,
          {paddingTop: 29, height: HEADER_MAX_HEIGHT + 29,transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>My Feed</Text>
        <View style={styles.headerRight}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/user001/300/300' }} style={styles.avatar}/>
        </View>
      </Animated.View>
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT+29 }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}> <Post post={item} />
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],{ useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
  },
  postContainer: {
    padding: 10,
  },
})

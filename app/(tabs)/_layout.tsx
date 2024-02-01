import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#40A2E3',
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <Ionicons name="create" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="globe-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => <FontAwesome name="suitcase" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

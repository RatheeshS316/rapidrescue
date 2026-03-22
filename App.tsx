import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageSquare, Map as MapIcon, Tent, Bot, Shield, Home } from 'lucide-react-native';

import { AppProvider, useAppStore } from './store/appStore';
import { COLORS } from './constants/theme';
import LoadingScreen from './components/LoadingScreen';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MessagesScreen from './screens/MessagesScreen';
import SheltersScreen from './screens/SheltersScreen';
import AssistantScreen from './screens/AssistantScreen';
import ZonesScreen from './screens/ZonesScreen';
import PrecautionsScreen from './screens/PrecautionsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ContactsScreen from './screens/ContactsScreen';
import ChatViewScreen from './screens/ChatViewScreen';
import LocationShareScreen from './screens/LocationShareScreen';
import SendMessageScreen from './screens/SendMessageScreen';
import DangerZonesScreen from './screens/DangerZonesScreen';
import MapViewScreen from './screens/MapViewScreen';
import DisasterDetailsScreen from './screens/DisasterDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Header hidden options
const noHeader = { headerShown: false };

// Common screen options
const screenOptions = {
  headerStyle: { backgroundColor: COLORS.surfaceDeep },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 17 },
  headerBackTitleVisible: false,
  cardStyle: { backgroundColor: COLORS.background },
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={noHeader} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Authentication' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="SendMessage" component={SendMessageScreen} options={{ title: 'Message Status' }} />
      <Stack.Screen name="MapView" component={MapViewScreen} options={noHeader} />
    </Stack.Navigator>
  );
}

function MessagesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Messages" component={MessagesScreen} options={{ title: 'Messages' }} />
      <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contacts' }} />
      <Stack.Screen name="ChatView" component={ChatViewScreen} options={noHeader} />
      <Stack.Screen name="LocationShare" component={LocationShareScreen} options={{ title: 'Share Location' }} />
      <Stack.Screen name="SendMessage" component={SendMessageScreen} options={{ title: 'Message Status' }} />
      <Stack.Screen name="MapView" component={MapViewScreen} options={noHeader} />
    </Stack.Navigator>
  );
}

function ZonesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ZonesMain" component={ZonesScreen} options={{ title: 'Predictions' }} />
      <Stack.Screen name="DangerZones" component={DangerZonesScreen} options={{ title: 'Danger Zones' }} />
      <Stack.Screen name="DisasterDetails" component={DisasterDetailsScreen} options={{ title: 'Alert Details', headerStyle: { backgroundColor: COLORS.background }, headerTintColor: COLORS.textPrimary }} />
      <Stack.Screen name="SendMessage" component={SendMessageScreen} options={{ title: 'Message Status' }} />
    </Stack.Navigator>
  );
}

function SheltersStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SheltersMain" component={SheltersScreen} options={{ title: 'Shelters' }} />
      <Stack.Screen name="MapView" component={MapViewScreen} options={noHeader} />
    </Stack.Navigator>
  );
}

function AssistantStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AssistantMain" component={AssistantScreen} options={{ title: 'Assistant' }} />
      <Stack.Screen name="MapView" component={MapViewScreen} options={noHeader} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'rgba(240,249,255,0.45)',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size }) => {
          const iconSize = 22;
          switch (route.name) {
            case 'MessagesTab':
              return <MessageSquare size={iconSize} color={color} />;
            case 'ZonesTab':
              return <MapIcon size={iconSize} color={color} />;
            case 'HomeTab':
              return <Home size={iconSize} color={color} />;
            case 'SheltersTab':
              return <Tent size={iconSize} color={color} />;
            case 'AssistantTab':
              return <Bot size={iconSize} color={color} />;
            case 'PrecautionsTab':
              return <Shield size={iconSize} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen
        name="MessagesTab"
        component={MessagesStack}
        options={{ title: 'Messages' }}
      />
      <Tab.Screen
        name="ZonesTab"
        component={ZonesStack}
        options={{ title: 'Zones' }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home', tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="SheltersTab"
        component={SheltersStack}
        options={{ title: 'Shelters' }}
      />
      <Tab.Screen
        name="AssistantTab"
        component={AssistantStack}
        options={{ title: 'Assistant' }}
      />
      <Tab.Screen
        name="PrecautionsTab"
        component={PrecautionsScreen}
        options={{ title: 'Precautions', headerShown: true, headerStyle: { backgroundColor: COLORS.surfaceDeep }, headerTintColor: COLORS.textPrimary }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { isLoading, setIsLoading } = useAppStore();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surfaceDeep} />
      <NavigationContainer
        onStateChange={() => {
          // Trigger loading screen on page transitions
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }}
      >
        <MainTabs />
      </NavigationContainer>
      
      {isLoading && <LoadingScreen />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});

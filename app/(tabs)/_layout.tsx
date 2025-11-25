import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: user ? 'Dashboard' : 'Login',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name={user ? "chart.bar" : "person.circle"} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Only show explore tab when user is logged in - but we're not using it now */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // This completely hides the tab
        }}
      />
    </Tabs>
  );
}

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NhostClient, NhostReactProvider } from '@nhost/react';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-react-native';

import {NhostApolloProvider} from "@nhost/react-apollo";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const nhost = new NhostClient({
    subdomain: 'ylcftwcewgghuscvqydm',
    region: 'eu-central-1',
    clientStorageType: 'expo-secure-storage',
    clientStorage: SecureStore,
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
          {/*<OverlayProvider>*/}
            <SafeAreaProvider>
                  <NhostReactProvider nhost={nhost}>
                    <NhostApolloProvider nhost={nhost}>
                      <Navigation colorScheme={colorScheme} />
                      <StatusBar />
                    </NhostApolloProvider>
                  </NhostReactProvider>
            </SafeAreaProvider>
          {/*</OverlayProvider>*/}
        </GestureHandlerRootView>
    );
  }
}

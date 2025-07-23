// App.js
// Versão final e corrigida, com as extensões .js nos imports para forçar a resolução.

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa nossas telas com a extensão .js explícita
import TaskListScreen from './src/screens/TaskListScreen.js';
import TaskFormScreen from './src/screens/TaskFormScreen.js';

import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: 'Tarefas (Responsável)' }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

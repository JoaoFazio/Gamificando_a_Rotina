// src/screens/TaskListScreen.js
// Tela de lista de tarefas ATUALIZADA para buscar dados da API.

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator, // Para mostrar um feedback de carregamento
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar os dados quando a tela volta ao foco
import Ionicons from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from '../api/api';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Falha ao buscar tarefas. Verifique se o servidor está rodando.');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro de Conexão', err.message);
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect é um hook do React Navigation que roda toda vez que a tela entra em foco.
  // É perfeito para garantir que a lista de tarefas esteja sempre atualizada.
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Função para lidar com a exclusão de uma tarefa
  const handleDelete = (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: 'DELETE',
              });
              if (!response.ok) {
                throw new Error('Falha ao excluir a tarefa.');
              }
              // Atualiza a lista de tarefas na tela após a exclusão
              setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            } catch (err) {
              Alert.alert('Erro', err.message);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Adiciona o botão '+' no cabeçalho para criar uma nova tarefa
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('TaskForm')} // Navega sem passar tarefa, indicando modo de criação
          style={styles.headerButton}
        >
          <Ionicons name="add-circle" size={30} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>A carregar tarefas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchTasks}>
            <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.taskItemContainer}>
        <TouchableOpacity
            style={styles.taskInfoContainer}
            onPress={() => navigation.navigate('TaskForm', { task: item })} // Passa a tarefa para o formulário no modo de edição
        >
            <View style={styles.taskTextContainer}>
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <View style={styles.pointsContainer}>
                    <Text style={styles.rewardPoints}>+{item.rewardPoints}pts</Text>
                    {item.penaltyPoints > 0 && (
                    <Text style={styles.penaltyPoints}>-{item.penaltyPoints}pts</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
        <View style={styles.taskActionsContainer}>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                <Ionicons name="trash-bin" size={24} color="#dc3545" />
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tasks.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Nenhuma missão encontrada ainda.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onRefresh={fetchTasks} // Permite "puxar para atualizar"
            refreshing={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// Estilos (semelhantes aos anteriores, com algumas adições)
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    headerButton: { marginRight: 15 },
    taskItemContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, flexDirection: 'row', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
    taskInfoContainer: { flex: 1 },
    taskTextContainer: { flex: 1 },
    taskName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    taskDescription: { fontSize: 14, color: '#666', marginTop: 4 },
    pointsContainer: { flexDirection: 'row', marginTop: 8 },
    rewardPoints: { fontSize: 13, color: '#28a745', fontWeight: 'bold', marginRight: 10 },
    penaltyPoints: { fontSize: 13, color: '#dc3545', fontWeight: 'bold' },
    taskActionsContainer: { flexDirection: 'row', alignItems: 'center' },
    actionButton: { padding: 8, marginLeft: 10 },
    emptyText: { fontSize: 18, color: '#555' },
    errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginBottom: 20 },
    button: { backgroundColor: '#6200ee', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


export default TaskListScreen;
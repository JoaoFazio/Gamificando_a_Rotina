// src/screens/TaskFormScreen.js
// Tela de formulário ATUALIZADA para criar e editar tarefas via API.

import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import API_BASE_URL from './src/api/api'; // Importa a URL base da API

const TaskFormScreen = ({ route, navigation }) => {
  const existingTask = route.params?.task; // Recebe a tarefa se estiver no modo de edição
  const isEditing = !!existingTask; // Verifica se está a editar ou a criar

  const [name, setName] = useState(existingTask?.name || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [frequency, setFrequency] = useState(existingTask?.frequency || 'Diária');
  const [rewardPoints, setRewardPoints] = useState(existingTask?.rewardPoints?.toString() || '10');
  const [penaltyPoints, setPenaltyPoints] = useState(existingTask?.penaltyPoints?.toString() || '0');
  const [loading, setLoading] = useState(false);

  // Define o título da tela dinamicamente
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Tarefa' : 'Nova Tarefa',
    });
  }, [navigation, isEditing]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Erro de Validação', 'O nome da tarefa é obrigatório.');
      return;
    }
    setLoading(true);

    const taskData = {
      name: name.trim(),
      description: description.trim(),
      frequency,
      rewardPoints: parseInt(rewardPoints, 10) || 0,
      penaltyPoints: parseInt(penaltyPoints, 10) || 0,
    };

    const url = isEditing ? `${API_BASE_URL}/tasks/${existingTask.id}` : `${API_BASE_URL}/tasks`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocorreu um erro ao salvar a tarefa.');
      }

      // Se tudo correu bem, volta para a tela anterior (a lista)
      navigation.goBack();

    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={formStyles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={formStyles.scrollContainer}>
        <View style={formStyles.container}>
          <Text style={formStyles.label}>Nome da Tarefa <Text style={formStyles.required}>*</Text></Text>
          <TextInput style={formStyles.input} value={name} onChangeText={setName} />

          <Text style={formStyles.label}>Descrição</Text>
          <TextInput style={[formStyles.input, formStyles.textArea]} value={description} onChangeText={setDescription} multiline />

          <Text style={formStyles.label}>Frequência</Text>
          <View style={formStyles.pickerContainer}>
            <Picker selectedValue={frequency} onValueChange={(itemValue) => setFrequency(itemValue)}>
              <Picker.Item label="Diária" value="Diária" />
              <Picker.Item label="Dias Específicos" value="Dias Específicos" />
              <Picker.Item label="Única Vez" value="Única Vez" />
            </Picker>
          </View>

          <Text style={formStyles.label}>Pontos de Recompensa</Text>
          <TextInput style={formStyles.input} value={rewardPoints} onChangeText={setRewardPoints} keyboardType="numeric" />

          <Text style={formStyles.label}>Pontos de Penalidade</Text>
          <TextInput style={formStyles.input} value={penaltyPoints} onChangeText={setPenaltyPoints} keyboardType="numeric" />

          <TouchableOpacity style={formStyles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={formStyles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Adicionar Tarefa'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos para o formulário
const formStyles = StyleSheet.create({
    keyboardAvoidingView: { flex: 1 },
    scrollContainer: { flexGrow: 1, justifyContent: 'center' },
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    label: { fontSize: 16, color: '#495057', marginBottom: 8, fontWeight: '500' },
    required: { color: '#dc3545' },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ced4da', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 20, color: '#495057' },
    textArea: { height: 100, textAlignVertical: 'top' },
    pickerContainer: { borderWidth: 1, borderColor: '#ced4da', borderRadius: 8, marginBottom: 20 },
    button: { backgroundColor: '#6200ee', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

// Não é necessário exportar como default aqui, pois o import no App.js já faz isso.
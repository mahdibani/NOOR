import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Language } from '../types';
import { summarizeThread } from '../services/gemini';
import { COLORS } from '../constants';

interface PodChatProps {
  language: Language;
  onBack: () => void;
}

const PodChat: React.FC<PodChatProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sara',
      text: "Has anyone tried the new yoga studio in the Marina? I'm looking for a beginner class.",
      isMe: false,
      time: '10:42 AM',
    },
    {
      id: '2',
      sender: 'Amira',
      text: 'Yes! I went last week. The vetted instructor list is amazing, really felt safe. You should try the 6PM flow.',
      isMe: false,
      time: '10:45 AM',
    },
    {
      id: '3',
      sender: 'Me',
      text: "That sounds perfect. Let's organize a meetup for Saturday?",
      isMe: true,
      time: '10:48 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'Me',
      text: inputText,
      isMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const texts = messages.map((m) => `${m.sender}: ${m.text}`);
      const res = await summarizeThread(texts);
      setSummary(res);
    } catch (e) {
      console.error(e);
      setSummary('Unable to generate summary at this time.');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Dubai Tech Women</Text>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
            <Text style={styles.subtitle}>24 Members Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.summarizeButton} onPress={handleSummarize}>
          <Text style={styles.summarizeIcon}>✨</Text>
          <Text style={styles.summarizeText}>Summarize</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.isMe ? styles.messageContainerMe : styles.messageContainerOther,
            ]}
          >
            {!msg.isMe && <Text style={styles.senderName}>{msg.sender}</Text>}
            <View
              style={[
                styles.messageBubble,
                msg.isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
            <Text
              style={[styles.messageTime, msg.isMe && styles.messageTimeMe]}
            >
              {msg.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Safe-Chat enabled by Noor AI..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isSummarizing || !!summary}
        animationType="fade"
        transparent
        onRequestClose={() => setSummary(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Text style={styles.modalIcon}>✨</Text>
                <Text style={styles.modalTitle}>AI Thread Summary</Text>
              </View>
              <TouchableOpacity onPress={() => setSummary(null)}>
                <Text style={styles.closeIcon}>×</Text>
              </TouchableOpacity>
            </View>
            {isSummarizing ? (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner} />
                <Text style={styles.loadingText}>
                  Noor AI is reading the room...
                </Text>
              </View>
            ) : (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>{summary}</Text>
                <View style={styles.summaryFooter}>
                  <Text style={styles.summaryNote}>Visible only to you</Text>
                  <TouchableOpacity>
                    <Text style={styles.saveButton}>
                      Save to Wellness Hub →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: COLORS.textDark,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  verifiedIcon: {
    fontSize: 12,
    color: COLORS.teal,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4caf50',
    letterSpacing: 1,
  },
  summarizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  summarizeIcon: {
    fontSize: 14,
  },
  summarizeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  messageContainerMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageContainerOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  senderName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
    marginLeft: 8,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  messageBubbleMe: {
    backgroundColor: '#FBEBD6',
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 9,
    color: '#999',
    marginTop: 4,
    marginLeft: 8,
  },
  messageTimeMe: {
    marginRight: 8,
    marginLeft: 0,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#999',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    maxHeight: 80,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalIcon: {
    fontSize: 20,
    color: COLORS.gold,
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 1.5,
  },
  closeIcon: {
    fontSize: 32,
    color: '#999',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
  spinner: {
    width: 32,
    height: 32,
    borderWidth: 4,
    borderColor: COLORS.gold,
    borderTopColor: 'transparent',
    borderRadius: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    gap: 16,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryNote: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  saveButton: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.teal,
    letterSpacing: 1,
  },
});

export default PodChat;

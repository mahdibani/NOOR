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
  Image,
} from 'react-native';
import { Language } from '../types';
import { generateNoorResponse, checkHateSpeech } from '../services/gemini';

interface NoorAIChatProps {
  language: Language;
}

const NoorAIChat: React.FC<NoorAIChatProps> = ({ language }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Marhaba! I am Noor, your sanctuary companion. I am here to support you, listen, and offer wellness guidance. How are you feeling today?',
      time: '9:41 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const newMessage = {
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const isHarmful = await checkHateSpeech(userText);
      if (isHarmful) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: "Let's keep NOOR safe and kind. I am unable to process that message, but I am here to talk about your wellbeing and sanctuary goals.",
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } else {
        const history = messages.map((m) => ({
          role: m.role as 'user' | 'model',
          parts: [{ text: m.text }],
        }));
        const response = await generateNoorResponse(userText, history);
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: response || "I'm listening, please tell me more.",
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I'm having a little moment. Please try again in a bit!",
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { icon: '🌿', text: 'I need a wellness tip' },
    { icon: '🛡️', text: 'How to set boundaries?' },
    { icon: '☕', text: 'Suggest a local cafe' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarGradient}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/noor-ai/200/200' }}
              style={styles.avatar}
            />
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Noor AI</Text>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
            <Text style={styles.subtitle}>Online 24/7 • Secure</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.lockButton}>
          <Text style={styles.lockIcon}>🔒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            Today, {new Date().toLocaleDateString()}
          </Text>
        </View>

        {messages.map((m, idx) => (
          <View
            key={idx}
            style={[
              styles.messageRow,
              m.role === 'user' ? styles.messageRowUser : styles.messageRowModel,
            ]}
          >
            {m.role === 'model' && (
              <Image
                source={{ uri: 'https://picsum.photos/seed/noor-ai/100/100' }}
                style={styles.messageAvatar}
              />
            )}
            <View style={styles.messageContent}>
              <View
                style={[
                  styles.messageBubble,
                  m.role === 'user'
                    ? styles.messageBubbleUser
                    : styles.messageBubbleModel,
                ]}
              >
                <Text style={styles.messageText}>{m.text}</Text>
              </View>
              <Text
                style={[
                  styles.messageTime,
                  m.role === 'user' && styles.messageTimeUser,
                ]}
              >
                {m.time}
              </Text>
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBubble}>
              <View style={styles.loadingDot} />
              <View style={[styles.loadingDot, styles.loadingDot2]} />
              <View style={[styles.loadingDot, styles.loadingDot3]} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickPromptsContainer}
          contentContainerStyle={styles.quickPromptsContent}
        >
          {quickPrompts.map((p) => (
            <TouchableOpacity
              key={p.text}
              onPress={() => setInput(p.text)}
              style={styles.quickPrompt}
            >
              <Text style={styles.quickPromptIcon}>{p.icon}</Text>
              <Text style={styles.quickPromptText}>{p.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your thought here..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 2,
    backgroundColor: '#13ecdd',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    opacity: 0.8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2426',
  },
  verifiedIcon: {
    fontSize: 14,
    color: '#13ecdd',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
  },
  lockButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 18,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 16,
  },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  messageRowUser: {
    flexDirection: 'row-reverse',
  },
  messageRowModel: {
    flexDirection: 'row',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageContent: {
    maxWidth: '85%',
    gap: 4,
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
  messageBubbleUser: {
    backgroundColor: '#dae6e5',
    borderBottomRightRadius: 4,
  },
  messageBubbleModel: {
    backgroundColor: '#e0f7f6',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  messageText: {
    fontSize: 14,
    color: '#2D2426',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 9,
    color: '#999',
    marginLeft: 8,
  },
  messageTimeUser: {
    textAlign: 'right',
    marginRight: 8,
    marginLeft: 0,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  loadingBubble: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#13ecdd',
  },
  loadingDot2: {
    opacity: 0.6,
  },
  loadingDot3: {
    opacity: 0.3,
  },
  inputSection: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#F6F8F8',
  },
  quickPromptsContainer: {
    marginBottom: 16,
  },
  quickPromptsContent: {
    gap: 8,
  },
  quickPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickPromptIcon: {
    fontSize: 16,
  },
  quickPromptText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    color: '#2D2426',
    maxHeight: 80,
  },
  micButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 18,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#13ecdd',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#13ecdd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sendIcon: {
    fontSize: 20,
    color: '#0d3b38',
    fontWeight: 'bold',
  },
});

export default NoorAIChat;

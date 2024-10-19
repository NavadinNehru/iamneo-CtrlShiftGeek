import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getQuery } from '../../api/api';

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [marginBottom, setMarginBottom] = useState(0); // State to handle marginBottom adjustment
  const [user, setUser] = useState({
    _id: 1,
    name: 'User',
    avatar: 'https://img.freepik.com/premium-vector/3d-chat-bot-robot_685294-11.jpg', // User's profile image (can be a static URL or dynamic based on logged-in user)
  });

  // Listen for keyboard show/hide events and adjust marginBottom
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setMarginBottom(-60); // Adjust marginBottom when keyboard is shown
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setMarginBottom(0); // Reset marginBottom when keyboard is hidden
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to handle sending the message and receiving the chatbot's response
  const onSend = async (newMessages = []) => {
    // Add the user's message to the chat
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);
    await AsyncStorage.setItem('groupMessages', JSON.stringify(updatedMessages));

    // Send the message to the API and handle the chatbot's reply
    const userMessage = newMessages[0]?.text;
    const data = { query: userMessage };

    try {
      const response = await getQuery(data);
      if (response?.response) {
        // Append the chatbot's response to the chat
        const botMessage = {
          _id: Math.random().toString(),
          text: response.response, // API response
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'ChatBot',
            avatar: 'https://img.freepik.com/premium-vector/3d-chat-bot-robot_685294-11.jpg', // Chatbot's profile image
          },
        };
        const updatedMessagesWithBot = GiftedChat.append(updatedMessages, [botMessage]);
        setMessages(updatedMessagesWithBot);
        await AsyncStorage.setItem('groupMessages', JSON.stringify(updatedMessagesWithBot));
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem('groupMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    };

    loadMessages();
  }, []);

  // Explicitly render avatar for each user (user and chatbot)
  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: { width: 36, height: 36, borderRadius: 18 }, // Avatar size for left (bot)
          right: { width: 36, height: 36, borderRadius: 18 }, // Avatar size for right (user)
        }}
      />
    );
  };

  return (
    <View style={{ flexGrow: 1, marginBottom: marginBottom }}>
      <Text style={[{ fontSize: 22, color: 'black', fontWeight: '600', letterSpacing: 0.2, paddingLeft: 20, paddingTop: 10 }, styles.font]}>
        Chat <Text style={styles.blueText}>Bot</Text>
      </Text>
      <GiftedChat
        textInputProps={{
          style: { color: 'black', width: '80%' },
        }}
        messages={messages}
        onSend={onSend}
        user={user} // Set user with profile image
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: 'lightgray' },
              right: { backgroundColor: '#0D69D7' },
            }}
          />
        )}
        renderAvatar={renderAvatar} // Explicitly render avatar
      />
    </View>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  blueText: {
    color: '#0D69D7',
    fontSize: 22,
  },
  font: {
    fontFamily: 'Helvetica Neue',
  },
  head: {
    color: 'black',
    fontSize: 28,
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: '600',
    fontFamily: 'Helvetica Neue',
  },
});

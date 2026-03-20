import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, User, Phone, MessageSquare } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

const CONTACTS = ['Mom', 'John', 'Lisa', 'Robert', 'City Control Room', 'Nearest Hospital'];

interface ContactsScreenProps {
  navigation: any;
}

export default function ContactsScreen({ navigation }: ContactsScreenProps) {
  const [query, setQuery] = useState('');

  const filtered = CONTACTS.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchBar}>
          <Search size={18} color={COLORS.textMuted} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.listCard}>
          {filtered.map((name, idx) => (
            <View
              key={name}
              style={[
                styles.contactRow,
                idx !== filtered.length - 1 && styles.contactBorder,
              ]}
            >
              <View style={styles.contactLeft}>
                <View style={styles.contactIcon}>
                  {idx < 4 ? (
                    <User size={14} color={COLORS.primary} />
                  ) : (
                    <Phone size={14} color={COLORS.safe} />
                  )}
                </View>
                <Text style={styles.contactName}>{name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChatView', { contact: name })}
                activeOpacity={0.7}
              >
                <MessageSquare size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 16, paddingBottom: 40 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: 14 },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  contactBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contactLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  contactIcon: {
    backgroundColor: COLORS.surfaceDeep,
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
});

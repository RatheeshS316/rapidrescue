import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

interface AlertCardProps {
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  time: string;
  onPress?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  iconColor,
  icon,
  title,
  subtitle,
  time,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={styles.card}>
    <View style={styles.left}>
      <View style={[styles.iconBg, { backgroundColor: iconColor }]}>
        {icon}
      </View>
      <View>
        <Text style={styles.title}>
          {title}
          {subtitle ? <Text style={styles.subtitle}> {subtitle}</Text> : null}
        </Text>
      </View>
    </View>
    <Text style={styles.time}>{time}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBg: {
    borderRadius: 50,
    padding: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  time: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 8,
  },
});

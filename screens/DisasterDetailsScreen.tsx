import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {
  Waves,
  Wind,
  Activity,
  Droplets,
  CloudRain,
  ArrowUp,
  ShieldAlert,
  Ban,
  Lock,
  MapPin,
  AlertTriangle,
  ShieldPlus,
  Radio,
  Tent
} from 'lucide-react-native';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');

const DISASTER_DETAILS: any = {
  Flood: {
    title: 'Flood Alert',
    icon: Waves,
    iconColor: '#00B4D8',
    iconBg: 'rgba(0,180,216,0.2)',
    bgImage: 'https://images.unsplash.com/photo-1428591501131-0112411e3b6a?auto=format&fit=crop&q=80&w=400',
    levelText: '65% - HIGH',
    levelColor: '#ef4444',
    statusTitle: 'Current Status',
    statusIcon: CloudRain,
    statusList: [
      { icon: ArrowUp, label: 'Water Level:', val: 'Rising rapidly', valColor: '#f87171' },
      { icon: Droplets, label: 'Rainfall:', val: 'Heavy', valColor: '#f87171' },
      { icon: ShieldAlert, label: 'Area Risk:', val: 'HIGH', isPill: true, pillColor: '#f97316' }
    ],
    chartTitle: 'Rainfall & Water Level',
    chartLineColor: '#f59e0b',
    chartLabelsY: ['40mm', '20mm', '0mm'],
    chartLegend1: { color: '#3b82f6', label: 'Rainfall' },
    chartLegend2: { color: '#f59e0b', label: 'Water Level' },
    riskAreas: [
      { area: 'Your Area', level: 'HIGH', color: '#ef4444' },
      { area: 'Riverdale', level: 'MODERATE', color: '#f59e0b' },
      { area: 'Lakeside', level: 'LOW', color: '#10b981' }
    ],
    warnings: [
      { text: 'Heavy rainfall expected in next 6 hours', iconColor: '#fb923c', borderColor: 'rgba(249,115,22,0.3)' },
      { text: 'River overflow risk detected', iconColor: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }
    ],
    preventions: [
      { icon: ArrowUp, text: 'Move to higher ground', iconColor: '#facc15', bg: 'rgba(234,179,8,0.2)' },
      { icon: Ban, text: 'Avoid low-lying areas', iconColor: '#f87171', bg: 'rgba(239,68,68,0.2)' },
      { icon: Lock, text: 'Keep emergency kit ready', iconColor: '#00B4D8', bg: 'rgba(0,180,216,0.2)' }
    ]
  },
  Cyclone: {
    title: 'Cyclone Alert',
    icon: Wind,
    iconColor: '#93c5fd',
    iconBg: 'rgba(147,197,253,0.2)',
    bgImage: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?auto=format&fit=crop&q=80&w=400',
    levelText: '55% - ELEVATED',
    levelColor: '#3b82f6',
    statusTitle: 'Current Status',
    statusIcon: Wind,
    statusList: [
      { icon: Wind, label: 'Wind Speed:', val: '85 km/h', valColor: '#fb923c' },
      { icon: Activity, label: 'Pressure:', val: '990 hPa', valColor: '#f87171' },
      { icon: ShieldAlert, label: 'Area Risk:', val: 'ELEVATED', isPill: true, pillColor: '#3b82f6' }
    ],
    chartTitle: 'Wind Speed & Gusts',
    chartLineColor: '#3b82f6',
    chartLabelsY: ['120kmh', '60kmh', '0kmh'],
    chartLegend1: { color: '#93c5fd', label: 'Wind Speed' },
    chartLegend2: { color: '#3b82f6', label: 'Gusts' },
    riskAreas: [
      { area: 'Coastal Belt', level: 'HIGH', color: '#ef4444' },
      { area: 'Your Area', level: 'ELEVATED', color: '#3b82f6' },
      { area: 'Inland City', level: 'MODERATE', color: '#f59e0b' }
    ],
    warnings: [
      { text: 'Strong winds expected by evening', iconColor: '#fb923c', borderColor: 'rgba(249,115,22,0.3)' },
      { text: 'Potential power outages in coastal areas', iconColor: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }
    ],
    preventions: [
      { icon: Lock, text: 'Secure loose outdoor items', iconColor: '#facc15', bg: 'rgba(234,179,8,0.2)' },
      { icon: Ban, text: 'Stay indoors during storm', iconColor: '#f87171', bg: 'rgba(239,68,68,0.2)' },
      { icon: ShieldPlus, text: 'Charge all devices fully', iconColor: '#00B4D8', bg: 'rgba(0,180,216,0.2)' }
    ]
  },
  Earthquake: {
    title: 'Earthquake Alert',
    icon: Activity,
    iconColor: '#00B4D8',
    iconBg: 'rgba(0,180,216,0.2)',
    bgImage: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=400',
    levelText: '40% - MODERATE',
    levelColor: '#f59e0b',
    statusTitle: 'Current Status',
    statusIcon: Activity,
    statusList: [
      { icon: Activity, label: 'Magnitude:', val: '4.2 (Recent)', valColor: '#fb923c' },
      { icon: MapPin, label: 'Epicenter:', val: '12km North', valColor: '#facc15' },
      { icon: ShieldAlert, label: 'Area Risk:', val: 'MODERATE', isPill: true, pillColor: '#f59e0b' }
    ],
    chartTitle: 'Seismic Activity',
    chartLineColor: '#ef4444',
    chartLabelsY: ['6.0M', '3.0M', '0M'],
    chartLegend1: { color: '#fb923c', label: 'Magnitude' },
    chartLegend2: { color: '#ef4444', label: 'Tremors' },
    riskAreas: [
      { area: 'Fault Line A', level: 'HIGH', color: '#ef4444' },
      { area: 'Your Area', level: 'MODERATE', color: '#f59e0b' },
      { area: 'Downtown', level: 'LOW', color: '#10b981' }
    ],
    warnings: [
      { text: 'Aftershocks possible in next 24 hours', iconColor: '#fb923c', borderColor: 'rgba(249,115,22,0.3)' },
      { text: 'Minor structural damage reported locally', iconColor: '#facc15', borderColor: 'rgba(234,179,8,0.3)' }
    ],
    preventions: [
      { icon: ArrowUp, text: 'Drop, Cover, and Hold On', iconColor: '#f87171', bg: 'rgba(239,68,68,0.2)' },
      { icon: Ban, text: 'Stay away from glass/windows', iconColor: '#facc15', bg: 'rgba(234,179,8,0.2)' },
      { icon: Tent, text: 'Move to open areas if outside', iconColor: '#4ade80', bg: 'rgba(74,222,128,0.2)' }
    ]
  },
  Landslide: {
    title: 'Landslide Warning',
    icon: AlertTriangle,
    iconColor: '#a78bfa',
    iconBg: 'rgba(139,92,246,0.2)',
    bgImage: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=400',
    levelText: '55% - ELEVATED',
    levelColor: '#8b5cf6',
    statusTitle: 'Current Status',
    statusIcon: ShieldAlert,
    statusList: [
      { icon: Droplets, label: 'Soil Moisture:', val: 'Saturated', valColor: '#fb923c' },
      { icon: Activity, label: 'Slope Stability:', val: 'Vulnerable', valColor: '#f87171' },
      { icon: ShieldAlert, label: 'Area Risk:', val: 'ELEVATED', isPill: true, pillColor: '#8b5cf6' }
    ],
    chartTitle: 'Soil Moisture Trends',
    chartLineColor: '#8b5cf6',
    chartLabelsY: ['High', 'Med', 'Low'],
    chartLegend1: { color: '#a78bfa', label: 'Moisture' },
    chartLegend2: { color: '#8b5cf6', label: 'Rainfall' },
    riskAreas: [
      { area: 'Hillside Drive', level: 'HIGH', color: '#ef4444' },
      { area: 'Your Area', level: 'ELEVATED', color: '#8b5cf6' },
      { area: 'Valley Base', level: 'MODERATE', color: '#f59e0b' }
    ],
    warnings: [
      { text: 'Continuous rain increasing risk', iconColor: '#fb923c', borderColor: 'rgba(249,115,22,0.3)' },
      { text: 'Avoid steep slopes and hillside roads', iconColor: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }
    ],
    preventions: [
      { icon: ArrowUp, text: 'Evacuate if in path of flow', iconColor: '#facc15', bg: 'rgba(234,179,8,0.2)' },
      { icon: Ban, text: 'Do not cross flowing water', iconColor: '#f87171', bg: 'rgba(239,68,68,0.2)' },
      { icon: ShieldPlus, text: 'Stay alert for rumbling sounds', iconColor: '#00B4D8', bg: 'rgba(0,180,216,0.2)' }
    ]
  },
  Tsunami: {
    title: 'Tsunami Alert',
    icon: Droplets,
    iconColor: '#93c5fd',
    iconBg: 'rgba(147,197,253,0.2)',
    bgImage: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?auto=format&fit=crop&q=80&w=400',
    levelText: '30% - STABLE',
    levelColor: '#3b82f6',
    statusTitle: 'Current Status',
    statusIcon: Waves,
    statusList: [
      { icon: Waves, label: 'Wave Height:', val: 'Normal (0.5m)', valColor: '#4ade80' },
      { icon: Activity, label: 'Tide Level:', val: 'Receding', valColor: '#93c5fd' },
      { icon: ShieldAlert, label: 'Area Risk:', val: 'STABLE', isPill: true, pillColor: '#3b82f6' }
    ],
    chartTitle: 'Wave Height & Tide',
    chartLineColor: '#06b6d4',
    chartLabelsY: ['3m', '1m', '0m'],
    chartLegend1: { color: '#60a5fa', label: 'Wave Height' },
    chartLegend2: { color: '#06b6d4', label: 'Tide Level' },
    riskAreas: [
      { area: 'Coastal Belt', level: 'MODERATE', color: '#f59e0b' },
      { area: 'Your Area', level: 'STABLE', color: '#3b82f6' },
      { area: 'Highlands', level: 'LOW', color: '#10b981' }
    ],
    warnings: [
      { text: 'Sea level currently stable', iconColor: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' },
      { text: 'Avoid beaches during high tide alerts', iconColor: '#fb923c', borderColor: 'rgba(249,115,22,0.3)' }
    ],
    preventions: [
      { icon: ArrowUp, text: 'Move inland if sirens sound', iconColor: '#fb923c', bg: 'rgba(249,115,22,0.2)' },
      { icon: Ban, text: 'Do not go to the shore to watch', iconColor: '#f87171', bg: 'rgba(239,68,68,0.2)' },
      { icon: Radio, text: 'Listen to local authorities', iconColor: '#00B4D8', bg: 'rgba(0,180,216,0.2)' }
    ]
  }
};

export default function DisasterDetailsScreen({ route }: any) {
  const { disasterName } = route.params || { disasterName: 'Flood' };
  
  // Default to Flood if not found
  const data = DISASTER_DETAILS[disasterName] || DISASTER_DETAILS['Flood'];
  const IconComponent = data.icon;
  const StatusIconComponent = data.statusIcon;

  const chartBars = [25, 40, 65, 55, 80, 45, 30, 50, 75, 60, 85, 55];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: data.bgImage }} 
        style={styles.bgImage}
        imageStyle={{ opacity: 0.15 }}
      >
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
          
          {/* HEADER CARD */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: data.iconBg }]}>
                  <IconComponent size={24} color={data.iconColor} />
                </View>
                <Text style={styles.title}>{data.title}</Text>
              </View>
              <View style={[styles.pill, { backgroundColor: data.levelColor }]}>
                <Text style={styles.pillText}>{data.levelText}</Text>
              </View>
            </View>
          </View>

          {/* CURRENT STATUS */}
          <View style={styles.card}>
            <View style={[styles.row, { marginBottom: 12 }]}>
              <StatusIconComponent size={18} color={data.iconColor} />
              <Text style={[styles.cardTitle, { color: data.iconColor }]}>{data.statusTitle}</Text>
            </View>
            
            <View style={{ gap: 12 }}>
              {data.statusList.map((stat: any, idx: number) => {
                const StatIcon = stat.icon;
                return (
                  <View key={idx} style={styles.rowBetween}>
                    <View style={styles.row}>
                      <StatIcon size={16} color={stat.valColor} />
                      <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                    {stat.isPill ? (
                      <View style={[styles.pillSmall, { backgroundColor: stat.pillColor }]}>
                        <Text style={styles.pillTextSmall}>{stat.val}</Text>
                      </View>
                    ) : (
                      <Text style={[styles.statValue, { color: stat.valColor }]}>{stat.val}</Text>
                    )}
                  </View>
                );
              })}
            </View>
            <Text style={styles.updateText}>Last updated: 5 mins ago</Text>
          </View>

          {/* CHART AREA */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{data.chartTitle}</Text>
              <View style={styles.tabsRow}>
                <View style={styles.tabActive}><Text style={styles.tabActiveText}>Past 24h</Text></View>
                <View style={styles.tabInactive}><Text style={styles.tabInactiveText}>Past 7d</Text></View>
              </View>
            </View>

            <View style={styles.chartContainer}>
              <View style={styles.yAxis}>
                {data.chartLabelsY.map((l: string, i: number) => <Text key={i} style={styles.axisText}>{l}</Text>)}
              </View>
              <View style={styles.barsContainer}>
                {chartBars.map((h, i) => (
                  <View key={i} style={[styles.bar, { height: `${h}%`, backgroundColor: data.chartLegend1.color }]} />
                ))}
              </View>
            </View>
            
            <View style={[styles.rowBetween, { marginTop: 8, paddingHorizontal: 4 }]}>
              <Text style={styles.axisText}>9 AM</Text>
              <Text style={styles.axisText}>12 PM</Text>
              <Text style={styles.axisText}>3 PM</Text>
              <Text style={styles.axisText}>6 PM</Text>
              <Text style={styles.axisText}>9 PM</Text>
              <Text style={styles.axisText}>Now</Text>
            </View>

            <View style={[styles.row, { justifyContent: 'center', marginTop: 16, gap: 20 }]}>
              <View style={styles.row}>
                <View style={[styles.legendBox, { backgroundColor: data.chartLegend1.color }]} />
                <Text style={styles.legendText}>{data.chartLegend1.label}</Text>
              </View>
              <View style={styles.row}>
                <View style={[styles.legendLine, { backgroundColor: data.chartLineColor }]} />
                <Text style={styles.legendText}>{data.chartLegend2.label}</Text>
              </View>
            </View>
          </View>

          {/* RISK ANALYSIS */}
          <View style={styles.card}>
            <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Risk Analysis</Text>
            <View style={{ gap: 10 }}>
              {data.riskAreas.map((risk: any, idx: number) => (
                <View key={idx} style={styles.rowBetween}>
                  <View style={styles.row}>
                    <MapPin size={16} color={data.iconColor} />
                    <Text style={styles.riskAreaText}>{risk.area}</Text>
                  </View>
                  <View style={[styles.pillSmall, { backgroundColor: risk.color }]}>
                    <Text style={styles.pillTextSmall}>{risk.level}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* WARNING ALERTS */}
          <View style={styles.card}>
            <View style={[styles.row, { marginBottom: 12 }]}>
              <AlertTriangle size={18} color="#fb923c" />
              <Text style={styles.cardTitle}>Warning Alerts</Text>
            </View>
            <View style={{ gap: 10 }}>
              {data.warnings.map((warning: any, idx: number) => (
                <View key={idx} style={[styles.warningBox, { borderColor: warning.borderColor }]}>
                  <AlertTriangle size={16} color={warning.iconColor} style={{ marginTop: 2, marginRight: 8 }} />
                  <Text style={styles.warningText}>{warning.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* PREVENTIONS */}
          <View style={[styles.card, { marginBottom: 30 }]}>
            <View style={[styles.row, { marginBottom: 12 }]}>
              <ShieldPlus size={18} color="#4ade80" />
              <Text style={styles.cardTitle}>Preventive Actions</Text>
            </View>
            <View style={{ gap: 12 }}>
              {data.preventions.map((prev: any, idx: number) => {
                const PrevIcon = prev.icon;
                return (
                  <View key={idx} style={styles.row}>
                    <View style={[styles.prevIconBg, { backgroundColor: prev.bg }]}>
                      <PrevIcon size={16} color={prev.iconColor || '#fff'} />
                    </View>
                    <Text style={styles.prevText}>{prev.text}</Text>
                  </View>
                );
              })}
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  bgImage: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 16, gap: 12 },
  card: {
    backgroundColor: 'rgba(0, 69, 94, 0.9)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBox: { padding: 8, borderRadius: 50 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#F0F9FF' },
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 50 },
  pillText: { fontSize: 11, fontWeight: '900', color: '#fff', letterSpacing: 0.5 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#F0F9FF' },
  statLabel: { fontSize: 13, color: 'rgba(240, 249, 255, 0.7)' },
  statValue: { fontSize: 14, fontWeight: '600' },
  pillSmall: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  pillTextSmall: { fontSize: 10, fontWeight: '800', color: '#fff' },
  updateText: { fontSize: 10, color: 'rgba(240, 249, 255, 0.4)', marginTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 8 },
  tabsRow: { flexDirection: 'row', backgroundColor: '#003145', borderRadius: 8, padding: 2 },
  tabActive: { backgroundColor: '#00B4D8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tabActiveText: { color: '#001A24', fontWeight: 'bold', fontSize: 10 },
  tabInactive: { paddingHorizontal: 8, paddingVertical: 4 },
  tabInactiveText: { color: 'rgba(240, 249, 255, 0.5)', fontWeight: '600', fontSize: 10 },
  chartContainer: { height: 120, flexDirection: 'row', marginTop: 16 },
  yAxis: { justifyContent: 'space-between', paddingRight: 8 },
  axisText: { fontSize: 9, color: 'rgba(240, 249, 255, 0.5)', fontWeight: '500' },
  barsContainer: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  bar: { width: 12, borderTopLeftRadius: 2, borderTopRightRadius: 2, opacity: 0.9 },
  legendBox: { width: 10, height: 10, borderRadius: 2 },
  legendLine: { width: 14, height: 3, borderRadius: 1 },
  legendText: { fontSize: 11, color: 'rgba(240, 249, 255, 0.7)', fontWeight: '600' },
  riskAreaText: { fontSize: 14, fontWeight: '500', color: 'rgba(240, 249, 255, 0.9)' },
  warningBox: { flexDirection: 'row', backgroundColor: 'rgba(0, 26, 36, 0.3)', padding: 12, borderRadius: 10, borderWidth: 1 },
  warningText: { flex: 1, fontSize: 13, color: 'rgba(240, 249, 255, 0.9)', lineHeight: 18 },
  prevIconBg: { padding: 6, borderRadius: 8 },
  prevText: { fontSize: 14, color: 'rgba(240, 249, 255, 0.9)', fontWeight: '500' }
});

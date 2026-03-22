import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ImageBackground, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

const SignalWave = ({ delay, d }: { delay: number; d: string }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          delay: delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [opacity, delay]);

  const AnimatedPath: any = Animated.createAnimatedComponent(Path);

  return (
    <AnimatedPath
      d={d}
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      style={{ opacity } as any}
    />
  );
};

export default function LoadingScreen() {
  const [dots, setDots] = useState('');
  
  // Float Animation
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Pulse Animation for Beacon
  const beaconScale = useRef(new Animated.Value(1)).current;
  const beaconOpacity = useRef(new Animated.Value(0.75)).current;

  useEffect(() => {
    // Dots interval
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    // Floating Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -20,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        })
      ])
    ).start();

    // Ping Animation for Beacon
    Animated.loop(
      Animated.parallel([
        Animated.timing(beaconScale, {
          toValue: 2.5,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(beaconOpacity, {
          toValue: 0,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    return () => clearInterval(interval);
  }, [floatAnim, beaconScale, beaconOpacity]);

  const AnimatedCircle: any = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
      >
        {/* Gradient Overlay using Views since react-native-linear-gradient might not be installed */}
        <View style={styles.gradientOverlayTop} />
        <View style={styles.gradientOverlayBottom} />

        <View style={styles.spacer} />

        <Animated.View style={[styles.brandContainer, { transform: [{ translateY: floatAnim }] }]}>
          <View style={styles.logoContainer}>
            <Svg width="140" height="140" viewBox="0 0 100 100" fill="none">
              <SignalWave delay={600} d="M20 35C20 35 35 20 50 20C65 20 80 35 80 35" />
              <SignalWave delay={300} d="M30 45C30 45 40 35 50 35C60 35 70 45 70 45" />
              <SignalWave delay={0} d="M40 52C40 52 45 47 50 47C55 47 60 52 60 52" />
              
              <Circle cx="50" cy="58" r="6" fill="#ef4444" />
              
              {/* Animated pulsating halo circle */}
              <AnimatedCircle 
                cx="50" 
                cy="58" 
                r="6" 
                fill="#ef4444"
                origin="50, 58"
                style={{
                  opacity: beaconOpacity,
                  transform: [
                    { scale: beaconScale }
                  ]
                } as any}
              />
              
              <Path d="M50 58L35 90H65L50 58Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
              <Line x1="42" y1="74" x2="58" y2="74" stroke="white" strokeWidth="2" />
              <Line x1="38" y1="82" x2="62" y2="82" stroke="white" strokeWidth="2" />
            </Svg>
          </View>

          <Text style={styles.title}>RescueMesh</Text>
          <Text style={styles.subtitle}>Connecting people when networks fail</Text>
        </Animated.View>

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>LOADING{dots}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0a0c10',
    zIndex: 9999,
    elevation: 9999,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradientOverlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,12,16,0.3)',
    height: '50%',
  },
  gradientOverlayBottom: {
    ...StyleSheet.absoluteFillObject,
    top: '50%',
    backgroundColor: 'rgba(10,12,16,0.96)',
    height: '50%',
  },
  spacer: {
    height: 48,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  logoContainer: {
    marginBottom: 32,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#d1d5db',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 280,
    opacity: 0.9,
  },
  loadingContainer: {
    marginBottom: 80,
    zIndex: 20,
    width: 120, // Enough width to fit dots
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  loadingText: {
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 8,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'left',
  },
});

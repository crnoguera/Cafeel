import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { theme } from '@/constants/theme';
import { Animated, Pressable, Text, useColorScheme, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

type Props = {
  id: string;
  title: string;
  done: boolean;
  tag?: string;
  progress?: number;
  reminderAt?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
};

export default function TaskItem(p: Props) {
  const colors = theme(useColorScheme());

  const Left = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    const scale = dragX.interpolate({ inputRange: [0, 80], outputRange: [0.8, 1], extrapolate: 'clamp' });
    return (
      <View style={{ justifyContent: 'center', backgroundColor: colors.success, paddingHorizontal: 16, borderRadius: 12, marginVertical: 6 }}>
        <Animated.Text style={{ color: 'white', fontWeight: '800', transform: [{ scale }] }}>Marcar</Animated.Text>
      </View>
    );
  };

  const Right = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    const scale = dragX.interpolate({ inputRange: [-80, 0], outputRange: [1, 0.8], extrapolate: 'clamp' });
    return (
      <View style={{ justifyContent: 'center', alignItems: 'flex-end', backgroundColor: colors.danger, paddingHorizontal: 16, borderRadius: 12, marginVertical: 6 }}>
        <Animated.Text style={{ color: 'white', fontWeight: '800', transform: [{ scale }] }}>Borrar</Animated.Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={Left}
      renderRightActions={Right}
      onSwipeableLeftOpen={() => p.onToggle(p.id)}
      onSwipeableRightOpen={() => p.onDelete(p.id)}
      overshootFriction={8}
    >
      <Pressable onPress={() => p.onOpen(p.id)} style={{ marginBottom: 12 }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: p.done ? colors.subtext : colors.text, fontWeight: '700', textDecorationLine: p.done ? 'line-through' : 'none' }}>
              {p.title}
            </Text>
            <Text style={{ color: p.done ? colors.success : colors.primary }}>{p.done ? 'Hecha' : 'Pendiente'}</Text>
          </View>
          <ProgressBar value={p.progress ?? (p.done ? 1 : 0)} />
          <View style={{ marginTop: 6, gap: 4 }}>
            {!!p.tag && <Text style={{ color: colors.subtext }}>{p.tag}</Text>}
            {!!p.reminderAt && <Text style={{ color: colors.subtext }}>🔔 {new Date(p.reminderAt).toLocaleString()}</Text>}
          </View>
        </Card>
      </Pressable>
    </Swipeable>
  );
}

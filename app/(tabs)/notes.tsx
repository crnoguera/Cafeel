import Card from '@/components/Card';
import FAB from '@/components/FAB';
import { theme } from '@/constants/theme';
import { useStore } from '@/lib/store';
import { Link } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

function SwipeableRow({
  children,
  onConfirmDelete,
}: {
  children: React.ReactNode;
  onConfirmDelete: () => void;
}) {
  const swipeRef = useRef<Swipeable>(null);

  const handleDeletePress = () => {
    swipeRef.current?.close();
    onConfirmDelete();
  };

  const renderRightActions = () => (
    <View style={{ width: 96, height: '100%', justifyContent: 'center' }}>
      <RectButton
        onPress={handleDeletePress}
        style={{
          flex: 1,
          backgroundColor: '#ff3b30',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '800' }}>Eliminar</Text>
      </RectButton>
    </View>
  );

  return (
    <Swipeable ref={swipeRef} renderRightActions={renderRightActions} rightThreshold={40}>
      {children}
    </Swipeable>
  );
}

export default function Notes() {
  const colors = theme(useColorScheme());
  const { notes, removeNote } = useStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return notes.filter(
      (n: any) =>
        (n.title ?? '').toLowerCase().includes(q) ||
        (n.body ?? '').toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 }}>
          Notas
        </Text>

        <TextInput
          placeholder="Buscar en el título o contenido"
          onChangeText={setQuery}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            color: colors.text,
            marginBottom: 12,
          }}
        />

        {filtered.map((n: any) => (
          <SwipeableRow
            key={n.id}
            onConfirmDelete={() =>
              Alert.alert('Eliminar', '¿Borrar esta nota?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Borrar', style: 'destructive', onPress: () => removeNote(n.id) },
              ])
            }
          >
            <Link href={`/note/${n.id}`} asChild>
              <Card style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: '700', color: colors.text, marginBottom: 4 }}>
                  {n.title || 'Sin título'}
                </Text>
                {!!n.tag && (
                  <Text style={{ color: colors.primary, marginBottom: 4 }}>#{n.tag}</Text>
                )}
                <Text numberOfLines={3} style={{ color: colors.subtext }}>
                  {n.body}
                </Text>
              </Card>
            </Link>
          </SwipeableRow>
        ))}

        {filtered.length === 0 && (
          <Text style={{ color: colors.subtext }}>No hay notas que coincidan.</Text>
        )}
      </ScrollView>

      <Link href="/note/new" asChild>
        <FAB onPress={() => {}} />
      </Link>
    </View>
  );
}

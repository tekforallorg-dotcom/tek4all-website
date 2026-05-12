/**
 * Gallery Screen — outputs from flights with shot labels.
 *
 * Empty state shows encouraging CTA to take first flight.
 * Future: photo/video grid, shot labels, share buttons.
 */
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/components/SafeScreen';
import {
  Colors,
  Typography,
  Surfaces,
  Shadow,
  Spacing,
  Radii,
  FontFamily,
} from '@/theme';

export default function GalleryScreen() {
  return (
    <SafeScreen>
      {/* ── Header ────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={Typography.label}>YOUR SHOTS</Text>
        <Text style={[Typography.h1, styles.title]}>Gallery</Text>
      </View>

      {/* ── Empty State ───────────────────────────────── */}
      <View style={styles.emptyContainer}>
        <View style={[Surfaces.panel, Shadow.sm, styles.emptyCard]}>
          <View style={styles.emptyIconWrap}>
            <Ionicons
              name="images-outline"
              size={48}
              color={Colors.textTertiary}
            />
          </View>
          <Text style={[Typography.h2, styles.emptyTitle]}>
            No shots yet
          </Text>
          <Text style={[Typography.bodySmall, styles.emptyBody]}>
            Your photos and videos will appear here after your first flight.
            Every shot is labeled with the command that created it.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && styles.ctaButtonPressed,
            ]}
            accessibilityLabel="Take your first flight"
            accessibilityRole="button"
          >
            <Ionicons
              name="paper-plane-outline"
              size={18}
              color={Colors.obsidian}
            />
            <Text style={styles.ctaText}>Take Your First Flight</Text>
          </Pressable>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  title: {
    marginTop: Spacing.xs,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Spacing.hero,
  },
  emptyCard: {
    padding: Spacing.xxxl,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    color: Colors.textSecondary,
  },
  emptyBody: {
    textAlign: 'center',
    lineHeight: 22,
    color: Colors.textTertiary,
    paddingHorizontal: Spacing.lg,
  },
  ctaButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.electricSky,
    borderRadius: Radii.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ctaButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  ctaText: {
    fontFamily: FontFamily.headingSemiBold,
    fontSize: 14,
    color: Colors.obsidian,
  },
});

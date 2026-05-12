/**
 * History Screen — past flights, saved prompts, reusable shot patterns.
 *
 * Empty state shows encouraging message + CTA.
 * Future: flight timeline, command history, saved shots, flight recaps,
 * "revived after X days" emotional stat.
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

export default function HistoryScreen() {
  return (
    <SafeScreen>
      {/* ── Header ────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={Typography.label}>FLIGHT LOG</Text>
        <Text style={[Typography.h1, styles.title]}>History</Text>
      </View>

      {/* ── Empty State ───────────────────────────────── */}
      <View style={styles.emptyContainer}>
        <View style={[Surfaces.panel, Shadow.sm, styles.emptyCard]}>
          <View style={styles.emptyIconWrap}>
            <Ionicons
              name="time-outline"
              size={48}
              color={Colors.textTertiary}
            />
          </View>
          <Text style={[Typography.h2, styles.emptyTitle]}>
            No flights yet
          </Text>
          <Text style={[Typography.bodySmall, styles.emptyBody]}>
            Your flight history, saved commands, and shot recipes will appear
            here. Every flight tells a story.
          </Text>

          {/* ── Saved Shots Preview (locked) ────────────── */}
          <View style={[Surfaces.chassis, styles.savedShotsPreview]}>
            <Text style={[Typography.label, styles.savedShotsLabel]}>
              SAVED SHOTS
            </Text>
            <Text style={[Typography.bodySmall, styles.savedShotsHint]}>
              Successful commands become reusable shot recipes
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && styles.ctaButtonPressed,
            ]}
            accessibilityLabel="Start your first flight"
            accessibilityRole="button"
          >
            <Ionicons
              name="paper-plane-outline"
              size={18}
              color={Colors.obsidian}
            />
            <Text style={styles.ctaText}>Start Flying</Text>
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

  // Saved shots preview card
  savedShotsPreview: {
    width: '100%',
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  savedShotsLabel: {
    color: Colors.textTertiary,
  },
  savedShotsHint: {
    textAlign: 'center',
    color: Colors.textTertiary,
  },

  // CTA
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

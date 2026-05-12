/**
 * Home Screen — the emotional dock.
 *
 * Shows: drone status → prompt input → quick shot cards.
 * This is where the magic starts: "Talk to your drone. Get the shot."
 */
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
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

// ─── Quick Shot presets (will become data-driven later) ──────────
const QUICK_SHOTS = [
  { id: 'orbit', label: 'Orbit Me', icon: 'sync-outline' as const },
  { id: 'reveal', label: 'Rise & Reveal', icon: 'arrow-up-outline' as const },
  { id: 'selfie', label: 'Selfie', icon: 'camera-outline' as const },
  { id: 'circle', label: 'Slow Circle', icon: 'refresh-outline' as const },
  { id: 'pullback', label: 'Pull Back', icon: 'return-down-back-outline' as const },
] as const;

export default function HomeScreen() {
  return (
    <SafeScreen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={Typography.label}>ZEROEFFORT</Text>
          <Text style={[Typography.display, styles.title]}>Ready to Fly</Text>
        </View>

        {/* ── Drone Status Module ────────────────────────── */}
        <View style={[Surfaces.panel, Shadow.sm, styles.statusCard]}>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={[Typography.h3, styles.statusText]}>
              No drone connected
            </Text>
          </View>
          <View style={styles.hudRow}>
            <HudTile label="BAT" value="--%" />
            <HudTile label="ALT" value="--m" />
            <HudTile label="GPS" value="--" />
            <HudTile label="SIG" value="--" />
          </View>
        </View>

        {/* ── Prompt Input (Hero) ────────────────────────── */}
        <View style={[Surfaces.glass, Shadow.md, styles.promptContainer]}>
          <Text style={styles.promptPlaceholder}>
            Tell your drone what to do...
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.micButton,
              pressed && styles.micButtonPressed,
            ]}
            accessibilityLabel="Voice command"
            accessibilityRole="button"
          >
            <View style={[styles.micInner, Shadow.glow]}>
              <Ionicons
                name="mic-outline"
                size={28}
                color={Colors.electricSky}
              />
            </View>
          </Pressable>
        </View>

        {/* ── Quick Shots ────────────────────────────────── */}
        <View style={styles.quickShotsSection}>
          <Text style={[Typography.label, styles.sectionLabel]}>
            QUICK SHOTS
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickShotsList}
          >
            {QUICK_SHOTS.map((shot) => (
              <Pressable
                key={shot.id}
                style={({ pressed }) => [
                  Surfaces.chassis,
                  styles.quickShotCard,
                  pressed && Surfaces.active,
                ]}
                accessibilityLabel={`Quick shot: ${shot.label}`}
                accessibilityRole="button"
              >
                <Ionicons
                  name={shot.icon}
                  size={24}
                  color={Colors.textSecondary}
                />
                <Text style={styles.quickShotLabel}>{shot.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* ── Connection CTA ─────────────────────────────── */}
        <Pressable
          style={({ pressed }) => [
            styles.connectButton,
            pressed && styles.connectButtonPressed,
          ]}
          accessibilityLabel="Connect your drone"
          accessibilityRole="button"
        >
          <Ionicons
            name="wifi-outline"
            size={20}
            color={Colors.obsidian}
          />
          <Text style={styles.connectButtonText}>Connect Drone</Text>
        </Pressable>
      </ScrollView>
    </SafeScreen>
  );
}

// ─── HUD Tile (telemetry mini-readout) ───────────────────────────

function HudTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.hudTile}>
      <Text style={[Typography.label, styles.hudLabel]}>{label}</Text>
      <Text style={Typography.mono}>{value}</Text>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.hero,
  },
  header: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  title: {
    marginTop: Spacing.xs,
  },

  // Status card
  statusCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textTertiary,
    marginRight: Spacing.sm,
  },
  statusText: {
    color: Colors.textSecondary,
  },
  hudRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hudTile: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  hudLabel: {
    color: Colors.textTertiary,
  },

  // Prompt input
  promptContainer: {
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  promptPlaceholder: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: 15,
    color: Colors.textTertiary,
    flex: 1,
  },
  micButton: {
    marginLeft: Spacing.md,
  },
  micButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
  micInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(52,200,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(52,200,255,0.25)',
  },

  // Quick shots
  quickShotsSection: {
    marginBottom: Spacing.xxl,
  },
  sectionLabel: {
    marginBottom: Spacing.md,
  },
  quickShotsList: {
    gap: Spacing.md,
  },
  quickShotCard: {
    width: 96,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  quickShotLabel: {
    fontFamily: FontFamily.headingSemiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Connect button
  connectButton: {
    backgroundColor: Colors.electricSky,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  connectButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  connectButtonText: {
    fontFamily: FontFamily.headingSemiBold,
    fontSize: 16,
    color: Colors.obsidian,
    letterSpacing: -0.2,
  },
});

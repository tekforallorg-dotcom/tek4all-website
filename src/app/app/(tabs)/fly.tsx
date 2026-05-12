/**
 * Fly Screen — live control surface during flight.
 *
 * Shows: camera feed (placeholder) → command timeline → status → emergency strip.
 * The emergency action strip is always visible at the bottom.
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

export default function FlyScreen() {
  return (
    <SafeScreen edges={['top', 'left', 'right']} padded={false}>
      {/* ── Camera Feed Placeholder ────────────────────── */}
      <View style={styles.cameraPlaceholder}>
        <Ionicons name="videocam-outline" size={48} color={Colors.textTertiary} />
        <Text style={[Typography.bodySmall, styles.cameraText]}>
          Camera feed appears here during flight
        </Text>
      </View>

      {/* ── Status Overlay ────────────────────────────── */}
      <View style={[Surfaces.glass, styles.statusOverlay]}>
        <StatusChip icon="battery-half-outline" value="--%" />
        <StatusChip icon="arrow-up-outline" value="--m" />
        <StatusChip icon="navigate-outline" value="GPS --" />
      </View>

      {/* ── Command Timeline Placeholder ───────────────── */}
      <View style={styles.timeline}>
        <Text style={[Typography.bodySmall, styles.timelineEmpty]}>
          Commands will appear here as you fly
        </Text>
      </View>

      {/* ── Emergency Action Strip (always visible) ─────── */}
      <View style={styles.emergencyStrip}>
        <EmergencyButton
          icon="pause-outline"
          label="Hover"
          color={Colors.warning}
        />
        <EmergencyButton
          icon="arrow-down-outline"
          label="Land"
          color={Colors.warning}
        />
        <EmergencyButton
          icon="home-outline"
          label="RTH"
          color={Colors.electricSky}
        />
        <EmergencyButton
          icon="stop-outline"
          label="STOP"
          color={Colors.danger}
          isStop
        />
      </View>
    </SafeScreen>
  );
}

// ─── Status Chip ──────────────────────────────────────────────────

function StatusChip({
  icon,
  value,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  value: string;
}) {
  return (
    <View style={styles.statusChip}>
      <Ionicons name={icon} size={14} color={Colors.textSecondary} />
      <Text style={Typography.mono}>{value}</Text>
    </View>
  );
}

// ─── Emergency Button ─────────────────────────────────────────────

function EmergencyButton({
  icon,
  label,
  color,
  isStop = false,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  color: string;
  isStop?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.emergencyButton,
        isStop && styles.emergencyButtonStop,
        pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
      ]}
      accessibilityLabel={`Emergency: ${label}`}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={22} color={color} />
      <Text
        style={[
          styles.emergencyLabel,
          { color },
          isStop && styles.emergencyLabelStop,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Camera
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: Colors.pitchBlack,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  cameraText: {
    color: Colors.textTertiary,
  },

  // Status overlay
  statusOverlay: {
    position: 'absolute',
    top: 100,
    left: Spacing.xl,
    right: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  // Timeline
  timeline: {
    backgroundColor: Colors.carbonFiber,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(200,220,255,0.06)',
  },
  timelineEmpty: {
    textAlign: 'center',
    color: Colors.textTertiary,
  },

  // Emergency strip
  emergencyStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.obsidian,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,59,48,0.15)',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-around',
    paddingBottom: Spacing.xxl,
  },
  emergencyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  emergencyButtonStop: {
    backgroundColor: 'rgba(255,59,48,0.12)',
    ...Shadow.dangerGlow,
  },
  emergencyLabel: {
    fontFamily: FontFamily.headingSemiBold,
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  emergencyLabelStop: {
    fontFamily: FontFamily.displayBold,
  },
});

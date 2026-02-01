import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const DeviceCardComp = ({
  device,
  isConnected,
  batteryLevel,
  onPress,
  onDisconnect,
  onViewFiles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={isConnected}
    >
      <View style={styles.iconContainer}>
        <Icons.doll width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{device.name || 'MyHero Device'}</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConnected ? Colors.parotGreen : Colors.GRAY },
            ]}
          />
          <Text style={styles.status}>
            {isConnected ? 'Connected' : 'Tap to connect'}
          </Text>
          {isConnected && batteryLevel !== null && (
            <Text style={styles.battery}> | Battery: {batteryLevel}%</Text>
          )}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {isConnected ? (
          <>
            <TouchableOpacity onPress={onViewFiles} style={styles.actionButton}>
              <Icons.ListIcon width={UtilityMethods.wp(5)} height={UtilityMethods.wp(5)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDisconnect} style={styles.actionButton}>
              <Icons.Cross width={UtilityMethods.wp(4)} height={UtilityMethods.wp(4)} />
            </TouchableOpacity>
          </>
        ) : (
          <Icons.RightArrow width={UtilityMethods.wp(4)} height={UtilityMethods.wp(4)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: UtilityMethods.wp(4),
    paddingVertical: UtilityMethods.wp(4),
    minHeight: UtilityMethods.hp(9),
    borderRadius: UtilityMethods.wp(3),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: UtilityMethods.hp(0.7),
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 0.5,
  },
  iconContainer: {
    marginRight: UtilityMethods.wp(4),
    backgroundColor: Colors.MEDIUM_GRAY,
    padding: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.VALUE(16),
    lineHeight: FontSize.VALUE(20),
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.BLACK,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: UtilityMethods.hp(0.5),
  },
  statusDot: {
    width: UtilityMethods.wp(2),
    height: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(1),
    marginRight: UtilityMethods.wp(2),
  },
  status: {
    fontSize: FontSize.VALUE(12),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
  },
  battery: {
    fontSize: FontSize.VALUE(12),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: UtilityMethods.wp(2),
    marginLeft: UtilityMethods.wp(1),
  },
});

export default DeviceCardComp;

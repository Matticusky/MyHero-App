import { StyleSheet } from 'react-native';
import { FontSize, UtilityMethods } from '../../../utility';
import { Colors, Fonts } from '../../../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: UtilityMethods.wp(4),
    backgroundColor: Colors.WHITE,
  },
  sectionTitle: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(2),
  },
  listContent: {
    paddingBottom: UtilityMethods.hp(10),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: UtilityMethods.hp(3),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.BLACK,
    paddingHorizontal: UtilityMethods.wp(6),
    paddingVertical: UtilityMethods.hp(1.5),
    borderRadius: UtilityMethods.wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: undefined,
    height: undefined,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: FontSize.VALUE(14),
    marginLeft: UtilityMethods.wp(2),
    fontFamily: Fonts.SEMI_BOLD,
  },
  statusButton: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    width: UtilityMethods.wp(26),
    height: UtilityMethods.hp(3),
  },
  statusButtonConnected: {
    borderColor: Colors.parotGreen,
  },
  statusButtonText: {
    color: Colors.GRAY,
    fontSize: FontSize.VALUE(10),
  },
  statusButtonTextConnected: {
    color: Colors.parotGreen,
  },
});

export default styles;

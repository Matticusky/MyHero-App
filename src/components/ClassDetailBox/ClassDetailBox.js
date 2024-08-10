import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { Colors, Fonts, Icons } from '../../assets'
import { CommonStyles, FontSize, UtilityMethods } from '../../utility'
import { ShadowCard } from '../ShadowView'
import Button from '../CustomizedButton'
import { useSelector } from 'react-redux'
import { formatSchedule, shouldDisableButton } from '../../utility/FormateDate'


const ClassDetailBox = ({ 
  item, 
  onPress, 
  buttonText = "Mark Attendance"
 }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const user = useSelector(state => state.auth.user);

  const { 
    // formattedDate, 
    formattedTimeSlot } = formatSchedule(item?.schedule)
  useEffect(()=>{
    setIsButtonDisabled(shouldDisableButton(item));
  },[item])

  return (
    <ShadowCard cardStyle={styles.contStyle}
      activeOpacity={1}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {item?.name}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={[CommonStyles.ROW_VIEW,styles.itemsContainer]}>
          <View style={styles.item1}>
            <Text style={styles.titleText}>
            {user?.role === 'STUDENT' ? `${item?.createdBy?.firstName || ''} ${item?.createdBy?.lastName || ''}` : item?.enrolledStudents?.length} 
            </Text>
            <Text style={styles.desText}>
            {user?.role === 'STUDENT' ? 'Class Instructor' : "Enrolled Students"} 
            </Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.titleText}>
              {item?.semester}
            </Text>
            <Text style={styles?.desText}>
              Semester
            </Text>
          </View>

          <View style={styles.item1}>
            <Text style={styles.titleText}>
              {formattedTimeSlot}
            </Text>
            <Text style={styles.desText}>
              Time Slot
            </Text>
          </View>
          <View style={styles.item2}>
            <Text style={styles.titleText}>
              {item?.schedule?.day}
            </Text>
            <Text style={styles.desText}>
              Day
            </Text>
          </View>

        </View>
      </View>
      <Button text={buttonText}
        Icon={
          <Icons.Right />
        }
        style={{backgroundColor:isButtonDisabled ? Colors.LIGHT_COLOR : Colors.BLACK, opacity:isButtonDisabled ? 0.8: 1}}
        onPress={onPress}
        disabled={isButtonDisabled}
      />
    </ShadowCard>
  )
}

export default ClassDetailBox
const styles = StyleSheet.create({
  contStyle: {
    width: UtilityMethods.wp(90),
    paddingBottom: UtilityMethods.hp(2),
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: UtilityMethods.hp(2),
    paddingHorizontal: UtilityMethods.wp(4),

  },
  itemsContainer:{
    justifyContent: "space-between", 
    flexWrap: 'wrap',
    rowGap:UtilityMethods.hp(1),
  },
  item1:{
    width:'60%',
  },
  item2:{
    width:'40%',
  },
  header: {
    justifyContent: "center",
    alignItems: 'center',
    height: UtilityMethods.hp(4),
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,

  },
  title: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.GRAY,
  },
  body: {
    width: '100%',

    paddingVertical: UtilityMethods.hp(1.5),
    rowGap: UtilityMethods.hp(1),
  },
  titleText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.GRAY,
    marginBottom:UtilityMethods.hp(0.5),
  },
  desText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GRAY,
  }

})
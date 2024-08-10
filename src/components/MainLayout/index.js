import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../assets'
import { LoaderModal } from '../LoaderModal'




const MainLayout = ({ 
  children, 
  paddingTop= StatusBar.currentHeight , 
  isScrollable = false, 
  loader=false, 
  statusbarBackgrund=Colors.WHITE,
  bottomColor=Colors.WHITE, 
}) => {
  return (
    <View style={styles.container}>
        <LoaderModal loading={loader} />
    
      <StatusBar translucent backgroundColor={statusbarBackgrund} barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 0, backgroundColor: statusbarBackgrund}} />
      <SafeAreaView style={[styles.innerContainer,{ paddingTop,backgroundColor:bottomColor }]}>
        {
          isScrollable ?
            <ScrollView 
              contentContainerStyle={styles.scroll} 
              keyboardShouldPersistTaps="handled"
              bounces={false}
              showsVerticalScrollIndicator={false}
              >
              {children}
            </ScrollView>
            :
            <View style={styles.view}>
              {children}
            </View>
        }
      </SafeAreaView>
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    width: '100%',
    
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  view: {
    flex: 1,
    width: '100%'
  },
  scroll: {
    flexGrow: 1,
    width: '100%',
  }
})